# Backend Server Setup

## Overview
Express.js server with MongoDB Atlas connection using Mongoose ODM.

## Dependencies Installed
- `express` - Web framework for Node.js
- `mongoose` - MongoDB object modeling tool
- `dotenv` - Environment variables loader
- `cors` - Cross-Origin Resource Sharing middleware
- `concurrently` - Run multiple commands concurrently (dev dependency)

## Configuration

### Environment Variables (.env)
```
MONGO_URI=mongodb+srv://AdminBae:SSC91KLSOjVwk0SJ@bcc.xoenyzd.mongodb.net/backcaseDB?retryWrites=true&w=majority&appName=BCC
```

### Database
- **Database Name**: `backcaseDB`
- **Connection**: MongoDB Atlas cluster
- **Authentication**: Username/Password

## Server Features

### Middleware
- **CORS**: Enabled for cross-origin requests
- **JSON Parser**: For handling JSON request bodies

### Routes
- **GET /** - Test route returning "API is running..."

### Connection Logging
- ✅ MongoDB connected (on successful connection)
- ❌ MongoDB connection error (on connection failure)
- 🚀 Server running on http://localhost:5000

## Available Scripts

### Development
```bash
# Run backend server only
npm run server

# Run both frontend and backend concurrently
npm run dev

# Run frontend only
npm start
```

### Production
```bash
# Build frontend
npm run build
```

## Server Information
- **Port**: 5000 (configurable via PORT environment variable)
- **URL**: http://localhost:5000
- **Database**: MongoDB Atlas (backcaseDB)

## Testing
Test the server is running:
```bash
curl http://localhost:5000
# Expected response: "API is running..."
```

## File Structure
```
├── server.js          # Main server file
├── .env              # Environment variables
├── package.json      # Dependencies and scripts
└── BACKEND_SETUP.md  # This documentation
``` 