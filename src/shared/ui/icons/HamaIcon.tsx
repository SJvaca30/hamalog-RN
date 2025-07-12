import { colors } from '@shared/config/colors';
import { Circle, G, Path } from 'react-native-svg';
import { IconProps } from './icon.types';
import IconWrapper from './IconWrapper';

const HamaIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} viewBox="0 0 32 32">
      {() => (
        <G>
          <Path
            d="M10.982 6.911c1.165-.535 3.106-.917 5.203-.917 2.096 0 4.038.382 5.202.917.363-.687 1.336-2.047 2.33-1.986 1.242.076 2.096.917 2.174 2.139.062.978-.906 1.782-1.398 2.062.337.382 1.103 1.574 1.476 3.285.465 2.139-.078 2.902 1.242 4.889 1.32 1.986 1.398 5.117-.388 6.874-1.786 1.757-5.048 2.903-10.638 2.903-5.591 0-8.853-1.146-10.639-2.903-1.786-1.757-1.708-4.888-.388-6.874 1.32-1.987.777-2.75 1.243-4.89.372-1.71 1.138-2.902 1.475-3.284-.492-.28-1.46-1.084-1.398-2.062C6.556 5.842 7.41 5 8.652 4.925c.994-.061 1.968 1.299 2.33 1.986Z"
            fill={colors.gray[150]}
          />
          <Circle
            cx="13.6465"
            cy="14.3848"
            r="1.15385"
            fill={colors.gray[850]}
          />
          <Circle
            cx="18.7232"
            cy="14.3848"
            r="1.15385"
            fill={colors.gray[850]}
          />
        </G>
      )}
    </IconWrapper>
  );
};

export default HamaIcon;
