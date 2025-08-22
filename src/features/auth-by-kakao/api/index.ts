import { http } from '@shared/api/http';

import { KakaoLoginRequest, KakaoLoginResponse } from '../model/types';

export const postKakaoLogin = async (params: KakaoLoginRequest) => {
  const { data } = await http.post<KakaoLoginResponse>(
    '/login/oauth/kakao',
    params
  );
  return data;
};
