import { useForm } from 'react-hook-form';
import { gql } from '@apollo/client';
import { Button, Stack, VStack } from '@chakra-ui/react';
import { ProfileFormLayout } from '../../components/profile-form-layout';
import {
  PersonalInformationFormFields,
  PersonalInformationFormFieldsProps,
} from './personal-information-form-fields';
import {
  usePersonalInformationFormQuery,
  useUpdateUserPersonalInformationMutation,
} from './personal-information.generated.ts';
import { Form } from '../../components/form';
import { ProfileComponentProps } from '../../components/profile-form-layout/profile-form-layout.tsx';
import { useEffect } from 'react';
import { UpdateUserInput } from '../../types';
import { ErrorAlerts } from '../../components/error-message';
import { UserNameFormFields } from '../user-form';
import { Loading } from '../../components/loading';

gql`
  query PersonalInformationForm($userId: String!) {
    user(id: $userId) {
      id
      ...UserForm
      ...PersonalInformationFormFields
    }
  }
  mutation UpdateUserPersonalInformation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ...UpdateWorkerPersonalInformation
    }
  }

  fragment UpdateWorkerPersonalInformation on User {
    id
    ...PersonalInformationFormFields
  }
`;

export type UserProfileComponentProps<T extends object = {}> = T &
  ProfileComponentProps & {
    userId: string;
  };

type PersonalInformationFormProps = UserProfileComponentProps<
  {
    onSave?: () => void;
    onCancel?: () => void;
    includeNameFields?: boolean;
    includeContactMethods?: boolean;
  } & Pick<
    PersonalInformationFormFieldsProps,
    'includePronouns' | 'includeGender'
  >
>;

function PersonalInformationForm({
  userId,
  onSave,
  onCancel,
  includePronouns,
  includeContactMethods,
  includeGender,
  ...profileFormLayoutProps
}: PersonalInformationFormProps) {
  const methods = useForm<UpdateUserInput>();
  const {
    isSubmitting,
    isDirty,
    isSubmitSuccessful,
    submitCount,
    dirtyFields: userDirty,
  } = methods.formState;

  const queryResult = usePersonalInformationFormQuery({
    variables: {
      userId,
    },
  });

  const [updatePersonalInfo, { error }] =
    useUpdateUserPersonalInformationMutation();
  useEffect(() => {
    if (queryResult.called && !queryResult.loading && queryResult.data) {
      if (!isDirty && !isSubmitSuccessful && submitCount === 0) {
        methods.reset(queryResult.data.user as UpdateUserInput);
      } else if (isSubmitSuccessful) {
        methods.reset(queryResult.data.user as UpdateUserInput, {
          keepValues: true,
          keepSubmitCount: true,
        });
      }
    }
  }, [
    isDirty,
    isSubmitSuccessful,
    methods,
    queryResult.called,
    queryResult.data,
    queryResult.loading,
    submitCount,
  ]);

  const onSubmit = async (data: UpdateUserInput) => {
    const onSubmitCompleted = () => onSave && onSave();
    if (userDirty) {
      const personalInformation = data;
      await updatePersonalInfo({
        variables: {
          input: {
            id: userId,
            name: personalInformation.name,
            email: personalInformation.email,
            gender: personalInformation.gender,
            pronouns: personalInformation.pronouns,
            phone: personalInformation.phone,
          },
        },
        onCompleted: (data) => {
          const personalInformation = data.updateUser;
          methods.reset({
            ...methods.getValues(),
            ...personalInformation,
          });
          return onSubmitCompleted();
        },
      });
    }
  };

  const CancelAndSaveActionButtons = ({
    submitLabel,
  }: {
    submitLabel?: string;
  }) => (
    <Stack direction="row" gap={2}>
      {onCancel && (
        <Button
          isDisabled={isSubmitting}
          variant="outline"
          onClick={onCancel}
          colorScheme="gray">
          Cancel
        </Button>
      )}
      <SaveButton submitLabel={submitLabel} />
    </Stack>
  );

  const SaveButton = ({ submitLabel = 'Save' }: { submitLabel?: string }) => (
    <Button
      isLoading={isSubmitting}
      type="submit"
      form="edit-user-personal-info"
      isDisabled={!!queryResult.error}>
      {submitLabel}
    </Button>
  );

  const title = (layoutComponent: string) => {
    if (layoutComponent === 'drawer') {
      return undefined;
    }
    return 'Personal info';
  };

  if (queryResult.loading) {
    return <Loading />;
  }

  return (
    <ProfileFormLayout
      title={title(profileFormLayoutProps.layoutComponent)}
      renderFormButtons={
        profileFormLayoutProps.layoutComponent === 'drawer'
          ? CancelAndSaveActionButtons
          : SaveButton
      }
      {...profileFormLayoutProps}>
      <ErrorAlerts errors={error ?? []} />
      <Form<UpdateUserInput>
        name="edit-user-personal-info"
        useFormMethods={methods}
        onSubmit={onSubmit}>
        <VStack spacing={5}>
          <UserNameFormFields />
          <PersonalInformationFormFields
            // personalInformation={queryResult.data?.user}
            includePronouns={includePronouns}
            includeEmail={includeContactMethods}
            includePhoneNumber={includeContactMethods}
            includeGender={includeGender}
          />
        </VStack>
      </Form>
    </ProfileFormLayout>
  );
}

export default function PersonalInformationFormView(
  props: Omit<PersonalInformationFormProps, 'layoutComponent'>,
) {
  return <PersonalInformationForm {...props} layoutComponent="standalone" />;
}

export function PersonalInformationFormModal(
  props: Omit<PersonalInformationFormProps, 'layoutComponent'>,
) {
  return <PersonalInformationForm {...props} layoutComponent="modal" />;
}
