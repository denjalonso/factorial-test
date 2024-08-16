import { Field, ID, InputType } from 'type-graphql';
import { HostedUserOnboarding } from './HostedUserOnboarding';

@InputType()
export class CreateHostedWorkerOnboardingInput implements Partial<HostedUserOnboarding> {
	@Field(type => ID)
	id!: string;
}
