import { colors } from '@shared/config';
import { Box } from '@shared/ui/Box';
import { CheckIcon } from '@shared/ui/icons';
import { StepConnectorIcon } from '@shared/ui/icons/StepConnectorIcon';
import { Typography } from '@shared/ui/Typography';

type StepItemProps = {
  status: 'completed' | 'active' | 'inactive';
  stepNumber: number;
  label: string;
};

const StepItem = ({ status, stepNumber, label }: StepItemProps) => {
  if (status === 'completed') {
    return (
      <Box direction="row" align="center" gap="xs">
        <CheckIcon size={22} />
        <Typography variant="caption-secondary" color="text-gray-300">
          {label}
        </Typography>
      </Box>
    );
  }

  const isActive = status === 'active';

  return (
    <Box direction="row" align="center" gap="xs">
      <Box
        justify="center"
        align="center"
        rounded="full"
        bg={isActive ? 'bg-primary-100' : undefined}
        borderColor={isActive ? 'border-primary-400' : 'border-gray-100'}
        className={`h-6 w-6 border${isActive ? '-[1.5px]' : ''}`}>
        <Typography
          variant="caption-primary"
          color={isActive ? 'text-primary-400' : 'text-gray-150'}>
          {stepNumber}
        </Typography>
      </Box>
      <Typography
        variant={isActive ? 'caption-primary' : 'caption-secondary'}
        color={isActive ? 'text-primary-400' : 'text-gray-300'}>
        {label}
      </Typography>
    </Box>
  );
};

type Props = {
  variant: 'register' | 'schedule';
};

export const Step = ({ variant }: Props) => {
  const isRegisterStepActive = variant === 'register';

  return (
    <>
      <StepItem
        status={isRegisterStepActive ? 'active' : 'completed'}
        stepNumber={1}
        label="약물 등록"
      />
      <StepConnectorIcon
        width={32}
        color={isRegisterStepActive ? colors.gray[100] : colors.primary[400]}
      />
      <StepItem
        status={isRegisterStepActive ? 'inactive' : 'active'}
        stepNumber={2}
        label="일정 설계"
      />
    </>
  );
};
