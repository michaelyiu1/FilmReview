import React, { Component } from 'react';
import './App.css';
import About from "./components/About";
import Navbar from './components/Navbar';
import page from "./components/Page"
import Home from './components/Home';
import Movies from './components/Movies';
import Signup from './components/Signup';

function App() {
  let Component
  switch (window.location.pathname) {
    case "/":
      Component = <App />
      break
      case "/About":
        Component = <About />
      break
      case "/Movies":
        Component = <Movies />
        break
        case "/Signup":
          Component = <Signup />
          break
  
  
  }

return (
  <>
  <Navbar />
  {Component}
  </>
)
}

export default App;
