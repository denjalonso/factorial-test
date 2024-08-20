# Problem: Worker onboarding

I found interesting to focus the problem on one of the payroll challenges,
which is the data ingestion necessary for the creation of a payroll.

Without knowing if this applies to Factorial's problem and without going into very specific features, I imagine an application that allows users to enter their personal and professional data,
I imagine an application that allows users to enter their personal and professional data
both on-premise and embedded, so the high reusability of the components and the ease of integration with different
integration with different services would be an important factor to consider.

### Shaping of the problem

#### Use cases
 
* Users page
  * User can see a list of all users with their personal and professional data
  * There will be a button called "Add user" that creates a new user
  * Each user will have a copy button that will copy the onboarding link for that user.

* User onboarding flow
    * User can be onboarded through a link
        * Two steps flow will be shown
        * First step: user will be asked to provide Personal data
        * Second step: confirmation step
    * Once the process has been started, if the user leaves the page, the data will be saved and the user will be able to continue where they left off.

* Extra: Dev tools.
    * User can ingest users data through a rest end point
    * Page dev tools to fill the forms out with fake data

#### Mockups

<img width="1727" alt="Screenshot 2024-08-19 at 14 06 03" src="https://github.com/user-attachments/assets/a040ffd4-cb2d-49ae-a62d-521e78c21f04">
<img width="1723" alt="Screenshot 2024-08-19 at 14 06 14" src="https://github.com/user-attachments/assets/87c5f538-072c-467a-9bd6-35851d27c292">
<img width="1728" alt="Screenshot 2024-08-19 at 14 06 26" src="https://github.com/user-attachments/assets/ca505879-e116-4be0-8089-3b5ca56a4490">


### Architecture overview

![architecture](https://github.com/user-attachments/assets/4bcf8bb7-17ca-4555-bc8e-347cdf167a36)


From an architectural and macro design point of view there does not seem to be any major challenge. I have opted
for a single page application (SPA) with a backend on a 3-layer hexagonal architecture. I think this offers a good balance
between simplicity and scalability.

The complexity of the application will be focused on data management with a robust and flexible contract
to change. The decisions to highlight this in each of the layers of the application are:
1. Typesafe solution.
2. The use of graphql to take advantage of its semantics and query power.
3. Apollo codegen to generate the necessary hooks and types.
4. The use of TypeOrm to abstract the database layer.

#### Frontend stack and trade-offs
- React 
- Vite: faster than CRA
- Typescript: static analysis and type checking to catch typos and type errors as you write code
- Styles
 - Chakra-ui: I don't want to focus in styles too much. Looking at the purpose of the project, 
 I think it's better to use a library that provides a good design out of the box.
- Query language amd state management
 - GraphQL: I decided to use GraphQL because in a data oriented project like this, we can leverage the power of gql semantics 
 to query the data we need. 
   - Apollo Client
   - Apollo graphql code gen gen
- Custom router: just one route
- Relay approach: declarative data-fetching. Render as you fetch.

#### Backend stack and trade-offs
- Three layers **Clean architecture**, maybe a bit overkill for this project, but I want to use both Rest and GraphQL
integration in the same project, and I think it's a realistic scenario.
- Node.js
- Express
- Apollo Server,
- Apollo code gen
- Typescript
- [TypeGraphql](https://typegraphql.com/).
- TypeOrm: I want to use TypeOrm to abstract the database layer. I think it's a good choice because it provides a
type safe way to interact with the database.
- PostgresSQL

## Execution details

### API first approach

1. [Onboarding schema commit](https://github.com/denjalonso/factorial-test/commit/14af46f733c430696d5a96d96eb60b96b73610a2) 

### Improving DX

1. Mocked graphql server with [msw](https://mswjs.io/) to develop the frontend without against mocked backend. 

## Running the project

### System Dependencies

- Install Node.js (v22.2.0)
- [Install pnpm](https://pnpm.io/installation)

### Install project dependencies

```

# server
cd server
pnpm install

# client
cd client
pnpm install
```

### Apollo Codegen Setup

To generate the graphql types in the frontend, use:

```
cd client
npm run generate
```

### Running the code

To mock or not to mock, that is up to you. The code can be run either with a live backend, or with mocks.

#### Running without mocks

- Either run the backend service locally.
- Set the mock environment variable to false: `VITE_DEV_MOCKS=false`, (see [env variables how to](#environment-variables))

Then, run the code normally wit: 

```
# client
cd client
npm run dev

# server
cd server
docker compose up -d
npm run dev:profile:backend
```

#### Running with mocks enabled

To run the code with any or all calls mocked out, use the [Mock Service Worker](https://mswjs.io/docs/). Mocks for GraphQL or REST calls should be written in `handlers.ts`. Mocks in this file should only be used for the development of a feature. To toggle between using the mocks in this file and using the live backend, update the environment variable: `VITE_DEV_MOCKS`. See below for mocks for tests.

### Environment Variables

To specify your own values for environment variables, create a `.env.local` file in the root of the project and save your variable values there.

### Frontend Testing

#### Component testing

Unit tests for components has been included alongside each component in a file named `my-component.test.tsx`. **Schema-driven testing:** Component tests should mock out all API calls.

To run the component tests, use `npm run test`.

#### End-to-end (E2E) testing

[//]: # (TODO)

### Backend Testing

In the backend all tests can be run with `npm run test` or separately with `npm run test:unit` (unit and integration tests) and `npm run test:features` (acceptance tests). 

### Package Structure

#### Frontend

Under client directory React component files will live in one of three places. Either in:

- `src/pages/` - the entry points into the application, exposing the starts of user flows
- `src/features/` - components specific to a feature, organized by top level directory of the corresponding feature/domain
- `src/components/` - reusable components, mostly presentational or without data/side effects

#### Backend

The backend is organized in a 3-layer hexagonal architecture.

### Frontend GraphQL Operations

This project uses the method of [colocating fragments](https://www.apollographql.com/docs/react/data/fragments/#colocating-fragments) for all of it's GraphQL operations. Each component that requires data will have a GraphQL query, mutation, or fragment that requests exactly the fields that it uses. These operations will be written in a `.graphql` file that is in the same directory as the component that uses it.


