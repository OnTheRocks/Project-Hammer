import { Header } from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Customers } from "./components/Customers";
import AddCustomerModal from "./components/AddCustomerModal";
import Tickets from "./components/Tickets";
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5400/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddCustomerModal />
        </div>
       
        <Tickets />
        <Customers />
      </ApolloProvider>
    </>    
  );
}

export default App;
