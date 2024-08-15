import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { DrawerWithHeaderContent } from '../../components/drawer';
import CreateUserForm from '../create-user';

function UserList() {
  const userCreationDisclosure = useDisclosure();
  return (
    <Box>
      <Flex marginTop={5} marginBottom={4} direction="row" alignItems="center">
        <Button onClick={userCreationDisclosure.onOpen}>Add user</Button>
      </Flex>
      {userCreationDisclosure.isOpen && (
        <DrawerWithHeaderContent {...userCreationDisclosure} title="Add User">
          <CreateUserForm
            layout="drawer"
            onCreated={userCreationDisclosure.onClose}
            onCancel={userCreationDisclosure.onClose}
          />
        </DrawerWithHeaderContent>
      )}
    </Box>
  );
}

export { UserList };
