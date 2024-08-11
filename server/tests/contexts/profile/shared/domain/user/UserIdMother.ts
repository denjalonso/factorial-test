import { UserId } from '../../../../../../src/contexts/profile/shared/domain/user/UserId';
import { UuidMother } from '../../../../shared/domain/UuidMother';

export class UserIdMother {
	static create(value: string): UserId {
		return new UserId(value);
	}

	static random(): UserId {
		return this.create(UuidMother.random());
	}
}
