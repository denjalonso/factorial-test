import { UserId } from '../../../../../src/contexts/profile/shared/domain/user/UserId';
import { UserName } from '../../../../../src/contexts/profile/user/domain/UserName';
import { User } from '../../../../../src/contexts/profile/user/domain/User';
import { UserCreatorRequest } from '../../../../../src/contexts/profile/user/application/UserCreatorRequest';
import { UserIdMother } from '../../shared/domain/user/UserIdMother';
import { UserNameMother } from './UserNameMother';

export class UserMother {
	static create(id: UserId, name: UserName): User {
		return new User(id, name);
	}

	static fromRequest(request: UserCreatorRequest): User {
		return this.create(UserIdMother.create(request.id), UserNameMother.create(request.name));
	}

	static random(): User {
		return this.create(UserIdMother.random(), UserNameMother.random());
	}
}
