import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import ShopDemo from './pages/ShopDemo';
import AnimatedDemo from './pages/AnimatedDemo';
import { useCart } from './context/CartContext';
import './App.css';

function App() {
  const { cartCount } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-primary">
      <Navbar cartCount={cartCount} />
      <CartDrawer />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/demo" element={<ShopDemo />} />
          <Route path="/animations" element={<AnimatedDemo />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
