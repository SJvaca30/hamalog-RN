import { HamaNavigator } from '@features/navigate-with-hama';
import { env } from '@shared/config';
import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';

export const HomeHeaderHama = () => {
  return (
    <Box className="w-full flex-row items-center justify-end bg-gray-0 px-2 pb-2 pt-4">
      {__DEV__ && env.enableAuthMock ? (
        <Box className="bg-point-yellow-100 mr-2 rounded-full px-3 py-1">
          <Typography variant="button-small" color="text-gray-850">
            개발용 MOCK
          </Typography>
        </Box>
      ) : null}
      <HamaNavigator href="/" size={32} />
    </Box>
  );
};
