# Port Configuration

## Current Setup

### ✅ Port Assignment
- **Frontend React App**: `http://localhost:3000` (Google Cloud OAuth compatible)
- **Backend Server (Express.js)**: `http://localhost:5000`
- **Google Cloud OAuth**: Configured for `http://localhost:3000`

### 🔧 Configuration Details

#### Frontend (Port 3000)
- **File**: `package.json` start script
- **Configuration**: `set PORT=3000 && react-scripts start`
- **Purpose**: React development server, user interface, Google OAuth
- **Google Cloud**: Configured to work with this port
- **Proxy**: Routes API calls to backend on port 5000

#### Backend (Port 5000)
- **File**: `server.js`
- **Configuration**: `const PORT = process.env.PORT || 5000;`
- **Purpose**: API endpoints, Google OAuth handling, MongoDB connection
- **Environment**: No PORT in .env (uses default 5000)

### 🚀 How to Run

#### Option 1: Run Both Concurrently
```bash
npm run dev
```
This will start:
- Frontend on port 3000
- Backend on port 5000

#### Option 2: Run Separately
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm start
```

### 🌐 Access URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Google OAuth**: Configured for http://localhost:3000

### 🔄 API Endpoints
All API calls from frontend use relative URLs (proxy handles routing):
- `/google-login` - Google authentication
- `/users` - Get all users
- `/` - API health check

### ✅ Why This Configuration?
1. **Google Cloud OAuth**: Requires port 3000 for redirect_uri
2. **No Conflicts**: Frontend and backend on different ports
3. **Proxy Configuration**: Frontend automatically routes API calls to backend
4. **No CORS Issues**: Proxy handles cross-origin requests

### 🔧 Google OAuth Flow
1. **User clicks login** → Frontend (port 3000)
2. **Google OAuth popup** → Google Cloud (configured for port 3000)
3. **OAuth callback** → Frontend (port 3000)
4. **Token sent to backend** → Proxy routes to Backend (port 5000)
5. **User data stored** → MongoDB via backend
6. **Response sent back** → Frontend (port 3000)

### 🛠️ Troubleshooting
- **Error 400: redirect_uri_mismatch**: Ensure Google Cloud is configured for http://localhost:3000
- **CORS errors**: Proxy configuration handles this automatically
- **Port conflicts**: Frontend on 3000, backend on 5000
- **API calls failing**: Ensure proxy is configured in package.json

### 📁 Files Updated
- `server.js` - Default port changed to 5000
- `package.json` - Added proxy configuration
- `src/components/LoginButton.tsx` - Using relative URLs
- `.env` - Removed PORT setting (uses default 5000) 