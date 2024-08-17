import { Arg, FieldResolver, ID, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';
import { HostedOnboardingStatus, HostedUserOnboarding } from '../schema/HostedUserOnboarding';
import { CreateHostedUserOnboardingInput } from '../schema/CreateHostedUserOnboardingInput';
import { HostedOnboardingCreator } from '../../../../../contexts/profile/hosted-onboarding/application/HostedOnboardingCreator';
import { OnboardingStatus } from '../../../../../contexts/profile/hosted-onboarding/domain/OnboardingStatus';
import { UserFinder } from '../../../../../contexts/profile/user/application/UserFinder';
import { HostedOnboardingFinder } from '../../../../../contexts/profile/hosted-onboarding/application/HostedOnboardingFinder';
import { User } from '../schema/User';

@Resolver(of => HostedUserOnboarding)
export class HostedOnboardingResolver implements ResolverInterface<HostedUserOnboarding> {
	constructor(
		private readonly hostedOnboardingCreator: HostedOnboardingCreator,
		private readonly userFinder: UserFinder,
		private readonly hostedOnboardingFinder: HostedOnboardingFinder
	) {}

	@Query(_returns => HostedUserOnboarding, { nullable: true })
	async hostedUserOnboarding(@Arg('id', () => ID) id: string): Promise<HostedUserOnboarding> {
		const hostedOnboarding = await this.hostedOnboardingFinder.run({ id });

		const status: HostedOnboardingStatus =
			HostedOnboardingStatus[hostedOnboarding.status as keyof typeof HostedOnboardingStatus];
		return new HostedUserOnboarding(hostedOnboarding.id, status, hostedOnboarding.user);
	}

	@FieldResolver()
	async user(@Root() hostedOnboarding: HostedUserOnboarding): Promise<User> {
		if (!hostedOnboarding.user?.id) {
			throw new Error('User not found');
		}

		const user = await this.userFinder.run({ id: hostedOnboarding.user?.id });

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	}

	@Mutation(_returns => HostedUserOnboarding)
	async createHostedUserOnboarding(
		@Arg('input') hostedOnboardingInput: CreateHostedUserOnboardingInput
	): Promise<HostedUserOnboarding> {
		const user = await this.userFinder.run({ id: hostedOnboardingInput.userId });

		await this.hostedOnboardingCreator.run({
			id: hostedOnboardingInput.id,
			status: OnboardingStatus.INVITED,
			user: { id: user.id, name: user.name }
		});

		return new HostedUserOnboarding(hostedOnboardingInput.id, HostedOnboardingStatus.STARTED, user);
	}
}
