const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

// CORS configuration for production and development
const allowedOrigins = [
  'http://localhost:3000',
  'https://www.backcaseculture.store',
  'https://backcaseculture.store'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

const casesRoutes = require('./routes/cases');

app.use('/', casesRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'BackCase Culture API is running...',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      cases: '/cases'
    }
  });
});

const mongoUri = process.env.MONGO_URI || 'mongodb+srv://AdminBae:SSC91KLSOjVwk0SJ@bcc.xoenyzd.mongodb.net/backcaseDB?retryWrites=true&w=majority&appName=BCC';
const PORT = process.env.PORT || 5000;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Allowed origins: ${allowedOrigins.join(', ')}`);
  });
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
}); 