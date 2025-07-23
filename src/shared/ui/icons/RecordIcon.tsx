import { Path } from 'react-native-svg';
import { IconProps } from './icon.types';
import { IconWrapper } from './IconWrapper';

export const RecordIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} viewBox="0 0 24 24">
      {color => (
        <Path
          fill={color}
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.044 4.336a1.998 1.998 0 0 1 2.827-.001l2.492 2.492c.774.774.782 2.028.018 2.812l-1.66 1.703-5.34-5.34 1.663-1.666ZM11.32 7.063l5.353 5.353-6.526 6.696A2.998 2.998 0 0 1 8 20.018H5.249a1.5 1.5 0 0 1-1.498-1.564l.118-2.809a3.002 3.002 0 0 1 .875-1.995l6.577-6.587Zm2.322 12.882c0 .414.336.75.75.75h6.121a.75.75 0 0 0 0-1.5h-6.121a.75.75 0 0 0-.75.75Z"
        />
      )}
    </IconWrapper>
  );
};
