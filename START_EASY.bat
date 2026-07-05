@echo off
echo ====================================================
echo   Kiln Coffee House - Easy Starter
echo ====================================================
echo.
echo This will:
echo 1. Install dependencies if needed
echo 2. Start backend server
echo 3. Start frontend website
echo 4. Open your browser
echo.
pause

REM Stop any running servers first
echo.
echo [Step 0/5] Stopping any old servers...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8869') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :1995') do taskkill /F /PID %%a 2>nul
timeout /t 2 /nobreak >nul

REM Check and install backend dependencies
echo.
echo [Step 1/5] Checking backend dependencies...
cd /d "%~dp0kiln-cafe-backend\kiln-cafe-backend"
if not exist "node_modules\mongoose" (
    echo Installing backend dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Backend npm install failed!
        pause
        exit /b 1
    )
) else (
    echo Backend dependencies OK!
)

REM Check and install frontend dependencies
echo.
echo [Step 2/5] Checking frontend dependencies...
cd /d "%~dp0kiln-cafe-frontend\kiln-cafe"
if not exist "node_modules\next" (
    echo Installing frontend dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Frontend npm install failed!
        pause
        exit /b 1
    )
) else (
    echo Frontend dependencies OK!
)

REM Start backend
echo.
echo [Step 3/5] Starting backend server...
cd /d "%~dp0kiln-cafe-backend\kiln-cafe-backend"
start "Kiln Backend" cmd /k "npm run dev"

echo Waiting for backend to start...
timeout /t 10 /nobreak >nul

REM Start frontend
echo.
echo [Step 4/5] Starting frontend website...
cd /d "%~dp0kiln-cafe-frontend\kiln-cafe"
start "Kiln Frontend" cmd /k "npm run dev -- --port 1995"

echo Waiting for frontend to compile...
timeout /t 20 /nobreak >nul

REM Open browser
echo.
echo [Step 5/5] Opening your browser...
start http://localhost:1995

echo.
echo ====================================================
echo   YOUR WEBSITE IS STARTING!
echo ====================================================
echo.
echo Backend:  http://localhost:8869
echo Website:  http://localhost:1995
echo.
echo Two command windows opened - Keep them running!
echo Close those windows when you want to stop.
echo.
echo Press any key to close this window...
pause >nul
