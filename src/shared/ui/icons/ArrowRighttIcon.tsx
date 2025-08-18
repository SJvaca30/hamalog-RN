import { Path } from 'react-native-svg';
import { IconProps } from './icon.types';
import { IconWrapper } from './IconWrapper';

export const ArrowRighttIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} viewBox="0 0 24 24">
      {_color => (
        <Path
          stroke="#1F1E23"
          strokeLinecap="round"
          strokeWidth="1.5"
          d="m8 19 6.968-6.097a1.2 1.2 0 0 0 0-1.806L8 5"
        />
      )}
    </IconWrapper>
  );
};
