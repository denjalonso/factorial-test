import { EntitySchema } from 'typeorm';
import { User } from '../../../domain/User';
import { UserId } from '../../../../shared/domain/user/UserId';
import { UserName } from '../../../domain/UserName';
import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { UserEmail } from '../../../domain/UserEmail';
import { UserGender } from '../../../domain/UserGender';
import { UserPronoums } from '../../../domain/UserPronoums';
import { UserPhone } from '../../../domain/UserPhone';

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
		},
		email: {
			type: String,
			nullable: true,
			transformer: ValueObjectTransformer(UserEmail)
		},
		gender: {
			type: String,
			nullable: true,
			transformer: ValueObjectTransformer(UserGender)
		},
		pronouns: {
			type: String,
			nullable: true,
			transformer: ValueObjectTransformer(UserPronoums)
		},
		phone: {
			type: String,
			nullable: true,
			transformer: ValueObjectTransformer(UserPhone)
		}
	},
	relations: {
		hostedOnboarding: {
			target: 'HostedOnboarding',
			type: 'one-to-one',
			inverseSide: 'user'
		}
	}
});
