import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../schema/User';
import { CreateUserInput } from '../schema/UserInput';
import { UserFinder } from '../../../../../contexts/profile/user/application/UserFinder';
import { UserCreator } from '../../../../../contexts/profile/user/application/UserCreator';

@Resolver(of => User)
export class UserResolver {
	constructor(private readonly userCreator: UserCreator, private readonly userFinder: UserFinder) {}

	@Query(_returns => User, { nullable: true })
	async user(@Arg('id') id: string): Promise<User> {
		const user = await this.userFinder.run({ id });

		return new User(user.id, user.name);
	}

	@Mutation(_returns => User)
	async createUser(@Arg('input') recipeInput: CreateUserInput): Promise<User> {
		await this.userCreator.run({ id: recipeInput.id, name: recipeInput.name });

		return new User(recipeInput.id, recipeInput.name);
	}
}
