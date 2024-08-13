import { UserRepository } from '../domain/UserRepository';
import { UserFinderRequest } from './UserFinderRequest';
import { Uuid } from '../../../shared/domain/value-object/UUIDs';
import { type UserFinderResponse } from './UserFinderResponse';

export class UserFinder {
	private readonly repository: UserRepository;

	constructor(repository: UserRepository) {
		this.repository = repository;
	}

	async run(request: UserFinderRequest): Promise<UserFinderResponse> {
		const { id } = request;

		const user = await this.repository.find(new Uuid(id));

		if (!user) {
			throw new Error('User not found');
		}

		return user.toPrimitives();
	}
}
