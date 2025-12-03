import { http } from '@shared/api/http';
import {
  CreateMedicationScheduleResponse,
  GetMedicationScheduleListResponse,
  GetMedicationScheduleResponse,
  UpdateMedicationScheduleRequest,
} from '../model/types';

/**
 * 복약 스케줄 목록 조회
 * @param memberId - 회원 ID
 * @param page - 페이지 번호 (0부터 시작, 선택사항)
 * @param size - 페이지 크기 (최대 100, 선택사항)
 */
export const getMedicationSchedules = async (
  memberId: number,
  page?: number,
  size?: number
): Promise<GetMedicationScheduleListResponse> => {
  const params = new URLSearchParams();
  if (page !== undefined) params.append('page', String(page));
  if (size !== undefined) params.append('size', String(size));

  const queryString = params.toString();
  const url = `/medication-schedule/list/${memberId}${queryString ? `?${queryString}` : ''}`;

  const { data } = await http.get<GetMedicationScheduleListResponse>(url);
  return data;
};

/**
 * 특정 복약 스케줄 조회
 */
export const getMedicationScheduleById = async (id: number) => {
  const { data } = await http.get<GetMedicationScheduleResponse>(
    `/medication-schedule/${id}`
  );
  return data;
};

/**
 * 복약 스케줄 등록 (multipart/form-data)
 */
export const createMedicationSchedule = async (formData: FormData) => {
  const { data } = await http.post<CreateMedicationScheduleResponse>(
    '/medication-schedule',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return data;
};

/**
 * 복약 스케줄 수정
 */
export const updateMedicationSchedule = async (
  id: number,
  reqData: UpdateMedicationScheduleRequest
) => {
  const { data } = await http.put<GetMedicationScheduleResponse>(
    `/medication-schedule/${id}`,
    reqData
  );
  return data;
};

/**
 * 복약 스케줄 삭제
 */
export const deleteMedicationSchedule = async (id: number) => {
  await http.delete(`/medication-schedule/${id}`);
};
