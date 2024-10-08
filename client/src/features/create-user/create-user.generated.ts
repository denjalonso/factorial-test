// THIS IS A GENERATED FILE, DO NOT EDIT!
// organize-imports-ignore
import * as Types from '../../types/graphql/schema.generated';

import { UserFormFragment } from '../user-form/user-name-form-fields.generated';
import { DocumentNode } from 'graphql';
import { UserFormFragmentDoc } from '../user-form/user-name-form-fields.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const namedOperations = {
  Mutation: {
    CreateUser: 'CreateUser',
    CreateHostedUserOnboarding: 'CreateHostedUserOnboarding',
  },
};
export type CreateUserMutationVariables = Types.Exact<{
  input: Types.CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: { __typename?: 'User' } & UserFormFragment;
};

export type CreateHostedUserOnboardingMutationVariables = Types.Exact<{
  input: Types.CreateHostedUserOnboardingInput;
}>;

export type CreateHostedUserOnboardingMutation = {
  __typename?: 'Mutation';
  createHostedUserOnboarding: {
    __typename?: 'HostedUserOnboarding';
    id: string;
    status: Types.HostedOnboardingStatus;
    user?: { __typename?: 'User'; id: string; name: string } | null;
  };
};

export const CreateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateUserInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'UserForm' },
                },
              ],
            },
          },
        ],
      },
    },
    ...UserFormFragmentDoc.definitions,
  ],
} as unknown as DocumentNode;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options,
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const CreateHostedUserOnboardingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateHostedUserOnboarding' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateHostedUserOnboardingInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createHostedUserOnboarding' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
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
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
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
export type CreateHostedUserOnboardingMutationFn = Apollo.MutationFunction<
  CreateHostedUserOnboardingMutation,
  CreateHostedUserOnboardingMutationVariables
>;

/**
 * __useCreateHostedUserOnboardingMutation__
 *
 * To run a mutation, you first call `useCreateHostedUserOnboardingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHostedUserOnboardingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHostedUserOnboardingMutation, { data, loading, error }] = useCreateHostedUserOnboardingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateHostedUserOnboardingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateHostedUserOnboardingMutation,
    CreateHostedUserOnboardingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateHostedUserOnboardingMutation,
    CreateHostedUserOnboardingMutationVariables
  >(CreateHostedUserOnboardingDocument, options);
}
export type CreateHostedUserOnboardingMutationHookResult = ReturnType<
  typeof useCreateHostedUserOnboardingMutation
>;
export type CreateHostedUserOnboardingMutationResult =
  Apollo.MutationResult<CreateHostedUserOnboardingMutation>;
export type CreateHostedUserOnboardingMutationOptions =
  Apollo.BaseMutationOptions<
    CreateHostedUserOnboardingMutation,
    CreateHostedUserOnboardingMutationVariables
  >;
