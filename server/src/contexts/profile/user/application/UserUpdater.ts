import { UserRepository } from '../domain/UserRepository';
import { UserUpdaterRequest } from './UserUpdaterRequest';
import { User } from '../domain/User';
import { Uuid } from '../../../shared/domain/value-object/UUIDs';
import { UserName } from '../domain/UserName';
import { UserEmail } from '../domain/UserEmail';
import { UserGender } from '../domain/UserGender';
import { UserPronoums } from '../domain/UserPronoums';
import { UserPhone } from '../domain/UserPhone';
// import {HostedOnboarding} from "../../hosted-onboarding/domain/HostedOnboarding";

export class UserUpdater {
	private readonly repository: UserRepository;

	constructor(repository: UserRepository) {
		this.repository = repository;
	}

	async run(request: UserUpdaterRequest): Promise<void> {
		const {
			id,
			name,
			email,
			gender,
			pronouns,
			phone,
			// hostedOnboarding
		} = request;
		const updatedUser = new User(
			new Uuid(id),
			new UserName(name),
			email ? new UserEmail(email) : undefined,
			gender ? new UserGender(gender) : undefined,
			pronouns ? new UserPronoums(pronouns) : undefined,
			phone ? new UserPhone(phone) : undefined,
			// hostedOnboarding ? new HostedOnboarding(new Uuid(hostedOnboarding.id), hostedOnboarding.status) : null
		);

		return this.repository.update(updatedUser);
	}
}
