import { IconProps } from '@shared/ui/icons/icon.types';
import { useIconProps } from '@shared/ui/icons/use-icon-props';
import { Path, Rect, Svg } from 'react-native-svg';

const ReportIcon = (props: IconProps) => {
  const { size, iconColor } = useIconProps(props);

  return props.isActive ? (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        fill={iconColor}
        d="M13.125 0a4.792 4.792 0 0 1 4.792 4.792v8.333a4.792 4.792 0 0 1-4.792 4.792H4.792A4.792 4.792 0 0 1 0 13.125V4.792A4.792 4.792 0 0 1 4.792 0h8.333ZM5 10.375a.625.625 0 0 0-.625.625v3a.625.625 0 1 0 1.25 0v-3A.625.625 0 0 0 5 10.375Zm3.999-7A.625.625 0 0 0 8.374 4l.001 10a.625.625 0 1 0 1.25 0L9.624 4a.625.625 0 0 0-.625-.625Zm4.001 3a.625.625 0 0 0-.625.625v7a.625.625 0 1 0 1.25 0V7A.625.625 0 0 0 13 6.375Z"
      />
    </Svg>
  ) : (
    <Svg width={size} height={size} viewBox="0 0 19 19" fill="none">
      <Rect
        width="16.667"
        height="16.667"
        x="1"
        y="1"
        stroke={iconColor}
        strokeWidth="1.25"
        rx="4.167"
      />
      <Path
        stroke={iconColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        d="M5.333 14.334v-3M9.333 14.333v-10M13.333 14.334v-7"
      />
    </Svg>
  );
};

export default ReportIcon;
