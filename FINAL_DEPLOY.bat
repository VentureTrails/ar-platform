@echo off
setlocal enabledelayedexpansion

echo.
echo ======================================
echo Heroku Backend Deployment
echo ======================================
echo.

cd /d "c:\Users\yulic\Downloads\files\builder app"

echo [Step 1] Removing old git repository...
if exist .git rmdir /s /q .git

echo [Step 2] Initializing fresh git repository...
git init
git config user.name "VentureTrails"
git config user.email "diesel_25@yahoo.com"

echo [Step 3] Adding all files to git...
git add .

echo [Step 4] Creating initial commit...
git commit -m "AR Platform Backend - Initial Commit"

echo [Step 5] Switching to main branch...
git branch -M main

echo [Step 6] Pushing to Heroku...
echo Deploying... this may take 1-2 minutes...
git push -f https://x-token-auth:HRKU-AAHy0dmvjJlvKMRDLtaG5294mBhN8iTHShJtE4I6_Mhw_____wJ471f6DlAz@git.heroku.com/ar-platform-api.git main

echo.
if %errorlevel% equ 0 (
    echo ======================================
    echo DEPLOYMENT SUCCESSFUL!
    echo ======================================
    echo.
    echo Your backend is now live at:
    echo https://ar-platform-api.herokuapp.com
    echo.
    echo Next steps:
    echo 1. Update frontend proxy to: https://ar-platform-api.herokuapp.com
    echo 2. Redeploy frontend to Vercel
    echo.
) else (
    echo ======================================
    echo DEPLOYMENT FAILED
    echo ======================================
    echo.
    echo Check Heroku dashboard: https://dashboard.heroku.com/apps/ar-platform-api
    echo.
)

pause
