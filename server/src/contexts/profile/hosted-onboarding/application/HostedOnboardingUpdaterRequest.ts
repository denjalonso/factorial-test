import { OnboardingStatus } from '../domain/OnboardingStatus';

export interface HostedOnboardingUpdaterRequest {
	id: string;
	user: {
		id: string;
		name: string;
	};
	status: OnboardingStatus;
}
