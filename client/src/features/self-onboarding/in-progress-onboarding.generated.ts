// THIS IS A GENERATED FILE, DO NOT EDIT!
// organize-imports-ignore
import * as Types from '../../types/graphql/schema.generated';

import { UserOnboardingStepFlowModalFragment } from './step-flow.generated';
import { DocumentNode } from 'graphql';
import { UserOnboardingStepFlowModalFragmentDoc } from './step-flow.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const namedOperations = {
  Mutation: {
    SaveUserOnboardingAsStarted: 'SaveUserOnboardingAsStarted',
    MarkUserOnboardingCompleted: 'MarkUserOnboardingCompleted',
  },
  Fragment: {
    UserInProgressOnboardingHosted: 'UserInProgressOnboardingHosted',
    UserInProgressOnboarding_Worker: 'UserInProgressOnboarding_Worker',
  },
};
export type UserInProgressOnboardingHostedFragment = {
  __typename?: 'HostedUserOnboarding';
  id: string;
  status: Types.HostedOnboardingStatus;
  user?:
    | ({ __typename?: 'User' } & UserInProgressOnboarding_WorkerFragment)
    | null;
};

export type UserInProgressOnboarding_WorkerFragment = {
  __typename?: 'User';
  id: string;
  name: string;
} & UserOnboardingStepFlowModalFragment;

export type SaveUserOnboardingAsStartedMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type SaveUserOnboardingAsStartedMutation = {
  __typename?: 'Mutation';
  updateHostedUserOnboardingStatus: {
    __typename?: 'HostedUserOnboarding';
    id: string;
    status: Types.HostedOnboardingStatus;
  };
};

export type MarkUserOnboardingCompletedMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type MarkUserOnboardingCompletedMutation = {
  __typename?: 'Mutation';
  updateHostedUserOnboardingStatus: {
    __typename?: 'HostedUserOnboarding';
    id: string;
    status: Types.HostedOnboardingStatus;
  };
};

export const UserInProgressOnboarding_WorkerFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserInProgressOnboarding_Worker' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'UserOnboardingStepFlowModal' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const UserInProgressOnboardingHostedFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserInProgressOnboardingHosted' },
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
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'UserInProgressOnboarding_Worker',
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const SaveUserOnboardingAsStartedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SaveUserOnboardingAsStarted' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateHostedUserOnboardingStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'status' },
                      value: { kind: 'EnumValue', value: 'STARTED' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export type SaveUserOnboardingAsStartedMutationFn = Apollo.MutationFunction<
  SaveUserOnboardingAsStartedMutation,
  SaveUserOnboardingAsStartedMutationVariables
>;

/**
 * __useSaveUserOnboardingAsStartedMutation__
 *
 * To run a mutation, you first call `useSaveUserOnboardingAsStartedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveUserOnboardingAsStartedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveUserOnboardingAsStartedMutation, { data, loading, error }] = useSaveUserOnboardingAsStartedMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSaveUserOnboardingAsStartedMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SaveUserOnboardingAsStartedMutation,
    SaveUserOnboardingAsStartedMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SaveUserOnboardingAsStartedMutation,
    SaveUserOnboardingAsStartedMutationVariables
  >(SaveUserOnboardingAsStartedDocument, options);
}
export type SaveUserOnboardingAsStartedMutationHookResult = ReturnType<
  typeof useSaveUserOnboardingAsStartedMutation
>;
export type SaveUserOnboardingAsStartedMutationResult =
  Apollo.MutationResult<SaveUserOnboardingAsStartedMutation>;
export type SaveUserOnboardingAsStartedMutationOptions =
  Apollo.BaseMutationOptions<
    SaveUserOnboardingAsStartedMutation,
    SaveUserOnboardingAsStartedMutationVariables
  >;
export const MarkUserOnboardingCompletedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MarkUserOnboardingCompleted' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateHostedUserOnboardingStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'status' },
                      value: { kind: 'EnumValue', value: 'COMPLETED' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export type MarkUserOnboardingCompletedMutationFn = Apollo.MutationFunction<
  MarkUserOnboardingCompletedMutation,
  MarkUserOnboardingCompletedMutationVariables
>;

/**
 * __useMarkUserOnboardingCompletedMutation__
 *
 * To run a mutation, you first call `useMarkUserOnboardingCompletedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkUserOnboardingCompletedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markUserOnboardingCompletedMutation, { data, loading, error }] = useMarkUserOnboardingCompletedMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkUserOnboardingCompletedMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MarkUserOnboardingCompletedMutation,
    MarkUserOnboardingCompletedMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    MarkUserOnboardingCompletedMutation,
    MarkUserOnboardingCompletedMutationVariables
  >(MarkUserOnboardingCompletedDocument, options);
}
export type MarkUserOnboardingCompletedMutationHookResult = ReturnType<
  typeof useMarkUserOnboardingCompletedMutation
>;
export type MarkUserOnboardingCompletedMutationResult =
  Apollo.MutationResult<MarkUserOnboardingCompletedMutation>;
export type MarkUserOnboardingCompletedMutationOptions =
  Apollo.BaseMutationOptions<
    MarkUserOnboardingCompletedMutation,
    MarkUserOnboardingCompletedMutationVariables
  >;
