#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PID_FILE="$ROOT_DIR/.vite-dev.pid"
PORT="${1:-5173}"

collect_port_pids() {
  if command -v lsof >/dev/null 2>&1; then
    lsof -ti "tcp:$PORT" -sTCP:LISTEN 2>/dev/null || true
    return
  fi
  if command -v fuser >/dev/null 2>&1; then
    fuser -n tcp "$PORT" 2>/dev/null || true
    return
  fi
  return 0
}

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

PID_FROM_FILE=""
PGID_FROM_FILE=""
if [[ -f "$PID_FILE" ]]; then
  PID_FROM_FILE="$(awk -F= '/^PID=/{print $2}' "$PID_FILE" 2>/dev/null || true)"
  PGID_FROM_FILE="$(awk -F= '/^PGID=/{print $2}' "$PID_FILE" 2>/dev/null || true)"
fi

# 1) prova prima a chiudere l'intero gruppo processo se noto.
if [[ -n "${PGID_FROM_FILE:-}" ]]; then
  kill -- "-$PGID_FROM_FILE" 2>/dev/null || true
fi

# 2) chiude PID noto e chi sta ascoltando sulla porta.
PIDS="$PID_FROM_FILE $(collect_port_pids)"
UNIQ_PIDS="$(echo "$PIDS" | tr ' ' '\n' | awk 'NF' | sort -u | tr '\n' ' ')"

if [[ -n "${UNIQ_PIDS// }" ]]; then
  kill $UNIQ_PIDS 2>/dev/null || true
fi

sleep 1

LEFTOVER="$(
  {
    echo "$UNIQ_PIDS"
    collect_port_pids
  } | tr ' ' '\n' | awk 'NF' | sort -u | tr '\n' ' '
)"

if [[ -n "${LEFTOVER// }" ]]; then
  kill -9 $LEFTOVER 2>/dev/null || true
fi

rm -f "$PID_FILE" 2>/dev/null || true

if is_port_listening; then
  echo "Attenzione: la porta $PORT risulta ancora occupata."
  exit 1
fi

if [[ -n "${UNIQ_PIDS// }" || -n "${LEFTOVER// }" ]]; then
  echo "Sito spento."
else
  echo "Nessun server attivo trovato sulla porta $PORT."
fi
