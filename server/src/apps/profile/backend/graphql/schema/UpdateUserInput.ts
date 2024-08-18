import { Field, ID, InputType } from 'type-graphql';
import { User } from './User';

@InputType()
export class UpdateUserInput implements Partial<User> {
	@Field(type => ID)
	id!: string;

	@Field({ nullable: true })
	name!: string;

	@Field({ nullable: true })
	email?: string;

	@Field({ nullable: true })
	gender?: string;

	@Field({ nullable: true })
	pronouns?: string;

	@Field({ nullable: true })
	phone?: string;
}
