import {
  ApolloCache,
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  HttpOptions,
  Operation,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { getOperationDefinition } from '@apollo/client/utilities';

interface CreateApolloClientBaseOptions<TCacheShape> {
  cache: ApolloCache<TCacheShape>;
}
interface CreateApolloClientTerminatingOptions<TCacheShape>
  extends CreateApolloClientBaseOptions<TCacheShape> {
  terminatingLink: ApolloLink;
}

interface CreateApolloClientHttpOptions<TCacheShape>
  extends CreateApolloClientBaseOptions<TCacheShape> {
  uri: HttpOptions['uri'];
  headers?: Record<string, string>;
}

type CreateApolloClientOptions<TCacheShape> =
  | CreateApolloClientHttpOptions<TCacheShape>
  | CreateApolloClientTerminatingOptions<TCacheShape>;

export const createApolloClient = <TCacheShape>(
  options: CreateApolloClientOptions<TCacheShape>,
  priorityLinks: ApolloLink[] = [],
) => {
  const { cache } = options;
  let terminatingLink: ApolloLink;

  if ((options as any).terminatingLink) {
    terminatingLink = (
      options as CreateApolloClientTerminatingOptions<TCacheShape>
    ).terminatingLink;
  } else {
    const { uri, headers } =
      options as CreateApolloClientHttpOptions<TCacheShape>;
    terminatingLink = new HttpLink({ uri, headers });
  }

  const connectToDevTools = process.env.NODE_ENV === 'development';

  const errorLink = createErrorLink();
  const retryLink = createRetryLink();
  const link = from([...priorityLinks, retryLink, errorLink, terminatingLink]);

  return new ApolloClient({
    link,
    cache,
    connectToDevTools,
  });
};

const createErrorLink = () =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach((graphqlError) => {
        const { message, locations, path } = graphqlError;
        console.debug(
          `[GraphQL error]: Message: '${message}', Location: '${locations}', Path: '${path}'`,
        );
      });

    if (networkError) {
      console.debug(`[Network error]: '${networkError}'`);
    }
  });

const createRetryLink = () =>
  new RetryLink({
    delay: {
      initial: 300, // 300 milliseconds
      max: 30000, // 30 seconds
      jitter: true,
    },
    attempts: {
      max: 3,
      retryIf: (error, operation) => {
        const retry =
          !!error && !isMutation(operation) && !hasNoRetryOverride(operation);
        if (retry) {
          console.debug(
            `[Apollo Client] Retrying failed request for operation '${operation.operationName}'`,
          );
        }
        return retry;
      },
    },
  });

const isMutation = (operation: Operation) =>
  getOperationDefinition(operation.query)?.operation === 'mutation';

const hasNoRetryOverride = (operation: Operation) =>
  operation.getContext()?.noRetry === true;
