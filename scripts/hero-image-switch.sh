#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-}"
FILE="src/data/index.ts"
DEFAULT_IMPORT="import heroMain from '../assets/hero-main.png';"
TURPE_IMPORT="import heroMain from '../../Turpe2.png';"

if [[ "$MODE" != "apply" && "$MODE" != "rollback" ]]; then
  echo "Usage: $0 <apply|rollback>"
  exit 1
fi

if [[ ! -f "$FILE" ]]; then
  echo "Missing file: $FILE"
  exit 1
fi

if [[ "$MODE" == "apply" ]]; then
  if grep -Fq "$TURPE_IMPORT" "$FILE"; then
    echo "Hero apply skipped: Turpe2.png is already active"
    exit 0
  fi

  if ! grep -Fq "$DEFAULT_IMPORT" "$FILE"; then
    echo "Cannot apply: expected default hero import not found"
    exit 1
  fi

  sed -i "s|$DEFAULT_IMPORT|$TURPE_IMPORT|" "$FILE"
  echo "Hero apply completed: hero-main.png -> Turpe2.png"
else
  if grep -Fq "$DEFAULT_IMPORT" "$FILE"; then
    echo "Hero rollback skipped: default hero image is already active"
    exit 0
  fi

  if ! grep -Fq "$TURPE_IMPORT" "$FILE"; then
    echo "Cannot rollback: expected Turpe2 import not found"
    exit 1
  fi

  sed -i "s|$TURPE_IMPORT|$DEFAULT_IMPORT|" "$FILE"
  echo "Hero rollback completed: Turpe2.png -> hero-main.png"
fi
