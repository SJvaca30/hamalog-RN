import { http } from '@shared/api/http';
import { isMockAuthEnabled } from '@shared/lib/mock-auth';
import {
  getMockMedicationScheduleById,
  getMockMedicationSchedules,
} from '@shared/lib/mock-medication-data';
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
  // Mock 환경에서는 Mock 데이터 반환
  if (isMockAuthEnabled()) {
    console.log('🔧 [개발 모드] Mock 복약 스케줄 목록 반환');
    const mockSchedules = await getMockMedicationSchedules(memberId);
    return {
      schedules: mockSchedules,
      totalCount: mockSchedules.length,
      currentPage: 0,
      pageSize: 20,
      hasNext: false,
      hasPrevious: false,
    };
  }

  const { data } = await http.get<GetMedicationScheduleListResponse>(
    `/medication-schedule/list/${memberId}`
  );

  // 최신순으로 정렬 (prescriptionDate 기준)
  data.schedules.sort(
    (a, b) =>
      new Date(b.prescriptionDate).getTime() -
      new Date(a.prescriptionDate).getTime()
  );

  return data;
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

/**
 * 복약 스케줄 등록 (multipart/form-data)
 */
export const createMedicationSchedule = async (formData: FormData) => {
  // Mock 환경 처리
  if (isMockAuthEnabled()) {
    console.log('🔧 [개발 모드] Mock 복약 스케줄 등록');
    await new Promise(resolve => setTimeout(resolve, 500));
    // 임시 Mock 데이터 반환 (실제로는 입력값 기반 생성 로직 필요하지만 생략)
    return {
      medicationScheduleId: Math.floor(Math.random() * 1000),
      memberId: 1,
      name: 'Mock 신규 약물',
      hospitalName: 'Mock 병원',
      prescriptionDate: new Date().toISOString().split('T')[0],
      memo: 'Mock 메모',
      startOfAd: new Date().toISOString().split('T')[0],
      prescriptionDays: 7,
      perDay: 1,
      alarmType: 'SOUND',
    } as CreateMedicationScheduleResponse;
  }

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
  // Mock 환경 처리
  if (isMockAuthEnabled()) {
    console.log('🔧 [개발 모드] Mock 복약 스케줄 수정:', id);
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockData = await getMockMedicationScheduleById(id);

    if (!mockData) {
      throw new Error(`복약 스케줄을 찾을 수 없습니다. ID: ${id}`);
    }

    return { ...mockData, ...reqData } as GetMedicationScheduleResponse;
  }

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
  // Mock 환경 처리
  if (isMockAuthEnabled()) {
    console.log('🔧 [개발 모드] Mock 복약 스케줄 삭제:', id);
    await new Promise(resolve => setTimeout(resolve, 500));
    return;
  }

  await http.delete(`/medication-schedule/${id}`);
};
