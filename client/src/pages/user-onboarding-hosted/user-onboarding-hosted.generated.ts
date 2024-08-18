// THIS IS A GENERATED FILE, DO NOT EDIT!
// organize-imports-ignore
import * as Types from '../../types/graphql/schema.generated';

import { UserOnboardingLandingHostedFragment } from '../../features/self-onboarding/landing.generated';
import {
  UserInProgressOnboardingHostedFragment,
  UserInProgressOnboarding_WorkerFragment,
} from '../../features/self-onboarding/in-progress-onboarding.generated';
import { UserOnboardingStepFlowModalFragment } from '../../features/self-onboarding/step-flow.generated';
import { DocumentNode } from 'graphql';
import { UserOnboardingLandingHostedFragmentDoc } from '../../features/self-onboarding/landing.generated';
import {
  UserInProgressOnboardingHostedFragmentDoc,
  UserInProgressOnboarding_WorkerFragmentDoc,
} from '../../features/self-onboarding/in-progress-onboarding.generated';
import { UserOnboardingStepFlowModalFragmentDoc } from '../../features/self-onboarding/step-flow.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const namedOperations = {
  Query: {
    UserSelfOnboardingHosted: 'UserSelfOnboardingHosted',
  },
};
export type UserSelfOnboardingHostedQueryVariables = Types.Exact<{
  onboardingId: Types.Scalars['ID'];
}>;

export type UserSelfOnboardingHostedQuery = {
  __typename?: 'Query';
  hostedUserOnboarding?:
    | ({
        __typename?: 'HostedUserOnboarding';
        id: string;
        user?: { __typename?: 'User'; id: string } | null;
      } & UserOnboardingLandingHostedFragment)
    | null;
};

export const UserSelfOnboardingHostedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UserSelfOnboardingHosted' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'onboardingId' },
          },
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
            name: { kind: 'Name', value: 'hostedUserOnboarding' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'onboardingId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'UserOnboardingLandingHosted' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
      },
    },
    ...UserOnboardingLandingHostedFragmentDoc.definitions,
    ...UserInProgressOnboardingHostedFragmentDoc.definitions,
    ...UserInProgressOnboarding_WorkerFragmentDoc.definitions,
    ...UserOnboardingStepFlowModalFragmentDoc.definitions,
  ],
} as unknown as DocumentNode;

/**
 * __useUserSelfOnboardingHostedQuery__
 *
 * To run a query within a React component, call `useUserSelfOnboardingHostedQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSelfOnboardingHostedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSelfOnboardingHostedQuery({
 *   variables: {
 *      onboardingId: // value for 'onboardingId'
 *   },
 * });
 */
export function useUserSelfOnboardingHostedQuery(
  baseOptions: Apollo.QueryHookOptions<
    UserSelfOnboardingHostedQuery,
    UserSelfOnboardingHostedQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    UserSelfOnboardingHostedQuery,
    UserSelfOnboardingHostedQueryVariables
  >(UserSelfOnboardingHostedDocument, options);
}
export function useUserSelfOnboardingHostedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserSelfOnboardingHostedQuery,
    UserSelfOnboardingHostedQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    UserSelfOnboardingHostedQuery,
    UserSelfOnboardingHostedQueryVariables
  >(UserSelfOnboardingHostedDocument, options);
}
export type UserSelfOnboardingHostedQueryHookResult = ReturnType<
  typeof useUserSelfOnboardingHostedQuery
>;
export type UserSelfOnboardingHostedLazyQueryHookResult = ReturnType<
  typeof useUserSelfOnboardingHostedLazyQuery
>;
export type UserSelfOnboardingHostedQueryResult = Apollo.QueryResult<
  UserSelfOnboardingHostedQuery,
  UserSelfOnboardingHostedQueryVariables
>;
