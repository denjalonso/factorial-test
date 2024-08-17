import { HostedOnboarding } from '../domain/HostedOnboarding';
import { HostedOnboardingRepository } from '../domain/HostedOnboardingRepository';
import { HostedOnboardingCreatorRequest } from './HostedOnboardingCreatorRequest';
import { Uuid } from '../../../shared/domain/value-object/UUIDs';
import { User } from '../../user/domain/User';
import { UserName } from '../../user/domain/UserName';
// import {User} from "../../user/domain/User";

export class HostedOnboardingCreator {
	private readonly repository: HostedOnboardingRepository;

	constructor(repository: HostedOnboardingRepository) {
		this.repository = repository;
	}

	async run(request: HostedOnboardingCreatorRequest): Promise<void> {
		const { id, status, user } = request;
		const hostedOnboarding = new HostedOnboarding(
			new Uuid(id),
			status,
			new User(new Uuid(user.id), new UserName(user.name)).toPrimitives()
		);

		return this.repository.save(hostedOnboarding);
	}
}
