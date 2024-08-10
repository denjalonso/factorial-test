import { User } from '../../../../../src/contexts/profile/user/domain/User';
import { UserCreator } from '../../../../../src/contexts/profile/user/application/UserCreator';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';

describe('UserCreator', () => {
	it('should create a valid user', async () => {
		const repository = new UserRepositoryMock();
		const creator = new UserCreator(repository);
		const id = 'id';
		const name = 'name';
		const expectedUser = new User({ id, name });

		await creator.run(id, name);

		repository.assertSaveHasBeenCalledWith(expectedUser);
	});
});
