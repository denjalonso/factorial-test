import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
	@Field(type => ID)
	readonly id!: string;

	@Field()
	name!: string;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
}
