import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import RollingBanner from './components/RollingBanner';
import MainContent from './components/MainContent';
import CartIcon from './components/CartIcon';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Admin from './components/Admin';
import Shop from './components/Shop';

// Type for cart items
export type CartItem = {
  name: string;
  color: string;
  price: number;
  quantity: number;
};

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  isAdmin: boolean;
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cartAnimation, setCartAnimation] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex(
        (item) => item.name === product.name && item.color === product.color
      );
      if (idx !== -1) {
        // Increase quantity if same product/color
        const updated = [...prevCart];
        updated[idx].quantity += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          { ...product, quantity: 1 },
        ];
      }
    });
    
    // Trigger cart animation
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 1000);
  };

  const removeFromCart = (itemToRemove: CartItem) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex(
        (item) => item.name === itemToRemove.name && item.color === itemToRemove.color
      );
      if (idx !== -1) {
        const updated = [...prevCart];
        if (updated[idx].quantity > 1) {
          updated[idx].quantity -= 1;
          return updated;
        } else {
          updated.splice(idx, 1);
          return updated;
        }
      }
      return prevCart;
    });
  };

  const handleFilterToggle = () => setIsFilterOpen((open) => !open);

  return (
    <GoogleOAuthProvider clientId="488390902124-ru63gdprvhsvpcqmpssd0d4s9926jo37.apps.googleusercontent.com">
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={
            <>
              <Header />
              <SearchSection
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onFilterToggle={handleFilterToggle}
                isFilterOpen={isFilterOpen}
              />
              <RollingBanner />
              <MainContent
                addToCart={addToCart}
                searchTerm={searchTerm}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
              />
              <CartIcon 
                cart={cart} 
                removeFromCart={removeFromCart}
                animation={cartAnimation}
              />
              
              <main className="container mx-auto px-4 py-8 flex-1" />
              <Footer />
            </>
          } />
          
          {/* Profile Page Route */}
          <Route path="/profile" element={<Profile />} />
          
          {/* Admin Page Route */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Shop Page Route */}
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
