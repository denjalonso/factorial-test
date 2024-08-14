import { DefaultErrorBoundary } from 'components/error';
import { ProfileApolloProvider } from 'context/apollo-provider';

function App() {
  return (
    <DefaultErrorBoundary withoutChakra={true}>
      <ProfileApolloProvider>User Profile</ProfileApolloProvider>
    </DefaultErrorBoundary>
  );
}
export default App;
