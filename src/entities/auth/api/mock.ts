import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import type { ApiErrorResponse } from '@shared/api';

import {
  CsrfStatusResponse,
  CsrfTokenResponse,
  EmailCheckResult,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SignupRequest,
  SignupResponse,
} from '../model/types';
import { emailSchema } from '../model/validation';

interface MockAuthAccount {
  memberId: number;
  loginId: string;
  password: string;
  birth: string;
  phoneNumber: string;
  provider: 'email' | 'kakao';
  createdAt: string;
}

interface MockAuthState {
  accounts: MockAuthAccount[];
  currentMemberId: number | null;
  csrfToken: string | null;
  csrfIssuedAt: string | null;
}

type MockAuthError = Error & {
  response: {
    status: number;
    data: ApiErrorResponse;
  };
};

const MOCK_AUTH_STORAGE_KEY = 'hamalog.mock-auth.state';
const MOCK_KAKAO_LOGIN_ID = 'kakao.mock@hamalog.local';
const MOCK_KAKAO_PASSWORD = 'kakao-mock-password';
const CSRF_HEADER_NAME = 'X-CSRF-TOKEN';
const CSRF_EXPIRY_MINUTES = 60;
const BASE64_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const isWeb = Platform.OS === 'web';

const initialState: MockAuthState = {
  accounts: [],
  currentMemberId: null,
  csrfToken: null,
  csrfIssuedAt: null,
};

async function getStoredItem(key: string): Promise<string | null> {
  if (!isWeb) {
    return SecureStore.getItemAsync(key);
  }

  try {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    return localStorage.getItem(key);
  } catch (error) {
    console.warn('[MockAuth] 웹 저장소 조회 실패:', error);
    return null;
  }
}

async function setStoredItem(key: string, value: string): Promise<void> {
  if (!isWeb) {
    await SecureStore.setItemAsync(key, value);
    return;
  }

  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  } catch (error) {
    console.warn('[MockAuth] 웹 저장소 저장 실패:', error);
  }
}

async function readState(): Promise<MockAuthState> {
  const raw = await getStoredItem(MOCK_AUTH_STORAGE_KEY);
  if (!raw) {
    return initialState;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<MockAuthState>;
    return {
      accounts: Array.isArray(parsed.accounts)
        ? (parsed.accounts.filter(Boolean) as MockAuthAccount[])
        : [],
      currentMemberId:
        typeof parsed.currentMemberId === 'number'
          ? parsed.currentMemberId
          : null,
      csrfToken: typeof parsed.csrfToken === 'string' ? parsed.csrfToken : null,
      csrfIssuedAt:
        typeof parsed.csrfIssuedAt === 'string' ? parsed.csrfIssuedAt : null,
    };
  } catch (error) {
    console.warn('[MockAuth] 저장 상태 파싱 실패. 초기화합니다.', error);
    return initialState;
  }
}

async function writeState(state: MockAuthState): Promise<void> {
  await setStoredItem(MOCK_AUTH_STORAGE_KEY, JSON.stringify(state));
}

function createApiError(
  status: number,
  code: string,
  message: string,
  path: string
): MockAuthError {
  const error = new Error(message) as MockAuthError;
  error.name = 'AxiosError';
  error.response = {
    status,
    data: {
      code,
      message,
      path,
      violations: null,
    },
  };
  return error;
}

function base64EncodeAscii(value: string): string {
  let output = '';

  for (let index = 0; index < value.length; index += 3) {
    const byte1 = value.charCodeAt(index);
    const byte2 =
      index + 1 < value.length ? value.charCodeAt(index + 1) : Number.NaN;
    const byte3 =
      index + 2 < value.length ? value.charCodeAt(index + 2) : Number.NaN;

    const enc1 = byte1 >> 2;
    const enc2 = ((byte1 & 3) << 4) | ((Number.isNaN(byte2) ? 0 : byte2) >> 4);
    const enc3 = Number.isNaN(byte2)
      ? 64
      : ((byte2 & 15) << 2) | ((Number.isNaN(byte3) ? 0 : byte3) >> 6);
    const enc4 = Number.isNaN(byte3) ? 64 : byte3 & 63;

    output += BASE64_CHARS.charAt(enc1);
    output += BASE64_CHARS.charAt(enc2);
    output += enc3 === 64 ? '=' : BASE64_CHARS.charAt(enc3);
    output += enc4 === 64 ? '=' : BASE64_CHARS.charAt(enc4);
  }

  return output;
}

function base64UrlEncode(value: string): string {
  return base64EncodeAscii(value)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function createMockJwt(
  memberId: number,
  loginId: string,
  expiresInSeconds: number
): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    sub: loginId,
    memberId,
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  };

  return [
    base64UrlEncode(JSON.stringify(header)),
    base64UrlEncode(JSON.stringify(payload)),
    'mock-signature',
  ].join('.');
}

function createTokenPair(account: MockAuthAccount): LoginResponse {
  return {
    access_token: createMockJwt(account.memberId, account.loginId, 60 * 60),
    refresh_token: createMockJwt(
      account.memberId,
      account.loginId,
      60 * 60 * 24 * 14
    ),
    expires_in: 60 * 60,
    token_type: 'Bearer',
  };
}

function createMemberId(accounts: MockAuthAccount[]): number {
  const maxMemberId = accounts.reduce((maxValue, account) => {
    return Math.max(maxValue, account.memberId);
  }, 1000);

  return maxMemberId + 1;
}

function createCsrfTokenValue(memberId: number): string {
  const randomSuffix = Math.random().toString(36).slice(2, 12);
  return `mock-csrf-${memberId}-${randomSuffix}`;
}

async function ensureKakaoAccount(
  state: MockAuthState
): Promise<{ state: MockAuthState; account: MockAuthAccount }> {
  const existingAccount = state.accounts.find(
    account => account.loginId === MOCK_KAKAO_LOGIN_ID
  );

  if (existingAccount) {
    return { state, account: existingAccount };
  }

  const kakaoAccount: MockAuthAccount = {
    memberId: 900001,
    loginId: MOCK_KAKAO_LOGIN_ID,
    password: MOCK_KAKAO_PASSWORD,
    birth: '1995-01-01',
    phoneNumber: '01000000000',
    provider: 'kakao',
    createdAt: new Date().toISOString(),
  };

  const nextState = {
    ...state,
    accounts: [...state.accounts, kakaoAccount],
  };

  await writeState(nextState);

  return { state: nextState, account: kakaoAccount };
}

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const state = await readState();
  const existingAccount = state.accounts.find(
    account => account.loginId === data.loginId
  );

  if (existingAccount) {
    throw createApiError(
      409,
      'DUPLICATE_MEMBER',
      '이미 가입된 이메일입니다.',
      '/auth/signup'
    );
  }

  const nextAccount: MockAuthAccount = {
    memberId: createMemberId(state.accounts),
    loginId: data.loginId,
    password: data.password,
    birth: data.birth,
    phoneNumber: data.phoneNumber,
    provider: 'email',
    createdAt: new Date().toISOString(),
  };

  await writeState({
    ...state,
    accounts: [...state.accounts, nextAccount],
  });

  return '회원가입이 성공적으로 완료되었습니다';
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  let state = await readState();

  if (
    data.loginId === MOCK_KAKAO_LOGIN_ID &&
    data.password === MOCK_KAKAO_PASSWORD
  ) {
    const ensured = await ensureKakaoAccount(state);
    state = ensured.state;

    await writeState({
      ...state,
      currentMemberId: ensured.account.memberId,
      csrfToken: null,
      csrfIssuedAt: null,
    });

    return createTokenPair(ensured.account);
  }

  const account = state.accounts.find(
    candidate => candidate.loginId === data.loginId
  );

  if (!account || account.password !== data.password) {
    throw createApiError(
      401,
      'INVALID_CREDENTIALS',
      '이메일 또는 비밀번호가 일치하지 않습니다.',
      '/auth/login'
    );
  }

  await writeState({
    ...state,
    currentMemberId: account.memberId,
    csrfToken: null,
    csrfIssuedAt: null,
  });

  return createTokenPair(account);
};

export const refreshTokens = async (
  data: RefreshTokenRequest
): Promise<RefreshTokenResponse> => {
  const state = await readState();

  if (!data.refreshToken || state.currentMemberId === null) {
    throw createApiError(
      401,
      'INVALID_REFRESH_TOKEN',
      '리프레시 토큰이 유효하지 않습니다.',
      '/auth/refresh'
    );
  }

  const account = state.accounts.find(
    candidate => candidate.memberId === state.currentMemberId
  );

  if (!account) {
    throw createApiError(
      401,
      'INVALID_REFRESH_TOKEN',
      '리프레시 토큰이 유효하지 않습니다.',
      '/auth/refresh'
    );
  }

  const tokenPair = createTokenPair(account);

  return {
    access_token: tokenPair.access_token,
    refresh_token: tokenPair.refresh_token,
    expires_in: tokenPair.expires_in,
  };
};

export const logout = async (): Promise<LogoutResponse> => {
  const state = await readState();

  await writeState({
    ...state,
    currentMemberId: null,
    csrfToken: null,
    csrfIssuedAt: null,
  });

  return '로그아웃이 성공적으로 처리되었습니다';
};

export const getCsrfToken = async (): Promise<CsrfTokenResponse> => {
  const state = await readState();

  if (state.currentMemberId === null) {
    throw createApiError(
      401,
      'UNAUTHORIZED',
      '인증이 필요합니다.',
      '/auth/csrf-token'
    );
  }

  const token = createCsrfTokenValue(state.currentMemberId);
  const issuedAt = new Date().toISOString();

  await writeState({
    ...state,
    csrfToken: token,
    csrfIssuedAt: issuedAt,
  });

  return {
    csrfToken: token,
    headerName: CSRF_HEADER_NAME,
    expiryMinutes: CSRF_EXPIRY_MINUTES,
    storage: isWeb ? 'localStorage' : 'secureStore',
    timestamp: issuedAt,
  };
};

export const getCsrfStatus = async (): Promise<CsrfStatusResponse> => {
  const state = await readState();

  if (state.currentMemberId === null) {
    throw createApiError(
      401,
      'UNAUTHORIZED',
      '인증이 필요합니다.',
      '/auth/csrf-status'
    );
  }

  return {
    userId: String(state.currentMemberId),
    csrfTokenPresent: !!state.csrfToken,
    csrfTokenValid: !!state.csrfToken,
    storage: isWeb ? 'localStorage' : 'secureStore',
    timestamp: state.csrfIssuedAt ?? new Date().toISOString(),
  };
};

export const validateEmailFormat = async (
  email: string
): Promise<EmailCheckResult> => {
  const result = emailSchema.safeParse(email);

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message || '올바른 이메일 형식을 입력해주세요'
    );
  }

  return {
    exists: false,
    email: result.data,
  };
};
