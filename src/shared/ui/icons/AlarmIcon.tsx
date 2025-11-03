import { Circle, G, Path } from 'react-native-svg';
import { IconProps } from './icon.types';
import { IconWrapper } from './IconWrapper';

export const AlarmIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} viewBox="0 0 16 17">
      {_color => (
        <G>
          <Circle cx="8" cy="9.167" r="6" stroke="#507B99" strokeWidth="1.5" />
          <Path
            stroke="#507B99"
            strokeLinecap="round"
            strokeWidth="1.5"
            d="M8 6.5v2.488c0 .112.056.216.148.278L10 10.5M11.333 1.833l2.667 2M8 1.833v1.334M11.333 14.5 12 15.833M4.667 14.5 4 15.833M4.667 1.833 2 3.833"
          />
        </G>
      )}
    </IconWrapper>
  );
};
