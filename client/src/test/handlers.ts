import { graphql } from 'msw';
import { GRAPHQL_ENV_ENDPOINTS } from '../services/profile-backend-service';
import {UsersListQuery} from "../features/user-list/user-list.generated.ts";
import {CreateUserMutation} from "../features/create-user/create-user.generated.ts";

graphql.link(GRAPHQL_ENV_ENDPOINTS.local);

const allUsers = new Map([
  [
    'e82f332c-a4e7-4463-b440-59bc91792634',
    {
      id: 'e82f332c-a4e7-4463-b440-59bc91792634',
      name: 'Parrot',
    },
  ],
  [
    '64734573-ce54-435b-8528-106ac03a0e11',
    {
      id: '64734573-ce54-435b-8528-106ac03a0e11',
      name: 'Parroty',
    },
  ],
]);

export const handlers = [
  graphql.query<UsersListQuery>('UsersList', (req, res, ctx) => {
    return res(
      ctx.data({
        users: Array.from(allUsers.values()),
      }),
    );
  }),
  graphql.mutation<CreateUserMutation>('CreateUser', (req, res, ctx) => {
    console.log('CreateUser', req.variables);
    const { input: user } = req.variables;

    allUsers.set(user.id, user);

    return res(
      ctx.data({
        createUser: {
          id: user.id,
          name: user.name,
          __typename: 'User',
        },
      }),
    );
  }),
];
