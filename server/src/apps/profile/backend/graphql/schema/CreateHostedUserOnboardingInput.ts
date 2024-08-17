import { Field, ID, InputType } from 'type-graphql';
import {HostedOnboardingStatus, HostedUserOnboarding} from './HostedUserOnboarding';

@InputType()
export class CreateHostedUserOnboardingInput implements Partial<HostedUserOnboarding> {
	@Field(type => ID)
	id!: string;

	@Field(type => HostedOnboardingStatus)
	status!: HostedOnboardingStatus;

	@Field(type => ID)
	userId!: string;
}
