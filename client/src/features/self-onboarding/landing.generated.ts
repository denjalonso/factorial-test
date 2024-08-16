// THIS IS A GENERATED FILE, DO NOT EDIT!
// organize-imports-ignore
import * as Types from '../../types/graphql/schema.generated';

import { DocumentNode } from 'graphql';
export const namedOperations = {
  Fragment: {
    UserOnboardingLandingHosted: 'UserOnboardingLandingHosted',
  },
};
export type UserOnboardingLandingHostedFragment = {
  __typename?: 'HostedUserOnboarding';
  id: string;
  status: Types.HostedOnboardingStatus;
  user?: { __typename?: 'User'; id: string } | null;
};

export const UserOnboardingLandingHostedFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserOnboardingLandingHosted' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'HostedUserOnboarding' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
