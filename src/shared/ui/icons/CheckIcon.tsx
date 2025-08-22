import { G, Path, Rect } from 'react-native-svg';
import { IconProps } from './icon.types';
import { IconWrapper } from './IconWrapper';

export const CheckIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} viewBox="0 0 24 24">
      {_color => (
        <G>
          <Rect width="24" height="24" fill="#E1E4EB" rx="12" />
          <Path
            fill="#fff"
            d="M15.91 8.917a.594.594 0 0 0-.418.16l-5.08 5.014c-.15.148-.3.12-.417-.054L8.247 11.46a.603.603 0 0 0-.82-.161.581.581 0 0 0-.163.806l1.747 2.578c.526.775 1.551.874 2.221.214l5.098-4.995a.583.583 0 0 0 0-.823.595.595 0 0 0-.42-.161Z"
          />
        </G>
      )}
    </IconWrapper>
  );
};
