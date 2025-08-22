import { Circle, G, Path } from 'react-native-svg';
import { IconProps } from './icon.types';
import { IconWrapper } from './IconWrapper';

export const GalaryTwoToneIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} viewBox="0 0 24 24">
      {_color => (
        <G>
          <Path
            fill="#28506D"
            d="M17 2a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h10Z"
            opacity=".3"
          />
          <Path
            fill="#28506D"
            d="M14.838 12.162a1.8 1.8 0 0 1 2.425-.11l4.647 3.873c.031.026.062.054.09.084V17a5 5 0 0 1-5 5H7a5 5 0 0 1-4.915-4.086l.356-.356c.04-.039.081-.075.126-.107l2.193-1.565a1.8 1.8 0 0 1 2.318.192l1.073 1.074a1.2 1.2 0 0 0 1.697 0l4.99-4.99Z"
          />
          <Circle
            cx="2"
            cy="2"
            r="2"
            fill="#28506D"
            transform="matrix(-1 0 0 1 10 6)"
          />
        </G>
      )}
    </IconWrapper>
  );
};
