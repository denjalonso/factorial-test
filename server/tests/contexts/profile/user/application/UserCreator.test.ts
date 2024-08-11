import { User } from '../../../../../src/contexts/profile/user/domain/User';
import { UserCreator } from '../../../../../src/contexts/profile/user/application/UserCreator';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { Uuid } from '../../../../../src/contexts/shared/domain/value-object/UUIDs';

describe('UserCreator', () => {
	it('should create a valid user', async () => {
		const repository = new UserRepositoryMock();
		const creator = new UserCreator(repository);
		const id = new Uuid('7f5c6d16-0a5f-4789-b372-5d7e11bcfb28');
		const name = 'name';
		const expectedUser = new User({ id, name });

		await creator.run({ id: id.value, name });

		repository.assertSaveHasBeenCalledWith(expectedUser);
	});
});
