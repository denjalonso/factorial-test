import { User } from '../../../../../../src/contexts/profile/user/domain/User';
import { FileUserRepository } from '../../../../../../src/contexts/profile/user/infrastructure/persistence/FileUserRepository';

describe('FileUserRepository', () => {
	it('should have a user', async () => {
		const expectedUser = new User({ id: 'id', name: 'Parrot' });
		const repository = new FileUserRepository();

		await repository.save(expectedUser);

		const user = await repository.search('id');
		expect(user).toEqual(expectedUser);
	});
});
