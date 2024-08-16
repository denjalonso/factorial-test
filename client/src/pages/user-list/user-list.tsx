import { Box, Center, Heading } from '@chakra-ui/react';
import Page from '../../components/page/page';
import { UserListStandalone } from '../../features/user-list/user-list.tsx';

export default function WorkerListPage() {
  return (
    <Page>
      <Center>
        <Box w="85%">
          <Heading textAlign="center">Users</Heading>
          <UserListStandalone />
        </Box>
      </Center>
    </Page>
  );
}
