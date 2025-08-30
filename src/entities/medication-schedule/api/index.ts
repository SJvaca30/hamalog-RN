import { http } from '@shared/api/http';
import { isMockAuthEnabled } from '@shared/lib/mock-auth';
import {
  getMockMedicationScheduleById,
  getMockMedicationSchedules,
} from '@shared/lib/mock-medication-data';
import {
  GetMedicationScheduleListResponse,
  GetMedicationScheduleResponse,
} from '../model/types';

/**
 * 복약 스케줄 목록 조회
 */
export const getMedicationSchedules = async (memberId: number) => {
  // Mock 환경에서는 Mock 데이터 반환
  if (isMockAuthEnabled()) {
    console.log('🔧 [개발 모드] Mock 복약 스케줄 목록 반환');
    return getMockMedicationSchedules(memberId);
  }

  const { data } = await http.get<GetMedicationScheduleListResponse>(
    `/medication-schedule/list/${memberId}`
  );

  // 최신순으로 정렬 (prescriptionDate 기준)
  return data.sort(
    (a, b) =>
      new Date(b.prescriptionDate).getTime() -
      new Date(a.prescriptionDate).getTime()
  );
};

/**
 * 특정 복약 스케줄 조회
 */
export const getMedicationScheduleById = async (id: number) => {
  // Mock 환경에서는 Mock 데이터 반환
  if (isMockAuthEnabled()) {
    console.log('🔧 [개발 모드] Mock 복약 스케줄 조회:', id);
    const mockData = await getMockMedicationScheduleById(id);
    if (!mockData) {
      throw new Error(`복약 스케줄을 찾을 수 없습니다. ID: ${id}`);
    }
    return mockData;
  }

  const { data } = await http.get<GetMedicationScheduleResponse>(
    `/medication-schedule/${id}`
  );
  return data;
};
