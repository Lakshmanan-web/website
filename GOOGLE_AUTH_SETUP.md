# Google Authentication Setup

## Overview
Google OAuth 2.0 authentication implemented using @react-oauth/google for the frontend and Express.js backend with MongoDB storage.

## Frontend Implementation

### Dependencies Installed
- `@react-oauth/google` - Google OAuth React components
- `jwt-decode` - JWT token decoding
- `axios` - HTTP client for API calls

### Key Components

#### 1. GoogleOAuthProvider (src/index.tsx)
```tsx
import { GoogleOAuthProvider } from '@react-oauth/google';

<GoogleOAuthProvider clientId="488390902124-ru63gdprvhsvpcqmpssd0d4s9926jo37.apps.googleusercontent.com">
  <App />
</GoogleOAuthProvider>
```

#### 2. LoginButton Component (src/components/LoginButton.tsx)
- Renders Google login button when user is not authenticated
- Shows user profile with logout button when authenticated
- Handles JWT token decoding and API calls
- Integrates with AuthContext for state management

#### 3. AuthContext (src/context/AuthContext.tsx)
- Manages authentication state across the application
- Provides user data, login/logout functions
- Persists user data in localStorage

### Authentication Flow
1. User clicks "Sign in with Google"
2. Google OAuth popup appears
3. User authenticates with Google
4. JWT token is received and decoded
5. Token and user info sent to backend
6. User data stored in MongoDB
7. User state updated in frontend
8. User profile displayed with logout option

## Backend Implementation

### API Endpoints

#### POST /google-login
Handles Google authentication and user storage.

**Request Body:**
```json
{
  "token": "google_jwt_token",
  "userInfo": {
    "googleId": "user_google_id",
    "name": "Full Name",
    "email": "user@example.com",
    "picture": "profile_picture_url",
    "firstName": "First",
    "lastName": "Last"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "user": {
    "id": "mongodb_user_id",
    "name": "Full Name",
    "email": "user@example.com",
    "picture": "profile_picture_url",
    "firstName": "First",
    "lastName": "Last"
  }
}
```

#### GET /users
Returns all users (for testing purposes).

### Database Schema (User Model)
```javascript
{
  googleId: String (unique, required),
  name: String (required),
  email: String (unique, required),
  picture: String (required),
  firstName: String (required),
  lastName: String (required),
  createdAt: Date (default: now),
  lastLogin: Date (default: now)
}
```

## Features

### ✅ Implemented
- Google OAuth 2.0 authentication
- JWT token decoding
- User data storage in MongoDB
- Authentication state management
- Persistent login (localStorage)
- User profile display
- Logout functionality
- Responsive design
- Error handling

### 🔧 User Experience
- **Before Login**: Google sign-in button
- **After Login**: User profile picture, name, and logout button
- **Persistent**: Login state maintained across page refreshes
- **Responsive**: Works on mobile and desktop

### 🛡️ Security
- JWT token validation
- Secure API endpoints
- User data validation
- Error handling and logging

## Usage

### Starting the Application
```bash
# Run backend server
npm run server

# Run frontend (in another terminal)
npm start

# Or run both concurrently
npm run dev
```

### Testing Authentication
1. Start both frontend and backend servers
2. Click the "Sign in with Google" button in the header
3. Complete Google authentication
4. Verify user data is stored in MongoDB
5. Test logout functionality

### API Testing
```bash
# Test the API endpoint
curl -X POST http://localhost:5000/google-login \
  -H "Content-Type: application/json" \
  -d '{"token":"test","userInfo":{"googleId":"123","name":"Test User","email":"test@example.com","picture":"url","firstName":"Test","lastName":"User"}}'

# Get all users
curl http://localhost:5000/users
```

## File Structure
```
src/
├── components/
│   ├── LoginButton.tsx     # Google login component
│   └── Header.jsx          # Updated with login button
├── context/
│   └── AuthContext.tsx     # Authentication state management
├── index.tsx               # Updated with GoogleOAuthProvider
└── App.tsx                 # Updated with AuthProvider

server.js                   # Backend with Google login route
.env                        # Environment variables
```

## Environment Variables
```
MONGO_URI=mongodb+srv://AdminBae:SSC91KLSOjVwk0SJ@bcc.xoenyzd.mongodb.net/backcaseDB?retryWrites=true&w=majority&appName=BCC
```

## Google OAuth Configuration
- **Client ID**: 921648397743-crqvel60v6d6knnv83p8nant7hn53eqm.apps.googleusercontent.com
- **Authorized Origins**: http://localhost:3000
- **Authorized Redirect URIs**: http://localhost:3000

## Troubleshooting

### Common Issues
1. **CORS Errors**: Backend has CORS enabled for localhost:3000
2. **JWT Decode Errors**: Using `jwtDecode` from 'jwt-decode' package
3. **MongoDB Connection**: Ensure .env file has correct MONGO_URI
4. **Google OAuth**: Verify client ID and authorized origins

### Debug Steps
1. Check browser console for frontend errors
2. Check server console for backend errors
3. Verify MongoDB connection
4. Test API endpoints with curl or Postman 