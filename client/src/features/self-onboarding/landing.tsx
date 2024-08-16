import { UnknownError } from '../../components/error';
import { HostedOnboardingStatus } from '../../types';
import { gql } from '@apollo/client';
import { UserOnboardingLandingHostedFragment } from './landing.generated.ts';

gql`
  fragment UserOnboardingLandingHosted on HostedUserOnboarding {
    id
    status
    user {
      id
    }
  }
`;

const UserOnboardingLandingHosted = ({
  onboarding,
}: {
  onboarding: UserOnboardingLandingHostedFragment;
}) => {
  if (
    onboarding.status === HostedOnboardingStatus.COMPLETED &&
    onboarding.user
  ) {
    return <>user onboarding hosted complete</>;
  } else if (
    (onboarding.status === HostedOnboardingStatus.INVITED ||
      onboarding.status === HostedOnboardingStatus.STARTED) &&
    onboarding.user
  ) {
    return <>user onboarding hosted welcome</>;
  } else {
    return <UnknownError />;
  }
};

export { UserOnboardingLandingHosted };
