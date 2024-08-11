import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';
import { UserCreatorRequest } from './UserCreatorRequest';
import { Uuid } from '../../../shared/domain/value-object/UUIDs';
import { UserName } from '../domain/UserName';

export class UserCreator {
	private readonly repository: UserRepository;

	constructor(repository: UserRepository) {
		this.repository = repository;
	}

	async run(request: UserCreatorRequest): Promise<void> {
		const { id, name } = request;
		const course = new User({ id: new Uuid(id), name: new UserName(name) });

		return this.repository.save(course);
	}
}
