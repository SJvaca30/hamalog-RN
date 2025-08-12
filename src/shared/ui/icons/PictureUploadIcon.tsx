import { Circle, G, Path } from 'react-native-svg';
import { IconProps } from './icon.types';
import { IconWrapper } from './IconWrapper';

export const PictureUploadIcon = (props: IconProps) => {
  return (
    <IconWrapper viewBox="0 0 20 21" {...props}>
      {_color => (
        <G>
          <Path
            fill="#8A96A4"
            d="M15 .5a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5v-10a5 5 0 0 1 5-5h10Z"
            opacity=".3"
          />
          <Path
            fill="#fff"
            d="M12.074 11.785a1.8 1.8 0 0 1 2.425-.11l3.49 2.908c.059.05.113.106.16.168l.092.124a4.124 4.124 0 0 1-4.116 3.875h-8.25a4.126 4.126 0 0 1-3.828-2.588l.236-.235c.04-.039.081-.074.126-.106l1.517-1.083a1.8 1.8 0 0 1 2.318.191l.494.494a1.2 1.2 0 0 0 1.698 0l3.638-3.638Z"
          />
          <Circle
            cx="2"
            cy="2"
            r="2"
            fill="#fff"
            transform="matrix(-1 0 0 1 8 4.5)"
          />
        </G>
      )}
    </IconWrapper>
  );
};
