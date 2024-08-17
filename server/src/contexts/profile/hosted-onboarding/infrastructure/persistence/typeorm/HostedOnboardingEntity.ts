import { EntitySchema } from 'typeorm';
import { HostedOnboarding } from '../../../domain/HostedOnboarding';
import { HostedOnboardingId } from '../../../../shared/domain/hosted-onboarding/HostedOnboardingId';
import { OnboardingStatus } from '../../../domain/OnboardingStatus';
import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeorm/ValueObjectTransformer';

export const StatusTransformer = {
	to: (entityValue: OnboardingStatus): string => {
		return entityValue; // Customize this logic as needed
	},
	from: (databaseValue: string): OnboardingStatus => {
		return OnboardingStatus[databaseValue as keyof typeof OnboardingStatus];
	}
};

export const HostedOnboardingEntity = new EntitySchema<HostedOnboarding>({
	name: 'HostedOnboarding',
	tableName: 'hostedOnboarding',
	target: HostedOnboarding,
	columns: {
		id: {
			type: String,
			primary: true,
			transformer: ValueObjectTransformer(HostedOnboardingId)
		},
		status: {
			type: 'enum',
			enum: OnboardingStatus,
			default: OnboardingStatus.STARTED,
			transformer: StatusTransformer
		}
	},
	relations: {
		user: {
			target: 'User',
			type: 'one-to-one',
			joinColumn: true,
			eager: true
		}
	}
});
