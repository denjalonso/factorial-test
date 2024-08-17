import { OnboardingStatus } from '../domain/OnboardingStatus';

export interface HostedOnboardingCreatorRequest {
	id: string;
	user: {
		id: string;
		name: string;
	};
	status: OnboardingStatus;
}
