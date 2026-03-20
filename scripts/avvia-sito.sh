#!/usr/bin/env bash

# Allow execution via `sh script.sh` by re-running under bash.
if [ -z "${BASH_VERSION:-}" ]; then
  exec bash "$0" "$@"
fi

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PID_FILE="$ROOT_DIR/.vite-dev.pid"
LOG_FILE="$ROOT_DIR/.vite-dev.log"
PORT="${1:-5173}"
HOST="${2:-0.0.0.0}"
VITE_BIN="$ROOT_DIR/node_modules/.bin/vite"
START_TIMEOUT=15

cd "$ROOT_DIR"

if [[ ! -x "$VITE_BIN" ]]; then
  echo "Vite non trovato. Esegui prima: npm install"
  exit 1
fi

is_port_listening() {
  if command -v lsof >/dev/null 2>&1; then
    lsof -ti "tcp:$PORT" -sTCP:LISTEN >/dev/null 2>&1
    return
  fi
  if command -v ss >/dev/null 2>&1; then
    ss -ltn "sport = :$PORT" | tail -n +2 | grep -q .
    return
  fi
  return 1
}

if [[ -f "$PID_FILE" ]]; then
  OLD_PID="$(awk -F= '/^PID=/{print $2}' "$PID_FILE" 2>/dev/null || true)"
  if [[ -n "${OLD_PID:-}" ]] && kill -0 "$OLD_PID" 2>/dev/null; then
    echo "Il sito e' gia' attivo (PID $OLD_PID) su http://localhost:$PORT/"
    exit 0
  fi
fi

# Se la porta e' occupata da altro processo, evitiamo falsi positivi.
if is_port_listening; then
  echo "La porta $PORT e' gia' in uso. Prima ferma il processo che la occupa."
  exit 1
fi

if ! command -v setsid >/dev/null 2>&1; then
  echo "Comando 'setsid' non disponibile sul sistema."
  exit 1
fi

setsid "$VITE_BIN" --host "$HOST" --strictPort --port "$PORT" > "$LOG_FILE" 2>&1 < /dev/null &
NEW_PID=$!
PGID="$(ps -o pgid= -p "$NEW_PID" | tr -d ' ' || true)"
{
  echo "PID=$NEW_PID"
  echo "PGID=$PGID"
  echo "PORT=$PORT"
  echo "HOST=$HOST"
} > "$PID_FILE"

for _ in $(seq 1 "$START_TIMEOUT"); do
  if is_port_listening; then
    LAN_IP="$(hostname -I 2>/dev/null | tr ' ' '\n' | grep -E '^10\\.0\\.0\\.[0-9]+$' | head -n1 || true)"
    if [[ -n "$LAN_IP" ]]; then
      echo "Sito avviato su:"
      echo "- Locale: http://localhost:$PORT/"
      echo "- Rete aziendale: http://$LAN_IP:$PORT/"
    else
      echo "Sito avviato su http://localhost:$PORT/ (PID $NEW_PID)"
      echo "Per accesso in rete usa: http://<IP-LAN>:$PORT/"
    fi
    echo "Host bind: $HOST (PID $NEW_PID)"
    echo "Log: $LOG_FILE"
    exit 0
  fi
  if ! kill -0 "$NEW_PID" 2>/dev/null; then
    break
  fi
  sleep 1
done

echo "Avvio fallito. Controlla il log: $LOG_FILE"
tail -n 40 "$LOG_FILE" || true
exit 1
