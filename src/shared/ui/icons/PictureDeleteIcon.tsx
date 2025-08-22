import { ClipPath, Defs, G, Mask, Path } from 'react-native-svg';
import { IconProps } from './icon.types';
import { IconWrapper } from './IconWrapper';

export const PictureDeleteIcon = (props: IconProps) => {
  return (
    <IconWrapper viewBox="0 0 24 24" {...props}>
      {_color => (
        <>
          <G clipPath="url(#a)">
            <Mask
              id="b"
              width="24"
              height="24"
              x="0"
              y="0"
              maskUnits="userSpaceOnUse">
              <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
            </Mask>
            <G mask="url(#b)">
              <Path
                fill="#FF6262"
                d="M7.45 12.65h9.1v-1.3h-9.1v1.3Zm4.559 8.45a8.89 8.89 0 0 1-3.537-.71 9.172 9.172 0 0 1-2.905-1.956 9.175 9.175 0 0 1-1.956-2.902 8.89 8.89 0 0 1-.71-3.542c0-1.256.236-2.433.71-3.53a9.175 9.175 0 0 1 4.857-4.848 8.89 8.89 0 0 1 3.542-.712c1.256 0 2.433.237 3.531.71a9.194 9.194 0 0 1 4.848 4.851 8.834 8.834 0 0 1 .711 3.53 8.89 8.89 0 0 1-.71 3.538 9.171 9.171 0 0 1-1.956 2.904 9.193 9.193 0 0 1-2.896 1.956 8.834 8.834 0 0 1-3.53.711Z"
              />
            </G>
          </G>
          <Defs>
            <ClipPath id="a">
              <Path fill="#fff" d="M0 0h24v24H0z" />
            </ClipPath>
          </Defs>
        </>
      )}
    </IconWrapper>
  );
};
