# Getting Started Guide

## Quick Setup (5 minutes)

### Prerequisites Check
- [ ] Node.js 16+ installed (`node -v`)
- [ ] MongoDB running locally or cloud URI ready
- [ ] Stripe account created
- [ ] Cloudinary account created

### Step 1: Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

Expected output: `Server running on port 5000`

### Step 2: Frontend Setup (new terminal)

```bash
cd frontend
npm install
npm start
```

Expected output: Browser opens to `http://localhost:3000`

### Step 3: Test the Application

1. Go to `http://localhost:3000`
2. Click "Sign Up"
3. Create test account
4. Upload test image
5. View content in dashboard

### Step 4: Test AR Viewer

1. Copy `ar-app/viewer.html` to your web server
2. OR use: `python -m http.server 8000` in ar-app folder
3. Access on Meta Quest Pro: `http://[your-ip]:8000/viewer.html`
4. Click "Enter AR Mode"
5. Select content from library

## Common Issues

**"Can't connect to MongoDB"**
```bash
# Install MongoDB locally (macOS)
brew install mongodb-community
brew services start mongodb-community

# Or use MongoDB Atlas cloud
# Update MONGODB_URI in .env
```

**"Port 5000 already in use"**
```bash
# Change PORT in .env
PORT=5001
```

**"npm ERR! code ENOENT"**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

**"AR not working on Quest"**
- Ensure device is on same WiFi network
- Use HTTPS or localhost
- Update WebXR runtime

## Next Features to Build

1. **Payment Integration** - Add Stripe checkout
2. **File Upload** - Integrate Cloudinary
3. **3D Models** - Support .glb/.obj files
4. **Social** - Add user profiles and sharing
5. **Analytics** - Track views and usage

## Performance Tips

- Use CDN for images
- Enable compression in Express
- Add caching headers
- Optimize bundle size
- Use database indexing

## Security Checklist

- [ ] Enable HTTPS in production
- [ ] Set strong JWT secret
- [ ] Validate all user inputs
- [ ] Use rate limiting
- [ ] Keep dependencies updated
- [ ] Never commit .env file
- [ ] Use CORS properly
- [ ] Sanitize user content

## Deployment Checklist

### Backend (Heroku example)
```bash
heroku create your-app-name
heroku addons:create mongolab:sandbox
git push heroku main
```

### Frontend (Vercel example)
```bash
npm install -g vercel
vercel
```

### AR Viewer
Deploy `ar-app/viewer.html` to any static host

## Support Resources

- GitHub Issues: Report bugs
- Discussions: Ask questions
- Wiki: Development guides
- Stack Overflow: General questions

Good luck! 🚀
