import { DefaultErrorBoundary } from './components/error';
import { ProfileApolloProvider } from './context/apollo-provider';
import { ChakraProvider } from '@chakra-ui/react';
import PageFromURL from './routes';

function App() {
  return (
    <DefaultErrorBoundary withoutChakra={true}>
      <ProfileApolloProvider>
        <ChakraProvider>
          <DefaultErrorBoundary>
            <PageFromURL />
          </DefaultErrorBoundary>
        </ChakraProvider>
      </ProfileApolloProvider>
    </DefaultErrorBoundary>
  );
}
export default App;
