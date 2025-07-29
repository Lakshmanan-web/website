const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Test Google login route
app.post('/google-login', (req, res) => {
  console.log('Received login request:', req.body);
  res.json({
    success: true,
    user: {
      name: 'Test User',
      email: 'test@example.com',
      picture: 'https://via.placeholder.com/150',
      isAdmin: false
    }
  });
});

app.listen(5000, () => {
  console.log('🚀 Test server running on http://localhost:5000');
  console.log('✅ Test endpoint: http://localhost:5000/test');
  console.log('✅ Google login endpoint: POST http://localhost:5000/google-login');
}); 