import { Arg, FieldResolver, ID, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';
import { HostedOnboardingStatus, HostedUserOnboarding } from '../schema/HostedUserOnboarding';
import { CreateHostedUserOnboardingInput } from '../schema/CreateHostedUserOnboardingInput';
import { HostedOnboardingCreator } from '../../../../../contexts/profile/hosted-onboarding/application/HostedOnboardingCreator';
import { HostedOnboardingUpdater } from '../../../../../contexts/profile/hosted-onboarding/application/HostedOnboardingUpdater';
import { OnboardingStatus } from '../../../../../contexts/profile/hosted-onboarding/domain/OnboardingStatus';
import { UserFinder } from '../../../../../contexts/profile/user/application/UserFinder';
import { HostedOnboardingFinder } from '../../../../../contexts/profile/hosted-onboarding/application/HostedOnboardingFinder';
import { User } from '../schema/User';
import { UpdateHostedUserOnboardingInput } from '../schema/UpdateHostedUserOnboardingInput';

@Resolver(of => HostedUserOnboarding)
export class HostedOnboardingResolver implements ResolverInterface<HostedUserOnboarding> {
	constructor(
		private readonly hostedOnboardingCreator: HostedOnboardingCreator,
		private readonly userFinder: UserFinder,
		private readonly hostedOnboardingFinder: HostedOnboardingFinder,
		private readonly hostedOnboardingUpdater: HostedOnboardingUpdater
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

		const hostedOnboarding = await this.hostedOnboardingFinder.run({ id: hostedOnboardingInput.id });
		const status: HostedOnboardingStatus =
			HostedOnboardingStatus[hostedOnboarding.status as keyof typeof HostedOnboardingStatus];

		return new HostedUserOnboarding(hostedOnboardingInput.id, status, hostedOnboarding.user);
	}

	@Mutation(_returns => HostedUserOnboarding)
	async updateHostedUserOnboardingStatus(
		@Arg('input') hostedOnboardingInput: UpdateHostedUserOnboardingInput
	): Promise<HostedUserOnboarding> {
		const hostedOnboarding = await this.hostedOnboardingFinder.run({ id: hostedOnboardingInput.id });

		if (!hostedOnboarding.user) {
			throw new Error('User onboarding not found');
		}

		const user = await this.userFinder.run({ id: hostedOnboarding.user.id });

		await this.hostedOnboardingUpdater.run({
			id: hostedOnboardingInput.id,
			status: OnboardingStatus[hostedOnboardingInput.status],
			user: { id: user.id, name: user.name }
		});
		const status: HostedOnboardingStatus =
			HostedOnboardingStatus[hostedOnboardingInput.status as keyof typeof HostedOnboardingStatus];

		return new HostedUserOnboarding(hostedOnboarding.id, status, hostedOnboarding.user);
	}
}
