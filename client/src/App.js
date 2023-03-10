import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import MovieProvider from './utils/MovieContext';

import logo from './logo.svg';
import './App.css';
import NavBar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import About from './components/About';
import Movies from './pages/Movies';
import Review from './pages/Review';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
    <div>
     <NavBar/>
     <MovieProvider>
      <Routes>
          <Route path="/Review" element={<Review/>} />
          <Route path="/Movies" element={<Movies/>}/>
          <Route path="/Movies" element={<Home/>}/>
          <Route path="/" element={<Home/>}/>
          
        </Routes>
        {/* <Home/> */}
      </MovieProvider>
   </div>
  </Router>
  </ApolloProvider>
    
  );
}

export default App;
