import { UserRepository } from '../../../../../src/contexts/profile/user/domain/UserRepository';
import { User } from '../../../../../src/contexts/profile/user/domain/User';
import { UserId } from '../../../../../src/contexts/profile/shared/domain/user/UserId';
import { Nullable } from '../../../../../src/contexts/shared/domain/Nullable';

export class UserRepositoryMock implements UserRepository {
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

	// To do a more semantic test:
	// First approach:
	// Approach tell don't ask: https://martinfowler.com/bliki/TellDontAsk.html. Instead getting the mock ask if the save
	// have been called with that user.
	// saveHasBeenCalledWith(expected: User): boolean {
	// 	return this.saveMock.mock.calls.some(call => call[0].equals(expected));
	// }

	// Second approach:
	// Directly do the assertion here. Test gain in semantic and we skip the expect. If an error occurs, the test will
	// fail here, the developer will know the exact method were the the fails, the result is a better DX.
	assertSaveHasBeenCalledWith(expected: User): void {
		expect(this.saveMock).toHaveBeenCalledWith(expected);
	}
}
