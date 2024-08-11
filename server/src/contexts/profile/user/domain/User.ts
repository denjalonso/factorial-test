import { Uuid } from '../../../shared/domain/value-object/UUIDs';
import { UserId } from '../../shared/domain/user/UserId';
import { UserName } from './UserName';

export class User {
	readonly id: UserId;
	readonly name: UserName;

	constructor(params: { id: Uuid; name: UserName }) {
		this.id = params.id;
		this.name = params.name;
	}
}
