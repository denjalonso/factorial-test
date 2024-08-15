import { Input, InputProps } from '@chakra-ui/react';
import { FieldValues } from 'react-hook-form';
import { FormField, FormFieldProps } from './form-field';

export type InputFieldProps<TFormValues extends FieldValues> = Omit<
  FormFieldProps<TFormValues>,
  'children'
> &
  Omit<InputProps, 'isDisabled'>;

export function InputField<TFormValues extends FieldValues>({
  id,
  name,
  label,
  registerOptions,
  isDisabled,
  ...inputProps
}: InputFieldProps<TFormValues>) {
  return (
    <FormField<TFormValues>
      {...{ id, name, label, registerOptions, isDisabled }}>
      <Input {...inputProps} />
    </FormField>
  );
}
