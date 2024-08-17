import { Nullable } from '../../../shared/domain/Nullable';
import { HostedOnboarding } from './HostedOnboarding';
import { HostedOnboardingId } from '../../shared/domain/hosted-onboarding/HostedOnboardingId';

export interface HostedOnboardingRepository {
	save(hostedOnboarding: HostedOnboarding): Promise<void>;
	find(id: HostedOnboardingId): Promise<Nullable<HostedOnboarding>>;
	findAll(): Promise<HostedOnboarding[]>;
}
