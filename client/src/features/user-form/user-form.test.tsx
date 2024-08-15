import { useForm } from 'react-hook-form';
import { Form } from '../../components/form/';
import { render, screen } from '../../test/test-utils';
import { UserFormFields } from './user-form-fields';

describe('UserFormFields', () => {
  const setup = () => {
    const TestParentComponent = ({ children }: React.PropsWithChildren<{}>) => (
      <Form useFormMethods={useForm()} onSubmit={jest.fn()} name="test">
        {children}
      </Form>
    );
    render(
      <TestParentComponent>
        <UserFormFields />,
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
