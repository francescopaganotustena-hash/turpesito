param(
  [int]$Port = 5173
)

$ErrorActionPreference = "Stop"

$rootDir = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$pidFile = Join-Path $rootDir ".vite-dev-win.pid"

function Get-PortPids {
  param([int]$TestPort)
  try {
    $pids = Get-NetTCPConnection -State Listen -LocalPort $TestPort -ErrorAction Stop |
      Select-Object -ExpandProperty OwningProcess -Unique
    return @($pids)
  } catch {
    $matches = netstat -ano | Select-String "LISTENING" | Select-String ":$TestPort"
    $pids = @()
    foreach ($line in $matches) {
      $parts = ($line.ToString() -replace "\s+", " ").Trim().Split(" ")
      if ($parts.Length -gt 0) {
        $candidate = $parts[$parts.Length - 1]
        if ($candidate -match "^\d+$") {
          $pids += [int]$candidate
        }
      }
    }
    return @($pids | Select-Object -Unique)
  }
}

$targetPids = @()

if (Test-Path $pidFile) {
  try {
    $pidFromFile = [int](Get-Content $pidFile -Raw).Trim()
    $targetPids += $pidFromFile
  } catch {
  }
}

$targetPids += Get-PortPids -TestPort $Port
$targetPids = @($targetPids | Where-Object { $_ -gt 0 } | Select-Object -Unique)

if ($targetPids.Count -eq 0) {
  if (Test-Path $pidFile) { Remove-Item $pidFile -Force }
  Write-Host "Nessun server attivo trovato sulla porta $Port."
  exit 0
}

foreach ($procId in $targetPids) {
  try {
    Stop-Process -Id $procId -ErrorAction Stop
  } catch {
  }
}

Start-Sleep -Seconds 1

$leftover = Get-PortPids -TestPort $Port
if ($leftover.Count -gt 0) {
  foreach ($procId in $leftover) {
    try {
      Stop-Process -Id $procId -Force -ErrorAction Stop
    } catch {
    }
  }
}

if (Test-Path $pidFile) { Remove-Item $pidFile -Force }

$stillListening = Get-PortPids -TestPort $Port
if ($stillListening.Count -gt 0) {
  throw "Attenzione: la porta $Port risulta ancora occupata."
}

Write-Host "Sito spento."
