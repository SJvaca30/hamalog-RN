import { HamaNavigator } from '@features/navigate-with-hama';
import { Box } from '@shared/ui/Box';

export const HomeHeaderHama = () => {
  return (
    <Box className="w-full flex-row items-center justify-end bg-gray-0 px-2 pb-2 pt-4">
      <HamaNavigator href="/" size={32} />
    </Box>
  );
};
