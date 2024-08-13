import { Field, ID, InputType } from 'type-graphql';
import { User } from './User';

@InputType()
export class CreateUserInput implements Partial<User> {
	@Field(type => ID)
	id!: string;

	@Field()
	name!: string;
}
