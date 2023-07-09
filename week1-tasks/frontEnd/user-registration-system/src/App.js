import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './component/Login';
import Register from './component/Register'
import HomePage from './component/HomePage';
import Navbar from './component/NavBar';
import UpdateProfile from './component/UpdateProfile';
import './App.css';


function App() {
  return (
    <Router>
      <Navbar/>
      <div className='container'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/update" element={<UpdateProfile />} />
      </Routes>
      <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
