import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject';

export class UserPhone extends StringValueObject {
	constructor(value: string) {
		super(value);
	}
}
