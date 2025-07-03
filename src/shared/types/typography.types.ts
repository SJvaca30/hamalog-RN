export type TypographyVariant =
  | 'headline-p1'
  | 'headline-p2'
  | 'headline-main-l'
  | 'headline-main-b'
  | 'headline-title'
  | 'body'
  | 'button-primary'
  | 'button-date'
  | 'button-secondary'
  | 'button-micro';

export interface TypographyStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  lineHeight: number;
  letterSpacing: number;
}

// Typography configuration type

export type TypographyConfig = Record;
