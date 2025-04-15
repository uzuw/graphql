import React from "react";
import Header from "./components/Header";
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import Client from "./components/Client";
import AddClientModal from "./components/addClientModel";


const cache= new InMemoryCache({
  typePolicies:{
    Query:{
      fields:{
        clients:{
          merge(existing, incoming){return incoming}
        },
        projects:{
          merge(existing, incoming){return incoming}
        }
      }
    }
  }
})


const client= new ApolloClient({
  uri:'http://localhost:5000/graphql',
  cache:cache,
});


function App() {

  return (
      <>
      <ApolloProvider client={client}>
      <Header/>
      <AddClientModal/>
      <Client/>
      </ApolloProvider>
      </>
  )
}

export default App
