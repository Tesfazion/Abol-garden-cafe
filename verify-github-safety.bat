@echo off
echo ========================================
echo GitHub Safety Verification
echo ========================================
echo.

echo Checking for backup folders...
dir /s /b node_modules_backup* 2>nul
if %errorlevel% == 0 (
    echo [WARNING] Backup folders found! Delete them.
) else (
    echo [OK] No backup folders found.
)
echo.

echo Checking .gitignore files...
if exist .gitignore (
    echo [OK] Root .gitignore exists
) else (
    echo [WARNING] Root .gitignore missing!
)

if exist kiln-cafe-backend\kiln-cafe-backend\.gitignore (
    echo [OK] Backend .gitignore exists
) else (
    echo [WARNING] Backend .gitignore missing!
)

if exist kiln-cafe-frontend\kiln-cafe\.gitignore (
    echo [OK] Frontend .gitignore exists
) else (
    echo [WARNING] Frontend .gitignore missing!
)
echo.

echo Checking for .env files (should exist but be ignored)...
if exist kiln-cafe-backend\kiln-cafe-backend\.env (
    echo [OK] Backend .env exists (will be ignored by git)
) else (
    echo [INFO] Backend .env not found (you'll need to create it)
)

if exist kiln-cafe-frontend\kiln-cafe\.env.local (
    echo [OK] Frontend .env.local exists (will be ignored by git)
) else (
    echo [INFO] Frontend .env.local not found (optional)
)
echo.

echo Checking for example files (should exist and be pushed)...
if exist kiln-cafe-backend\kiln-cafe-backend\.env.example (
    echo [OK] Backend .env.example exists (safe to push)
) else (
    echo [WARNING] Backend .env.example missing!
)

if exist kiln-cafe-frontend\kiln-cafe\.env.local.example (
    echo [OK] Frontend .env.local.example exists (safe to push)
) else (
    echo [INFO] Frontend .env.local.example not found (optional)
)
echo.

echo ========================================
echo Verification Complete!
echo ========================================
echo.
echo If all checks show [OK], you're safe to push to GitHub!
echo.
echo Read GITHUB_READY.md for detailed information.
echo.
pause
