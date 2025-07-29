const express = require('express');
const router = express.Router();
const { jwtDecode } = require('jwt-decode');
const User = require('../models/User');

const adminEmails = ["corvuxaurea@gmail.com"];

router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwtDecode(token);
    const { name, email, picture, sub: googleId } = decoded;
    const isAdmin = adminEmails.includes(email);

    // Try to find user by googleId first, then by email
    let user = await User.findOne({ googleId });
    
    if (!user) {
      user = await User.findOne({ email });
    }

    if (!user) {
      // Create new user with googleId and admin status
      user = await User.create({ name, email, picture, googleId, isAdmin });
    } else {
      // Update existing user with googleId if not present and check admin status
      if (!user.googleId) {
        user.googleId = googleId;
      }
      if (user.isAdmin !== isAdmin) {
        user.isAdmin = isAdmin;
      }
      await user.save();
    }

    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        picture: user.picture,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: err.message
    });
  }
});

module.exports = router; 