import { serialize, deserialize } from 'bson';
import fs from 'fs';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';
import { Nullable } from '../../../../shared/domain/Nullable';
import { UserId } from '../../../shared/domain/user/UserId';

export class FileUserRepository implements UserRepository {
	private FILE_PATH = `${__dirname}/users`;

	async save(user: User): Promise<void> {
		fs.promises.writeFile(this.filePath(user.id.value), serialize(user));
	}

	async find(userId: UserId): Promise<Nullable<User>> {
		const userData = await fs.promises.readFile(this.filePath(userId.value));
		const { id, name } = deserialize(userData);

		return new User(id, name);
	}

	private filePath(id: string): string {
		return `${this.FILE_PATH}.${id}.repo`;
	}
}
