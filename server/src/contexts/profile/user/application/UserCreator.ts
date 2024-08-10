import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class UserCreator {
	constructor(private repository: UserRepository) {}

	async run(id: string, name: string) {
		const course = new User({ id, name });

		return this.repository.save(course);
	}
}
