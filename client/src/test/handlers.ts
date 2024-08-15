import { graphql } from 'msw';
import { GRAPHQL_ENV_ENDPOINTS } from '../services/profile-backend-service';

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
  graphql.mutation('CreateUser', (req, res, ctx) => {
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
