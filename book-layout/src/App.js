import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <div>
     <NavBar/>
     <Routes>
   <Route path="/Home" element={<Home />} />
   </Routes>
   </div>
  </BrowserRouter>
    
  );
}

export default App;
