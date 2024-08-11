import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class UserCreator {
	private readonly repository: UserRepository;

	constructor(repository: UserRepository) {
		this.repository = repository;
	}

	async run(request: UserCreatorRequest): Promise<void> {
		const { id, name } = request;
		const course = new User({ id, name });

		return this.repository.save(course);
	}
}
