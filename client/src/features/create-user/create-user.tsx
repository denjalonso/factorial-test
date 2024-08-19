import { gql, useApolloClient } from '@apollo/client';
import { Box, Button, HStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { ProfileFormLayout } from '../../components/profile-form-layout';
import { ProfileFormLayoutComponent } from '../../components/profile-form-layout/profile-form-layout';
import { Form } from '../../components/form/form.tsx';
import { CreateUserInput, HostedOnboardingStatus } from '../../types';
import {
  useCreateHostedUserOnboardingMutation,
  useCreateUserMutation,
} from './create-user.generated.ts';
import { UserNameFormFields } from '../user-form/user-name-form-fields.tsx';
import { namedOperations } from '../user-list/user-list.generated.ts';

gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ...UserForm
    }
  }

  mutation CreateHostedUserOnboarding(
    $input: CreateHostedUserOnboardingInput!
  ) {
    createHostedUserOnboarding(input: $input) {
      id
      status
      user {
        id
        name
      }
    }
  }
`;

const FORM_NAME_ID = 'create-user';

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
  const [createHostedUserOnboardingMutation] =
    useCreateHostedUserOnboardingMutation();
  const apolloClient = useApolloClient();

  const onSubmit = (data: CreateUserInput) => {
    const { name } = data;
    return createUserMutation({
      variables: {
        input: {
          id: uuidv4(),
          name,
        },
      },
      awaitRefetchQueries: true,
      onCompleted: (data) => {
        return createHostedUserOnboardingMutation({
          variables: {
            input: {
              id: uuidv4(),
              status: HostedOnboardingStatus.INVITED,
              userId: data.createUser.id,
            },
          },
          onCompleted: () => {
            onCreated?.();
          },
          awaitRefetchQueries: true,
          refetchQueries: () => {
            const queries = [namedOperations.Query.UsersList];
            const activeQueries = Array.from(
              apolloClient.getObservableQueries('active').values(),
            ).map((obsQuery) => obsQuery.queryName);
            return queries.filter((queryName) =>
              activeQueries.includes(queryName),
            );
          },
        });
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
          <UserNameFormFields />
        </Form>
      </Box>
    </ProfileFormLayout>
  );
}
