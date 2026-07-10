@echo off
setlocal

set HEROKU_TOKEN=HRKU-AAHy0dmvjJlvKMRDLtaG5294mBhN8iTHShJtE4I6_Mhw_____wJ471f6DlAz
set APP_NAME=ar-platform-api

echo ======================================
echo Heroku API Deployment
echo ======================================
echo.

REM Create app
echo Creating Heroku app...
curl -X POST https://api.heroku.com/apps ^
  -H "Authorization: Bearer %HEROKU_TOKEN%" ^
  -H "Accept: application/vnd.heroku+json; version=3" ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"ar-platform-api\",\"region\":\"us\"}"

echo.
echo.
echo Setting config variables...
curl -X PATCH https://api.heroku.com/apps/%APP_NAME%/config-vars ^
  -H "Authorization: Bearer %HEROKU_TOKEN%" ^
  -H "Accept: application/vnd.heroku+json; version=3" ^
  -H "Content-Type: application/json" ^
  -d "{\"MONGODB_URI\":\"mongodb+srv://snapcart:250Kaleb!123@cluster0.bdbiuhi.mongodb.net/ar-platform\",\"CLOUDINARY_NAME\":\"jcfhvno0\",\"CLOUDINARY_API_KEY\":\"756249944483745\",\"CLOUDINARY_API_SECRET\":\"6CD3NS4zBHKGaKKctHDkDVVFcGw\",\"JWT_SECRET\":\"ar-platform-secret\",\"NODE_ENV\":\"production\"}"

echo.
echo App created! Now deploy with:
echo cd "c:\Users\yulic\Downloads\files\builder app"
echo git remote add heroku https://git.heroku.com/ar-platform-api.git
echo git push heroku main
echo.
pause
