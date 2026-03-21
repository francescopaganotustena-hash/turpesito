#!/usr/bin/env bash

# Allow execution via `sh script.sh` by re-running under bash.
if [ -z "${BASH_VERSION:-}" ]; then
  exec bash "$0" "$@"
fi

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$ROOT_DIR/.env.local"
STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP_FILE="$ROOT_DIR/.env.local.bak.$STAMP"

START_MARK="# >>> rollback-profile (managed) >>>"
END_MARK="# <<< rollback-profile (managed) <<<"

print_usage() {
  cat <<'USAGE'
Uso:
  scripts/profilo-rollback.sh list
  scripts/profilo-rollback.sh <profilo> [--dry-run]
  scripts/profilo-rollback.sh apply <profilo> [--dry-run]

Profili disponibili:
  minimal            Core OFF + pagina Video ON (stato attuale)
  full               Tutto ON
  events-only        Solo Eventi ON
  contact-advanced   Solo form contatti ON
  music-full         Pagina Musica + preview Home ON
USAGE
}

print_profile_block() {
  local profile="$1"

  case "$profile" in
    minimal)
      cat <<'BLOCK'
VITE_ENABLE_EVENTS=false
VITE_ENABLE_CONTACT_FORM=false
VITE_ENABLE_HOME_MUSIC_PREVIEW=false
VITE_ENABLE_MUSIC_PAGE=false
VITE_ENABLE_VIDEO_PAGE=true
VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS=true
VITE_ENABLE_SCROLL_REVEAL=true
VITE_ENABLE_WHATSAPP_FLOATING_BUTTON=true
BLOCK
      ;;
    full)
      cat <<'BLOCK'
VITE_ENABLE_EVENTS=true
VITE_ENABLE_CONTACT_FORM=true
VITE_ENABLE_HOME_MUSIC_PREVIEW=true
VITE_ENABLE_MUSIC_PAGE=true
VITE_ENABLE_VIDEO_PAGE=true
VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS=true
VITE_ENABLE_SCROLL_REVEAL=true
VITE_ENABLE_WHATSAPP_FLOATING_BUTTON=true
BLOCK
      ;;
    events-only)
      cat <<'BLOCK'
VITE_ENABLE_EVENTS=true
VITE_ENABLE_CONTACT_FORM=false
VITE_ENABLE_HOME_MUSIC_PREVIEW=false
VITE_ENABLE_MUSIC_PAGE=false
VITE_ENABLE_VIDEO_PAGE=false
VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS=true
VITE_ENABLE_SCROLL_REVEAL=true
VITE_ENABLE_WHATSAPP_FLOATING_BUTTON=true
BLOCK
      ;;
    contact-advanced)
      cat <<'BLOCK'
VITE_ENABLE_EVENTS=false
VITE_ENABLE_CONTACT_FORM=true
VITE_ENABLE_HOME_MUSIC_PREVIEW=false
VITE_ENABLE_MUSIC_PAGE=false
VITE_ENABLE_VIDEO_PAGE=false
VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS=true
VITE_ENABLE_SCROLL_REVEAL=true
VITE_ENABLE_WHATSAPP_FLOATING_BUTTON=true
BLOCK
      ;;
    music-full)
      cat <<'BLOCK'
VITE_ENABLE_EVENTS=false
VITE_ENABLE_CONTACT_FORM=false
VITE_ENABLE_HOME_MUSIC_PREVIEW=true
VITE_ENABLE_MUSIC_PAGE=true
VITE_ENABLE_VIDEO_PAGE=false
VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS=true
VITE_ENABLE_SCROLL_REVEAL=true
VITE_ENABLE_WHATSAPP_FLOATING_BUTTON=true
BLOCK
      ;;
    *)
      echo "Profilo non valido: $profile" >&2
      return 1
      ;;
  esac
}

remove_managed_block() {
  local input_file="$1"
  if [ ! -f "$input_file" ]; then
    return 0
  fi

  awk -v start="$START_MARK" -v end="$END_MARK" '
    $0 == start { skip=1; next }
    $0 == end { skip=0; next }
    skip != 1 { print }
  ' "$input_file"
}

list_profiles() {
  cat <<'LIST'
Profili rollback disponibili:
- minimal
- full
- events-only
- contact-advanced
- music-full
LIST
}

apply_profile() {
  local profile="$1"
  local dry_run="$2"

  local profile_block
  profile_block="$(print_profile_block "$profile")"

  local tmp_file
  tmp_file="$(mktemp)"

  {
    if [ -f "$ENV_FILE" ]; then
      remove_managed_block "$ENV_FILE"
      echo
    fi
    echo "$START_MARK"
    echo "# Profilo applicato: $profile"
    echo "$profile_block"
    echo "$END_MARK"
  } > "$tmp_file"

  if [ "$dry_run" = "true" ]; then
    echo "[DRY-RUN] Profilo selezionato: $profile"
    echo "[DRY-RUN] Nuovo contenuto gestito per $ENV_FILE:"
    cat "$tmp_file"
    rm -f "$tmp_file"
    return 0
  fi

  if [ -f "$ENV_FILE" ]; then
    cp "$ENV_FILE" "$BACKUP_FILE"
    echo "Backup creato: $BACKUP_FILE"
  fi

  mv "$tmp_file" "$ENV_FILE"
  echo "Profilo '$profile' applicato su: $ENV_FILE"
  echo "Riavvia il server per applicare le modifiche:"
  echo "- npm run dev"
  echo "oppure"
  echo "- ./scripts/spegni-sito.sh && ./scripts/avvia-sito.sh"
}

main() {
  if [ "$#" -lt 1 ]; then
    print_usage
    exit 1
  fi

  local dry_run="false"
  local cmd="$1"
  shift || true

  case "$cmd" in
    list)
      list_profiles
      exit 0
      ;;
    apply)
      if [ "$#" -lt 1 ]; then
        echo "Manca il nome profilo." >&2
        print_usage
        exit 1
      fi
      local profile="$1"
      shift || true
      if [ "${1:-}" = "--dry-run" ]; then
        dry_run="true"
      fi
      apply_profile "$profile" "$dry_run"
      ;;
    *)
      local profile="$cmd"
      if [ "${1:-}" = "--dry-run" ]; then
        dry_run="true"
      fi
      apply_profile "$profile" "$dry_run"
      ;;
  esac
}

main "$@"
