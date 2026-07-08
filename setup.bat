@echo off
echo Installing Backend Dependencies...
cd backend
call npm install
cd ..

echo.
echo Installing Frontend Dependencies...
cd frontend
call npm install
cd ..

echo.
echo Setup complete! Next steps:
echo 1. Configure backend/.env file
echo 2. Run: npm run dev (in backend folder)
echo 3. Run: npm start (in frontend folder, in new terminal)
pause
