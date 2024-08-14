import { ApolloClient, InMemoryCache } from '@apollo/client';
import {
  EnvironmentName,
  FALLBACK_CONFIG,
  HOST_TO_APPENV,
} from '../constants/environments';

const BASE_URLS: Record<EnvironmentName, string> = {
  local: 'http://localhost:8080',
};

const GRAPHQL_ENDPOINT = '/graphql';

export const GRAPHQL_ENV_ENDPOINTS: Record<EnvironmentName, string> = {
  local: `${BASE_URLS.local}${GRAPHQL_ENDPOINT}`,
};

const getEnvUrl = (options: { profileBackendEnv: EnvironmentName }) => {
  return GRAPHQL_ENV_ENDPOINTS[options.profileBackendEnv];
};

const getEnvironmentName = (
  host: string = window.location.host,
): EnvironmentName => HOST_TO_APPENV[host]?.env ?? FALLBACK_CONFIG.env;

export const getApolloClient = () => {
  const hostEnvName = getEnvironmentName();

  const profileBackendUrl = getEnvUrl({
    profileBackendEnv: hostEnvName,
  });

  return new ApolloClient({
    uri: profileBackendUrl,
    cache: new InMemoryCache(),
  });
};

export { getEnvUrl };
