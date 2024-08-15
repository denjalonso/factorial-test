import { gql } from '@apollo/client';
import { Box, Button, HStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { ProfileFormLayout } from '../../components/profile-form-layout';
import { ProfileFormLayoutComponent } from '../../components/profile-form-layout/profile-form-layout';
import { Form } from '../../components/form/form.tsx';
import { CreateUserInput } from '../../types';
import { useCreateUserMutation } from './create-user.generated.ts';
import { UserFormFields } from '../user-form/user-form-fields.tsx';

gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ...UserForm
    }
  }
`;

const FORM_NAME_ID = 'create-worker';

export type CreateUserFormProps = {
  onCreated?: () => void;
  onCancel?: () => void;
  layout: ProfileFormLayoutComponent;
};

export default function CreateUserForm({
  onCancel,
  onCreated,
  layout,
}: CreateUserFormProps) {
  const methods = useForm<CreateUserInput>({ defaultValues: { name: '' } });
  const [createUserMutation] = useCreateUserMutation();

  const onSubmit = (data: CreateUserInput) => {
    const { name } = data;
    return createUserMutation({
      variables: {
        input: {
          id: uuidv4(),
          name,
        },
      },
      onCompleted: () => {
        onCreated?.();
      },
    });
  };

  const { isDirty, isSubmitting } = methods.formState;

  return (
    <ProfileFormLayout
      title="Add user"
      layoutComponent={layout}
      renderFormButtons={() => (
        <HStack spacing="5">
          <Button
            variant="outline"
            colorScheme="gray"
            onClick={onCancel}
            isDisabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            form={FORM_NAME_ID}
            isLoading={isSubmitting}
            isDisabled={!isDirty}>
            Save
          </Button>
        </HStack>
      )}>
      <Box w="full">
        <Form<CreateUserInput>
          name={FORM_NAME_ID}
          useFormMethods={methods}
          onSubmit={onSubmit}>
          <UserFormFields />
        </Form>
      </Box>
    </ProfileFormLayout>
  );
}
