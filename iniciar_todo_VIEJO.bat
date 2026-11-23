@echo off
REM Arranca el backend (puerto 3000) y el frontend Angular (puerto 4200)
cd /d "%~dp0"
if not exist "backend_senderos\node_modules" (
  pushd backend_senderos
  call npm install
  popd
)
if not exist "node_modules" call npm install
start "Backend Senderos" cmd /k "cd /d %~dp0backend_senderos && npm start"
timeout /t 5 /nobreak >nul
start "Frontend Senderos" cmd /k "cd /d %~dp0 && npm start -- --open"
