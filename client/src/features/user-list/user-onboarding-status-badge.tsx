import { Badge, BadgeProps, Text } from '@chakra-ui/react';
import { HostedOnboardingStatus } from '../../types';
import { Spinner } from '../../components/loading';

type OnboardingBadgeProps = {
  bg: BadgeProps['bg'];
  text: string;
};

const OnboardingBadge = ({ bg, text }: OnboardingBadgeProps) => (
  <Badge variant="solid" bg={bg}>
    <Text fontSize="xs" fontWeight="bold">
      {text}
    </Text>
  </Badge>
);

const UserOnboardingStatusBadge = ({
  status,
}: {
  status?: HostedOnboardingStatus;
}) => {
  if (status === undefined || status === null) {
    return <Spinner size="md" />;
  }

  return OnboardingStatusBadge[status];
};

const OnboardingStatusBadge = {
  [HostedOnboardingStatus.STARTED]: (
    <OnboardingBadge bg="yellow.400" text="Started" />
  ),
  [HostedOnboardingStatus.INVITED]: (
    <OnboardingBadge bg="blue.400" text="Invited" />
  ),
  [HostedOnboardingStatus.COMPLETED]: (
    <OnboardingBadge bg="green.400" text="Completed" />
  ),
};

export { UserOnboardingStatusBadge };
