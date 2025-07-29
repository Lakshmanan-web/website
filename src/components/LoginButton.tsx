import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

interface DecodedToken {
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  isAdmin: boolean;
}

interface LoginButtonProps {
  onUserChange?: (user: User | null) => void;
}

function LoginButton({ onUserChange }: LoginButtonProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check for existing user session on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        onUserChange?.(userData);
        console.log('Restored user session:', userData);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, [onUserChange]);

  const handleLoginSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Starting login process...");
      const decoded = jwtDecode<DecodedToken>(credentialResponse.credential);
      console.log("Decoded token:", decoded);

      // Send token to backend
      console.log("Sending request to backend...");
      const response = await axios.post('/google-login', {
        token: credentialResponse.credential
      });

      console.log('Backend response:', response.data);
      
      if (response.data.success) {
        const userData = response.data.user;
        console.log("Login successful, user data:", userData);
        
        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        onUserChange?.(userData);
        
        // Check if user is admin and redirect accordingly
        if (userData.isAdmin) {
          console.log("User is admin, redirecting to /admin");
          // Redirect to admin page
          navigate('/admin');
        } else {
          console.log("User is not admin, redirecting to /profile");
          // Redirect to profile page for regular users
          navigate('/profile');
        }
      } else {
        console.error("Backend returned error:", response.data.error);
        setError(response.data.error || 'Login failed');
      }
      
    } catch (error: any) {
      console.error('Login failed:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      setError(error.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginError = () => {
    console.log('Login Failed');
    setError('Google login failed. Please try again.');
  };

  const handleLogout = () => {
    console.log('Logout button clicked');
    console.log('Current user before logout:', user);
    console.log('localStorage before logout:', localStorage.getItem('user'));
    
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
    onUserChange?.(null);
    
    console.log('localStorage after logout:', localStorage.getItem('user'));
    console.log('User logged out successfully');
    
    // Redirect to home page instead of reloading
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center">
      {!user ? (
        <div className="text-center">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            theme="filled_blue"
            size="large"
            text="signin_with"
            shape="rectangular"
            width="200"
          />
          {loading && (
            <p className="text-sm text-gray-600 mt-2">Logging in...</p>
          )}
          {error && (
            <p className="text-sm text-red-600 mt-2">{error}</p>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <img 
            src={user.picture} 
            alt={user.name} 
            className="w-8 h-8 rounded-full"
          />
          <div className="text-left">
            <h2 className="text-sm font-bold text-gray-800">Welcome, {user.name}!</h2>
            <p className="text-xs text-gray-600">{user.email}</p>
            {user.isAdmin && (
              <p className="text-xs text-blue-600 font-semibold">Admin</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginButton; 