import { Box, Center, Heading } from '@chakra-ui/react';
import Page from '../../components/page/page';
import { UserListStandalone } from '../../features/user-list/user-list.tsx';

export default function WorkerListPage() {
  return (
    <Page>
      <Center>
        <Box w="full">
          <Heading textAlign="center">Users onboarding management</Heading>
          <UserListStandalone />
        </Box>
      </Center>
    </Page>
  );
}
