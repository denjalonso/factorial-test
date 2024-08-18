// THIS IS A GENERATED FILE, DO NOT EDIT!
// organize-imports-ignore
import * as Types from '../../types/graphql/schema.generated';

import { DocumentNode } from 'graphql';
export const namedOperations = {
  Fragment: {
    PersonalInformationFormFields: 'PersonalInformationFormFields',
  },
};
export type PersonalInformationFormFieldsFragment = {
  __typename?: 'User';
  id: string;
  email?: string | null;
  gender?: string | null;
  pronouns?: string | null;
  phone?: string | null;
};

export const PersonalInformationFormFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PersonalInformationFormFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'gender' } },
          { kind: 'Field', name: { kind: 'Name', value: 'pronouns' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
