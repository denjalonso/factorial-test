import { Field, ID, ObjectType } from 'type-graphql';
import { HostedUserOnboarding } from './HostedUserOnboarding';

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

	@Field(type => HostedUserOnboarding, { nullable: true })
	hostedOnboarding?: HostedUserOnboarding;

	constructor(params: {
		id: string;
		name: string;
		email?: string;
		gender?: string;
		pronouns?: string;
		phone?: string;
		hostedOnboarding?: HostedUserOnboarding;
	}) {
		this.id = params.id;
		this.name = params.name;
		this.email = params.email;
		this.gender = params.gender;
		this.pronouns = params.pronouns;
		this.phone = params.phone;
		this.hostedOnboarding = params.hostedOnboarding;
	}
}
