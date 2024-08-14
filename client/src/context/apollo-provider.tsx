import { ApolloProvider } from '@apollo/client';
import { useMemo } from 'react';
import { getApolloClient } from 'services/profile-backend-service';

const ProfileApolloProvider = ({ children }: React.PropsWithChildren) => {
  const apolloClient = useMemo(() => getApolloClient(), []);
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export { ProfileApolloProvider };
