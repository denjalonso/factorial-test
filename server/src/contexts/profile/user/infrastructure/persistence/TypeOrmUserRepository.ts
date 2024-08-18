import { EntitySchema } from 'typeorm';
import { Nullable } from '../../../../shared/domain/Nullable';
import { TypeOrmRepository } from '../../../../shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';
import { UserId } from '../../../shared/domain/user/UserId';
import { UserEntity } from './typeorm/UserEntity';

export class TypeOrmUserRepository extends TypeOrmRepository<User> implements UserRepository {
	public async update(user: User): Promise<void> {
		const repository = await this.repository();

		await repository.update({ id: user.id }, user);
	}
	public save(user: User): Promise<void> {
		return this.persist(user);
	}

	public async find(id: UserId): Promise<Nullable<User>> {
		const repository = await this.repository();

		const user = await repository.findOne({ id });

		return user;
	}

	public async findAll(): Promise<User[]> {
		const repository = await this.repository();

		return repository.find();
	}

	protected entitySchema(): EntitySchema<User> {
		return UserEntity;
	}
}
