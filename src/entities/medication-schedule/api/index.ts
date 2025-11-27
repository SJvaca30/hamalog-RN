import { http } from '@shared/api/http';
import {
  CreateMedicationScheduleResponse,
  GetMedicationScheduleListResponse,
  GetMedicationScheduleResponse,
  UpdateMedicationScheduleRequest,
} from '../model/types';

/**
 * 복약 스케줄 목록 조회
 */
export const getMedicationSchedules = async (
  memberId: number
): Promise<GetMedicationScheduleListResponse> => {
  const { data } = await http.get<GetMedicationScheduleListResponse>(
    `/medication-schedule/list/${memberId}`
  );

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
