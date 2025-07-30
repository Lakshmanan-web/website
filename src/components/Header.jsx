import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../photo/logo.jpg';
import LoginButton from './LoginButton';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user?.isAdmin) {
      navigate('/admin');
    } else {
      navigate('/profile');
    }
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
        <LoginButton />
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