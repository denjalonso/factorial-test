import { HostedOnboarding } from './HostedOnboarding';
import { Nullable } from '../../../shared/domain/Nullable';
import { HostedOnboardingId } from '../../shared/domain/hosted-onboarding/HostedOnboardingId';

export interface HostedOnboardingRepository {
	save(hostedOnboarding: HostedOnboarding): Promise<void>;
	find(id: HostedOnboardingId): Promise<Nullable<HostedOnboarding>>;
	findAll(): Promise<HostedOnboarding[]>;
	update(hostedOnboarding: HostedOnboarding): Promise<void>;
}
