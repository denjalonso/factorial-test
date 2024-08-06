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
  * This view will be only visible for authenticated/admin users
  * There will be a button called "Create user" that creates a new user
  * Each user will have a button called "Onboard user" that will start the onboarding process for that user.
  * Extra: The onboarding link can be outdated, so the user can regenerate it.

* User onboarding flow
    * User can access the onboarding without signing up
    * User can be onboarded through a link
        * Two steps flow will be shown
        * First step: user will be asked to provide Personal data
        * Second step: user will be asked to provide Professional data
        * Third step: confirmation step
        * The user can navigate between steps
    * Once the process has been started, if the user leaves the page, the data will be saved and the user will be able to continue where they left off.
    * Once the process has been completed, the user will be redirected to the stats page.

* Extra: Dev tools.
    * User can ingest users data through a rest end point
    * Page dev tools to fill the forms out with fake data

* Extra: User onboarding stats
    * Onboarding stats will be shown once the app has been loaded
    * Each metric will have: Timestamp, name, and value. 
    * The metrics will be shown in a timeline and must show averages per minute/hour/day
      * Total users onboarded (Chakra ui Card + Stat group)
      * Total users onboarded per minute
      * Total users onboarded per hour
      * Total users onboarded per day
      * [Users onboarded time series](https://horizon-ui.com/documentation/docs/data-display/charts): I was concerned here because IMHO a timeline is not the best way to show this data. I used a line chart to show the data. 

#### Mockups and wireframes

### Architecture overview
From an architectural and macro design point of view there does not seem to be any major challenge. I have opted
for a single page application (SPA) with a backend on a 3-layer hexagonal architecture. I think this offers a good balance
between simplicity and scalability.

The complexity of the application will be focused on data management with a robust and flexible contract
to change. The decisions to highlight this in each of the layers of the application are:
1. Typesafe solution.
2. The use of graphql to take advantage of its semantics and query power.
3. Apollo codegen to generate the necessary hooks and types.
4. The use of Prisma to abstract the database layer.

#### Frontend stack and trade-offs
- React 
- Vite: faster than CRA
- Typescript: static analysis and type checking to catch typos and type errors as you write code
- Styles
 - Chakra-ui, TailwindCSS??: I don't want to focus in styles too much. Looking at the purpose of the project, 
 I think it's better to use a library that provides a good design out of the box.
- Query language amd state management
 - GraphQL: I decided to use GraphQL because in a data oriented project like this, we can leverage the power of gql semantics 
 to query the data we need. 
   - Apollo Client, React Query???
   - Apollo graphql code gen gen
- Custom router: just one route
- Relay approach: thinking in relay ...

#### Backend stack and trade-offs
- Clean architecture??? three layers, maybe a bit overkill for this project, but I want to use both Rest and GraphQL
integration in the same project, and I think it's a realistic scenario.
- Node.js
- Express
- Apollo Server,
- Apollo code gen
- Typescript
- Prisma: I want to use Prisma to abstract the database layer. I think it's a good choice because it provides a
type safe way to interact with the database.
- SQLite, PostgreSQL??: For this project I think SQLite is enough

## Execution

### Uncertainty first

1. Create Vite + React + Typescript project ✅
2. Create Node.js + Express + Typescript project + Prisma + SQLite
3. Managing forms in a native way
3. Chakra ui vs TailwindCSS???

### API first approach

Enlace a los diferentes commits con el contrato/schema gql.

### Improving DX

1. Mocked data-base first using @mswjs/data 

