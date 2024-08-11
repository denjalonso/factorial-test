import { Uuid } from '../../../shared/domain/value-object/UUIDs';
import { UserId } from '../../shared/domain/user/UserId';

export class User {
	readonly id: UserId;
	readonly name: string;

	constructor(params: { id: Uuid; name: string }) {
		this.id = params.id;
		this.name = params.name;
	}
}
