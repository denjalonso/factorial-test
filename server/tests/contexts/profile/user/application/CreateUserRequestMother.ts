import { UserId } from '../../../../../src/contexts/profile/shared/domain/user/UserId';
import { UserName } from '../../../../../src/contexts/profile/user/domain/UserName';
import { UserCreatorRequest } from '../../../../../src/contexts/profile/user/application/UserCreatorRequest';
import { UserIdMother } from '../../shared/domain/user/UserIdMother';
import { UserNameMother } from '../domain/UserNameMother';

export class CreateUserRequestMother {
	static create(id: UserId, name: UserName): UserCreatorRequest {
		return {
			id: id.value,
			name: name.value
		};
	}

	static random(): UserCreatorRequest {
		return this.create(UserIdMother.random(), UserNameMother.random());
	}

	static invalidRequest(): UserCreatorRequest {
		return { id: UserIdMother.random().value, name: UserNameMother.invalidName() };
	}
}
