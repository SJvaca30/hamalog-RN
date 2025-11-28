/**
 * 사용자 요약 정보 (다른 엔티티에서 참조용)
 */
export interface MemberSummary {
  memberId: number;
  name: string;
}

/**
 * 복약 스케줄 기본 타입
 */
export interface MedicationSchedule {
  medicationScheduleId: number;
  memberId: number;
  name: string;
  hospitalName: string;
  prescriptionDate: string; // "YYYY-MM-DD"
  memo: string | null;
  imagePath?: string;
  startOfAd: string; // "YYYY-MM-DD"
  prescriptionDays: number;
  perDay: number;
  alarmType: 'SOUND' | 'VIBRATION' | 'SOUND_AND_VIBRATION' | 'NONE';
}

/**
 * 복약 스케줄 목록 조회 API 응답 DTO
 */
export interface GetMedicationScheduleListResponse {
  schedules: MedicationSchedule[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * 특정 복약 스케줄 조회 API 응답 DTO
 */
export type GetMedicationScheduleResponse = MedicationSchedule;

/**
 * 복약 스케줄 등록(POST) API 요청 DTO
 * API 명세서의 Request Data 참고
 */
export interface CreateMedicationScheduleRequest {
  memberId: number;
  name: string;
  hospitalName: string;
  prescriptionDate: string; // "YYYY-MM-DD"
  memo?: string;
  startOfAd: string; // "YYYY-MM-DD"
  prescriptionDays: number;
  perDay: number;
  alarmType: 'SOUND' | 'VIBRATION' | 'SOUND_AND_VIBRATION' | 'NONE';
}

/**
 * 복약 스케줄 수정(PUT) API 요청 DTO
 */
export interface UpdateMedicationScheduleRequest
  extends Omit<CreateMedicationScheduleRequest, 'memberId'> {
  // 수정 시에는 memberId가 필요 없을 수 있습니다 (API 명세 확인).
}

/**
 * 복약 스케줄 등록 API 응답 DTO
 */
export type CreateMedicationScheduleResponse = MedicationSchedule;
