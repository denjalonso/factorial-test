import { render, screen } from '../../test/test-utils';
import UserList from './user-list';
import { UserInfoRowFragment } from './user-list.generated.ts';
import { HostedOnboardingStatus } from '../../types';

describe('UserList', () => {
  const defaultWorkers: UserInfoRowFragment[] = [
    {
      id: 'anotherid',
      name: 'Parroty',
      hostedOnboarding: {
        id: 'onboardingid',
        status: HostedOnboardingStatus.INVITED,
      },
    },
  ];
  const setup = ({
    users = defaultWorkers,
  }: {
    users?: UserInfoRowFragment[];
  } = {}) => {
    render(<UserList users={users} />);
  };

  test('renders the table labels and values', async () => {
    setup();

    const nameLabel = await screen.findByText(/Name/);
    const nameValue = await screen.findByText('Parroty');
    const onboardingLabel = await screen.findByText(/onboarding status/i);
    const onboardingValue = await screen.findByText(/invited/i);

    expect(nameLabel).toBeInTheDocument();
    expect(nameValue).toBeInTheDocument();
    expect(onboardingLabel).toBeInTheDocument();
    expect(onboardingValue).toBeInTheDocument();
  });
});
