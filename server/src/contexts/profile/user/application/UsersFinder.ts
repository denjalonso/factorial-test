import { UserRepository } from '../domain/UserRepository';
import { type UserFinderResponse } from './UserFinderResponse';

export class UsersFinder {
	private readonly repository: UserRepository;

	constructor(repository: UserRepository) {
		this.repository = repository;
	}

	async run(): Promise<UserFinderResponse[]> {
		const users = await this.repository.findAll();

		return users.map(user => user.toPrimitives());
	}
}
