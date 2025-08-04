import { colors } from '@shared/config';

import { IconProps } from './icon.types';

export const useIconProps = ({
  isActive = false,
  size = 24,
  width,
  height,
  color,
  activeColor = colors.primary[400],
  inactiveColor = colors.gray[700],
}: IconProps) => {
  const iconColor = color || (isActive ? activeColor : inactiveColor);

  return {
    width: width ?? size,
    height: height ?? size,
    iconColor,
  };
};
