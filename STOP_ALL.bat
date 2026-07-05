@echo off
echo ====================================================
echo   Stopping All Kiln Services
echo ====================================================
echo.

echo Killing processes on port 8869 (Backend)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8869') do (
    taskkill /F /PID %%a 2>nul
)

echo Killing processes on port 1995 (Frontend)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :1995') do (
    taskkill /F /PID %%a 2>nul
)

echo.
echo All services stopped!
echo.
pause
