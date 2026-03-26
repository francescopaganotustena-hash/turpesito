$ErrorActionPreference = "Stop"

$targetScript = Join-Path $PSScriptRoot "avvia-sito.ps1"
& $targetScript @args
