@echo off
setlocal enabledelayedexpansion

cd /d "c:\Users\yulic\Downloads\files\builder app"

echo ======================================
echo Heroku Backend Deployment
echo ======================================
echo.

REM Set the API token
set HEROKU_API_KEY=HRKU-AAHy0dmvjJlvKMRDLtaG5294mBhN8iTHShJtE4I6_Mhw_____wJ471f6DlAz

echo [1/5] Checking Heroku CLI...
heroku --version

echo.
echo [2/5] Creating app: ar-platform-api
heroku apps:create ar-platform-api 2>nul
if errorlevel 1 (
    echo App may already exist, continuing...
)

echo.
echo [3/5] Setting environment variables...
heroku config:set MONGODB_URI="mongodb+srv://snapcart:250Kaleb!123@cluster0.bdbiuhi.mongodb.net/ar-platform" -a ar-platform-api
heroku config:set CLOUDINARY_NAME="jcfhvno0" -a ar-platform-api
heroku config:set CLOUDINARY_API_KEY="756249944483745" -a ar-platform-api
heroku config:set CLOUDINARY_API_SECRET="6CD3NS4zBHKGaKKctHDkDVVFcGw" -a ar-platform-api
heroku config:set JWT_SECRET="ar-platform-secret-key-2026" -a ar-platform-api
heroku config:set NODE_ENV="production" -a ar-platform-api

echo.
echo [4/5] Adding Heroku remote...
git remote remove heroku 2>nul
heroku git:remote -a ar-platform-api

echo.
echo [5/5] Deploying to Heroku...
git push heroku main

echo.
echo ======================================
echo Deployment Complete!
echo ======================================
echo.
echo Your backend API is now live at:
echo https://ar-platform-api.herokuapp.com
echo.
echo View logs with: heroku logs --tail -a ar-platform-api
echo.
pause
