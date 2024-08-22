import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './Pages/Home';  
import Login from './Pages/login';
import Register from './Pages/register';
import { UserProvider } from './context/usercontext';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
