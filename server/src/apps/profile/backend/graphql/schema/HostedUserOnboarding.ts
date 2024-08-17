import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class HostedUserOnboarding {
	@Field(type => ID)
	readonly id!: string;

	@Field(type => HostedOnboardingStatus)
	status: HostedOnboardingStatus;

	@Field(type => User, { nullable: true })
	user?: User;

	constructor(id: string, status: HostedOnboardingStatus, user?: User) {
		this.id = id;
		this.status = status;
		this.user = user;
	}
}

export enum HostedOnboardingStatus {
	COMPLETED = 'COMPLETED',
	INVITED = 'INVITED',
	STARTED = 'STARTED'
}

registerEnumType(HostedOnboardingStatus, {
	name: 'HostedOnboardingStatus'
});
