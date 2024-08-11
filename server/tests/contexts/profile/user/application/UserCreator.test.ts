import { User } from '../../../../../src/contexts/profile/user/domain/User';
import { UserCreator } from '../../../../../src/contexts/profile/user/application/UserCreator';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { Uuid } from '../../../../../src/contexts/shared/domain/value-object/UUIDs';
import { UserId } from '../../../../../src/contexts/profile/shared/domain/user/UserId';
import { UserName } from '../../../../../src/contexts/profile/user/domain/UserName';
import { UserNameLengthExceeded } from '../../../../../src/contexts/profile/user/domain/UserNameLengthExceeded';

let repository: UserRepositoryMock;
let creator: UserCreator;

beforeEach(() => {
	repository = new UserRepositoryMock();
	creator = new UserCreator(repository);
});

describe('UserCreator', () => {
	it('should create a valid user', async () => {
		const id = new Uuid('7f5c6d16-0a5f-4789-b372-5d7e11bcfb28');
		const name = 'Parrot';
		const expectedUser = new User({ id, name: new UserName(name) });

		await creator.run({ id: id.value, name });

		repository.assertSaveHasBeenCalledWith(expectedUser);
	});

	it('should throw error if course name length is exceeded', async () => {
		const id = '0766c602-d4d4-48b6-9d50-d3253123275e';
		const name = 'some-name'.repeat(30);

		expect(() => {
			const user = new User({
				id: new UserId(id),
				name: new UserName(name)
			});

			creator.run({ id, name });

			repository.assertSaveHasBeenCalledWith(user);
		}).toThrow(UserNameLengthExceeded);
	});
});
