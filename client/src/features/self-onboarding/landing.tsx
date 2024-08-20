import { UnknownError } from '../../components/error';
import { HostedOnboardingStatus } from '../../types';
import { gql } from '@apollo/client';
import { UserOnboardingLandingHostedFragment } from './landing.generated.ts';
import { InProgressOnboardingHosted } from './in-progress-onboarding.tsx';
import { RequiredNonNullable } from '../../utils/type-helpers.ts';
import {Heading} from "@chakra-ui/react";

gql`
  fragment UserOnboardingLandingHosted on HostedUserOnboarding {
    id
    status
    ...UserInProgressOnboardingHosted
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
    return <Heading>🚀 Congratulations, you are be able to be paid!!!!!</Heading>;
  } else if (
    (onboarding.status === HostedOnboardingStatus.INVITED ||
      onboarding.status === HostedOnboardingStatus.STARTED) &&
    onboarding.user
  ) {
    return (
      <InProgressOnboardingHosted
        onboarding={
          onboarding as RequiredNonNullable<
            UserOnboardingLandingHostedFragment,
            'user'
          >
        }
      />
    );
  } else {
    return <UnknownError />;
  }
};

export { UserOnboardingLandingHosted };
