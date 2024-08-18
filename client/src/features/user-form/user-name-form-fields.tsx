import { Grid, GridItem } from '@chakra-ui/react';
import { gql } from '@apollo/client';
import { InputField } from '../../components/form/input.tsx';
import { UserFormFragment } from './user-form.generated.ts';

gql`
  fragment UserForm on User {
    id
    name
  }
`;

function UserNameFormFields() {
  return (
    <Grid
      templateColumns={{ sm: 'repeat(2, minmax(0, 1fr))', base: '1fr' }}
      gap={4}
      w="100%">
      <GridItem colSpan={{ sm: 2, base: 1 }}>
        <InputField<UserFormFragment>
          name="name"
          label={'Name'}
          registerOptions={{
            required: 'Name is required',
            maxLength: 30,
          }}
        />
      </GridItem>
    </Grid>
  );
}

export { UserNameFormFields };
