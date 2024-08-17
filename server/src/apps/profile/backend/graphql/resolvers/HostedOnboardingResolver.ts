import {Arg, FieldResolver, ID, Mutation, Query, Resolver, Root} from 'type-graphql';
import { HostedOnboardingStatus, HostedUserOnboarding } from '../schema/HostedUserOnboarding';
import { CreateHostedUserOnboardingInput } from '../schema/CreateHostedUserOnboardingInput';
import { HostedOnboardingCreator } from '../../../../../contexts/profile/hosted-onboarding/application/HostedOnboardingCreator';
import { OnboardingStatus } from '../../../../../contexts/profile/hosted-onboarding/domain/OnboardingStatus';
import {UserFinder} from "../../../../../contexts/profile/user/application/UserFinder";
import {User} from "../../../../../contexts/profile/user/domain/User";


@Resolver(of => HostedUserOnboarding)
export class HostedOnboardingResolver {
	constructor(
		private readonly hostedOnboardingCreator: HostedOnboardingCreator,
		private readonly userFinder: UserFinder
	) {}

	@Query(_returns => HostedUserOnboarding, { nullable: true })
	async hostedUserOnboarding(@Arg('id', () => ID) id: string): Promise<HostedUserOnboarding> {
		return new HostedUserOnboarding(id, HostedOnboardingStatus.STARTED);
	}

	// @FieldResolver()
	// async user(@Root() hostedOnboardingInput: CreateHostedUserOnboardingInput): Promise<User> {
	// 	const user = await this.userFinder.run({id: hostedOnboardingInput.userId});
	//
	// 	return User.fromPrimitives({id: user.id, name: user.name});
	// }

	@Mutation(_returns => HostedUserOnboarding)
	async createHostedUserOnboarding(
		@Arg('input') hostedOnboardingInput: CreateHostedUserOnboardingInput
	): Promise<HostedUserOnboarding> {
		const user = await this.userFinder.run({id: hostedOnboardingInput.userId});

		await this.hostedOnboardingCreator.run({
			id: hostedOnboardingInput.id,
			status: OnboardingStatus.INVITED,
			user: User.fromPrimitives({id: user.id, name: user.name})
		});

		return new HostedUserOnboarding(hostedOnboardingInput.id, HostedOnboardingStatus.STARTED);
	}
}
