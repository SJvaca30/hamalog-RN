import { Circle, G, Path, Rect } from 'react-native-svg';
import { IconProps } from './icon.types';
import { IconWrapper } from './IconWrapper';

export const ImportScheduleIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} viewBox="0 0 63 64">
      {_color => (
        <G>
          <Rect width="63" height="63" y=".5" fill="#FEE36E" rx="31.5" />
          <Circle cx="19" cy="24" r="2" fill="#FFFAD3" />
          <Rect width="23" height="3" x="23" y="22.5" fill="#FFFAD3" rx="1.5" />
          <Path
            stroke="#FFFAD3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M13 32.286 14.8 34l4.2-4"
          />
          <Rect width="27" height="3" x="23" y="30.5" fill="#FFFAD3" rx="1.5" />
          <Circle cx="19" cy="40" r="2" fill="#FFFAD3" />
          <Rect width="23" height="3" x="23" y="38.5" fill="#FFFAD3" rx="1.5" />
        </G>
      )}
    </IconWrapper>
  );
};
