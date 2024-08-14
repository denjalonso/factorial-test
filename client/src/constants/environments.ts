type EnvironmentName = 'local';

type ApplicationName = 'admin' | 'components';

type ApplicationEnv = {
  app: ApplicationName;
  env: EnvironmentName;
};

const appEnv = (app: ApplicationName, env: EnvironmentName) => ({
  app,
  env,
});

const COMPONENTS_HOSTS: Record<string, ApplicationEnv> = {
  'components.local.dev:3000': appEnv('components', 'local'),
};

const ADMIN_HOSTS: Record<string, ApplicationEnv> = {
  'localhost:3000': appEnv('admin', 'local'),
};

const HOST_TO_APPENV: Record<string, ApplicationEnv> = {
  ...ADMIN_HOSTS,
  ...COMPONENTS_HOSTS,
};

const FALLBACK_CONFIG: ApplicationEnv = {
  app: 'components',
  env: 'local',
};

export { FALLBACK_CONFIG, HOST_TO_APPENV };
export type { ApplicationName, EnvironmentName };
