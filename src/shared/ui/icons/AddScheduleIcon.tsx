import { G, Path, Rect } from 'react-native-svg';
import { IconProps } from './icon.types';
import { IconWrapper } from './IconWrapper';

export const AddScheduleIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} size={63} viewBox="0 0 63 64">
      {_color => (
        <G>
          <Rect width="63" height="63" y=".5" fill="#B2DAFF" rx="31.5" />
          <Path
            fill="#E4F2FF"
            d="M31.5 16.5A1.5 1.5 0 0 1 33 18v12.5h12.5a1.5 1.5 0 0 1 0 3H33V46a1.5 1.5 0 0 1-3 0V33.5H17.5a1.5 1.5 0 0 1 0-3H30V18a1.5 1.5 0 0 1 1.5-1.5Z"
          />
        </G>
      )}
    </IconWrapper>
  );
};
