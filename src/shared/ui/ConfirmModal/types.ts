import type { ReactNode } from 'react';

/**
 * @param {'confirm'} variant - 일반 확인/취소 모달입니다.
 * @param {string} title - 모달의 제목입니다. (예: "정말 삭제하시겠습니까?")
 * @param {() => void} onConfirm - 확인 버튼을 눌렀을 때 실행될 함수입니다.
 * @param {string} [confirmText] - 확인 버튼의 텍스트입니다. (기본값: "확인")
 * @param {string} [cancelText] - 취소 버튼의 텍스트입니다. (기본값: "취소")
 */
type ConfirmVariant = {
  variant: 'confirm';
  title: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

/**
 * @param {'consent'} variant - 약관 동의 모달입니다.
 * @param {string} title - 모달의 제목입니다. (예: "사진을 올리려면 동의가 필요해요")
 * @param {string} termsContent - 약관 내용 텍스트입니다.
 * @param {() => void} onTermsPress - 약관 내용을 눌렀을 때 실행될 함수입니다. (예: 약관 상세 페이지로 이동)
 * @param {() => void} onConfirm - 동의 버튼을 눌렀을 때 실행될 함수입니다.
 * @param {string} [confirmText] - 동의 버튼의 텍스트입니다. (기본값: "동의")
 */
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

/**
 * @param {'select'} variant - 여러 옵션 중 하나를 선택하는 모달입니다.
 * @param {string} title - 모달의 제목입니다. (예: "사진 올리기")
 * @param {SelectVariantOption[]} options - 선택할 옵션의 배열입니다.
 */
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
  /** 모달의 표시 여부를 결정합니다. */
  visible: boolean;
  /** 모달의 바깥 영역을 누르거나, 뒤로가기 버튼을 눌렀을 때 실행될 함수입니다. */
  onCancel: () => void;
} & ConfirmModalVariantProps;
