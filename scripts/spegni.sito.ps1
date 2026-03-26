$ErrorActionPreference = "Stop"

$targetScript = Join-Path $PSScriptRoot "spegni-sito.ps1"
& $targetScript @args
