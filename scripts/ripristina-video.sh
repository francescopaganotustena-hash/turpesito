#!/usr/bin/env bash

# Allow execution via `sh script.sh` by re-running under bash.
if [ -z "${BASH_VERSION:-}" ]; then
  exec bash "$0" "$@"
fi

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

LATEST_LINK="$ROOT_DIR/media-backups/latest-videos"
BACKUP_DIR="${1:-$LATEST_LINK}"

if [ ! -d "$BACKUP_DIR" ]; then
  echo "Backup non trovato: $BACKUP_DIR" >&2
  echo "Uso: ./scripts/ripristina-video.sh [percorso-backup]" >&2
  exit 1
fi

report_file="$BACKUP_DIR/report.tsv"
if [ ! -f "$report_file" ]; then
  echo "Report backup non trovato: $report_file" >&2
  exit 1
fi

echo "Ripristino da: $BACKUP_DIR"

awk -F'\t' 'NR>1 {print $1}' "$report_file" | while IFS= read -r rel_path; do
  [ -z "$rel_path" ] && continue
  src="$BACKUP_DIR/$rel_path"
  if [ ! -f "$src" ]; then
    echo "Skip (backup file mancante): $rel_path"
    continue
  fi
  mkdir -p "$(dirname "$rel_path")"
  cp -p "$src" "$rel_path"
  echo "Ripristinato: $rel_path"
done

echo "Rollback video completato."
