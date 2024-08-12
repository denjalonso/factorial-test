import { EntitySchema } from 'typeorm';
import { User } from '../../../domain/User';
import { UserId } from '../../../../shared/domain/user/UserId';
import { UserName } from '../../../domain/UserName';
import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeorm/ValueObjectTransformer';

export const UserEntity = new EntitySchema<User>({
	name: 'User',
	tableName: 'users',
	target: User,
	columns: {
		id: {
			type: String,
			primary: true,
			transformer: ValueObjectTransformer(UserId)
		},
		name: {
			type: String,
			transformer: ValueObjectTransformer(UserName)
		}
	}
});
