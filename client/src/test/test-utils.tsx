import React, { ReactElement } from 'react';
// See https://testing-library.com/docs/react-testing-library/setup/#custom-render
import { ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedResponse } from '@apollo/client/testing';
import {
  GraphQLMockOptions,
  makeMockedExecutableSchema,
  schemaTypeDefs,
} from './graphql-mock/mocked-graphql-schema';

import { createApolloClient } from '../utils/apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { abstractTypes } from '../types';

type MockedProviderOptions = { apolloMocks?: MockedResponse[] };

const AllTheProviders = ({
  mocks = {},
  resolvers = undefined,
  typeDefs = schemaTypeDefs,
  resolveFromTypename = [],
  children,
}: React.PropsWithChildren<MockedProviderOptions & GraphQLMockOptions>) => {
  const mockedSchema = makeMockedExecutableSchema({
    typeDefs,
    mocks,
    resolvers,
    resolveFromTypename,
  });

  const client = createApolloClient({
    terminatingLink: new SchemaLink({ schema: mockedSchema }),
    cache: new InMemoryCache({
      possibleTypes: abstractTypes.possibleTypes,
    }),
  });

  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ChakraProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { userEvent };
export { customRender as render };
