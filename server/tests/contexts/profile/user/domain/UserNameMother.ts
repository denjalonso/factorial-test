import { UserName } from '../../../../../src/contexts/profile/user/domain/UserName';
import { WordMother } from '../../../shared/domain/WordMother';

export class UserNameMother {
	static create(value: string): UserName {
		return new UserName(value);
	}

	static random(): UserName {
		return this.create(WordMother.random({ maxLength: 20 }));
	}

	static invalidName(): string {
		return 'a'.repeat(40);
	}
}
