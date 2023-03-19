import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Reg from './components/Reg';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reg' element={<Reg />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
