import React from "react";
import Header from "./components/Header";
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";


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
      <Router>
      <Header/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='*' element={<NotFound/>}/> {/*anything else than / will be routes to the NotFound page*/}
          <Route path='/projects/:id' element={<Projects/>}/>
      </Routes>
      </Router>
      </ApolloProvider>
      
      </>
  )
}

export default App
