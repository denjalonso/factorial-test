import { Uuid } from '../../../shared/domain/value-object/UUIDs';
import { UserId } from '../../shared/domain/user/UserId';
import { UserName } from './UserName';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UserEmail } from './UserEmail';
import { UserGender } from './UserGender';
import { UserPronoums } from './UserPronoums';
import { UserPhone } from './UserPhone';
import { HostedOnboarding } from '../../hosted-onboarding/domain/HostedOnboarding';
import { OnboardingStatus } from '../../hosted-onboarding/domain/OnboardingStatus';

export class User extends AggregateRoot {
	readonly id: UserId;
	readonly name: UserName;
	readonly email?: UserEmail;
	readonly gender?: UserGender;
	readonly pronouns?: UserPronoums;
	readonly phone?: UserPhone;
	readonly hostedOnboarding?: HostedOnboarding | null;

	constructor(
		id: Uuid,
		name: UserName,
		email?: UserEmail,
		gender?: UserGender,
		pronouns?: UserPronoums,
		phone?: UserPhone,
		hostedOnboarding?: HostedOnboarding | null
	) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.gender = gender;
		this.pronouns = pronouns;
		this.phone = phone;
		this.hostedOnboarding = hostedOnboarding;
	}

	static fromPrimitives(plainData: {
		id: string;
		name: string;
		email?: string;
		gender?: string;
		pronouns?: string;
		phone?: string;
		hostedOnboarding?: { id: string; status: OnboardingStatus };
	}): User {
		return new User(
			new UserId(plainData.id),
			new UserName(plainData.name),
			plainData?.email ? new UserEmail(plainData?.email) : undefined,
			plainData?.gender ? new UserGender(plainData?.gender) : undefined,
			plainData?.pronouns ? new UserPronoums(plainData?.pronouns) : undefined,
			plainData?.phone ? new UserPhone(plainData?.phone) : undefined,
			plainData?.hostedOnboarding ? HostedOnboarding.fromPrimitives(plainData?.hostedOnboarding) : null
		);
	}

	toPrimitives(): any {
		const hostedOnboarding = this.hostedOnboarding?.toPrimitives();
		return {
			id: this.id.value,
			name: this.name.value,
			hostedOnboarding
		};
	}
}
