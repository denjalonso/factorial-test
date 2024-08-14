import { EnvironmentName } from '../constants/environments';
import { getEnvUrl } from './profile-backend-service';

describe('getEnvUrl', () => {
  test.each([
    {
      profileBackendEnv: 'local',
      expected: 'http://localhost:8080/graphql',
    },
  ] as { profileBackendEnv: EnvironmentName; expected: string }[])(
    'should return default url for "$profileBackendEnv" profile backend env',
    ({ profileBackendEnv, expected }) => {
      expect(getEnvUrl({ profileBackendEnv })).toBe(expected);
    },
  );
});
