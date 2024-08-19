import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';
import { User } from '../schema/User';
import { CreateUserInput } from '../schema/UserInput';
import { UserFinder } from '../../../../../contexts/profile/user/application/UserFinder';
import { UserCreator } from '../../../../../contexts/profile/user/application/UserCreator';
import { UsersFinder } from '../../../../../contexts/profile/user/application/UsersFinder';
import { UpdateUserInput } from '../schema/UpdateUserInput';
import { UserUpdater } from '../../../../../contexts/profile/user/application/UserUpdater';
import { HostedOnboardingStatus, HostedUserOnboarding } from '../schema/HostedUserOnboarding';
import { HostedOnboardingFinder } from '../../../../../contexts/profile/hosted-onboarding/application/HostedOnboardingFinder';
// import {OnboardingStatus} from "../../../../../contexts/profile/hosted-onboarding/domain/OnboardingStatus";

@Resolver(of => User)
export class UserResolver implements ResolverInterface<User> {
	constructor(
		private readonly userCreator: UserCreator,
		private readonly userFinder: UserFinder,
		private readonly usersFinder: UsersFinder,
		private readonly userUpdater: UserUpdater,
		private readonly hostedOnboardingFinder: HostedOnboardingFinder
	) {}

	@Query(_returns => User, { nullable: true })
	async user(@Arg('id') id: string): Promise<User> {
		const user = await this.userFinder.run({ id });

		return new User({ id: user.id, name: user.name });
	}

	@Query(_returns => [User], { nullable: true })
	async users(): Promise<User[]> {
		const users = await this.usersFinder.run();
		return users.map(user => new User({
			id: user.id,
			name: user.name,
			email: user.email,
			gender: user.gender,
			pronouns: user.pronouns,
			phone: user.phone,
			...(user.hostedOnboarding ? {
				hostedOnboarding: new HostedUserOnboarding(
					user.hostedOnboarding.id,
					HostedOnboardingStatus[user.hostedOnboarding.status as keyof typeof HostedOnboardingStatus],
				)
			} : {})
		}));
	}

	@FieldResolver()
	async hostedOnboarding(@Root() user: User): Promise<HostedUserOnboarding> {
		if (!user.hostedOnboarding?.id) {
			throw new Error('Hosted onboarding not found');
		}

		const hostedOnboarding = await this.hostedOnboardingFinder.run({ id: user.hostedOnboarding?.id });

		if (!hostedOnboarding) {
			throw new Error('Hosted onboarding not found');
		}

		const status: HostedOnboardingStatus =
			HostedOnboardingStatus[hostedOnboarding.status as keyof typeof HostedOnboardingStatus];

		return new HostedUserOnboarding(hostedOnboarding.id, status, user);
	}

	@Mutation(_returns => User)
	async createUser(@Arg('input') userInput: CreateUserInput): Promise<User> {
		await this.userCreator.run({ id: userInput.id, name: userInput.name });

		return new User({ id: userInput.id, name: userInput.name });
	}
	@Mutation(_returns => User)
	async updateUser(@Arg('input') userInput: UpdateUserInput): Promise<User> {
		const user = await this.userFinder.run({ id: userInput.id });

		if (!user) {
			throw new Error('User not found');
		}


		await this.userUpdater.run({ ...userInput });
		// await this.userUpdater.run({
		// 	...userInput,
		// 	...(user.hostedOnboarding ? {
		// 		hostedOnboarding: {
		// 			id: user.hostedOnboarding.id,
		// 			status: OnboardingStatus[user.hostedOnboarding.status as keyof typeof OnboardingStatus]
		// 		}
		// 	} : {})
		// });

		return new User({
			id: user.id,
			name: userInput.name,
			email: userInput.email,
			gender: userInput.gender,
			pronouns: userInput.pronouns,
			phone: userInput.phone,
			// ...(user.hostedOnboarding ? {
			// 	hostedOnboarding: new HostedUserOnboarding(
			// 		user.hostedOnboarding.id,
			// 		HostedOnboardingStatus[user.hostedOnboarding.status as keyof typeof HostedOnboardingStatus],
			// 	)
			// } : {})
		});
	}
}
