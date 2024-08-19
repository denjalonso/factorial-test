// import {OnboardingStatus} from "../../hosted-onboarding/domain/OnboardingStatus";

export interface UserUpdaterRequest {
	id: string;
	name: string;
	email?: string;
	gender?: string;
	pronouns?: string;
	phone?: string;
	// hostedOnboarding?: {
	// 	id: string;
	// 	status: OnboardingStatus;
	// };
}
