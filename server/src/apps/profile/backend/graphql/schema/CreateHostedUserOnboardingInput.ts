import { Field, ID, InputType } from 'type-graphql';
import { HostedOnboarding } from './HostedOnboarding';

@InputType()
export class CreateHostedWorkerOnboardingInput implements Partial<HostedOnboarding> {
	@Field(type => ID)
	id!: string;
}
