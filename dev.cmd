@echo off
setlocal

set "NODE="
if exist "%USERPROFILE%\nodejs\node.exe" set "NODE=%USERPROFILE%\nodejs\node.exe"
if not defined NODE if exist "%USERPROFILE%\nodejs\node-v22.17.0-win-x64\node.exe" set "NODE=%USERPROFILE%\nodejs\node-v22.17.0-win-x64\node.exe"

if not defined NODE (
  echo.
  echo Node.js was not found at %USERPROFILE%\nodejs
  echo Run setup.cmd first after extracting Node.
  echo.
  pause
  exit /b 1
)

for %%I in ("%NODE%") do set "NODE_FOLDER=%%~dpI"
set "PATH=%NODE_FOLDER%;%PATH%"

cd /d "%~dp0"

if not exist "node_modules\" (
  echo node_modules not found. Run setup.cmd first.
  pause
  exit /b 1
)

echo Starting site at http://localhost:3000
echo Press Ctrl+C to stop.
echo.

call "%NODE_FOLDER%npm.cmd" run dev
