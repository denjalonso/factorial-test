import { useForm } from 'react-hook-form';
import { Form } from '../../components/form/';
import { render, screen } from '../../test/test-utils';
import { UserNameFormFields } from './user-name-form-fields.tsx';

describe('UserFormFields', () => {
  const setup = () => {
    const TestParentComponent = ({ children }: React.PropsWithChildren<{}>) => (
      <Form useFormMethods={useForm()} onSubmit={jest.fn()} name="test">
        {children}
      </Form>
    );
    render(
      <TestParentComponent>
        <UserNameFormFields />,
      </TestParentComponent>,
    );

    const nameInput = screen.getByLabelText(/Name/);
    return {
      firstNameInput: nameInput,
    };
  };

  test('renders name input', () => {
    const { firstNameInput } = setup();
    expect(firstNameInput).toBeInTheDocument();

    expect(firstNameInput).toBeEnabled();
  });
});
