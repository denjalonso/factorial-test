import { Box, Center, Heading } from '@chakra-ui/react';
import Page from '../../components/page/page';

export default function WorkerListPage() {
  return (
    <Page>
      <Center>
        <Box w="85%">
          <Heading textAlign="center">Users</Heading>
        </Box>
      </Center>
    </Page>
  );
}
