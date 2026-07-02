# Kiln Cafe -- Start All Services
# Run from the project root: .\start-all.ps1
#
# Prerequisites:
#   MongoDB must already be running (mongod --dbpath C:\data\db)
#
# Ports:
#   MongoDB  -> 27017
#   Backend  -> 8869
#   Frontend -> 1995

$ROOT     = $PSScriptRoot
$BACKEND  = Join-Path $ROOT "kiln-cafe-backend\kiln-cafe-backend"
$FRONTEND = Join-Path $ROOT "kiln-cafe-frontend\kiln-cafe"

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "   Kiln Coffee House -- Dev Environment Launcher" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

# -- Step 0: Verify MongoDB is reachable on port 27017 -----------------------
Write-Host "[0/5] Checking MongoDB on localhost:27017..." -ForegroundColor Yellow
$mongoReady = $false
try {
    $tcp = New-Object System.Net.Sockets.TcpClient
    $tcp.Connect("localhost", 27017)
    $tcp.Close()
    $mongoReady = $true
} catch { }

if (-not $mongoReady) {
    Write-Host ""
    Write-Host "ERROR: MongoDB is NOT running on localhost:27017." -ForegroundColor Red
    Write-Host ""
    Write-Host "Start MongoDB first in a separate terminal:" -ForegroundColor Yellow
    Write-Host "  mongod --dbpath C:\data\db" -ForegroundColor White
    Write-Host ""
    Write-Host "If mongod is not installed, download it from:" -ForegroundColor Yellow
    Write-Host "  https://www.mongodb.com/try/download/community" -ForegroundColor White
    Write-Host ""
    exit 1
}
Write-Host "      MongoDB is running." -ForegroundColor Green

# -- Step 1: Install backend dependencies ------------------------------------
Push-Location $BACKEND
if (-not (Test-Path "node_modules\mongoose")) {
    Write-Host "[1/5] Installing backend dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) { Write-Host "ERROR: npm install failed." -ForegroundColor Red; Pop-Location; exit 1 }
} else {
    Write-Host "[1/5] Backend dependencies OK" -ForegroundColor Green
}

# -- Step 2: Seed the database -----------------------------------------------
Write-Host "[2/5] Seeding database (upsert -- safe to re-run)..." -ForegroundColor Yellow
npx tsx src/seed.ts
if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Seed reported an error -- check output above." -ForegroundColor DarkYellow
} else {
    Write-Host "      Database seeded." -ForegroundColor Green
}
Pop-Location

# -- Step 3: Install frontend dependencies -----------------------------------
Push-Location $FRONTEND
if (-not (Test-Path "node_modules\next")) {
    Write-Host "[3/5] Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) { Write-Host "ERROR: npm install failed." -ForegroundColor Red; Pop-Location; exit 1 }
} else {
    Write-Host "[3/5] Frontend dependencies OK" -ForegroundColor Green
}
Pop-Location

# -- Step 4: Start backend in a new window -----------------------------------
Write-Host "[4/5] Starting Express backend on http://localhost:8869 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList `
    "-NoExit", "-Command", `
    "Set-Location '$BACKEND'; Write-Host 'Backend API starting...' -ForegroundColor Cyan; npm run dev"

# Poll until port 8869 responds
$elapsed = 0
while ($elapsed -lt 30) {
    Start-Sleep -Seconds 2; $elapsed += 2
    try { $tcp = New-Object System.Net.Sockets.TcpClient; $tcp.Connect("localhost", 8869); $tcp.Close(); break } catch { }
}
Write-Host "      Backend is ready!" -ForegroundColor Green

# -- Step 5: Start frontend in a new window ----------------------------------
Write-Host "[5/5] Starting Next.js frontend on http://localhost:1995 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList `
    "-NoExit", "-Command", `
    "Set-Location '$FRONTEND'; Write-Host 'Frontend starting...' -ForegroundColor Cyan; npm run dev -- --port 1995"

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Green
Write-Host "   All services are starting up!" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Green
Write-Host "  Frontend : http://localhost:1995" -ForegroundColor White
Write-Host "  Backend  : http://localhost:8869" -ForegroundColor White
Write-Host "  Health   : http://localhost:8869/health" -ForegroundColor White
Write-Host "  MongoDB  : mongodb://localhost:27017/cafe" -ForegroundColor White
Write-Host ""
Write-Host "NOTE: Keep MongoDB running in its own terminal (mongod)." -ForegroundColor DarkYellow
Write-Host "Close the two PowerShell windows to stop backend and frontend." -ForegroundColor DarkGray
Write-Host ""
