import container from '../../../../../../src/apps/profile/backend/dependency-injection';
import { UserRepository } from '../../../../../../src/contexts/profile/user/domain/UserRepository';
import { EnvironmentArranger } from '../../../../shared/infrastructure/arranger/EnvironmentArranger';
import { UserMother } from '../../domain/UserMother';

const repository: UserRepository = container.get('Profile.user.domain.UserRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get('Profile.EnvironmentArranger');

beforeEach(async () => {
	await (await environmentArranger).arrange();
});

afterAll(async () => {
	await (await environmentArranger).arrange();
	await (await environmentArranger).close();
});

describe('UserRepository', () => {
	describe('#save', () => {
		it('should save a user', async () => {
			const user = UserMother.random();

			await repository.save(user);
		});
	});
});
