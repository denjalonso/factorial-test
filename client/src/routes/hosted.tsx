import { NotFound } from '../components/error';

const EXPERIENCE_NAMES = ['user-onboarding'] as const;

type HostedExperiencePath = (typeof EXPERIENCE_NAMES)[number];

const hostedRoutes: Record<
  HostedExperiencePath,
  (params: Record<string, any>) => JSX.Element
> = {
  'user-onboarding': () => <>User onboarding hosted</>,
};

function resolveRoute(pathPart: string, params: Record<string, any>) {
  const nameToResolve = pathPart as HostedExperiencePath;
  const route = EXPERIENCE_NAMES.includes(nameToResolve)
    ? hostedRoutes[nameToResolve]
    : undefined;
  let result = <NotFound />;
  if (route) {
    try {
      result = route(params);
    } catch (err) {
      console.error('Error rendering hosted experience', err);
    }
  } else {
    const msg = `Invalid hosted experience name, '${pathPart}'`;
    console.error(msg);
    result = <NotFound showHomeNav={false} />;
  }
  return result;
}

export default resolveRoute;
export { EXPERIENCE_NAMES, hostedRoutes };
export type { HostedExperiencePath };
