@echo off
echo ============================================
echo  Kiln Coffee House API - Startup Script
echo ============================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo [Step 1/4] Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: npm install failed!
        pause
        exit /b 1
    )
) else (
    echo [Step 1/4] Dependencies already installed ✓
)

echo.
echo [Step 2/4] Building TypeScript...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo Build successful ✓

echo.
echo [Step 3/4] Testing MongoDB connection...
node test-connection.js
if errorlevel 1 (
    echo.
    echo ============================================
    echo  MongoDB is not running!
    echo ============================================
    echo.
    echo Please start MongoDB first:
    echo.
    echo Option 1 - Docker:
    echo   docker run --name kiln-mongo -p 27017:27017 -d mongo:latest
    echo.
    echo Option 2 - Local MongoDB:
    echo   Start MongoDB service from Services panel
    echo.
    echo Option 3 - MongoDB Atlas:
    echo   Update MONGO_URI in .env file with your Atlas connection string
    echo.
    pause
    exit /b 1
)

echo.
echo [Step 4/4] Starting development server...
echo.
echo ============================================
echo  Server starting on http://localhost:8869
echo ============================================
echo.
call npm run dev
