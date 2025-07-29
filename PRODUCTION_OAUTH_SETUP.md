# Production OAuth Setup for BackCase Culture

## Overview
This guide covers the configuration needed to enable Google OAuth authentication for the production domain `https://www.backcaseculture.store`.

## Current Configuration

### Backend Server (server.js)
- ✅ CORS configured for production domains
- ✅ Environment variable support
- ✅ Enhanced error handling
- ✅ Health check endpoint
- ✅ MongoDB connection with fallback

### Authentication Route (/routes/auth.js)
- ✅ Token validation
- ✅ User creation/update logic
- ✅ Admin role management
- ✅ Enhanced error responses
- ✅ Login tracking

## Google OAuth Console Configuration

### 1. Authorized JavaScript Origins
Add these URLs to your Google OAuth 2.0 client:
```
http://localhost:3000
https://www.backcaseculture.store
https://backcaseculture.store
```

### 2. Authorized Redirect URIs
Add these redirect URIs:
```
http://localhost:3000
https://www.backcaseculture.store
https://backcaseculture.store
```

### 3. OAuth Client ID
Current Client ID: `921648397743-crqvel60v6d6knnv83p8nant7hn53eqm.apps.googleusercontent.com`

## Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://AdminBae:SSC91KLSOjVwk0SJ@bcc.xoenyzd.mongodb.net/backcaseDB?retryWrites=true&w=majority&appName=BCC

# Google OAuth Configuration
GOOGLE_CLIENT_ID=921648397743-crqvel60v6d6knnv83p8nant7hn53eqm.apps.googleusercontent.com

# Server Configuration
PORT=5000
NODE_ENV=production

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://www.backcaseculture.store,https://backcaseculture.store
```

## Frontend Configuration

### 1. Update GoogleOAuthProvider
In `src/index.tsx`, ensure the client ID is correct:

```tsx
import { GoogleOAuthProvider } from '@react-oauth/google';

<GoogleOAuthProvider clientId="921648397743-crqvel60v6d6knnv83p8nant7hn53eqm.apps.googleusercontent.com">
  <App />
</GoogleOAuthProvider>
```

### 2. API Base URL
Update your API calls to use the production server URL:

```javascript
// For development
const API_BASE = 'http://localhost:5000';

// For production
const API_BASE = 'https://your-production-server.com';
```

## Production Deployment Checklist

### ✅ Backend
- [ ] Server running on production port
- [ ] CORS configured for production domains
- [ ] Environment variables set
- [ ] MongoDB connection working
- [ ] Health check endpoint accessible

### ✅ Frontend
- [ ] Google OAuth client ID configured
- [ ] API endpoints pointing to production server
- [ ] HTTPS enabled for production domain
- [ ] Build optimized for production

### ✅ Google OAuth Console
- [ ] Authorized origins added
- [ ] Redirect URIs configured
- [ ] Client ID verified
- [ ] OAuth consent screen configured

## Testing the OAuth Flow

### 1. Development Testing
```bash
# Start the development server
npm run dev

# Test the health endpoint
curl http://localhost:5000/health

# Test the API endpoint
curl http://localhost:5000/
```

### 2. Production Testing
1. Deploy your application
2. Visit `https://www.backcaseculture.store`
3. Click "Sign in with Google"
4. Complete the OAuth flow
5. Verify user data is stored in MongoDB

## Troubleshooting

### Common Issues

#### 1. CORS Errors
**Symptoms**: Browser console shows CORS errors
**Solution**: Ensure your production domain is in the `allowedOrigins` array

#### 2. OAuth Popup Blocked
**Symptoms**: Google OAuth popup doesn't appear
**Solution**: Check that your domain is in Google OAuth authorized origins

#### 3. Token Validation Errors
**Symptoms**: "Invalid token" errors
**Solution**: Verify the JWT token is being sent correctly from frontend

#### 4. MongoDB Connection Issues
**Symptoms**: Database connection errors
**Solution**: Check MONGO_URI environment variable and network connectivity

### Debug Steps
1. Check browser console for frontend errors
2. Check server logs for backend errors
3. Test API endpoints with curl or Postman
4. Verify Google OAuth console configuration
5. Check environment variables

## Security Considerations

### ✅ Implemented
- CORS protection
- Token validation
- Error handling
- Environment-based error messages
- Admin role management

### 🔒 Additional Recommendations
- Use HTTPS in production
- Implement rate limiting
- Add request logging
- Set up monitoring
- Regular security audits

## API Endpoints

### Authentication
- `POST /google-login` - Google OAuth authentication
- `GET /health` - Health check endpoint
- `GET /` - API information

### Response Format
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "picture": "profile_picture_url",
    "isAdmin": false,
    "lastLogin": "2024-01-01T00:00:00.000Z"
  }
}
```

## Support

For issues with the OAuth flow:
1. Check the server logs
2. Verify Google OAuth console settings
3. Test with the health endpoint
4. Review the troubleshooting section above 