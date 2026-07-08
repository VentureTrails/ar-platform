# AR Content Platform for Meta Quest Pro

A full-stack web application for managing and viewing content on Meta Quest Pro AR goggles with monthly subscription tiers.

## Project Structure

```
├── backend/           # Express.js API server
├── frontend/          # React web application
├── ar-app/            # WebXR AR viewer for Meta Quest Pro
└── README.md
```

## Features

- ✅ User authentication (registration & login)
- ✅ Monthly subscription tiers (Free, Pro, Enterprise)
- ✅ Image content upload & management
- ✅ Content visibility control (public/private)
- ✅ Meta Quest Pro WebXR integration
- ✅ AR content viewing and positioning
- ✅ User dashboard with content library
- ✅ View tracking and analytics

## Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB for database
- JWT authentication
- Stripe for payments
- Multer for file uploads
- Cloudinary for image storage

**Frontend:**
- React 18
- React Router
- Axios for API calls
- CSS3 for styling

**AR Integration:**
- Three.js for 3D rendering
- WebXR API for AR support
- Meta Quest Pro compatibility

## Prerequisites

- Node.js 16+ and npm
- MongoDB (local or cloud)
- Stripe account
- Cloudinary account
- Meta Quest Pro or compatible XR device

## Installation

### 1. Backend Setup

```bash
cd backend
npm install

# Create .env file from template
cp .env.example .env

# Add your configuration:
# - MongoDB URI
# - JWT Secret
# - Stripe keys
# - Cloudinary credentials
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

### 3. AR App

The AR viewer is a standalone HTML file that can be deployed to any web server.

## Running the Application

### Start MongoDB

```bash
# If using local MongoDB
mongod
```

### Start Backend Server

```bash
cd backend
npm run dev  # Development with nodemon
# or
npm start    # Production
```

Backend will run on `http://localhost:5000`

### Start Frontend Dev Server

```bash
cd frontend
npm start
```

Frontend will run on `http://localhost:3000`

### Deploy AR Viewer

Copy `ar-app/viewer.html` to your web server or use a service like Vercel, Netlify, or GitHub Pages.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update profile
- `GET /api/users/me/subscription` - Get subscription status

### Content
- `GET /api/content` - Get user's content
- `GET /api/content/:id` - Get specific content
- `POST /api/content` - Upload new content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content

### Subscriptions
- `GET /api/subscriptions` - List available plans
- `GET /api/subscriptions/:id` - Get specific plan

## Subscription Tiers

### Free Tier
- 10 uploads per month
- 1GB storage
- Basic AR support
- Public content only

### Pro Tier ($9.99/month)
- 100 uploads per month
- 50GB storage
- Advanced AR features
- Public & private content
- Analytics access

### Enterprise Tier ($49.99/month)
- Unlimited uploads
- 500GB storage
- Full AR customization
- Custom branding
- Priority support

## Meta Quest Pro Integration

The AR viewer (`ar-app/viewer.html`) uses WebXR to:
1. Detect Meta Quest Pro device
2. Request immersive AR session
3. Display uploaded images in AR space
4. Support positioning and scaling
5. Enable content interaction

### Using AR Viewer

1. Open viewer on Meta Quest Pro browser
2. Click "Enter AR Mode"
3. Select content from library
4. Position content in your physical space

## Environment Variables

Create a `.env` file in the backend folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ar-platform
JWT_SECRET=your_secret_key_min_32_chars
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

## Development Workflow

1. Make changes to code
2. Backend auto-reloads with nodemon
3. Frontend hot-reloads with React Scripts
4. Test in browser and on AR device

## Deployment

### Deploy Backend

Options:
- Heroku (`git push heroku main`)
- Railway.app
- AWS EC2 + PM2
- DigitalOcean App Platform

### Deploy Frontend

Options:
- Vercel (auto-deploy from GitHub)
- Netlify (drag & drop or git)
- AWS S3 + CloudFront
- GitHub Pages

### Deploy AR Viewer

Host `ar-app/viewer.html` on:
- GitHub Pages
- Netlify
- Vercel
- Any static host

## Next Steps

1. **Set up databases:** Configure MongoDB and Stripe accounts
2. **Add payment processing:** Integrate Stripe checkout
3. **File upload:** Implement Cloudinary integration
4. **Enhanced AR:** Add 3D model support (.glb, .obj)
5. **Mobile app:** Build native iOS/Android app
6. **Performance:** Add caching and CDN
7. **Security:** Implement rate limiting and CORS
8. **Testing:** Add unit and integration tests

## Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running
- Check connection string in .env
- Verify credentials

### "AR not available"
- Use Meta Quest Pro or compatible device
- Update browser/WebXR support
- Check HTTPS requirement (AR requires secure context)

### "Subscription not updating"
- Verify Stripe API keys
- Check webhook configuration
- Ensure Stripe mode (test vs live)

## Support

For issues or questions, refer to:
- Express.js docs: https://expressjs.com
- React docs: https://react.dev
- Three.js docs: https://threejs.org
- WebXR docs: https://immersive-web.github.io
- Meta Quest docs: https://developers.meta.com

## License

MIT

## Future Enhancements

- [ ] Real-time collaboration
- [ ] Social features (sharing, likes, comments)
- [ ] Advanced AR: animations, interactions
- [ ] Mobile app (React Native)
- [ ] Video content support
- [ ] Live streaming to AR
- [ ] Voice commands
- [ ] Gesture recognition
- [ ] Multi-user AR sessions
- [ ] Analytics dashboard
