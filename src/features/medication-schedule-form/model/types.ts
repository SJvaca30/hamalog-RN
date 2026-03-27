import type {
  CreateMedicationScheduleRequest,
  MedicationAlarmType,
} from '@entities/medication-schedule';
import type { AlarmMode } from '@shared/ui/AlarmModeSelector';
import type { PickedImage } from '@shared/types';

export interface MedicationScheduleDraftRouteParams {
  nickname?: string | string[];
  hospital?: string | string[];
  prescribedAt?: string | string[];
  memo?: string | string[];
  selectedImage?: string | string[];
}

export interface MedicationScheduleDraft {
  nickname: string;
  hospital: string;
  prescribedAt: string;
  memo: string;
  selectedImage: PickedImage | null;
}

export interface MedicationTimeEntry {
  id: string;
  time: Date;
}

export interface MedicationScheduleFormSnapshot {
  startDate: Date;
  prescriptionDays: number;
  medicationTimes: MedicationTimeEntry[];
  alarmMode: AlarmMode;
}

export interface BuildMedicationScheduleRequestInput {
  memberId: number;
  draft: MedicationScheduleDraft;
  form: MedicationScheduleFormSnapshot;
}

export interface BeforeRemoveNavigation {
  addListener: (
    eventName: 'beforeRemove',
    listener: (event: { preventDefault: () => void }) => void
  ) => () => void;
}

export interface UseMedicationScheduleFormOptions {
  navigation: BeforeRemoveNavigation;
  onExitConfirmed: () => void;
}

export type MedicationScheduleRequestBuilder = (
  input: BuildMedicationScheduleRequestInput
) => CreateMedicationScheduleRequest;

export type AlarmTypeMapper = (mode: AlarmMode) => MedicationAlarmType;
