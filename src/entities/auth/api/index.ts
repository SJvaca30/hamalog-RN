import { env } from '@shared/config';

import * as mockApi from './mock';
import * as realApi from './real';

const authApi = env.enableAuthMock ? mockApi : realApi;

export const signup = authApi.signup;
export const login = authApi.login;
export const refreshTokens = authApi.refreshTokens;
export const logout = authApi.logout;
export const getCsrfToken = authApi.getCsrfToken;
export const getCsrfStatus = authApi.getCsrfStatus;
export const validateEmailFormat = authApi.validateEmailFormat;
