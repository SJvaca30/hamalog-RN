import { Circle, G, Path, Rect } from 'react-native-svg';
import { IconProps } from './icon.types';
import { IconWrapper } from './IconWrapper';

export const CameraIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} viewBox="0 0 24 24">
      {_color => (
        <G>
          <Path
            fill="#28506D"
            d="M1 10.096C1 7.723 2.949 5.8 5.352 5.8c.696 0 1.326-.41 1.6-1.041l.34-.785A3.301 3.301 0 0 1 10.327 2h3.348c1.32 0 2.513.776 3.033 1.974l.34.785a1.742 1.742 0 0 0 1.6 1.041C21.053 5.8 23 7.723 23 10.096v5.475C23 18.57 20.538 21 17.5 21h-11C3.462 21 1 18.57 1 15.571v-5.475Z"
            opacity=".3"
          />
          <Circle
            cx="4"
            cy="4"
            r="4"
            fill="#28506D"
            transform="matrix(-1 0 0 1 16 9)"
          />
          <Rect width="4" height="1.5" x="10" y="4" fill="#28506D" rx=".75" />
        </G>
      )}
    </IconWrapper>
  );
};
