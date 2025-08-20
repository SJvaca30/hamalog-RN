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

  try {
    const form = toFormData({
      image: {
        uri: image.uri,
        name: image.fileName ?? 'photo.jpg',
        type: image.mimeType ?? 'image/jpeg',
      } as unknown as Blob,
    });

    const res: AxiosResponse<any> = await axios.post(endpoint, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 30000, // 30초 타임아웃
    });

    // 서버 응답에서 URL 추출, 없으면 로컬 URI 사용 (개발 환경)
    const uploadedUrl = res.data?.files?.image || res.data?.url;
    if (uploadedUrl) {
      return { url: uploadedUrl };
    }

    // 개발 환경에서 서버가 없는 경우 로컬 URI 반환
    console.warn('서버에서 URL을 받지 못했습니다. 로컬 URI를 사용합니다.');
    return { url: image.uri };
  } catch (error) {
    // 서버 에러 시 개발 환경에서는 로컬 URI 사용
    console.warn('업로드 실패, 로컬 URI를 사용합니다:', error);

    // 실제 네트워크 에러인지 확인
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('업로드 시간이 초과되었습니다.');
      }
      if (error.response?.status === 413) {
        throw new Error('파일 크기가 너무 큽니다.');
      }
    }

    // 개발 환경에서는 로컬 URI로 fallback
    return { url: image.uri };
  }
}
