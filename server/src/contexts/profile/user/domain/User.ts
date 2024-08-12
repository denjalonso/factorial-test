import { Uuid } from '../../../shared/domain/value-object/UUIDs';
import { UserId } from '../../shared/domain/user/UserId';
import { UserName } from './UserName';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';

export class User extends AggregateRoot {
	readonly id: UserId;
	readonly name: UserName;

	constructor(id: Uuid, name: UserName) {
		super();
		this.id = id;
		this.name = name;
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
