import {EnumValueObject} from "../../../shared/domain/value-object/EnumValueObject";

export enum OnboardingStatus {
	INVITED = 'INVITED',
	STARTED = 'STARTED',
	COMPLETED = 'COMPLETED',
	INVALIDATED = 'INVALIDATED'
}


export class HostedOnboardingStatus extends EnumValueObject {
    constructor(value: OnboardingStatus) {
        super(value);
    }
}
