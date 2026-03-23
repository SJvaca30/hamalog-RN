import type {
  CreateMedicationScheduleRequest,
  MedicationAlarmType,
} from '@entities/medication-schedule';
import type { AlarmMode } from '@shared/ui/AlarmModeSelector';
import { format } from 'date-fns';

import type {
  BuildMedicationScheduleRequestInput,
  MedicationScheduleDraft,
  MedicationScheduleDraftRouteParams,
} from '../model/types';

const normalizeParam = (value?: string | string[]) => {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return value ?? '';
};

export function parseMedicationDraftFromRouteParams(
  params: MedicationScheduleDraftRouteParams
): MedicationScheduleDraft {
  const selectedImageParam = normalizeParam(params.selectedImage);

  let selectedImage = null;
  if (selectedImageParam) {
    try {
      selectedImage = JSON.parse(selectedImageParam);
    } catch (error) {
      console.error('[MedicationSchedule] selectedImage 파싱 실패:', error);
    }
  }

  return {
    nickname: normalizeParam(params.nickname),
    hospital: normalizeParam(params.hospital),
    prescribedAt: normalizeParam(params.prescribedAt),
    memo: normalizeParam(params.memo),
    selectedImage,
  };
}

export function alarmModeToRequestType(mode: AlarmMode): MedicationAlarmType {
  return mode === 'vibration' ? 'VIBE' : 'SOUND';
}

export function buildMedicationScheduleRequest({
  memberId,
  draft,
  form,
}: BuildMedicationScheduleRequestInput): CreateMedicationScheduleRequest {
  return {
    memberId,
    name: draft.nickname,
    hospitalName: draft.hospital,
    prescriptionDate: draft.prescribedAt || format(new Date(), 'yyyy-MM-dd'),
    memo: draft.memo || '',
    startOfAd: format(form.startDate, 'yyyy-MM-dd'),
    prescriptionDays: form.prescriptionDays,
    perDay: form.medicationTimes.length,
    alarmType: alarmModeToRequestType(form.alarmMode),
    medicationTimes: form.medicationTimes.map(item =>
      format(item.time, 'HH:mm:ss')
    ),
  };
}
