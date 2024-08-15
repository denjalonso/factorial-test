import React from 'react';
import { Box } from '@chakra-ui/react';

function DashBoard({ children }: React.PropsWithChildren) {
  return (
    <Box width="100vw" height="100vh" display="flex">
      <Box
        ml={{ base: 0, md: 60 }}
        pt={{ base: 0, md: 20 }}
        h="100vh"
        width="100vw"
        overflow="scroll">
        <Box p="4">{children}</Box>
      </Box>
    </Box>
  );
}

function DashboardPage({ children }: React.PropsWithChildren) {
  return <DashBoard>{children}</DashBoard>;
}

export { DashboardPage };
