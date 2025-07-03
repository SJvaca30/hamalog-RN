// Public API for the shared layer
// This file exports all public interfaces from the shared layer

// UI Components
export { Box } from './ui/Box';
export { Container } from './ui/Container';
export { Text } from './ui/Text';

// Types
export type {
  BackgroundColor,
  BodySize,
  BorderColor,
  ButtonSize,
  ColorClass,
  FontFamilyClass,
  GrayColor,
  HamalogColor,
  HamalogFontFamily,
  HamalogTextSize,
  HeadlineSize,
  PointColor,
  PrimaryColor,
  StrokeColor,
  TextColor,
  TextSizeClass,
} from './types/colors.types';

export * from './config/typography';
export * from './types/typography.types';

// Utils
export { cn } from './lib/utils';
