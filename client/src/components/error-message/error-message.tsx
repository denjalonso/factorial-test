import { ApolloError } from '@apollo/client';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
  CloseButton,
  Spacer,
  StackProps,
  VStack,
} from '@chakra-ui/react';

type ErrorMessageObject =
  | {
      title?: string;
      description: string;
    }
  | {
      title: string;
      description?: string;
    };

type ErrorMessageProps = {
  title?: string;
  description?: string;
} & Omit<AlertProps, 'status' | 'variant'> & { onClose?: () => void };

export default function ErrorMessage({
  title,
  description,
  onClose,
  ...alertProps
}: ErrorMessageProps) {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="row"
      alignItems="center"
      justifyContent="start"
      textAlign="center"
      {...alertProps}>
      <AlertIcon />
      <VStack alignItems="start" textAlign="left" spacing={0}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
      </VStack>
      <Spacer />
      {onClose && <CloseButton onClick={onClose} />}
    </Alert>
  );
}

type DisplayableError = ApolloError | ErrorMessageObject | string;

const getErrorKey = (error: DisplayableError) =>
  typeof error === 'string'
    ? error
    : error instanceof ApolloError
      ? `${error.name} - ${error.message}`
      : `${error.title} - ${error.description}`;

export const ErrorAlert = ({
  error,
  ...errorMessageProps
}: { error?: DisplayableError } & ErrorMessageProps) => {
  if (error === undefined) {
    return null;
  }

  if (typeof error === 'string') {
    return (
      <ErrorMessage key={error} description={error} {...errorMessageProps} />
    );
  } else if (error instanceof ApolloError) {
    return (
      <ErrorMessage
        key={`${error.name} - ${error.message}`}
        description={error.message}
        {...errorMessageProps}
      />
    );
  } else {
    return (
      <ErrorMessage
        key={`${error.title} - ${error.description}`}
        title={error.title}
        description={error.description}
        {...errorMessageProps}
      />
    );
  }
};

export const ErrorAlerts = ({
  errors,
  ...stackProps
}: {
  errors?: Array<DisplayableError> | DisplayableError;
} & StackProps) => {
  if (errors === undefined) {
    return null;
  }

  if (!Array.isArray(errors)) {
    return <ErrorAlert error={errors} />;
  }

  if (errors.length === 0) {
    return null;
  }

  return (
    <VStack spacing={4} mb={5} {...stackProps}>
      {errors.map((error) => (
        <ErrorAlert key={getErrorKey(error)} error={error} />
      ))}
    </VStack>
  );
};
