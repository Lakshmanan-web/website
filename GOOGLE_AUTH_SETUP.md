# Google Authentication Setup

## Overview
Google OAuth 2.0 authentication implemented using @react-oauth/google for the frontend and Express.js backend with MongoDB storage.

## Dependencies

### Frontend
- `@react-oauth/google` - Google OAuth React components
- `jwt-decode` - Decode JWT tokens from Google

### Backend
- `jsonwebtoken` - JWT token handling
- `mongoose` - MongoDB database operations

## Implementation

### 1. GoogleOAuthProvider Setup
Wrap your app with GoogleOAuthProvider in `src/App.tsx`:

```tsx
import { GoogleOAuthProvider } from '@react-oauth/google';

<GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
  {/* Your app components */}
</GoogleOAuthProvider>
```

### 2. Authentication Context
The `AuthContext` manages user state across the application:

```tsx
import { useAuth } from '../context/AuthContext';

const { user, login, logout, isAuthenticated } = useAuth();
```

### 3. Login Button Component
The `LoginButton` component handles Google OAuth flow:

```tsx
import LoginButton from './components/LoginButton';

<LoginButton onUserChange={handleUserChange} />
```

### 4. Backend Authentication Routes
The `/routes/auth.js` file contains:

- `POST /google-login` - Handle Google OAuth login
- `GET /profile` - Get user profile
- `POST /logout` - Logout user
- `GET /users` - Get all users (admin only)

### 5. User Model
The User model in `models/User.js` stores:

```javascript
{
  name: String,
  email: String (unique),
  picture: String,
  googleId: String (unique),
  isAdmin: Boolean (default: false)
}
```

## Google Cloud Console Setup

### 1. Create OAuth 2.0 Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" → "Credentials"
3. Click "Create Credentials" → "OAuth 2.0 Client IDs"
4. Choose "Web application"
5. Add authorized origins:
   - `http://localhost:3000` (development)
   - `https://www.backcaseculture.store` (production)
   - `https://backcaseculture.store` (production)
6. Add authorized redirect URIs (same as origins)
7. Copy the Client ID

### 2. Update Client ID
Replace `YOUR_GOOGLE_CLIENT_ID` in `src/App.tsx` with your actual Client ID.

**Current Client ID**: `293402160809-3juc0vnk5fifrcvgfujb6n6nd230tkr9.apps.googleusercontent.com`

## Environment Variables

Create a `.env` file in the root directory:

```env
JWT_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
MONGO_URI=your-mongodb-connection-string
```

## Security Considerations

1. **JWT Secret**: Use a strong, unique secret for JWT signing
2. **HTTPS**: Always use HTTPS in production
3. **CORS**: Configure CORS properly for your domains
4. **Token Storage**: Store tokens securely in localStorage
5. **User Validation**: Always validate tokens on the backend

## Testing

### Development Testing
1. Start the backend: `npm run server`
2. Start the frontend: `npm start`
3. Click the Google login button
4. Complete the OAuth flow
5. Check that user data is stored in MongoDB

### Common Issues

1. **CORS Errors**: Ensure CORS is configured for your domains
2. **Redirect URI Mismatch**: Check Google Cloud Console settings
3. **JWT Decode Errors**: Verify the JWT library is working correctly
4. **Database Connection**: Ensure MongoDB is connected

## Production Deployment

1. Update Google Cloud Console with production URLs
2. Set environment variables on your hosting platform
3. Ensure HTTPS is enabled
4. Test the complete authentication flow

## API Endpoints

- `POST /google-login` - Google OAuth authentication
- `GET /profile` - Get user profile (requires token)
- `POST /logout` - Logout user
- `GET /users` - Get all users (admin only, requires token)

## User Flow

1. **User clicks login** → Google OAuth popup opens
2. **User authenticates** → Google sends JWT token to frontend
3. **Frontend sends token** → Backend validates and stores user data
4. **Backend responds** → User is logged in and can access protected features
5. **User data stored** → MongoDB with user profile and admin status 