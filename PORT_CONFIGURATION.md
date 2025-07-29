# Port Configuration

## Current Setup

### ✅ Port Assignment
- **Frontend React App**: `http://localhost:3000`
- **Backend Server (Express.js)**: `http://localhost:5000`

### 🔧 Configuration Details

#### Frontend (Port 3000)
- **File**: `package.json` start script
- **Configuration**: `set PORT=3000 && react-scripts start`
- **Purpose**: React development server, user interface
- **Proxy**: Routes API calls to backend on port 5000

#### Backend (Port 5000)
- **File**: `server.js`
- **Configuration**: `const PORT = process.env.PORT || 5000;`
- **Purpose**: API endpoints, MongoDB connection
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

### 🔄 API Endpoints
All API calls from frontend use relative URLs (proxy handles routing):
- `/users` - Get all users
- `/` - API health check

### ✅ Why This Configuration?
1. **No Conflicts**: Frontend and backend on different ports
2. **Proxy Configuration**: Frontend automatically routes API calls to backend
3. **No CORS Issues**: Proxy handles cross-origin requests

### 🛠️ Troubleshooting
- **CORS errors**: Proxy configuration handles this automatically
- **Port conflicts**: Frontend on 3000, backend on 5000
- **API calls failing**: Ensure proxy is configured in package.json

### 📁 Files Updated
- `server.js` - Default port changed to 5000
- `package.json` - Added proxy configuration
- `.env` - Removed PORT setting (uses default 5000) 