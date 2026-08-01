@echo off
setlocal

set "NODE="
if exist "%USERPROFILE%\nodejs\node.exe" set "NODE=%USERPROFILE%\nodejs\node.exe"
if not defined NODE if exist "%USERPROFILE%\nodejs\node-v22.17.0-win-x64\node.exe" set "NODE=%USERPROFILE%\nodejs\node-v22.17.0-win-x64\node.exe"

if not defined NODE (
  echo.
  echo Node.js was not found.
  echo.
  echo 1. Download the Windows ZIP from https://nodejs.org  ^(not the .msi^)
  echo 2. Extract it to:  %USERPROFILE%\nodejs
  echo 3. Make sure this file exists:  %USERPROFILE%\nodejs\node.exe
  echo 4. Run this script again.
  echo.
  pause
  exit /b 1
)

set "NODE_DIR=%~dp0"
for %%I in ("%NODE%") do set "NODE_FOLDER=%%~dpI"
set "PATH=%NODE_FOLDER%;%PATH%"

cd /d "%~dp0"
echo Using Node at: %NODE%
echo.
echo Installing dependencies... this may take a few minutes.
echo.

call "%NODE_FOLDER%npm.cmd" install
if errorlevel 1 (
  echo.
  echo npm install failed. See errors above.
  pause
  exit /b 1
)

echo.
echo Done! Next, double-click dev.cmd to start the site.
echo.
pause
