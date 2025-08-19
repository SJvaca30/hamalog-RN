import type { ReactNode } from 'react';

type ConfirmVariant = {
  variant: 'confirm';
  title: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

type ConsentVariant = {
  variant: 'consent';
  title: string;
  termsContent: string;
  onTermsPress: () => void;
  onConfirm: () => void;
  confirmText?: string;
};

type SelectVariantOption = {
  id: string;
  icon: ReactNode;
  text: string;
  onPress: () => void;
};

type SelectVariant = {
  variant: 'select';
  title: string;
  options: SelectVariantOption[];
};

export type ConfirmModalVariantProps =
  | ConfirmVariant
  | ConsentVariant
  | SelectVariant;

export type ConfirmModalProps = {
  visible: boolean;
  onCancel: () => void;
} & ConfirmModalVariantProps;
