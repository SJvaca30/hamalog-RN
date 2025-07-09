import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
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
      style={[
        styles.wrapper,
        {
          width: size,
          height: size,
        },
      ]}>
      <Svg width="100%" height="100%" viewBox={viewBox} fill="none">
        {children(iconColor)}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    aspectRatio: 1,
    justifyContent: 'center',
  },
});

export default IconWrapper;
