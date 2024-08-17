import { EntitySchema } from 'typeorm';
import { Nullable } from '../../../../shared/domain/Nullable';
import { TypeOrmRepository } from '../../../../shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { HostedOnboardingRepository } from '../../domain/HostedOnboardingRepository';
import { HostedOnboardingEntity } from './typeorm/HostedOnboardingEntity';
import { HostedOnboarding } from '../../domain/HostedOnboarding';
import {HostedOnboardingId} from "../../../shared/domain/hosted-onboarding/HostedOnboardingId";

export class TypeOrmHostedOnboardingRepository
	extends TypeOrmRepository<HostedOnboarding>
	implements HostedOnboardingRepository
{
	public save(hostedOnboarding: HostedOnboarding): Promise<void> {
		return this.persist(hostedOnboarding);
	}

	public async find(id: HostedOnboardingId): Promise<Nullable<HostedOnboarding>> {
		const repository = await this.repository();

		const hostedOnboarding = await repository.findOne({ id });

		return hostedOnboarding;
	}

	public async findAll(): Promise<HostedOnboarding[]> {
		const repository = await this.repository();

		return repository.find();
	}

	protected entitySchema(): EntitySchema<HostedOnboarding> {
		return HostedOnboardingEntity;
	}
}
