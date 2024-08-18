import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject';

export class UserGender extends StringValueObject {
	constructor(value: string) {
		super(value);
	}
}
