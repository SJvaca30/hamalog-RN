import { IconProps } from '@shared/ui/icons/icon.types';
import { useIconProps } from '@shared/ui/icons/use-icon-props';
import { View } from 'react-native';
import { Path, Rect, Svg } from 'react-native-svg';

const ReportIcon = (props: IconProps) => {
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
      {props.isActive ? (
        <Svg width="100%" height="100%" viewBox="0 0 25 24" fill="none">
          <Path
            fill={iconColor}
            d="M16.625 3C19.2714 3 21.417 5.14563 21.417 7.79199V16.125C21.417 18.7714 19.2714 20.917 16.625 20.917H8.29199C5.64563 20.917 3.5 18.7714 3.5 16.125V7.79199C3.5 5.14563 5.64563 3 8.29199 3H16.625ZM8.5 13.375C8.15484 13.375 7.87503 13.6549 7.875 14V17C7.875 17.3452 8.15482 17.625 8.5 17.625C8.84518 17.625 9.125 17.3452 9.125 17V14C9.12497 13.6549 8.84516 13.375 8.5 13.375ZM12.499 6.375C12.1972 6.37523 11.945 6.58938 11.8867 6.87402L11.874 7L11.875 17C11.875 17.3452 12.1548 17.625 12.5 17.625C12.845 17.6247 13.125 17.345 13.125 17L13.124 7L13.1113 6.87402C13.053 6.58928 12.801 6.375 12.499 6.375ZM16.5 9.375C16.1548 9.375 15.875 9.65485 15.875 10V17C15.875 17.3452 16.1548 17.625 16.5 17.625C16.8452 17.625 17.125 17.3452 17.125 17V10C17.125 9.65485 16.8452 9.375 16.5 9.375Z"
          />
        </Svg>
      ) : (
        <Svg width="100%" height="100%" viewBox="0 0 25 24" fill="none">
          <Rect
            stroke={iconColor}
            x="4.5"
            y="4"
            width="16.6667"
            height="16.6667"
            rx="4.16667"
            stroke-width="1.25"
          />
          <Path
            stroke={iconColor}
            d="M8.83301 17.3335L8.83301 14.3335"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            stroke={iconColor}
            d="M12.8325 17.3334L12.8325 7.33337"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            stroke={iconColor}
            d="M16.833 17.3335L16.833 10.3335"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>
      )}
    </View>
  );
};

export default ReportIcon;
