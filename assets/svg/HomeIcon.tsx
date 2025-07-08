import { IconProps } from '@shared/ui/icons/icon.types';
import { useIconProps } from '@shared/ui/icons/use-icon-props';
import { Path, Svg } from 'react-native-svg';

const HomeIcon = (props: IconProps) => {
  const { size, iconColor } = useIconProps(props);

  return props.isActive ? (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        fill={iconColor}
        stroke={iconColor}
        stroke-width="1.25"
        d="M1 7.865c0-1.02.467-1.984 1.268-2.616L6.85 1.631a3.333 3.333 0 0 1 4.131 0l4.584 3.618a3.333 3.333 0 0 1 1.267 2.616v5.468a3.333 3.333 0 0 1-3.333 3.334h-1.25a.833.833 0 0 1-.833-.834v-2.5c0-.92-.746-1.666-1.667-1.666H8.083c-.92 0-1.666.746-1.666 1.666v2.5c0 .46-.373.834-.834.834h-1.25A3.333 3.333 0 0 1 1 13.333V7.865Z"
      />
    </Svg>
  ) : (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        stroke={iconColor}
        stroke-width="1.25"
        d="M1 7.86534C1 6.84519 1.46715 5.8812 2.26785 5.24906L6.85118 1.63064C8.06221 0.674567 9.77112 0.674566 10.9821 1.63064L15.5655 5.24906C16.3662 5.8812 16.8333 6.84518 16.8333 7.86534V13.3333C16.8333 15.1743 15.3409 16.6667 13.5 16.6667H12.25C11.7898 16.6667 11.4167 16.2936 11.4167 15.8333V13.3333C11.4167 12.4129 10.6705 11.6667 9.75 11.6667H8.08333C7.16286 11.6667 6.41667 12.4129 6.41667 13.3333V15.8333C6.41667 16.2936 6.04357 16.6667 5.58333 16.6667H4.33333C2.49238 16.6667 1 15.1743 1 13.3333L1 7.86534Z"
      />
    </Svg>
  );
};

export default HomeIcon;
