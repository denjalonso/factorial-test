import {Arg, ID, Mutation, Query, Resolver} from 'type-graphql';
import { HostedUserOnboarding, HostedOnboardingStatus } from '../schema/HostedUserOnboarding';
import {CreateHostedWorkerOnboardingInput} from "../schema/CreateHostedUserOnboardingInput";

@Resolver(of => HostedUserOnboarding)
export class HostedOnboardingResolver {
	constructor() {}

	@Query(_returns => HostedUserOnboarding, { nullable: true })
	async hostedUserOnboarding(@Arg('id', () => ID) id: string): Promise<HostedUserOnboarding> {
		return new HostedUserOnboarding(id, HostedOnboardingStatus.STARTED);
	}

	@Mutation(_returns => HostedUserOnboarding)
	async createHostedUserOnboarding(@Arg('input') recipeInput: CreateHostedWorkerOnboardingInput): Promise<HostedUserOnboarding> {
		return new HostedUserOnboarding(recipeInput.id, HostedOnboardingStatus.STARTED);
	}
}
