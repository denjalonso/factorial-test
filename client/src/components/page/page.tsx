import { ApolloError, QueryResult } from '@apollo/client';
import { UnknownError } from '../../components/error';
import { Loading } from '../../components/loading';
import React from 'react';

type PageProps = React.PropsWithChildren<{
  loading?: boolean;
  error?: boolean | ApolloError | React.ReactElement;
}>;

function Page({ error, loading, children }: PageProps) {
  if (typeof error === 'object' && React.isValidElement(error)) {
    return error;
  }
  if (error) {
    console.error('An error occurred while loading.', error);
    return <UnknownError />;
  }

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
}

const GraphQLQueryPage = <
  QueryHookResult extends QueryResult<any, any>,
  Data extends object,
>({
  queryResult,
  requiredData,
  children,
  ...pageProps
}: {
  queryResult: QueryHookResult;
  requiredData: Data | null | undefined;
} & PageProps) => {
  const dataLoadingError =
    !queryResult.loading &&
    queryResult.called &&
    (!queryResult.data || !requiredData) ? (
      <UnknownError text="An error occurred while loading your data, please try again." />
    ) : undefined;
  return (
    <Page
      loading={queryResult.loading}
      error={queryResult.error ?? dataLoadingError}
      {...pageProps}>
      {children}
    </Page>
  );
};

export default Page;
export { GraphQLQueryPage };
