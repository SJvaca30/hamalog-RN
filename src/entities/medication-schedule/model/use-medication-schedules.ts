import { useQuery } from '@tanstack/react-query';
import { getMedicationScheduleById, getMedicationSchedules } from '../api';
import { medicationScheduleKeys } from '../lib/query-keys';

/**
 * 복약 스케줄 목록 조회 훅
 */
export const useGetMedicationSchedules = (memberId: number) => {
  return useQuery({
    queryKey: medicationScheduleKeys.list(memberId),
    queryFn: () => getMedicationSchedules(memberId),
    enabled: !!memberId, // memberId가 있을 때만 쿼리 실행
  });
};

/**
 * 특정 복약 스케줄 조회 훅
 */
export const useGetMedicationScheduleById = (id: number) => {
  return useQuery({
    queryKey: medicationScheduleKeys.detail(id),
    queryFn: () => getMedicationScheduleById(id),
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });
};
