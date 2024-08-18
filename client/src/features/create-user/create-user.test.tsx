import { userEvent, render, screen, waitFor } from '../../test/test-utils';
import CreateUserForm, { CreateUserFormProps } from './create-user';

describe('CreateUserForm', () => {
  const setup = (props?: Partial<CreateUserFormProps>) => {
    render(<CreateUserForm layout="standalone" {...props} />);

    const createButton = screen.getByText('Save');
    const nameInput = screen.getByLabelText(/Name/);
    return {
      createButton,
      nameInput,
    };
  };

  test('renders user name input and save button', () => {
    const { createButton, nameInput } = setup();
    expect(createButton).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
  });

  test('when name is entered, clicking the create button creates an user', async () => {
    const onCreated = jest.fn();
    const { createButton, nameInput } = setup({ onCreated });
    await userEvent.type(nameInput, 'first name');
    await userEvent.click(createButton);
    await waitFor(() => expect(createButton).toBeEnabled());
    await waitFor(() => expect(onCreated).toHaveBeenCalled());
  });
});
