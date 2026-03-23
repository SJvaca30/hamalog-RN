import { format } from 'date-fns';

import type {
  MedicationRegisterDraft,
  MedicationRegisterRouteParams,
} from '../model/types';

export function hasDirtyMedicationRegisterForm(draft: MedicationRegisterDraft) {
  return (
    draft.nickname.trim().length > 0 ||
    draft.hospital.trim().length > 0 ||
    draft.prescribedAt !== null ||
    draft.memo.trim().length > 0 ||
    draft.selectedImage !== null
  );
}

export function serializeMedicationDraftToRouteParams(
  draft: MedicationRegisterDraft
): MedicationRegisterRouteParams {
  return {
    nickname: draft.nickname,
    hospital: draft.hospital,
    prescribedAt: draft.prescribedAt
      ? format(draft.prescribedAt, 'yyyy-MM-dd')
      : '',
    memo: draft.memo,
    selectedImage: draft.selectedImage
      ? JSON.stringify(draft.selectedImage)
      : undefined,
  };
}
