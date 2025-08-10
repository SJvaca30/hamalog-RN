import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '../api/upload';

/**
 * 이미지 업로드 mutation 훅
 * - `mutate`/`mutateAsync`로 업로드 실행
 * - 캐싱이 불필요한 쓰기 작업이라 `useMutation`을 사용합니다.
 */
export function useUploadImage() {
  return useMutation({ mutationFn: uploadImage });
}
