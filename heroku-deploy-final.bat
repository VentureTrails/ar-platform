@echo off
REM Complete Heroku Deployment Script
REM This deploys the backend to Heroku without browser login

cd /d "c:\Users\yulic\Downloads\files\builder app"

echo ======================================
echo Heroku Backend Deployment
echo ======================================
echo.

REM Set Heroku auth token
set HEROKU_API_KEY=your-heroku-api-token

REM Create app if it doesn't exist
echo Creating Heroku app ar-platform-api...
heroku apps:create ar-platform-api --remote heroku 2>nul

REM Set environment variables
echo.
echo Setting environment variables...
call heroku config:set MONGODB_URI="mongodb+srv://snapcart:250Kaleb!123@cluster0.bdbiuhi.mongodb.net/ar-platform"
call heroku config:set CLOUDINARY_NAME="jcfhvno0"
call heroku config:set CLOUDINARY_API_KEY="756249944483745"
call heroku config:set CLOUDINARY_API_SECRET="6CD3NS4zBHKGaKKctHDkDVVFcGw"
call heroku config:set JWT_SECRET="ar-platform-secret-key"
call heroku config:set NODE_ENV="production"

REM Deploy
echo.
echo Deploying to Heroku...
git push heroku main

echo.
echo ======================================
echo Deployment Complete!
echo ======================================
echo Your API is live at: https://ar-platform-api.herokuapp.com
echo.
echo Next: Update frontend to point to backend
echo Edit c:\Users\yulic\Downloads\files\builder app\frontend\package.json
echo Change proxy to: "https://ar-platform-api.herokuapp.com"
echo.
pause
