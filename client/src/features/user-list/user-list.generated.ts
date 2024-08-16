// THIS IS A GENERATED FILE, DO NOT EDIT!
// organize-imports-ignore
import * as Types from '../../types/graphql/schema.generated';

import { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const namedOperations = {
  Query: {
    UsersList: 'UsersList',
  },
  Fragment: {
    UserInfoRow: 'UserInfoRow',
  },
};
export type UserInfoRowFragment = {
  __typename?: 'User';
  id: string;
  name: string;
};

export type UsersListQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UsersListQuery = {
  __typename?: 'Query';
  users?: Array<{ __typename?: 'User' } & UserInfoRowFragment> | null;
};

export const UserInfoRowFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserInfoRow' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const UsersListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UsersList' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'UserInfoRow' },
                },
              ],
            },
          },
        ],
      },
    },
    ...UserInfoRowFragmentDoc.definitions,
  ],
} as unknown as DocumentNode;

/**
 * __useUsersListQuery__
 *
 * To run a query within a React component, call `useUsersListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersListQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UsersListQuery,
    UsersListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersListQuery, UsersListQueryVariables>(
    UsersListDocument,
    options,
  );
}
export function useUsersListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UsersListQuery,
    UsersListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersListQuery, UsersListQueryVariables>(
    UsersListDocument,
    options,
  );
}
export type UsersListQueryHookResult = ReturnType<typeof useUsersListQuery>;
export type UsersListLazyQueryHookResult = ReturnType<
  typeof useUsersListLazyQuery
>;
export type UsersListQueryResult = Apollo.QueryResult<
  UsersListQuery,
  UsersListQueryVariables
>;
