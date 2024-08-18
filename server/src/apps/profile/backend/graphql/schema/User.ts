import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
	@Field(type => ID)
	readonly id!: string;

	@Field()
	name!: string;

	@Field({ nullable: true })
	email?: string;

	@Field({ nullable: true })
	gender?: string;

	@Field({ nullable: true })
	pronouns?: string;

	@Field({ nullable: true })
	phone?: string;

	constructor(params: {
		id: string;
		name: string;
		email?: string;
		gender?: string;
		pronouns?: string;
		phone?: string;
	}) {
		this.id = params.id;
		this.name = params.name;
		this.email = params.email;
		this.gender = params.gender;
		this.pronouns = params.pronouns;
		this.phone = params.phone;
	}
}
