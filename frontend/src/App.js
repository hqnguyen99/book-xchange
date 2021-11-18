
import './App.css';
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Welcome from './components/pages/welcome';
import Login from './components/pages/login';
import Home from './components/pages/home';
import Signup from './components/pages/signup';
import SellPage from './components/pages/sellBook';
import BuyPage from './components/pages/buyBook';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        </div>
        <div>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/sell" element={<SellPage />}></Route>
          <Route path="/info" element={<BuyPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
