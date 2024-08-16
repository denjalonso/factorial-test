import { UnknownError } from '../../components/error';
import Page from '../../components/page/page';
import { UserOnboardingLandingHosted } from '../../features/self-onboarding';
import { useUserSelfOnboardingHostedQuery } from './user-onboarding-hosted.generated.ts';
import { Loading } from '../../components/loading';
import { gql } from '@apollo/client';

gql`
  query UserSelfOnboardingHosted($onboardingId: ID!) {
    hostedUserOnboarding(id: $onboardingId) {
      ...UserOnboardingLandingHosted
      id
      user {
        id
      }
    }
  }
`;

function UserSelfOnboardingHosted({ onboardingId }: { onboardingId: string }) {
  const { data, error, loading } = useUserSelfOnboardingHostedQuery({
    variables: {
      onboardingId,
    },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <Page loading={loading} error={error}>
      {!data ||
      !data?.hostedUserOnboarding ||
      !data.hostedUserOnboarding.user ? (
        <UnknownError />
      ) : (
        <UserOnboardingLandingHosted onboarding={data.hostedUserOnboarding} />
      )}
    </Page>
  );
}

export { UserSelfOnboardingHosted };
