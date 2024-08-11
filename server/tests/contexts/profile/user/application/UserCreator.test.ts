import { UserCreator } from '../../../../../src/contexts/profile/user/application/UserCreator';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { UserNameLengthExceeded } from '../../../../../src/contexts/profile/user/domain/UserNameLengthExceeded';
import { CreateUserRequestMother } from './CreateUserRequestMother';
import { UserMother } from '../domain/UserMother';

let repository: UserRepositoryMock;
let creator: UserCreator;

beforeEach(() => {
	repository = new UserRepositoryMock();
	creator = new UserCreator(repository);
});

describe('UserCreator', () => {
	it('should create a valid user', async () => {
		const request = CreateUserRequestMother.random();

		const expectedUser = UserMother.fromRequest(request);

		await creator.run(request);

		repository.assertSaveHasBeenCalledWith(expectedUser);
	});

	it('should throw error if course name length is exceeded', async () => {
		expect(() => {
			const request = CreateUserRequestMother.invalidRequest();

			const user = UserMother.fromRequest(request);

			creator.run(request);

			repository.assertSaveHasBeenCalledWith(user);
		}).toThrow(UserNameLengthExceeded);
	});
});
