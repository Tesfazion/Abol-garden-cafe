@echo off
echo ====================================================
echo   Kiln Coffee House - Website Launcher
echo ====================================================
echo.
echo Starting your coffee shop website...
echo.
echo This will open:
echo   - Website:  http://localhost:1995
echo   - Backend:  http://localhost:8869
echo.
echo Press any key to continue...
pause >nul

echo.
echo Starting all services...
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0start-all.ps1"

if errorlevel 1 (
    echo.
    echo ====================================================
    echo   ERROR: Failed to start services
    echo ====================================================
    echo.
    echo Make sure MongoDB is running first:
    echo   docker run --name kiln-mongo -p 27017:27017 -d mongo:latest
    echo.
    pause
    exit /b 1
)

echo.
echo ====================================================
echo   Website is starting!
echo ====================================================
echo.
echo Open your browser and go to:
echo   http://localhost:1995
echo.
echo Press any key to open browser automatically...
pause >nul

start http://localhost:1995

echo.
echo Browser opened! Enjoy your website!
echo.
