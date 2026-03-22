#!/usr/bin/env bash

# Allow execution via `sh script.sh` by re-running under bash.
if [ -z "${BASH_VERSION:-}" ]; then
  exec bash "$0" "$@"
fi

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

FFMPEG_BIN="$(node -e "console.log(require('ffmpeg-static') || '')" 2>/dev/null || true)"
if [ -z "$FFMPEG_BIN" ] || [ ! -x "$FFMPEG_BIN" ]; then
  echo "Errore: ffmpeg non disponibile. Installa con: npm i -D ffmpeg-static" >&2
  exit 1
fi

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP_DIR="$ROOT_DIR/media-backups/videos-$STAMP"
REPORT_FILE="$BACKUP_DIR/report.tsv"
LATEST_LINK="$ROOT_DIR/media-backups/latest-videos"

mkdir -p "$BACKUP_DIR"
printf "file\tbefore_bytes\tafter_bytes\taction\n" > "$REPORT_FILE"

mapfile -t TARGETS < <(
  {
    echo "src/assets/site-photos/biografia-sax.mp4"
    find src/assets/videos -maxdepth 1 -type f -name "*.mp4" | sort
  } | sed '/^$/d'
)

if [ "${#TARGETS[@]}" -eq 0 ]; then
  echo "Nessun video trovato."
  exit 0
fi

echo "Backup directory: $BACKUP_DIR"
echo "Video trovati: ${#TARGETS[@]}"

for file in "${TARGETS[@]}"; do
  if [ ! -f "$file" ]; then
    echo "Skip (non trovato): $file"
    continue
  fi

  before_bytes="$(stat -c %s "$file")"

  backup_path="$BACKUP_DIR/$file"
  mkdir -p "$(dirname "$backup_path")"
  cp -p "$file" "$backup_path"

  tmp_out="${file}.optimized.tmp.mp4"
  rm -f "$tmp_out"

  "$FFMPEG_BIN" -hide_banner -loglevel error -y \
    -i "$file" \
    -map 0:v:0 -map 0:a? \
    -c:v libx264 -preset medium -crf 28 \
    -vf "scale='if(gt(iw,ih),min(iw,1280),-2)':'if(gt(iw,ih),-2,min(ih,1280))':flags=lanczos" \
    -c:a aac -b:a 96k \
    -movflags +faststart \
    "$tmp_out"

  if [ ! -f "$tmp_out" ]; then
    printf "%s\t%s\t%s\t%s\n" "$file" "$before_bytes" "$before_bytes" "failed" >> "$REPORT_FILE"
    echo "Errore compressione: $file"
    continue
  fi

  after_bytes="$(stat -c %s "$tmp_out")"

  if [ "$after_bytes" -lt "$before_bytes" ]; then
    mv "$tmp_out" "$file"
    action="optimized"
    echo "Ottimizzato: $file ($(numfmt --to=iec "$before_bytes") -> $(numfmt --to=iec "$after_bytes"))"
  else
    rm -f "$tmp_out"
    action="kept_original"
    after_bytes="$before_bytes"
    echo "Invariato (compressione non conveniente): $file"
  fi

  printf "%s\t%s\t%s\t%s\n" "$file" "$before_bytes" "$after_bytes" "$action" >> "$REPORT_FILE"
done

ln -sfn "$BACKUP_DIR" "$LATEST_LINK"

before_total="$(awk -F'\t' 'NR>1 {sum+=$2} END {print sum+0}' "$REPORT_FILE")"
after_total="$(awk -F'\t' 'NR>1 {sum+=$3} END {print sum+0}' "$REPORT_FILE")"

echo
echo "Report: $REPORT_FILE"
echo "Totale prima: $(numfmt --to=iec "$before_total")"
echo "Totale dopo : $(numfmt --to=iec "$after_total")"
if [ "$before_total" -gt 0 ]; then
  saved=$((before_total - after_total))
  pct="$(awk -v b="$before_total" -v a="$after_total" 'BEGIN { printf "%.2f", (b-a)*100/b }')"
  echo "Risparmio   : $(numfmt --to=iec "$saved") (${pct}%)"
fi

echo
echo "Rollback completo:"
echo "./scripts/ripristina-video.sh \"$BACKUP_DIR\""
