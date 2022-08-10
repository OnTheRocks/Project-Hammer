import { Header } from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Customers } from "./components/Customers";

const client = new ApolloClient({
  uri: 'http://localhost:5400/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />

        <Customers />
      </ApolloProvider>
    </>    
  );
}

export default App;
