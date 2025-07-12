import { Path } from 'react-native-svg';
import IconWrapper from './IconWrapper';
import { IconProps } from './icon.types';

export const CloseIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} viewBox="0 0 24 24">
      {color => (
        <Path
          fill={color}
          d="M16.97 5.97a.75.75 0 1 1 1.06 1.06L13.06 12l4.97 4.97.052.056a.75.75 0 0 1-1.056 1.056l-.056-.052L12 13.06l-4.97 4.97-.056.052a.75.75 0 0 1-1.056-1.056l.052-.056L10.94 12 5.97 7.03a.75.75 0 0 1 1.06-1.06L12 10.94l4.97-4.97Z"
        />
      )}
    </IconWrapper>
  );
};
