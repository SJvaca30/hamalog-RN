/**
 * Mock 복약 스케줄 데이터
 * - 개발 환경에서 UI 테스트를 위한 샘플 데이터
 * - 실제 API 대신 사용되는 Mock 데이터
 */

import type { MedicationSchedule } from '@entities/medication-schedule';

/**
 * Mock 복약 스케줄 목록 생성
 */
export function generateMockMedicationSchedules(): MedicationSchedule[] {
  const baseDate = new Date();

  return [
    {
      medicationScheduleId: 1,
      member: { memberId: 1, name: '김민준' },
      name: '불안할 때 먹는 약',
      hospitalName: '햇햇햇햇 햇햇햇햇햇 햇햇햇햇햇',
      prescriptionDate: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0], // 1일 전
      memo: '불안할 때 복용하세요',
      imagePath: undefined,
      startOfAd: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      prescriptionDays: 30,
      perDay: 1,
      alarmType: 'SOUND' as const,
    },
    {
      medicationScheduleId: 2,
      member: { memberId: 1, name: '김민준' },
      name: 'ADHD',
      hospitalName: '해살',
      prescriptionDate: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0], // 3일 전
      memo: '집중력 향상을 위해 복용',
      imagePath: undefined,
      startOfAd: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      prescriptionDays: 60,
      perDay: 2,
      alarmType: 'VIBRATION' as const,
    },
    {
      medicationScheduleId: 3,
      member: { memberId: 1, name: '김민준' },
      name: '파란색 알약',
      hospitalName: '해살',
      prescriptionDate: new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0], // 7일 전
      memo: '식후 30분 뒤 복용',
      imagePath: undefined,
      startOfAd: new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      prescriptionDays: 14,
      perDay: 3,
      alarmType: 'SOUND' as const,
    },
    {
      medicationScheduleId: 4,
      member: { memberId: 1, name: '김민준' },
      name: '불안장애',
      hospitalName: '해살',
      prescriptionDate: new Date(baseDate.getTime() - 10 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0], // 10일 전
      memo: '스트레스가 심할 때 복용',
      imagePath: undefined,
      startOfAd: new Date(baseDate.getTime() - 10 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      prescriptionDays: 45,
      perDay: 1,
      alarmType: 'VIBRATION' as const,
    },
    {
      medicationScheduleId: 5,
      member: { memberId: 1, name: '김민준' },
      name: '공황장애',
      hospitalName: '정신의학과',
      prescriptionDate: new Date(baseDate.getTime() - 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0], // 14일 전
      memo: '공황 발작 시 응급용',
      imagePath: undefined,
      startOfAd: new Date(baseDate.getTime() - 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      prescriptionDays: 21,
      perDay: 1,
      alarmType: 'SOUND' as const,
    },
  ];
}

/**
 * Mock 환경에서 복약 스케줄 목록 반환
 */
export async function getMockMedicationSchedules(
  _memberId: number
): Promise<MedicationSchedule[]> {
  // 실제 API 호출 시뮬레이션을 위한 지연
  await new Promise(resolve => globalThis.setTimeout(resolve, 300));

  const mockData = generateMockMedicationSchedules();

  // 최신순으로 정렬 (API와 동일한 로직)
  return mockData.sort(
    (a, b) =>
      new Date(b.prescriptionDate).getTime() -
      new Date(a.prescriptionDate).getTime()
  );
}

/**
 * Mock 환경에서 특정 복약 스케줄 반환
 */
export async function getMockMedicationScheduleById(
  id: number
): Promise<MedicationSchedule | undefined> {
  await new Promise(resolve => globalThis.setTimeout(resolve, 200));

  const mockData = generateMockMedicationSchedules();
  return mockData.find(schedule => schedule.medicationScheduleId === id);
}
