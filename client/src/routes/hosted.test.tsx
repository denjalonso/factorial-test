import { render, screen } from '../test/test-utils';
import resolveRoute, { EXPERIENCE_NAMES } from './hosted';

describe('resolveRoute', () => {
  let consoleErrorSpy: jest.SpyInstance<void, any[]>;
  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  test('invalidPath: renders NotFound component with showHomeNav prop set to false for invalid path part', () => {
    const params = {};

    const result = resolveRoute('invalidPath', params);
    render(result);

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
  test('renderingUserOnboarding: renders user onboarding', async () => {
    const params = {
      id: 'fake_id',
    };
    const validUserOnboardingUrlPath = EXPERIENCE_NAMES[0];

    const result = resolveRoute(validUserOnboardingUrlPath, params);
    render(result);

    expect(
      await screen.findByText(/payroll setup/i),
    ).toBeInTheDocument();
  });
});
