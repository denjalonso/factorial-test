import { render, screen } from '../../test/test-utils';
import { HostedOnboardingStatus } from '../../types';
import { UserOnboardingLandingHosted } from './landing';
import { UserOnboardingLandingHostedFragment } from './landing.generated';

describe('UserOnboardingLanding', () => {
  const mockOnboarding: UserOnboardingLandingHostedFragment = {
    id: 'onboaring-id',
    status: HostedOnboardingStatus.INVITED,
    user: {
      id: 'user-id',
    },
  };

  const getInProgress = () => screen.queryAllByText(/welcome.*/i)[0];
  const getCompleted = () => screen.queryAllByText(/complete.*/i)[0];
  const getInvalidOrExpired = () =>
    screen.queryAllByText(/invalid.*/i)[0] ??
    screen.queryAllByText(/expired.*/i)[0];

  test.each([
    {
      status: HostedOnboardingStatus.INVITED,
    },
    {
      status: HostedOnboardingStatus.STARTED,
    },
  ])(
    'should show onboarding in progress when in "$status" status',
    ({ status }) => {
      render(
        <UserOnboardingLandingHosted
          onboarding={{
            ...mockOnboarding,
            status,
          }}
        />,
      );
      expect(getInProgress()).toBeDefined();
      expect(getCompleted()).not.toBeDefined();
      expect(getInvalidOrExpired()).not.toBeDefined();
    },
  );

  test('should show onboarding completed when in "COMPLETED" status', () => {
    render(
      <UserOnboardingLandingHosted
        onboarding={{
          ...mockOnboarding,
          status: HostedOnboardingStatus.COMPLETED,
        }}
      />,
    );
    expect(getInProgress()).not.toBeDefined();
    expect(getCompleted()).toBeDefined();
    expect(getInvalidOrExpired()).not.toBeDefined();
  });
});
