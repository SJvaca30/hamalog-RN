import { env } from '@shared/config';
import { toFormData } from '@shared/lib';
import axios, { type AxiosResponse } from 'axios';
import type { PickedImage } from '../model/types';

export type UploadVariables = {
  image: PickedImage;
};

export type UploadResponse = {
  url: string;
};

/**
 * 단일 이미지 업로드 API 호출 함수
 * - `env.apiBaseUrl`을 기반으로 엔드포인트를 생성합니다.
 * - 실제 서비스에서는 `/post`를 서버 업로드 경로(예: `/v1/uploads`)로 교체하세요.
 * - `multipart/form-data`로 전송합니다.
 */
export async function uploadImage({
  image,
}: UploadVariables): Promise<UploadResponse> {
  const endpoint = `${env.apiBaseUrl}/post`; // TODO: 서버 엔드포인트로 교체 (예: /v1/uploads)
  const form = toFormData({
    image: {
      uri: image.uri,
      name: image.fileName ?? 'photo.jpg',
      type: image.mimeType ?? 'image/jpeg',
    } as unknown as Blob,
  });
  const res: AxiosResponse<any> = await axios.post(endpoint, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return { url: res.data?.files?.image ?? image.uri };
}
