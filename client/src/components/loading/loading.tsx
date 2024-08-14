import { Box, Center, Spinner, SpinnerProps, VStack } from '@chakra-ui/react';

const accessibilityLabel = 'Loading...';

const StyledSpinner = (props: SpinnerProps) => (
  <Spinner
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="primary.500"
    size="xl"
    role="status"
    aria-live="polite"
    label={accessibilityLabel}
    aria-label={accessibilityLabel}
    {...props}
  />
);

function Loading({ withOverlay = false }: { withOverlay?: boolean }) {
  const loading = (
    <Center
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
      <VStack align="center">
        <StyledSpinner />
      </VStack>
    </Center>
  );

  if (withOverlay) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor="white"
        opacity="0.5"
        zIndex="overlay">
        {loading}
      </Box>
    );
  }

  return loading;
}

export { Loading, StyledSpinner };
