import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';
import { format } from 'date-fns';
import { memo } from 'react';

const HomeWelcome = () => {
  const formattedDate = format(new Date(), 'yyyy년 M월 d일');

  return (
    <Box
      bg="bg-gray-0"
      borderColor="border-gray-150"
      className="w-full flex-row items-end justify-between border-b-[1.5px] px-4 py-6">
      <Box className="flex-col gap-1">
        <Typography variant="display-b" color="text-gray-850">
          처음 만나 반가워
        </Typography>
        <Typography variant="display" color="text-gray-850">
          함께 기록해볼까?
        </Typography>
      </Box>
      <Typography variant="body-2" color="text-gray-500">
        {formattedDate}
      </Typography>
    </Box>
  );
};

export default memo(HomeWelcome);
