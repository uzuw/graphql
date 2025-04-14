import React from "react";
import Header from "./components/Header";
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';


const client= new ApolloClient({
  uri:'http://localhost:5000/graphql',
  cache:new InMemoryCache,
});


function App() {

  return (
      <>
      <ApolloProvider client={client}>
      <Header/>
      <div>
        <h1>This is Apolloclient</h1>
      </div>
      </ApolloProvider>
      </>
  )
}

export default App
