import { Path } from 'react-native-svg';
import { IconProps } from './icon.types';
import { IconWrapper } from './IconWrapper';

export const MedicationCheckIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} viewBox="0 0 24 24">
      {_color => (
        <Path
          fill="#189EFF"
          d="M17.866 7.375a.89.89 0 0 0-.628.241l-7.619 7.52c-.225.222-.45.18-.627-.08L6.37 11.188a.905.905 0 0 0-1.23-.241.872.872 0 0 0-.244 1.208l2.62 3.868c.79 1.162 2.327 1.31 3.332.322l7.646-7.493c.34-.336.34-.9 0-1.236a.892.892 0 0 0-.628-.241Z"
        />
      )}
    </IconWrapper>
  );
};
