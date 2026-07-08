# Deployment Guide

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] API endpoints tested
- [ ] Frontend builds successfully
- [ ] AR viewer tested on device
- [ ] SSL certificate ready
- [ ] Domain name configured
- [ ] Backups set up
- [ ] Monitoring configured

## Backend Deployment

### Option 1: Heroku (Easiest)

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create your-ar-app-backend

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key
heroku config:set STRIPE_SECRET_KEY=sk_test_xxx
# ... set all other variables

# Deploy
git push heroku main

# Check logs
heroku logs --tail
```

### Option 2: Railway.app

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Set environment
railway environment

# Deploy
railway up
```

### Option 3: AWS EC2

```bash
# Launch Ubuntu 20.04 instance
# SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Clone your repo
git clone your-repo-url
cd ar-platform/backend

# Install dependencies
npm install

# Create .env file
nano .env

# Install PM2 for process management
sudo npm install -g pm2
pm2 start server.js --name "ar-api"
pm2 save
pm2 startup

# Set up reverse proxy with Nginx
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/default
# Configure to proxy to localhost:5000
sudo systemctl restart nginx
```

### Option 4: DigitalOcean App Platform

1. Go to DigitalOcean dashboard
2. Click "Create" > "Apps"
3. Connect GitHub repository
4. Configure:
   - Build command: `npm install`
   - Run command: `npm start`
   - Environment variables
5. Deploy

## Frontend Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# REACT_APP_API_URL=https://your-api.com
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=build
```

### Option 3: AWS S3 + CloudFront

```bash
# Build
npm run build

# Create S3 bucket
aws s3 mb s3://your-ar-app-frontend

# Upload files
aws s3 sync build/ s3://your-ar-app-frontend --delete

# Create CloudFront distribution
# Point to S3 bucket
```

## AR Viewer Deployment

### Option 1: GitHub Pages

```bash
# Copy ar-app/viewer.html to GitHub Pages repo
git add ar-app/viewer.html
git commit -m "Deploy AR viewer"
git push

# Access at: https://yourusername.github.io/viewer.html
```

### Option 2: Netlify

```bash
# Drop viewer.html in Netlify
# Auto-deploy on push
```

### Option 3: Self-Hosted

```bash
# Copy to server
scp ar-app/viewer.html user@server:/var/www/ar-app/

# Configure web server
# Ensure HTTPS enabled
```

## Database Setup

### MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Add IP whitelist
4. Create database user
5. Get connection string
6. Add to `.env`:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ar-platform
```

### Self-Hosted MongoDB

```bash
# On your server
docker run -d -p 27017:27017 \
  -v /data/db:/data/db \
  mongo:latest

# Connect with:
# MONGODB_URI=mongodb://your-server-ip:27017/ar-platform
```

## SSL/HTTPS Setup

### Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Configure Nginx

```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5000;
    }
}
```

## Domain Configuration

1. Register domain (GoDaddy, Namecheap, etc.)
2. Point nameservers to your host
3. Add A records:
   - api.yourdomain.com → backend IP
   - yourdomain.com → frontend IP
4. Add CNAME: www → yourdomain.com

## Monitoring & Logging

### Sentry (Error Tracking)

```bash
npm install @sentry/node

# Add to backend:
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV,
});
```

### CloudWatch (AWS Monitoring)

```bash
npm install aws-sdk
# Configure AWS credentials
```

### DataDog (APM)

```bash
npm install dd-trace

# Initialize
const tracer = require('dd-trace').init();
```

## Backup Strategy

### Database Backups

```bash
# MongoDB backup
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/ar-platform"

# Schedule with cron
0 2 * * * /usr/bin/mongodump --uri "..." --out /backups/$(date +\%Y-\%m-\%d)
```

### Automated Backups

- Use cloud provider's backup features
- MongoDB Atlas: automatic backups
- AWS: S3 versioning
- Set retention policy: 30 days

## Performance Optimization

### CDN Setup

```javascript
// Use Cloudflare or AWS CloudFront
// Cache static assets
// Cache API responses with TTL
```

### Database Indexing

```javascript
// Add to User model
userSchema.index({ email: 1 });
contentSchema.index({ userId: 1, createdAt: -1 });
```

### Compression

```javascript
const compression = require('compression');
app.use(compression());
```

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run build
      - uses: actions/deploy-to-gke@v1
        # ... configure deployment
```

## Post-Deployment

1. **Test All Features**
   - Register/login
   - Upload content
   - AR viewer
   - Subscriptions

2. **Monitor Performance**
   - Check API response times
   - Monitor database queries
   - Track error rates

3. **Set Up Alerts**
   - High error rate
   - High response time
   - Low disk space
   - Failed backups

4. **Update DNS**
   - Point domain to production
   - Verify SSL certificates

5. **Announce Launch**
   - Deploy frontend
   - Test full platform
   - Release to users

## Rollback Procedure

If issues occur:

```bash
# Revert to previous version
git revert <commit-hash>
git push

# Redeploy
heroku deploy
# or
vercel --prod
# or
aws s3 sync previous-build/ s3://bucket/
```

## Troubleshooting

**App won't start**
- Check logs: `heroku logs --tail`
- Verify environment variables
- Check database connection

**High latency**
- Enable caching
- Add CDN
- Optimize database queries
- Increase server resources

**Disk space full**
- Check file uploads
- Clean old logs
- Archive old data

## Support

For deployment issues:
- Check provider's documentation
- Review logs carefully
- Test locally first
- Ask in community forums
