import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { NoChakraError, UnknownError } from './error';

const reportError = (error: Error) =>
  console.error(
    'DefaultErrorBoundary',
    error,
    `\n\nComponent stack: ${error.stack}`,
  );

const DefaultError = ({
  error,
}: Pick<React.ComponentProps<typeof UnknownError>, 'error'>) => (
  <UnknownError error={error} />
);

const DefaultErrorBoundary = ({
  withoutChakra = false,
  children,
}: PropsWithChildren<{ withoutChakra?: boolean }>) => (
  <ErrorBoundary
    FallbackComponent={withoutChakra ? NoChakraError : DefaultError}
    onError={reportError}>
    {children}
  </ErrorBoundary>
);

export { DefaultErrorBoundary };
