import React, { ReactElement, ReactNode } from 'react';
import {
  FieldPath,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { FormControl, FormLabel } from '@chakra-ui/react';

type FormFieldOptions<
  TFormValues extends FieldValues,
  TFieldName extends FieldPath<TFormValues> = FieldPath<TFormValues>,
> = {
  id?: string;
  name: TFieldName;
  label?: ReactNode | string;
  children: ReactElement;
  registerOptions?: RegisterOptions<TFormValues, TFieldName>;
  isDisabled?: boolean;
};

export type FormFieldProps<
  TFormValues extends FieldValues,
  TFieldName extends FieldPath<TFormValues> = FieldPath<TFormValues>,
> = FormFieldOptions<TFormValues, TFieldName>;

export function FormField<TFormValues extends FieldValues>({
  children,
  id,
  name,
  label,
  registerOptions,
  ...props
}: FormFieldProps<TFormValues>) {
  const {
    formState: { isSubmitting },
    register,
  } = useFormContext<TFormValues>();

  const { required } = registerOptions || {};
  const isRequired = !!required;

  const child = React.Children.only(children);

  return (
    <FormControl
      id={id}
      isRequired={isRequired}
      isDisabled={isSubmitting}
      {...props}>
      {label ? <FormLabel htmlFor={id}>{label}</FormLabel> : null}
      {child &&
        React.isValidElement(child) &&
        React.createElement(child.type, {
          ...{
            ...(child.props as object),
            id,
            ...register(name, {
              ...registerOptions,
              required: `${name} is required`,
            }),
          },
        })}
    </FormControl>
  );
}
