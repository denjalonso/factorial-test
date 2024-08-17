import { NewableClass } from '../../../domain/NewableClass';
import { ValueObject } from '../../../domain/value-object/ValueObject';

export const ValueObjectTransformer = (ValueObject: NewableClass<ValueObject<any>>) => {
	return {
		to: (value: ValueObject<any>): any => value ? value?.value : null,
		from: (value: any): ValueObject<any> => new ValueObject(value)
	};
};
