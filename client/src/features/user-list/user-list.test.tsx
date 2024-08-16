import { render, screen } from '../../test/test-utils';
import UserList from './user-list';
import { UserInfoRowFragment } from './user-list.generated.ts';

describe('UserList', () => {
  const defaultWorkers: UserInfoRowFragment[] = [
    {
      id: 'anotherid',
      name: 'Parroty FilTeR',
    }
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
    const nameValue = await screen.findByText('Parroty FilTeR');

    expect(nameLabel).toBeInTheDocument();
    expect(nameValue).toBeInTheDocument();
  });
});
