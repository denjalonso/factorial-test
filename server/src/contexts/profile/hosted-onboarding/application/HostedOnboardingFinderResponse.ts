export interface HostedOnboardingFinderResponse {
	id: string;
	status: string;
	user?: {
		id: string;
		name: string;
	};
}
