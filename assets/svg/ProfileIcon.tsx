import { Path, Svg } from 'react-native-svg';

import { IconProps } from '@shared/ui';
import { useIconProps } from '@shared/ui/icons/use-icon-props';

const ProfileIcon: React.FC<IconProps> = props => {
  const { size, iconColor } = useIconProps(props);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fill={iconColor}
        strokeWidth="1.25"
        d="M9.511 5.386a2.386 2.386 0 0 1 4.773 0v1.509c0 .32.347.521.625.36l1.307-.754a2.386 2.386 0 0 1 2.386 4.134l-1.306.754a.417.417 0 0 0 0 .722l1.306.754a2.386 2.386 0 0 1-2.386 4.133l-1.307-.754a.417.417 0 0 0-.625.36v1.51a2.386 2.386 0 1 1-4.773 0v-1.509a.417.417 0 0 0-.625-.36l-1.306.753a2.386 2.386 0 1 1-2.386-4.133l1.306-.754a.417.417 0 0 0 0-.722l-1.306-.754A2.386 2.386 0 0 1 7.58 6.5l1.306.755c.278.16.625-.04.625-.361V5.386Z"
      />
    </Svg>
  );
};

export default ProfileIcon;
