import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../schema/User';
import { CreateUserInput } from '../schema/UserInput';
import { UserFinder } from '../../../../../contexts/profile/user/application/UserFinder';
import { UserCreator } from '../../../../../contexts/profile/user/application/UserCreator';
import { UsersFinder } from '../../../../../contexts/profile/user/application/UsersFinder';
import { UpdateUserInput } from '../schema/UpdateUserInput';
import { UserUpdater } from '../../../../../contexts/profile/user/application/UserUpdater';

@Resolver(of => User)
export class UserResolver {
	constructor(
		private readonly userCreator: UserCreator,
		private readonly userFinder: UserFinder,
		private readonly usersFinder: UsersFinder,
		private readonly userUpdater: UserUpdater
	) {}

	@Query(_returns => User, { nullable: true })
	async user(@Arg('id') id: string): Promise<User> {
		const user = await this.userFinder.run({ id });

		return new User({ id: user.id, name: user.name });
	}

	@Query(_returns => [User], { nullable: true })
	async users(): Promise<User[]> {
		return await this.usersFinder.run();
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

		return new User({
			id: user.id,
			name: userInput.name,
			email: userInput.email,
			gender: userInput.gender,
			pronouns: userInput.pronouns,
			phone: userInput.phone
		});
	}
}
