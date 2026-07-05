@echo off
echo ====================================================
echo   Kiln Coffee House - Website Launcher
echo ====================================================
echo.
echo Starting your coffee shop website...
echo.
echo This will open:
echo   - Backend:  http://localhost:8869
echo   - Website:  http://localhost:1995
echo.
echo MongoDB Compass should already be connected.
echo.
pause

echo.
echo [1/3] Starting Backend Server...
echo.
start "Kiln Backend" cmd /k "cd /d "%~dp0kiln-cafe-backend\kiln-cafe-backend" && npm run dev"

echo Waiting for backend to start...
timeout /t 10 /nobreak >nul

echo.
echo [2/3] Starting Frontend Website...
echo.
start "Kiln Frontend" cmd /k "cd /d "%~dp0kiln-cafe-frontend\kiln-cafe" && npm run dev -- --port 1995"

echo.
echo [3/3] Waiting for website to compile...
timeout /t 15 /nobreak >nul

echo.
echo ====================================================
echo   Opening your website in browser...
echo ====================================================
echo.
start http://localhost:1995

echo.
echo ====================================================
echo   Your website is running!
echo ====================================================
echo.
echo   Backend:  http://localhost:8869
echo   Website:  http://localhost:1995
echo.
echo Two new windows opened - Keep them running!
echo Close this window when done.
echo.
pause
