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
  alarmType: 'SOUND' | 'VIBRATION';
}

/**
 * 복약 스케줄 목록 조회 API 응답 DTO
 */
export type GetMedicationScheduleListResponse = MedicationSchedule[];

/**
 * 특정 복약 스케줄 조회 API 응답 DTO
 */
export type GetMedicationScheduleResponse = MedicationSchedule;
