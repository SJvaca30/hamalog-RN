import { Path, Svg } from 'react-native-svg';

import { IconProps } from '@shared/ui';
import { useIconProps } from '@shared/ui/icons/use-icon-props';

const HomeIcon: React.FC<IconProps> = props => {
  const { size, iconColor } = useIconProps(props);

  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        fill={iconColor}
        stroke={iconColor}
        stroke-width="1.25"
        d="M1 7.865c0-1.02.467-1.984 1.268-2.616L6.85 1.631a3.333 3.333 0 0 1 4.131 0l4.584 3.618a3.333 3.333 0 0 1 1.267 2.616v5.468a3.333 3.333 0 0 1-3.333 3.334h-1.25a.833.833 0 0 1-.833-.834v-2.5c0-.92-.746-1.666-1.667-1.666H8.083c-.92 0-1.666.746-1.666 1.666v2.5c0 .46-.373.834-.834.834h-1.25A3.333 3.333 0 0 1 1 13.333V7.865Z"
      />
    </Svg>
  );
};

export default HomeIcon;
