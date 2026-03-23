import type { PickedImage } from '@shared/types';

export interface MedicationRegisterDraft {
  nickname: string;
  hospital: string;
  prescribedAt: Date | null;
  memo: string;
  selectedImage: PickedImage | null;
}

export interface MedicationRegisterRouteParams {
  [key: string]: string | undefined;
  nickname: string;
  hospital: string;
  prescribedAt: string;
  memo: string;
  selectedImage?: string;
}

export interface BeforeRemoveNavigation {
  addListener: (
    eventName: 'beforeRemove',
    listener: (event: { preventDefault: () => void }) => void
  ) => () => void;
}

export interface UseMedicationRegisterFormOptions {
  navigation: BeforeRemoveNavigation;
  onExitConfirmed: () => void;
}
