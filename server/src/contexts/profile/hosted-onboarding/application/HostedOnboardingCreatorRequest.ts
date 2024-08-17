import { OnboardingStatus } from '../domain/OnboardingStatus';
import {User} from "../../user/domain/User";

export interface HostedOnboardingCreatorRequest {
	id: string;
	user: User;
	status: OnboardingStatus;
}
