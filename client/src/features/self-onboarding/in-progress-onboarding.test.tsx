import userEvent from '@testing-library/user-event';

import {
  render,
  screen,
  waitFor,
  waitForLoadingToFinish,
} from '../../test/test-utils';
import { HostedOnboardingStatus } from '../../types';
import { InProgressOnboardingHosted } from './in-progress-onboarding';

describe('InProgressOnboarding', () => {
  const name = 'John';
  const setup = async ({ status = HostedOnboardingStatus.INVITED } = {}) => {
    const onboarding = {
      id: 'onboard-id',
      status,
      user: {
        id: 'user-id',
        name,
      },
    };
    render(<InProgressOnboardingHosted onboarding={onboarding} />);
  };

  test.each([
    {
      status: HostedOnboardingStatus.STARTED,
      button: 'Save',
    },
  ])(
    'should show the welcome messages and "$button" button for "$status" status',
    async ({ status, button }) => {
      await setup({ status });
      await waitForLoadingToFinish();
      expect(
        screen.getByText(new RegExp(`${button}`, 'i')),
      ).toBeInTheDocument();
    },
  );

  test('should open the step flow modal when the button is clicked', async () => {
    await setup();
    await waitForLoadingToFinish();
    await userEvent.click(screen.getByRole('button'));
    const modal = screen.getByRole('dialog');
    await waitFor(() => expect(modal).toBeVisible());
  });

  test('should set the onboarding to started status when starting and status is invited', async () => {
    await setup({ status: HostedOnboardingStatus.INVITED });
    await waitForLoadingToFinish();
    await userEvent.click(screen.getByRole('button'));
  });
});
