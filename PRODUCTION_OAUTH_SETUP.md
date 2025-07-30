# Production OAuth Setup for BackCase Culture

## Overview
This guide covers the configuration needed to enable Google OAuth authentication for the production domain `https://www.backcaseculture.store`.

## Production Configuration

### 1. Google Cloud Console Setup

#### OAuth 2.0 Client Configuration
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your project: `backcase-culture-auth`
3. Go to "APIs & Services" → "Credentials"
4. Edit your OAuth 2.0 Client ID

#### Authorized JavaScript Origins
Add these URLs to your Google OAuth 2.0 client:
```
https://www.backcaseculture.store
https://backcaseculture.store
http://localhost:3000 (for development)
```

#### Authorized Redirect URIs
Add these URLs:
```
https://www.backcaseculture.store
https://backcaseculture.store
http://localhost:3000 (for development)
```

### 2. Environment Variables

#### Production Environment
Set these environment variables on your hosting platform:

```env
NODE_ENV=production
JWT_SECRET=your-super-secure-jwt-secret-key
GOOGLE_CLIENT_ID=293402160809-3juc0vnk5fifrcvgfujb6n6nd230tkr9.apps.googleusercontent.com
MONGO_URI=your-production-mongodb-connection-string
```

#### Security Notes
- Use a strong, unique JWT secret
- Never commit secrets to Git
- Use environment variables for all sensitive data

### 3. Frontend Configuration

#### Update GoogleOAuthProvider
Ensure your `src/App.tsx` uses the production Client ID:

```tsx
import { GoogleOAuthProvider } from '@react-oauth/google';

<GoogleOAuthProvider clientId="293402160809-3juc0vnk5fifrcvgfujb6n6nd230tkr9.apps.googleusercontent.com">
  {/* Your app components */}
</GoogleOAuthProvider>
```

#### HTTPS Requirements
- Production must use HTTPS
- Google OAuth requires secure connections
- All API calls must use HTTPS

### 4. Backend Configuration

#### CORS Settings
Update `server.js` CORS configuration:

```javascript
const allowedOrigins = [
  'https://www.backcaseculture.store',
  'https://backcaseculture.store',
  'http://localhost:3000' // for development
];
```

#### Authentication Route
The `/routes/auth.js` handles:
- Google OAuth token validation
- User data storage in MongoDB
- JWT token generation
- Session management

### 5. Database Configuration

#### MongoDB Atlas Setup
1. Create production database cluster
2. Configure network access for your hosting platform
3. Create database user with appropriate permissions
4. Update connection string in environment variables

#### User Model
The User model stores:
```javascript
{
  name: String,
  email: String (unique),
  picture: String,
  googleId: String (unique),
  isAdmin: Boolean (default: false)
}
```

## Deployment Checklist

### ✅ Pre-Deployment
- [ ] Google OAuth client ID configured
- [ ] Authorized origins added
- [ ] Redirect URIs configured
- [ ] Environment variables set
- [ ] HTTPS certificate installed
- [ ] MongoDB connection configured

### ✅ Google OAuth Console
- [ ] Authorized origins added
- [ ] Redirect URIs configured
- [ ] OAuth consent screen configured
- [ ] Scopes configured (email, profile)

### ✅ Backend Configuration
- [ ] CORS configured for production domains
- [ ] JWT secret set in environment
- [ ] MongoDB connection string configured
- [ ] Authentication routes deployed

## Testing the OAuth Flow

### 1. Development Testing
1. Start local development server
2. Test login flow on localhost:3000
3. Verify user data is stored in database
4. Check JWT token generation

### 2. Production Testing
1. Deploy to production environment
2. Test login flow on production domain
3. Verify HTTPS is working
4. Check database connectivity
5. Test user session management

### 3. Security Testing
1. Verify JWT tokens are secure
2. Test CORS configuration
3. Check user data privacy
4. Validate admin access controls

## Troubleshooting

### 1. OAuth Popup Blocked
**Symptoms**: Google OAuth popup doesn't appear
**Solution**: Check that your domain is in Google OAuth authorized origins

### 2. Redirect URI Mismatch
**Symptoms**: Google rejects authentication
**Solution**: Ensure exact URL match in Google Console

### 3. CORS Errors
**Symptoms**: Frontend can't reach backend
**Solution**: Update CORS configuration for production domains

### 4. Database Connection Issues
**Symptoms**: User data not saved
**Solution**: Check MongoDB connection and network access

## API Endpoints

### Authentication
- `POST /google-login` - Google OAuth authentication
- `GET /profile` - Get user profile (requires token)
- `POST /logout` - Logout user
- `GET /users` - Get all users (admin only)

### Health Check
- `GET /health` - API health status
- `GET /` - API information

## Monitoring and Maintenance

### 1. Log Monitoring
- Monitor authentication logs
- Track failed login attempts
- Monitor database performance

### 2. Security Updates
- Keep dependencies updated
- Monitor for security vulnerabilities
- Regular JWT secret rotation

### 3. Performance Monitoring
- Monitor API response times
- Track database query performance
- Monitor OAuth flow completion rates

## Support and Documentation

For issues with the OAuth flow:
1. Check Google Cloud Console logs
2. Verify Google OAuth console settings
3. Review server logs for errors
4. Test with different browsers

## Security Best Practices

1. **HTTPS Only**: All production traffic must use HTTPS
2. **Secure Headers**: Implement security headers
3. **Token Management**: Secure JWT token handling
4. **User Validation**: Always validate tokens server-side
5. **Database Security**: Secure MongoDB access
6. **Environment Variables**: Never expose secrets in code 