import React from 'react';
import {
  FieldValues,
  SubmitHandler,
  FormProvider,
  UseFormReturn,
} from 'react-hook-form';

type FormProps<TFormValues extends FieldValues> = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<TFormValues>;
  useFormMethods: UseFormReturn<TFormValues>;
  name?: string;
};

function Form<TFormValues extends FieldValues>({
  name,
  useFormMethods,
  children,
  onSubmit,
}: FormProps<TFormValues>) {
  const { handleSubmit } = useFormMethods;

  return (
    <FormProvider {...useFormMethods}>
      <form name={name} id={name} onSubmit={handleSubmit(onSubmit)}>
        {React.Children.map(children, (child) => {
          return child && React.isValidElement(child) && child.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  register: useFormMethods.register,
                  key: child.props.name,
                },
              })
            : child;
        })}
      </form>
    </FormProvider>
  );
}

export { Form };
