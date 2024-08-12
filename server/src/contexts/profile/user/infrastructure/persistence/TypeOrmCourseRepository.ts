import { EntitySchema } from 'typeorm';
import { TypeOrmRepository } from '../../../../shared/infrastructure/persistence/TypeOrmRepository';
import { Nullable } from '../../../../shared/domain/Nullable';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';
import { UserId } from '../../../shared/domain/user/UserId';
import { UserEntity } from './typeorm/UserEntity';

export class TypeOrmUserRepository extends TypeOrmRepository<User> implements UserRepository {
	public save(course: User): Promise<void> {
		return this.persist(course);
	}

	public async search(id: UserId): Promise<Nullable<User>> {
		const repository = await this.repository();

		const user = await repository.findOne({ where: { id } });

		return user;
	}

	protected entitySchema(): EntitySchema<User> {
		return UserEntity;
	}
}
