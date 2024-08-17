import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../schema/User';
import { CreateUserInput } from '../schema/UserInput';
import { UserFinder } from '../../../../../contexts/profile/user/application/UserFinder';
import { UserCreator } from '../../../../../contexts/profile/user/application/UserCreator';
import { UsersFinder } from '../../../../../contexts/profile/user/application/UsersFinder';

@Resolver(of => User)
export class UserResolver {
	constructor(
		private readonly userCreator: UserCreator,
		private readonly userFinder: UserFinder,
		private readonly usersFinder: UsersFinder
	) {}

	@Query(_returns => User, { nullable: true })
	async user(@Arg('id') id: string): Promise<User> {
		const user = await this.userFinder.run({ id });

		return new User(user.id, user.name);
	}

	@Query(_returns => [User], { nullable: true })
	async users(): Promise<User[]> {
		return await this.usersFinder.run();
	}

	@Mutation(_returns => User)
	async createUser(@Arg('input') userInput: CreateUserInput): Promise<User> {
		await this.userCreator.run({ id: userInput.id, name: userInput.name });

		return new User(userInput.id, userInput.name);
	}
}
