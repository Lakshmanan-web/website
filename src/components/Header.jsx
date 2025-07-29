import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../photo/logo.jpg';
import LoginButton from './LoginButton';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const handleProfileClick = () => {
    if (user?.isAdmin) {
      navigate('/admin');
    } else {
      navigate('/profile');
    }
  };

  const handleUserChange = (newUser) => {
    setUser(newUser);
  };

  return (
    <header className="bg-gradient-to-b from-cyan-100 to-pista shadow-sm py-10 px-4 relative">
      {/* Login Button and Profile Button - Top Right */}
      <div className="absolute top-4 right-4 flex items-center gap-3">
        {user && (
          <button
            onClick={handleProfileClick}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
          >
            <span>👤</span>
            Profile
          </button>
        )}
        <LoginButton onUserChange={handleUserChange} />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Large Centered Logo */}
        <div className="mb-6">
          <img src={logoImg} alt="The BackCase Culture Logo" className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg" />
        </div>

        {/* Store Name */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-3">
          The BackCase Culture
        </h1>

        {/* Optional Subtitle */}
        <p className="text-lg md:text-xl text-gray-700 text-center max-w-2xl mx-auto">
          Premium phone cases for every device
        </p>
      </div>
    </header>
  );
};

export default Header; 