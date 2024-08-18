// THIS IS A GENERATED FILE, DO NOT EDIT!
// organize-imports-ignore
import * as Types from '../../types/graphql/schema.generated';

import {
  UserInProgressOnboardingHostedFragment,
  UserInProgressOnboarding_WorkerFragment,
} from './in-progress-onboarding.generated';
import { UserOnboardingStepFlowModalFragment } from './step-flow.generated';
import { DocumentNode } from 'graphql';
import {
  UserInProgressOnboardingHostedFragmentDoc,
  UserInProgressOnboarding_WorkerFragmentDoc,
} from './in-progress-onboarding.generated';
import { UserOnboardingStepFlowModalFragmentDoc } from './step-flow.generated';
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
} & UserInProgressOnboardingHostedFragment;

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
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'UserInProgressOnboardingHosted' },
          },
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
