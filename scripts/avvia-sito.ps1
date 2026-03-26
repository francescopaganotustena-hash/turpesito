param(
  [int]$Port = 5173,
  [string]$BindHost = "127.0.0.1",
  [int]$StartupTimeoutSec = 20
)

$ErrorActionPreference = "Stop"

$rootDir = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$pidFile = Join-Path $rootDir ".vite-dev-win.pid"
$outLog = Join-Path $rootDir ".vite-dev-win.out.log"
$errLog = Join-Path $rootDir ".vite-dev-win.err.log"

function Test-PortListening {
  param([int]$TestPort)
  try {
    $conn = Get-NetTCPConnection -State Listen -LocalPort $TestPort -ErrorAction Stop
    return $null -ne $conn
  } catch {
    $netstat = netstat -ano | Select-String "LISTENING" | Select-String ":$TestPort"
    return $null -ne $netstat
  }
}

function Resolve-NodeExe {
  $nodeExe = (Get-Command node.exe -ErrorAction SilentlyContinue).Source
  if ($nodeExe) {
    return $nodeExe
  }

  $fallback = "C:\Program Files\nodejs\node.exe"
  if (Test-Path $fallback) {
    return $fallback
  }

  throw "node.exe non trovato. Installa Node.js LTS e riapri PowerShell."
}

if (Test-Path $pidFile) {
  try {
    $existingPid = [int](Get-Content $pidFile -Raw).Trim()
    $proc = Get-Process -Id $existingPid -ErrorAction SilentlyContinue
    if ($proc -and (Test-PortListening -TestPort $Port)) {
      Write-Host "Il sito e' gia' attivo su http://localhost:$Port/ (PID $existingPid)"
      exit 0
    }
  } catch {
  }
}

if (Test-PortListening -TestPort $Port) {
  throw "La porta $Port e' gia' occupata. Ferma il processo in ascolto o usa un'altra porta."
}

$nodeExePath = Resolve-NodeExe
$viteCliPath = Join-Path $rootDir "node_modules/vite/bin/vite.js"

if (-not (Test-Path $viteCliPath)) {
  throw "Vite non trovato in node_modules. Esegui prima: npm install"
}

if ($env:Path -notlike "*C:\Program Files\nodejs*") {
  $env:Path = "C:\Program Files\nodejs;$env:Path"
}

$devArgs = @(
  "`"$viteCliPath`""
  "--host"
  $BindHost
  "--port"
  "$Port"
  "--strictPort"
)

$proc = Start-Process -FilePath $nodeExePath -ArgumentList $devArgs -WorkingDirectory $rootDir -RedirectStandardOutput $outLog -RedirectStandardError $errLog -WindowStyle Hidden -PassThru

Set-Content -Path $pidFile -Value "$($proc.Id)" -Encoding ascii

for ($i = 0; $i -lt $StartupTimeoutSec; $i++) {
  if (Test-PortListening -TestPort $Port) {
    Write-Host "Sito avviato su http://localhost:$Port/ (PID $($proc.Id))"
    Write-Host "Host bind: $BindHost"
    Write-Host "Log stdout: $outLog"
    Write-Host "Log stderr: $errLog"
    exit 0
  }

  $alive = Get-Process -Id $proc.Id -ErrorAction SilentlyContinue
  if (-not $alive) {
    break
  }
  Start-Sleep -Seconds 1
}

Write-Host "Avvio fallito. Controlla i log:"
if (Test-Path $outLog) { Get-Content $outLog -Tail 40 }
if (Test-Path $errLog) { Get-Content $errLog -Tail 40 }
exit 1
