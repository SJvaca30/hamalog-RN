export const medicationScheduleKeys = {
  all: ['medication-schedules'] as const,
  lists: () => [...medicationScheduleKeys.all, 'list'] as const,
  list: (memberId: number) =>
    [...medicationScheduleKeys.lists(), { memberId }] as const,
  details: () => [...medicationScheduleKeys.all, 'detail'] as const,
  detail: (id: number) => [...medicationScheduleKeys.details(), id] as const,
} as const;
