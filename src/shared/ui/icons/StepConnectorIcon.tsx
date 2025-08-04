import { Path } from 'react-native-svg';
import { IconProps } from './icon.types';
import { IconWrapper } from './IconWrapper';

export const StepConnectorIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} viewBox="0 0 32 2">
      {color => (
        <Path
          stroke={color}
          strokeDasharray="4 4"
          strokeWidth="2"
          d="M0 1h32"
        />
      )}
    </IconWrapper>
  );
};
