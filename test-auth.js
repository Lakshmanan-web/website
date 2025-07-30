const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// Test Google login route
app.post('/google-login', (req, res) => {
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

    // Mock user data (in real app, this would come from database)
    const user = {
      id: 'test-user-id',
      googleId,
      name,
      email,
      picture,
      isAdmin: false
    };

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, isAdmin: user.isAdmin },
      'test-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        isAdmin: user.isAdmin
      },
      token
    });

  } catch (error) {
    console.error('Test login error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Test profile route
app.get('/profile', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'test-secret-key');
    res.json({
      user: {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com',
        picture: 'https://via.placeholder.com/150',
        isAdmin: false
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log('✅ Test auth server running on http://localhost:5001');
  console.log('✅ Google login endpoint: POST http://localhost:5001/google-login');
  console.log('✅ Profile endpoint: GET http://localhost:5001/profile');
}); 