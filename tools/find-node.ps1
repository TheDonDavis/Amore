# Finds node.exe without relying on PATH.
$candidates = @(
  "$env:USERPROFILE\nodejs\node.exe",
  "$env:USERPROFILE\nodejs\node-v*\node.exe",
  "$env:LOCALAPPDATA\nodejs\node.exe",
  "$env:USERPROFILE\scoop\apps\nodejs-lts\current\node.exe",
  "$env:USERPROFILE\scoop\apps\nodejs\current\node.exe"
)

foreach ($pattern in $candidates) {
  $match = Get-Item $pattern -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($match) {
    return $match.FullName
  }
}

return $null
