import { G, Path, Rect } from 'react-native-svg';
import { IconProps } from './icon.types';
import { IconWrapper } from './IconWrapper';

export const MinusBtnIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} viewBox="0 0 44 32">
      {_color => (
        <G>
          <Rect width="40" height="28" x="2" y="2" fill="#E1E4EB" rx="8" />
          <Path
            stroke="#1F1E23"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19 16h6"
          />
        </G>
      )}
    </IconWrapper>
  );
};
