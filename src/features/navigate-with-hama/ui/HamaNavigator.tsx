import HamaIcon from '@assets/svg/HamaIcon';
import { IconProps } from '@shared/ui/icons/icon.types';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

interface HamaNavigatorProps extends IconProps {
  href?: string;
}

const HamaNavigator = ({ href, ...props }: HamaNavigatorProps) => {
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

export default HamaNavigator;
