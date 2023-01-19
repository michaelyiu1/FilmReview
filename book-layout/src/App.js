import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Movies from './components/Movies';
import Signup from './components/Signup';
import Partners from './components/Partners';
import Login from './components/Login';


function App() {
  return (
    <BrowserRouter>
    <div>
     <NavBar/>
     <Routes>
   <Route path="/Home" element={<Home />} />
   <Route path="/About" element={<About />} />
   <Route path="/Movies" element={<Movies />} />
   <Route path="/Signup" element={<Signup />} />
   <Route path="/Login" element={<Login />} />
   <Route path="/Partners" element={<Partners />} />
   </Routes>
   </div>
  </BrowserRouter>
    
  );
}

export default App;
