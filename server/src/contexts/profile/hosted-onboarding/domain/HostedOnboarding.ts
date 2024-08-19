import { Uuid } from '../../../shared/domain/value-object/UUIDs';
import { HostedOnboardingId } from '../../shared/domain/hosted-onboarding/HostedOnboardingId';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { OnboardingStatus } from './OnboardingStatus';
import { User } from '../../user/domain/User';

export class HostedOnboarding extends AggregateRoot {
	readonly id: HostedOnboardingId;
	readonly status: OnboardingStatus;
	readonly user?: User | null;

	constructor(id: Uuid, status: OnboardingStatus, user?: User | null) {
		super();
		this.id = id;
		this.status = status;
		this.user = user;
	}

	static fromPrimitives(plainData: {
		id: string;
		status: OnboardingStatus;
		user?: { id: string; name: string };
	}): HostedOnboarding {
		return new HostedOnboarding(
			new HostedOnboardingId(plainData.id),
			plainData.status,
			plainData.user ? User.fromPrimitives(plainData.user) : null
		);
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			status: this.status,
			user: this.user?.toPrimitives()
		};
	}
}
