import { useDisclosure } from '@chakra-ui/react';
import { gql } from '@apollo/client';
import { HostedOnboardingStatus } from '../../types';
import {
  useMarkUserOnboardingCompletedMutation,
  UserInProgressOnboarding_WorkerFragment,
  UserInProgressOnboardingHostedFragment,
  useSaveUserOnboardingAsStartedMutation,
} from './in-progress-onboarding.generated';
import { RequiredGraphQLType } from '../../utils/type-helpers';
import UserOnboardingStepFlowModal from './step-flow';

gql`
  fragment UserInProgressOnboardingHosted on HostedUserOnboarding {
    id
    status
    user {
      ...UserInProgressOnboarding_Worker
    }
  }

  fragment UserInProgressOnboarding_Worker on User {
    id
    name
    ...UserOnboardingStepFlowModal
  }

  mutation SaveUserOnboardingAsStarted($id: ID!) {
    updateHostedUserOnboardingStatus(input: { id: $id, status: STARTED }) {
      id
      status
    }
  }

  mutation MarkUserOnboardingCompleted($id: ID!) {
    updateHostedUserOnboardingStatus(input: { id: $id, status: COMPLETED }) {
      id
      status
    }
  }
`;

const InProgressOnboardingHosted = ({
  onboarding,
}: {
  onboarding: RequiredGraphQLType<UserInProgressOnboardingHostedFragment>;
}) => {
  const [saveUserOnboardingAsStartedMutation] =
    useSaveUserOnboardingAsStartedMutation({
      variables: {
        id: onboarding.id,
      },
    });

  // @ts-expect-error
  const onOpenWorkflow = () => {
    if (onboarding.status === HostedOnboardingStatus.INVITED) {
      saveUserOnboardingAsStartedMutation();
    }
  };
  const [markUserOnboardingCompletedMutation] =
    useMarkUserOnboardingCompletedMutation({
      variables: {
        id: onboarding.id,
      },
    });
  const onCompleteWorkflow = async () => {
    if (onboarding.status !== HostedOnboardingStatus.COMPLETED) {
      return markUserOnboardingCompletedMutation();
    }
  };
  return (
    <InProgressOnboarding
      user={onboarding.user}
      onComplete={onCompleteWorkflow}
    />
  );
};

const InProgressOnboarding = ({
  user,
  onComplete,
}: {
  user: UserInProgressOnboarding_WorkerFragment;
  onComplete: () => Promise<unknown>;
}) => {
  const { onClose } = useDisclosure();
  const onCompleteWorkflow = async () => {
    await onComplete();
    onClose();
  };

  return (
    <UserOnboardingStepFlowModal
      user={user}
      isOpen={true}
      onClose={onClose}
      onComplete={onCompleteWorkflow}
    />
  );
};

export { InProgressOnboardingHosted };
