import { Uuid } from '../../../shared/domain/value-object/UUIDs';
import { UserId } from '../../shared/domain/user/UserId';
import { UserName } from './UserName';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UserEmail } from './UserEmail';
import { UserGender } from './UserGender';
import { UserPronoums } from './UserPronoums';
import { UserPhone } from './UserPhone';

export class User extends AggregateRoot {
	readonly id: UserId;
	readonly name: UserName;
	readonly email?: UserEmail;
	readonly gender?: UserGender;
	readonly pronouns?: UserPronoums;
	readonly phone?: UserPhone;

	constructor(
		id: Uuid,
		name: UserName,
		email?: UserEmail,
		gender?: UserGender,
		pronouns?: UserPronoums,
		phone?: UserPhone
	) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.gender = gender;
		this.pronouns = pronouns;
		this.phone = phone;
	}

	static fromPrimitives(plainData: { id: string; name: string }): User {
		return new User(new UserId(plainData.id), new UserName(plainData.name));
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			name: this.name.value
		};
	}
}
