import { Uuid } from '../../../shared/domain/value-object/UUIDs';
import { HostedOnboardingRepository } from '../domain/HostedOnboardingRepository';
import { HostedOnboardingFinderRequest } from './HostedOnboardingFinderRequest';
import { HostedOnboardingFinderResponse } from './HostedOnboardingFinderResponse';

export class HostedOnboardingFinder {
	private readonly repository: HostedOnboardingRepository;

	constructor(repository: HostedOnboardingRepository) {
		this.repository = repository;
	}

	async run(request: HostedOnboardingFinderRequest): Promise<HostedOnboardingFinderResponse> {
		const { id } = request;

		const hostedOnboarding = await this.repository.find(new Uuid(id));

		if (!hostedOnboarding) {
			throw new Error('Hosted onboarding not found');
		}

		return hostedOnboarding.toPrimitives();
	}
}
