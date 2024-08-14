import { ApolloError } from '@apollo/client';
import { Box, Button, Code, Heading, Text, VStack } from '@chakra-ui/react';

const nls = {
  'errorPage.defaultTitle': 'Error',
  'errorPage.defaultSubtitle': 'Oops! Something went wrong...',
  'devDisplayError.title': 'Error details (not shown externally)',
};

// Typically we just specify necessary styles via the individual props on our component usage; however, in order to enable
// our unstyled, no dependency version of our error page to look as similar as possible to our standard one (that depends
// on Chakra) we are going through the trouble of sharing the style props via this object.
const STYLE = {
  container: { textAlign: 'center', paddingX: 6, paddingY: 10 },
  title: {
    display: 'inline-block',
    backgroundClip: 'text',
    size: '2xl',
    bgGradient: 'linear(to-r, primary.400, primary.600)',
  },
  subtitle: {
    fontSize: '18px',
    marginTop: 3,
    marginBottom: 2,
  },
} as const;

function ErrorPage({
  title = nls['errorPage.defaultTitle'],
  subtitle,
  description,
  navigate,
  error,
}: {
  title?: string;
  subtitle: string;
  description?: string;
  navigate?: { path: string; label?: string };
} & Partial<DevDisplayErrorProps>) {
  return (
    <Box {...STYLE.container}>
      <Heading as="h2" {...STYLE.title}>
        {title}
      </Heading>
      <Text {...STYLE.subtitle}>{subtitle}</Text>
      <Text color="gray.500" mb={6}>
        {description}
      </Text>

      {navigate && (
        <Button
          as="a"
          href={navigate.path}
          colorScheme="primary"
          bgGradient="linear(to-r, primary.400, primary.500, primary.600)"
          color="white"
          variant="solid">
          {navigate.label ?? 'Go to Home'}
        </Button>
      )}

      {error && <DevDisplayError error={error} />}
    </Box>
  );
}

const sizeToPixels = (size: number) => `${size * 4}px`;

/**
 * This component should ONLY be used in a situation where Chakra is not available, i.e. this is not
 * nested below the ChakraProvider. In any other situation, one of the other error displaying components
 * should always be used instead.
 */
const NoChakraError = () => (
  <div
    style={{
      textAlign: STYLE.container.textAlign,
      padding: `${sizeToPixels(STYLE.container.paddingY)} ${sizeToPixels(
        STYLE.container.paddingX,
      )}`,
    }}>
    <h2
      style={{
        display: STYLE.title.display,
        backgroundClip: STYLE.title.backgroundClip,
        margin: 0,
        fontSize: '48px',
      }}>
      {nls['errorPage.defaultTitle']}
    </h2>
    <p
      style={{
        fontSize: STYLE.subtitle.fontSize,
        marginTop: sizeToPixels(STYLE.subtitle.marginTop),
        marginBottom: sizeToPixels(STYLE.subtitle.marginBottom),
      }}>
      {nls['errorPage.defaultSubtitle']}
    </p>
  </div>
);

function UnknownError(
  props: { text?: string } & Partial<DevDisplayErrorProps>,
) {
  const { text = nls['errorPage.defaultSubtitle'] } = props;
  return <ErrorPage subtitle={text} error={props.error} />;
}

type DevDisplayErrorProps = { error: Error | ApolloError };

const DevDisplayError = ({ error }: DevDisplayErrorProps) => {
  return (
    <VStack mt={10}>
      <Heading as="h3" size="lg">
        {nls['devDisplayError.title']}
      </Heading>
      <Heading as="h4" size="md">
        {error.message}
      </Heading>
      {error.stack && (
        <Code sx={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
          {error.stack}
        </Code>
      )}
    </VStack>
  );
};

export {
  ErrorPage as default,
  ErrorPage,
  NoChakraError,
  UnknownError,
};
