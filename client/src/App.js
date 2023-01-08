import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Directors from "./components/Directors";
import AddClientModal from "./components/AddClientModal";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        directors: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        movies: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <div className="container">
        <AddClientModal />
        <Directors />
      </div>
    </ApolloProvider>
  );
}

export default App;
