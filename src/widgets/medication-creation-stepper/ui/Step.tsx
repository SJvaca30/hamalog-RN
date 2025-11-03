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
  variant: 'register' | 'import' | 'schedule';
};

export const Step = ({ variant }: Props) => {
  if (variant === 'register') {
    return (
      <>
        <StepItem status="active" stepNumber={1} label="약물 등록" />
        <StepConnectorIcon width={32} color={colors.gray[100]} />
        <StepItem status="inactive" stepNumber={2} label="일정 설계" />
      </>
    );
  }

  if (variant === 'import') {
    return (
      <>
        <StepItem status="active" stepNumber={1} label="약물 가져오기" />
        <StepConnectorIcon width={32} color={colors.gray[100]} />
        <StepItem status="inactive" stepNumber={2} label="일정 설계" />
      </>
    );
  }

  // variant === 'schedule'
  return (
    <>
      <StepItem status="completed" stepNumber={1} label="약물 준비" />
      <StepConnectorIcon width={32} color={colors.primary[400]} />
      <StepItem status="active" stepNumber={2} label="일정 설계" />
    </>
  );
};
