const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Google OAuth login endpoint
router.post('/google-login', async (req, res) => {
  try {
    const { credential } = req.body;
    
    if (!credential) {
      return res.status(400).json({ error: 'No credential provided' });
    }

    // Decode the JWT token from Google
    const decoded = jwt.decode(credential);
    
    if (!decoded) {
      return res.status(400).json({ error: 'Invalid credential' });
    }

    const { sub: googleId, name, email, picture } = decoded;

    // Check if user already exists
    let user = await User.findOne({ googleId });

    if (!user) {
      // Check if user exists by email
      user = await User.findOne({ email });
      
      if (user) {
        // Update existing user with Google ID
        user.googleId = googleId;
        user.picture = picture;
        await user.save();
      } else {
        // Create new user
        user = new User({
          googleId,
          name,
          email,
          picture,
          isAdmin: false // Default to regular user
        });
        await user.save();
      }
    }

    // Create JWT token for session management
    const token = jwt.sign(
      { userId: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        isAdmin: user.isAdmin
      },
      token
    });

  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        isAdmin: user.isAdmin
      }
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// Get all users (admin only)
router.get('/users', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    if (!decoded.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const users = await User.find({}, { googleId: 0 }); // Exclude googleId for security
    res.json({ users });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

module.exports = router; 