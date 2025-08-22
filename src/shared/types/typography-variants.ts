export const TYPOGRAPHY_VARIANTS = [
  'display-b',
  'display',
  'h1',
  'h2',
  'h3',
  'body-1',
  'label',
  'body-2',
  'button-large',
  'button-medium',
  'button-small',
  'button-small-p',
  'caption-primary',
  'caption-secondary',
] as const;

export type TypographyVariant = (typeof TYPOGRAPHY_VARIANTS)[number];
