import { HostedOnboarding } from '../domain/HostedOnboarding';
import { HostedOnboardingRepository } from '../domain/HostedOnboardingRepository';
import { Uuid } from '../../../shared/domain/value-object/UUIDs';
import { User } from '../../user/domain/User';
import { HostedOnboardingUpdaterRequest } from './HostedOnboardingUpdaterRequest';
import { UserName } from '../../user/domain/UserName';

export class HostedOnboardingUpdater {
	private readonly repository: HostedOnboardingRepository;

	constructor(repository: HostedOnboardingRepository) {
		this.repository = repository;
	}

	async run(request: HostedOnboardingUpdaterRequest): Promise<void> {
		const { id, status, user } = request;
		const hostedOnboarding = new HostedOnboarding(
			new Uuid(id),
			status,
			new User(new Uuid(user.id), new UserName(user.name)).toPrimitives()
		);

		return this.repository.update(hostedOnboarding);
	}
}
