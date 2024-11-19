
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/userContexts';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    // <div className="App">
    //   <p className="text-red-500 text-3xl text-left">Hello</p>
    // </div>

    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
