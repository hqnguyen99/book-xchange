
import './App.css';
import React from 'react'
import {Routes,Route} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import Welcome from './components/pages/welcome';
import Login from './components/pages/login';
import Home from './components/pages/home';
import Signup from './components/pages/signup';
function App() {
  return (
   <Router>
     <Routes>
       <Route path="/" element={<Welcome />}></Route>
       <Route path="/login" element={<Login/>}></Route>
       <Route path="/home" element={<Home/>}></Route>
       <Route path="/signup" element={<Signup/>}></Route>
     </Routes>
   </Router>
  );
}

export default App;
