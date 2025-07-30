# Google OAuth Setup from Scratch

## Step 1: Google Cloud Console Setup

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it: `backcase-culture-auth`
4. Click "Create"

### 2. Enable Google+ API
1. Go to "APIs & Services" → "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click "Enable"

### 3. Create OAuth 2.0 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Name: `BackCase Culture Web Client`

### 4. Configure Authorized Origins
Add these URLs:
- `http://localhost:3000` (for development)
- `https://www.backcaseculture.store` (for production)
- `https://backcaseculture.store` (for production)

### 5. Configure Authorized Redirect URIs
Add these URLs:
- `http://localhost:3000` (for development)
- `https://www.backcaseculture.store` (for production)
- `https://backcaseculture.store` (for production)

### 6. Get Your Client ID
Copy the generated Client ID - you'll need this for the frontend.

## Step 2: Frontend Implementation

### Install Dependencies
```bash
npm install @react-oauth/google jwt-decode
```

### Frontend Files to Create:
1. `src/context/AuthContext.tsx` - Authentication state management
2. `src/components/LoginButton.tsx` - Google OAuth login component
3. Update `src/App.tsx` - Wrap with GoogleOAuthProvider
4. Update `src/components/Header.jsx` - Add login button

## Step 3: Backend Implementation

### Install Dependencies
```bash
npm install jsonwebtoken
```

### Backend Files to Create:
1. `routes/auth.js` - Authentication routes
2. `models/User.js` - User model for database
3. Update `server.js` - Add auth routes

## Step 4: Database Setup

### User Model Schema:
```javascript
{
  name: String,
  email: String (unique),
  picture: String,
  googleId: String (unique),
  isAdmin: Boolean (default: false)
}
```

## Step 5: Security Considerations

### Environment Variables:
- Store Google Client ID in `.env`
- Store JWT secret in `.env`
- Never commit secrets to Git

### CORS Configuration:
- Configure CORS for your domains
- Handle preflight requests properly

## Step 6: Testing

### Development Testing:
1. Start frontend: `npm start`
2. Start backend: `npm run server`
3. Test login flow
4. Check database storage

### Production Deployment:
1. Update Google Cloud Console with production URLs
2. Set environment variables
3. Deploy to your hosting platform

## Common Issues & Solutions

### 1. CORS Errors
**Problem**: Frontend can't reach backend
**Solution**: Configure CORS properly in server.js

### 2. Redirect URI Mismatch
**Problem**: Google rejects authentication
**Solution**: Ensure exact URL match in Google Console

### 3. JWT Decode Errors
**Problem**: Can't decode Google token
**Solution**: Use correct JWT library and handle errors

### 4. Database Connection Issues
**Problem**: User data not saved
**Solution**: Check MongoDB connection and User model

## Next Steps

After completing this setup, you'll have:
- ✅ Google OAuth authentication
- ✅ User data stored in MongoDB
- ✅ Protected routes
- ✅ User profile management
- ✅ Admin functionality

Ready to start implementing? Let me know which step you'd like to begin with! 