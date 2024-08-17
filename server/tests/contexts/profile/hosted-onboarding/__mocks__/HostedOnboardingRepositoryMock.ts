import { UserRepository } from '../../../../../src/contexts/profile/user/domain/UserRepository';
import { User } from '../../../../../src/contexts/profile/user/domain/User';
import { UserId } from '../../../../../src/contexts/profile/shared/domain/user/UserId';
import { Nullable } from '../../../../../src/contexts/shared/domain/Nullable';

export class HostedOnboardingRepositoryMock implements HostedOnboardingRepository {
	private saveMock: jest.Mock;
	private findMock: jest.Mock;

	constructor() {
		this.saveMock = jest.fn();
		this.findMock = jest.fn();
	}

	async save(user: User): Promise<void> {
		this.saveMock(user);
	}

	async find(id: UserId): Promise<Nullable<User>> {
		return this.findMock(id);
	}

	assertSaveHasBeenCalledWith(expected: User): void {
		expect(this.saveMock).toHaveBeenCalledWith(expected);
	}
}
