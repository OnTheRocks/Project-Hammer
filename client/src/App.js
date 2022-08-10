import { Header } from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Customers } from "./components/Customers";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        customers: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        tickets: {
          merge(existing, incoming) {
            return incoming; 
          },
        },
    },
  },
},
});

const customer = new ApolloClient({
  uri: 'http://localhost:5400/graphql',
  cache,
});


function App() {
  return (
    <>
      <ApolloProvider customer={customer}>
        <Header />

        <Customers />
      </ApolloProvider>
    </>    
  );
}

export default App;
