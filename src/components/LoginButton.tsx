import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface LoginButtonProps {
  onUserChange?: (user: any) => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onUserChange }) => {
  const { login, logout, user } = useAuth();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      console.log('Google login successful:', credentialResponse);
      
      // Send the credential to our backend
      const response = await axios.post('/google-login', {
        credential: credentialResponse.credential
      });

      if (response.data.success) {
        const userData = response.data.user;
        const token = response.data.token;
        
        // Store the token
        localStorage.setItem('token', token);
        
        // Update auth context
        login(userData);
        
        // Notify parent component if callback provided
        if (onUserChange) {
          onUserChange(userData);
        }
        
        console.log('User logged in successfully:', userData);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleError = () => {
    console.error('Google login failed');
    alert('Login failed. Please try again.');
  };

  const handleLogout = () => {
    logout();
    if (onUserChange) {
      onUserChange(null);
    }
    console.log('User logged out');
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <img 
            src={user.picture} 
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-gray-700 hidden md:inline">
            {user.name}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium text-sm"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={false}
        theme="outline"
        size="large"
        text="signin_with"
        shape="rectangular"
        logo_alignment="left"
        width="200"
      />
    </div>
  );
};

export default LoginButton; 