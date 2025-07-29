const express = require('express');
const router = express.Router();
const { jwtDecode } = require('jwt-decode');
const User = require('../models/User');

const adminEmails = ["corvuxaurea@gmail.com"];

router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token is required"
    });
  }

  try {
    const decoded = jwtDecode(token);
    const { name, email, picture, sub: googleId } = decoded;
    
    // Validate required fields
    if (!email || !googleId) {
      return res.status(400).json({
        success: false,
        message: "Invalid token: missing required fields"
      });
    }

    const isAdmin = adminEmails.includes(email);

    // Try to find user by googleId first, then by email
    let user = await User.findOne({ googleId });
    
    if (!user) {
      user = await User.findOne({ email });
    }

    if (!user) {
      // Create new user with googleId and admin status
      user = await User.create({ 
        name: name || 'Unknown User', 
        email, 
        picture: picture || '', 
        googleId, 
        isAdmin 
      });
      console.log(`✅ New user created: ${email}`);
    } else {
      // Update existing user with googleId if not present and check admin status
      if (!user.googleId) {
        user.googleId = googleId;
      }
      if (user.isAdmin !== isAdmin) {
        user.isAdmin = isAdmin;
      }
      user.lastLogin = new Date();
      await user.save();
      console.log(`✅ User logged in: ${email}`);
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        isAdmin: user.isAdmin,
        lastLogin: user.lastLogin
      }
    });
  } catch (err) {
    console.error('❌ Google login error:', err);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

module.exports = router; 