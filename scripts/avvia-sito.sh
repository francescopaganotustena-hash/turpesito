#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PID_FILE="$ROOT_DIR/.vite-dev.pid"
LOG_FILE="$ROOT_DIR/.vite-dev.log"
PORT="${1:-5173}"
VITE_BIN="$ROOT_DIR/node_modules/.bin/vite"

cd "$ROOT_DIR"

if [[ ! -x "$VITE_BIN" ]]; then
  echo "Vite non trovato. Esegui prima: npm install"
  exit 1
fi

if [[ -f "$PID_FILE" ]]; then
  OLD_PID="$(cat "$PID_FILE" 2>/dev/null || true)"
  if [[ -n "${OLD_PID:-}" ]] && kill -0 "$OLD_PID" 2>/dev/null; then
    echo "Il sito e' gia' attivo (PID $OLD_PID) su http://localhost:$PORT/"
    exit 0
  fi
  rm -f "$PID_FILE"
fi

nohup "$VITE_BIN" --host localhost --port "$PORT" > "$LOG_FILE" 2>&1 &
NEW_PID=$!
echo "$NEW_PID" > "$PID_FILE"

sleep 2
if kill -0 "$NEW_PID" 2>/dev/null; then
  echo "Sito avviato su http://localhost:$PORT/ (PID $NEW_PID)"
  echo "Log: $LOG_FILE"
else
  echo "Avvio fallito. Controlla il log: $LOG_FILE"
  rm -f "$PID_FILE"
  exit 1
fi
