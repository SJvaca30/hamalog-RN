import { colors } from '@shared/config';
import { Box } from '@shared/ui/Box';
import { CheckIcon } from '@shared/ui/icons';
import { StepConnectorIcon } from '@shared/ui/icons/StepConnectorIcon';
import { Typography } from '@shared/ui/Typography';

type Props = {
  variant: 'register' | 'schedule';
};

export const Step = ({ variant }: Props) => {
  return (
    <>
      <Box direction="row" align="center" gap="xs">
        {variant === 'register' ? (
          <>
            <Box
              justify="center"
              align="center"
              rounded="full"
              bg="bg-primary-100"
              borderColor="border-primary-400"
              className="h-6 w-6 border-[1.5px]">
              <Typography variant="caption-primary" color="text-primary-400">
                1
              </Typography>
            </Box>
            <Typography variant="caption-primary" color="text-primary-400">
              약물 등록
            </Typography>
          </>
        ) : (
          <>
            <CheckIcon size={22} />
            <Typography variant="caption-secondary" color="text-gray-300">
              약물 등록
            </Typography>
          </>
        )}
      </Box>
      <StepConnectorIcon
        width={32}
        color={variant === 'register' ? colors.gray[100] : colors.primary[400]}
      />
      <Box direction="row" align="center" gap="xs">
        {variant === 'register' ? (
          <>
            <Box
              justify="center"
              align="center"
              rounded="full"
              borderColor="border-gray-100"
              className="h-6 w-6 border">
              <Typography variant="caption-primary" color="text-gray-150">
                2
              </Typography>
            </Box>
            <Typography variant="caption-secondary" color="text-gray-300">
              일정 설계
            </Typography>
          </>
        ) : (
          <>
            <Box
              justify="center"
              align="center"
              rounded="full"
              bg="bg-primary-100"
              borderColor="border-primary-400"
              className="h-6 w-6 border-[1.5px]">
              <Typography variant="caption-primary" color="text-primary-400">
                2
              </Typography>
            </Box>
            <Typography variant="caption-primary" color="text-primary-400">
              일정 설계
            </Typography>
          </>
        )}
      </Box>
    </>
  );
};
