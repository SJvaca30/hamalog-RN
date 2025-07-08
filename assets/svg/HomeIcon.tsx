import { IconProps } from '@shared/ui/icons/icon.types';
import { useIconProps } from '@shared/ui/icons/use-icon-props';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

const HomeIcon = (props: IconProps) => {
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
            stroke={iconColor}
            stroke-width="1.25"
            d="M4.5 11.8653C4.5 10.8452 4.96715 9.8812 5.76785 9.24906L10.3512 5.63064C11.5622 4.67457 13.2711 4.67457 14.4821 5.63064L19.0655 9.24906C19.8662 9.8812 20.3333 10.8452 20.3333 11.8653V17.3333C20.3333 19.1743 18.8409 20.6667 17 20.6667H15.75C15.2898 20.6667 14.9167 20.2936 14.9167 19.8333V17.3333C14.9167 16.4129 14.1705 15.6667 13.25 15.6667H11.5833C10.6629 15.6667 9.91667 16.4129 9.91667 17.3333V19.8333C9.91667 20.2936 9.54357 20.6667 9.08333 20.6667H7.83333C5.99238 20.6667 4.5 19.1743 4.5 17.3333L4.5 11.8653Z"
          />
        </Svg>
      ) : (
        <Svg width="100%" height="100%" viewBox="0 0 25 24" fill="none">
          <Path
            stroke={iconColor}
            stroke-width="1.25"
            d="M4.5 11.8653C4.5 10.8452 4.96715 9.8812 5.76785 9.24906L10.3512 5.63064C11.5622 4.67457 13.2711 4.67457 14.4821 5.63064L19.0655 9.24906C19.8662 9.8812 20.3333 10.8452 20.3333 11.8653V17.3333C20.3333 19.1743 18.8409 20.6667 17 20.6667H15.75C15.2898 20.6667 14.9167 20.2936 14.9167 19.8333V17.3333C14.9167 16.4129 14.1705 15.6667 13.25 15.6667H11.5833C10.6629 15.6667 9.91667 16.4129 9.91667 17.3333V19.8333C9.91667 20.2936 9.54357 20.6667 9.08333 20.6667H7.83333C5.99238 20.6667 4.5 19.1743 4.5 17.3333L4.5 11.8653Z"
          />
        </Svg>
      )}
    </View>
  );
};

export default HomeIcon;
