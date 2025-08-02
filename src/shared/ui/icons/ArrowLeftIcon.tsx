import { Path } from 'react-native-svg';
import { IconProps } from './icon.types';
import { IconWrapper } from './IconWrapper';

export const ArrowLeftIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} viewBox="0 0 24 24">
      {_color => (
        <Path
          stroke="#1F1E23"
          stroke-linecap="round"
          stroke-width="1.5"
          d="m16 5-6.968 6.097a1.2 1.2 0 0 0 0 1.806L16 19"
        />
      )}
    </IconWrapper>
  );
};
