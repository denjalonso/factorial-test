// THIS IS A GENERATED FILE, DO NOT EDIT!
// organize-imports-ignore
import * as Types from '../../types/graphql/schema.generated';

import { UserFormFragment } from '../user-form/user-name-form-fields.generated';
import { PersonalInformationFormFieldsFragment } from './personal-information-form-fields.generated';
import { DocumentNode } from 'graphql';
import { UserFormFragmentDoc } from '../user-form/user-name-form-fields.generated';
import { PersonalInformationFormFieldsFragmentDoc } from './personal-information-form-fields.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const namedOperations = {
  Query: {
    PersonalInformationForm: 'PersonalInformationForm',
  },
  Mutation: {
    UpdateUserPersonalInformation: 'UpdateUserPersonalInformation',
  },
  Fragment: {
    UpdateWorkerPersonalInformation: 'UpdateWorkerPersonalInformation',
  },
};
export type PersonalInformationFormQueryVariables = Types.Exact<{
  userId: Types.Scalars['String'];
}>;

export type PersonalInformationFormQuery = {
  __typename?: 'Query';
  user?:
    | ({ __typename?: 'User'; id: string } & UserFormFragment &
        PersonalInformationFormFieldsFragment)
    | null;
};

export type UpdateUserPersonalInformationMutationVariables = Types.Exact<{
  input: Types.UpdateUserInput;
}>;

export type UpdateUserPersonalInformationMutation = {
  __typename?: 'Mutation';
  updateUser: { __typename?: 'User' } & UpdateWorkerPersonalInformationFragment;
};

export type UpdateWorkerPersonalInformationFragment = {
  __typename?: 'User';
  id: string;
} & PersonalInformationFormFieldsFragment;

export const UpdateWorkerPersonalInformationFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UpdateWorkerPersonalInformation' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'PersonalInformationFormFields' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const PersonalInformationFormDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'PersonalInformationForm' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'UserForm' },
                },
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'PersonalInformationFormFields',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...UserFormFragmentDoc.definitions,
    ...PersonalInformationFormFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode;

/**
 * __usePersonalInformationFormQuery__
 *
 * To run a query within a React component, call `usePersonalInformationFormQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonalInformationFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonalInformationFormQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function usePersonalInformationFormQuery(
  baseOptions: Apollo.QueryHookOptions<
    PersonalInformationFormQuery,
    PersonalInformationFormQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PersonalInformationFormQuery,
    PersonalInformationFormQueryVariables
  >(PersonalInformationFormDocument, options);
}
export function usePersonalInformationFormLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PersonalInformationFormQuery,
    PersonalInformationFormQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PersonalInformationFormQuery,
    PersonalInformationFormQueryVariables
  >(PersonalInformationFormDocument, options);
}
export type PersonalInformationFormQueryHookResult = ReturnType<
  typeof usePersonalInformationFormQuery
>;
export type PersonalInformationFormLazyQueryHookResult = ReturnType<
  typeof usePersonalInformationFormLazyQuery
>;
export type PersonalInformationFormQueryResult = Apollo.QueryResult<
  PersonalInformationFormQuery,
  PersonalInformationFormQueryVariables
>;
export const UpdateUserPersonalInformationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateUserPersonalInformation' },
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
              name: { kind: 'Name', value: 'UpdateUserInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUser' },
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
                  name: {
                    kind: 'Name',
                    value: 'UpdateWorkerPersonalInformation',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...UpdateWorkerPersonalInformationFragmentDoc.definitions,
    ...PersonalInformationFormFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode;
export type UpdateUserPersonalInformationMutationFn = Apollo.MutationFunction<
  UpdateUserPersonalInformationMutation,
  UpdateUserPersonalInformationMutationVariables
>;

/**
 * __useUpdateUserPersonalInformationMutation__
 *
 * To run a mutation, you first call `useUpdateUserPersonalInformationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPersonalInformationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPersonalInformationMutation, { data, loading, error }] = useUpdateUserPersonalInformationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserPersonalInformationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserPersonalInformationMutation,
    UpdateUserPersonalInformationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateUserPersonalInformationMutation,
    UpdateUserPersonalInformationMutationVariables
  >(UpdateUserPersonalInformationDocument, options);
}
export type UpdateUserPersonalInformationMutationHookResult = ReturnType<
  typeof useUpdateUserPersonalInformationMutation
>;
export type UpdateUserPersonalInformationMutationResult =
  Apollo.MutationResult<UpdateUserPersonalInformationMutation>;
export type UpdateUserPersonalInformationMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateUserPersonalInformationMutation,
    UpdateUserPersonalInformationMutationVariables
  >;
