import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { DrawerWithHeaderContent } from '../../components/drawer';
import CreateUserForm from '../create-user';
import { gql } from '@apollo/client';
import {
  UserInfoRowFragment,
  useUsersListQuery,
} from './user-list.generated.ts';
import { UnknownError } from '../../components/error';
import { Loading } from '../../components/loading';

gql`
  fragment UserInfoRow on User {
    id
    name
  }

  query UsersList {
    users {
      ...UserInfoRow
    }
  }
`;

type UserRowCellsProps = {
  user: UserInfoRowFragment;
};

function UserRowCells({ user }: UserRowCellsProps) {
  return (
    <>
      <Td>{user.name}</Td>
    </>
  );
}

type UserListProps = {
  users: Array<UserInfoRowFragment>;
};

function UserList({ users }: UserListProps) {
  const userCreationDisclosure = useDisclosure();
  return (
    <Box>
      <Flex marginTop={5} marginBottom={4} direction="row" alignItems="center">
        <Button onClick={userCreationDisclosure.onOpen}>Add user</Button>
      </Flex>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th whiteSpace="nowrap">
                <Text fontSize="xs">Name</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user: UserInfoRowFragment) => (
              <Tr key={user.id}>
                <UserRowCells user={user} />
              </Tr>
            ))}
            {users.length === 0 && (
              <Tr>
                <Td colSpan={200} textAlign="center">
                  No users
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

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

function UserListStandalone() {
  const queryResult = useUsersListQuery();
  const { data, loading, error } = queryResult;

  if (error) {
    return <UnknownError />;
  }

  if (data === undefined && loading) {
    return <Loading />;
  }

  return <UserList users={data?.users ?? []} />;
}

export { UserList, UserListStandalone };
export default UserList;
