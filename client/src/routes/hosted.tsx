import React from 'react';
import { NotFound } from '../components/error';

const UserSelfOnboardingHosted = React.lazy(
  () => import('../pages/user-onboarding-hosted'),
);

const EXPERIENCE_NAMES = ['user-onboarding'] as const;

type HostedExperiencePath = (typeof EXPERIENCE_NAMES)[number];

const SUPPORTED_PARAMETERS = [
  'id',
] as const;

type ParameterProperty = typeof SUPPORTED_PARAMETERS[number];


const hostedRoutes: Record<
  HostedExperiencePath,
  (params: Record<string, any>) => JSX.Element
> = {
  'user-onboarding': (params: Record<string, any>) => {
    const requiredParams: Array<ParameterProperty> = ['id'];
    const properties = ([] as Array<ParameterProperty>).concat(requiredParams);
    const missingProperty = properties.find(
        (key) => !Object.prototype.hasOwnProperty.call(params, key),
    );

    if (missingProperty) {
      throw new Error(`Missing required parameter: ${missingProperty}`);
    }

    return <UserSelfOnboardingHosted onboardingId={params.id}/>
  },
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
