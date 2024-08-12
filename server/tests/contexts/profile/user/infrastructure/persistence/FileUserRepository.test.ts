import { User } from '../../../../../../src/contexts/profile/user/domain/User';
import { FileUserRepository } from '../../../../../../src/contexts/profile/user/infrastructure/persistence/FileUserRepository';
import { Uuid } from '../../../../../../src/contexts/shared/domain/value-object/UUIDs';
import { UserName } from '../../../../../../src/contexts/profile/user/domain/UserName';

describe('FileUserRepository', () => {
	it('should have a user', async () => {
		const expectedUser = new User(new Uuid('7f5c6d16-0a5f-4789-b372-5d7e11bcfb28'), new UserName('Parrot'));
		const repository = new FileUserRepository();

		await repository.save(expectedUser);

		const user = await repository.search('7f5c6d16-0a5f-4789-b372-5d7e11bcfb28');
		expect(user).toEqual(expectedUser);
	});
});
