import userEvent from '@testing-library/user-event';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '../../test/test-utils';
import PersonalInformationFormView, {
  PersonalInformationFormModal,
} from './personal-information';
import { Drawer } from '@chakra-ui/react';

describe('PersonalInfoForm', () => {
  const setup = async () => {
    const userId = 'emId-12345';
    render(<PersonalInformationFormView userId={userId} />);
    const getButtonsByType = (type: HTMLButtonElement['type']) => {
      const buttons = screen
        .getAllByRole('button')
        .filter((button) => (button as HTMLButtonElement).type === type);
      return buttons;
    };

    const getSubmitButton = () => {
      const buttons = getButtonsByType('submit');
      expect(buttons).toHaveLength(1);
      return buttons[0];
    };

    const loading = screen.getByRole('status');
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);

    return { getSaveButton: getSubmitButton };
  };

  test('renders view with save button button once loading is completed', async () => {
    const { getSaveButton } = await setup();
    expect(getSaveButton()).toBeInTheDocument();
    expect(screen.getByText(/Personal info/)).toBeInTheDocument();
  });

  test('changing a value and saving works', async () => {
    const newStringValue = 'male';
    const { getSaveButton } = await setup();

    const nameInput = screen.getByRole('textbox', { name: /name/i });
    await userEvent.type(nameInput, 'Parrot');

    const genderInput = screen.getByRole('textbox', { name: /Gender/i });
    await userEvent.type(genderInput, newStringValue);

    const pronounsInput = screen.getByRole('textbox', { name: /pronouns/i });
    await userEvent.type(pronounsInput, 'she');

    const phoneInput = screen.getByRole('textbox', { name: /phone/i });
    await userEvent.type(phoneInput, '1234567890');

    const emailInput = screen.getByRole('textbox', { name: /phone/i });
    await userEvent.type(emailInput, 'parrot@mail.com');

    await userEvent.click(getSaveButton());
    await waitFor(() => expect(getSaveButton()).toBeEnabled());
  });

  test('Modal view renders one button - Save', async () => {
    render(
      <Drawer isOpen={true} onClose={() => {}}>
        <PersonalInformationFormModal
          userId="user_123"
          onCancel={jest.fn()}
          onSave={jest.fn()}
        />
      </Drawer>,
    );
    const loading = screen.getByRole('status');
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);

    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });
});
