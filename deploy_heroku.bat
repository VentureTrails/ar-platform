@echo off
cd /d "c:\Users\yulic\Downloads\files\builder app"

echo.
echo ======================================
echo Heroku Deployment Script
echo ======================================
echo.

REM Check if already logged in
heroku apps >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Already logged into Heroku
) else (
    echo Attempting to log in with credentials...
    echo diesel_25@yahoo.com | heroku login --interactive
)

echo.
echo Creating Heroku app: ar-platform-api
heroku create ar-platform-api --buildpack heroku/nodejs

echo.
echo Setting environment variables...
heroku config:set MONGODB_URI="mongodb+srv://snapcart:250Kaleb!123@cluster0.bdbiuhi.mongodb.net/ar-platform" --app ar-platform-api
heroku config:set CLOUDINARY_NAME="jcfhvno0" --app ar-platform-api
heroku config:set CLOUDINARY_API_KEY="756249944483745" --app ar-platform-api
heroku config:set CLOUDINARY_API_SECRET="6CD3NS4zBHKGaKKctHDkDVVFcGw" --app ar-platform-api
heroku config:set JWT_SECRET="ar-platform-secret-key-2026" --app ar-platform-api
heroku config:set NODE_ENV="production" --app ar-platform-api

echo.
echo Deploying to Heroku...
git push heroku main

echo.
echo ======================================
echo Deployment Complete!
echo ======================================
echo Your app is live at: https://ar-platform-api.herokuapp.com
echo.
pause
