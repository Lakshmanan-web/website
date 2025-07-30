# Complete Google OAuth 2.0 Setup Guide

## 🎯 Current Configuration

### Client ID
```
293402160809-3juc0vnk5fifrcvgfujb6n6nd230tkr9.apps.googleusercontent.com
```

### Authorized JavaScript Origins
```
http://localhost:3000
https://www.backcaseculture.store
https://backcaseculture.store
```

### Authorized Redirect URIs
```
http://localhost:3000
https://www.backcaseculture.store
https://backcaseculture.store
```

## 📁 File Structure

```
backcase-culture/
├── src/
│   ├── App.tsx                    # ✅ GoogleOAuthProvider + AuthProvider
│   ├── context/
│   │   └── AuthContext.tsx        # ✅ Authentication state management
│   └── components/
│       ├── Header.jsx             # ✅ Updated with LoginButton
│       └── LoginButton.tsx        # ✅ Google OAuth login component
├── routes/
│   └── auth.js                    # ✅ Backend authentication routes
├── models/
│   └── User.js                    # ✅ User model for MongoDB
├── server.js                      # ✅ Updated with auth routes
└── package.json                   # ✅ All dependencies included
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install @react-oauth/google jwt-decode jsonwebtoken
```

### 2. Start the Application
```bash
# Start both frontend and backend
npm run dev

# Or start separately
npm run server  # Backend on port 5000
npm start       # Frontend on port 3000
```

### 3. Test Authentication
1. Open http://localhost:3000
2. Click the Google login button in the header
3. Complete Google OAuth flow
4. Verify user data is stored in MongoDB

## 🔧 Google Cloud Console Setup

### 1. Create OAuth 2.0 Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" → "Credentials"
3. Click "Create Credentials" → "OAuth 2.0 Client IDs"
4. Choose "Web application"
5. Name: `BackCase Culture Web Client`

### 2. Configure Authorized Origins
Add these URLs:
```
http://localhost:3000
https://www.backcaseculture.store
https://backcaseculture.store
```

### 3. Configure Authorized Redirect URIs
Add the same URLs:
```
http://localhost:3000
https://www.backcaseculture.store
https://backcaseculture.store
```

### 4. Copy Client ID
Use the generated Client ID in your app (already configured).

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
JWT_SECRET=your-super-secure-jwt-secret-key-here
GOOGLE_CLIENT_ID=293402160809-3juc0vnk5fifrcvgfujb6n6nd230tkr9.apps.googleusercontent.com
MONGO_URI=mongodb+srv://AdminBae:SSC91KLSOjVwk0SJ@bcc.xoenyzd.mongodb.net/backcaseDB?retryWrites=true&w=majority&appName=BCC
```

## 📋 API Endpoints

### Authentication
- `POST /google-login` - Google OAuth authentication
- `GET /profile` - Get user profile (requires token)
- `POST /logout` - Logout user
- `GET /users` - Get all users (admin only)

### Health Check
- `GET /health` - API health status
- `GET /` - API information

## 🔄 User Flow

1. **User clicks login** → Google OAuth popup opens
2. **User authenticates** → Google sends JWT token to frontend
3. **Frontend sends token** → Backend validates and stores user data
4. **Backend responds** → User is logged in and can access protected features
5. **User data stored** → MongoDB with user profile and admin status

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure CORS is configured for your domains
   - Check `server.js` allowed origins

2. **Redirect URI Mismatch**
   - Verify exact URL match in Google Console
   - No trailing slashes unless specified

3. **Login Button Not Appearing**
   - Check GoogleOAuthProvider is wrapping your app
   - Verify Client ID is correct
   - Check browser console for errors

4. **Authentication Fails**
   - Verify Google Cloud Console configuration
   - Check authorized origins include your domain
   - Ensure OAuth consent screen is configured

5. **Database Connection Issues**
   - Check MongoDB connection string
   - Verify network access
   - Check User model is properly defined

## 🔒 Security Considerations

1. **JWT Secret**: Use a strong, unique secret for JWT signing
2. **HTTPS**: Always use HTTPS in production
3. **CORS**: Configure CORS properly for your domains
4. **Token Storage**: Store tokens securely in localStorage
5. **User Validation**: Always validate tokens on the backend

## 📊 Testing Checklist

### Development Testing
- [ ] Google login button appears
- [ ] OAuth popup opens correctly
- [ ] User can authenticate with Google
- [ ] User data is stored in MongoDB
- [ ] JWT token is generated
- [ ] User can logout successfully

### Production Testing
- [ ] HTTPS is working
- [ ] Production domain is configured in Google Console
- [ ] Environment variables are set correctly
- [ ] Database connection is working
- [ ] CORS is configured for production domains

## 🚀 Deployment

### 1. Update Google Cloud Console
- Add production URLs to authorized origins
- Add production URLs to redirect URIs
- Configure OAuth consent screen

### 2. Set Environment Variables
```env
NODE_ENV=production
JWT_SECRET=your-production-jwt-secret
GOOGLE_CLIENT_ID=293402160809-3juc0vnk5fifrcvgfujb6n6nd230tkr9.apps.googleusercontent.com
MONGO_URI=your-production-mongodb-connection-string
```

### 3. Deploy to Hosting Platform
- Ensure HTTPS is enabled
- Set environment variables
- Configure domain routing

## 📚 Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google Documentation](https://github.com/MomenSherif/react-oauth)
- [JWT Documentation](https://jwt.io/)

## 🆘 Support

For issues with the OAuth flow:
1. Check Google Cloud Console logs
2. Verify Google OAuth console settings
3. Review server logs for errors
4. Test with different browsers
5. Check browser console for errors

---

**Current Status**: ✅ Fully configured and ready for testing
**Client ID**: `293402160809-3juc0vnk5fifrcvgfujb6n6nd230tkr9.apps.googleusercontent.com`
**Environment**: Development and Production ready 