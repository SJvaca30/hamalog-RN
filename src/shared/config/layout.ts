export const paddingMap = {
  none: 'p-0', // 0px
  xs: 'p-1', // 4px
  sm: 'p-2', // 8px
  md: 'p-4', // 16px
  lg: 'p-6', // 24px
  xl: 'p-8', // 32px
};

export const marginMap = {
  none: 'm-0', // 0px
  xs: 'm-1', // 4px
  sm: 'm-2', // 8px
  md: 'm-4', // 16px
  lg: 'm-6', // 24px
  xl: 'm-8', // 32px
};

export const roundedMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

export const directionMap = {
  row: 'flex-row',
  col: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'col-reverse': 'flex-col-reverse',
};

export const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

export const gapMap = {
  none: 'gap-0', // 0px
  xs: 'gap-1', // 4px
  sm: 'gap-2', // 8px
  md: 'gap-4', // 16px
  lg: 'gap-6', // 24px
  xl: 'gap-8', // 32px
  auto: 'gap-auto', // auto
} as const;
