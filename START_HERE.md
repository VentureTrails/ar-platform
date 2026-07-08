# 🚀 Quick Start Guide

## Step 1: Get MongoDB Running

### Option A: MongoDB Local (Windows)
```bash
# Download and install from: https://www.mongodb.com/try/download/community
# After installation, run in Command Prompt:
mongod
```

### Option B: MongoDB Atlas (Cloud - Recommended for Easy Deployment)
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Create account
4. Create a free cluster
5. Click "Connect" 
6. Select "Drivers" > Node.js
7. Copy connection string
8. Open `backend/.env`
9. Replace `MONGODB_URI=` with your connection string
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ar-platform
   ```

## Step 2: Start Backend Server

### Quick Start (Easiest):
Double-click: `start-backend.bat`

### Or Manual:
```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
Connected to MongoDB
```

If you see this, ✅ Backend is ready!

## Step 3: Start Frontend (New Terminal/Command Prompt)

### Quick Start:
Double-click: `start-frontend.bat`

### Or Manual:
```bash
cd frontend
npm start
```

Expected: Browser opens to `http://localhost:3000`

## Step 4: Test It Out

1. Go to `http://localhost:3000`
2. Click "Sign Up"
3. Create test account:
   - Email: `test@example.com`
   - Username: `testuser`
   - Password: `password123`
4. Click "Sign Up"
5. You should see the Dashboard!
6. Try uploading test content

## Troubleshooting

### "Cannot connect to MongoDB"
- Make sure MongoDB is running (mongod in separate terminal)
- Or use MongoDB Atlas connection string in .env

### "Port 5000 already in use"
- Open `backend/.env`
- Change `PORT=5000` to `PORT=5001` (or any unused port)

### "npm not found"
- Install Node.js from: https://nodejs.org

### Frontend won't load
- Make sure backend is running on port 5000
- Check `frontend/package.json` proxy setting

## Next: Deploy to Live

Once everything works locally, deploy to:
- **Backend**: Heroku, Railway, or AWS
- **Frontend**: Vercel, Netlify
- See: `DEPLOYMENT.md` for detailed steps

## API Status Check

Backend is working if you can access:
http://localhost:5000/api/health

## Files Created For You

- `setup.bat` - Installs all dependencies
- `start-backend.bat` - Runs backend
- `start-frontend.bat` - Runs frontend
- `backend/.env` - Configuration file
- All source code in `backend/` and `frontend/`

## Questions?

Check these docs:
- `README.md` - Full overview
- `API_DOCUMENTATION.md` - All endpoints
- `PROJECT_OVERVIEW.md` - Architecture
