import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Svg } from 'react-native-svg';

import { IconProps } from './icon.types';
import { useIconProps } from './use-icon-props';

interface IconWrapperProps extends IconProps {
  children: (color: string) => ReactNode;
  viewBox?: string;
}

const IconWrapper = ({
  children,
  viewBox = '0 0 24 24',
  ...props
}: IconWrapperProps) => {
  const { size, iconColor } = useIconProps(props);

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
      }}>
      <Svg width="100%" height="100%" viewBox={viewBox} fill="none">
        {children(iconColor)}
      </Svg>
    </View>
  );
};

export default IconWrapper;
