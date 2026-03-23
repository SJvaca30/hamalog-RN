import { HamaIcon, IconProps } from '@shared/ui/icons';
import { Href, useRouter } from 'expo-router';
import { Pressable } from 'react-native';

interface HamaNavigatorProps extends IconProps {
  href?: Href;
}

export const HamaNavigator = ({ href, ...props }: HamaNavigatorProps) => {
  const router = useRouter();

  const handlePress = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <HamaIcon {...props} />
    </Pressable>
  );
};
