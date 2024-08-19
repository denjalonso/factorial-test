import { gql } from '@apollo/client';
import { Grid, GridItem, GridProps } from '@chakra-ui/react';
import { PersonalInformationFormFieldsFragment } from './personal-information-form-fields.generated.ts';
import { InputField } from '../../components/form/input.tsx';

gql`
  fragment PersonalInformationFormFields on User {
    id
    email
    gender
    pronouns
    phone
  }
`;

type PersonalInformationFormFieldsProps = {
  // personalInformation?: PersonalInformationFormFieldsFragment | null;
  includeEmail?: boolean;
  includePronouns?: boolean;
  includePhoneNumber?: boolean;
  includeGender?: boolean;
} & GridProps;

const PersonalInformationFormFields = ({
  // personalInformation,
  includeEmail = true,
  includePhoneNumber = true,
  includePronouns = true,
  includeGender = true,
  ...props
}: PersonalInformationFormFieldsProps) => {
  return (
    <Grid
      templateColumns={{
        sm: 'repeat(6, minmax(0, 1fr))',
        base: '1fr',
      }}
      gap={5}
      w="100%"
      {...props}>
      {includeGender && (
        <GridItem colSpan={3}>
          <InputField<PersonalInformationFormFieldsFragment>
            name="gender"
            label="Gender"
            registerOptions={{
              maxLength: 100,
            }}
          />
        </GridItem>
      )}
      {includePronouns && (
        <GridItem colSpan={3}>
          <InputField<PersonalInformationFormFieldsFragment>
            name="pronouns"
            label="Pronouns"
            registerOptions={{
              maxLength: 100,
            }}
          />
        </GridItem>
      )}
      {includePhoneNumber && (
        <GridItem colSpan={3}>
          <InputField<PersonalInformationFormFieldsFragment>
            name="phone"
            label="Phone"
            registerOptions={{
              maxLength: 200,
            }}
          />
        </GridItem>
      )}
      {includeEmail && (
        <GridItem colSpan={3}>
          <InputField<PersonalInformationFormFieldsFragment>
            name="email"
            label="Email"
            registerOptions={{
              maxLength: 300,
            }}
          />
        </GridItem>
      )}
    </Grid>
  );
};

export { PersonalInformationFormFields };
export type { PersonalInformationFormFieldsProps };
