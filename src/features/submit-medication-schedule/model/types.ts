import type {
  CreateMedicationScheduleRequest,
  CreateMedicationScheduleResponse,
} from '@entities/medication-schedule';
import type { PickedImage } from '@shared/types';

export interface SubmitMedicationScheduleInput {
  requestData: CreateMedicationScheduleRequest;
  selectedImage: PickedImage | null;
}

export interface SubmitMedicationScheduleSuccess {
  ok: true;
  data: CreateMedicationScheduleResponse;
}

export interface SubmitMedicationScheduleFailure {
  ok: false;
  title: string;
  message: string;
}

export type SubmitMedicationScheduleResult =
  | SubmitMedicationScheduleSuccess
  | SubmitMedicationScheduleFailure;
