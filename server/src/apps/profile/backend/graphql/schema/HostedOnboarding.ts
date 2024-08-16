import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import {User} from "./User";

@ObjectType()
export class HostedOnboarding {
	@Field(type => ID)
	readonly id!: string;

	@Field(type => HostedOnboardingStatus)
	status: HostedOnboardingStatus;

	@Field(type => User, { nullable: true })
	user?: User;

	constructor(id: string, status: HostedOnboardingStatus) {
		this.id = id;
		this.status = status;
	}
}

export enum HostedOnboardingStatus {
	COMPLETED,
	INVITED,
	STARTED
}

registerEnumType(HostedOnboardingStatus, {
	name: 'HostedOnboardingStatus'
});
