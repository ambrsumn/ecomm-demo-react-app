
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './contexts/userContexts';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';

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
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
