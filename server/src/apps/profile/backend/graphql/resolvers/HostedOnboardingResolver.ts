import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { HostedOnboarding, HostedOnboardingStatus } from '../schema/HostedOnboarding';
import {CreateHostedWorkerOnboardingInput} from "../schema/CreateHostedUserOnboardingInput";

@Resolver(of => HostedOnboarding)
export class HostedOnboardingResolver {
	constructor() {}

	@Query(_returns => HostedOnboarding, { nullable: true })
	async hostedUserOnboarding(@Arg('id') id: string): Promise<HostedOnboarding> {
		return new HostedOnboarding(id, HostedOnboardingStatus.STARTED);
	}

	@Mutation(_returns => HostedOnboarding)
	async createHostedUserOnboarding(@Arg('input') recipeInput: CreateHostedWorkerOnboardingInput): Promise<HostedOnboarding> {
		return new HostedOnboarding(recipeInput.id, HostedOnboardingStatus.STARTED);
	}
}
