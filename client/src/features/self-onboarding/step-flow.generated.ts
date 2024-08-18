// THIS IS A GENERATED FILE, DO NOT EDIT!
// organize-imports-ignore
import * as Types from '../../types/graphql/schema.generated';

import { DocumentNode } from 'graphql';
export const namedOperations = {
  Fragment: {
    UserOnboardingStepFlowModal: 'UserOnboardingStepFlowModal',
  },
};
export type UserOnboardingStepFlowModalFragment = {
  __typename?: 'User';
  id: string;
};

export const UserOnboardingStepFlowModalFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserOnboardingStepFlowModal' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
      },
    },
  ],
} as unknown as DocumentNode;
