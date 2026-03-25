#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-}"

if [[ "$MODE" != "apply" && "$MODE" != "rollback" ]]; then
  echo "Usage: $0 <apply|rollback>"
  exit 1
fi

FILES=(
  "src/data/index.ts"
  "src/components/WhatsAppFloatingButton.tsx"
  "index.html"
  "README.md"
)

for file in "${FILES[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "Missing file: $file"
    exit 1
  fi
done

if [[ "$MODE" == "apply" ]]; then
  for file in "${FILES[@]}"; do
    sed -i 's/Gianluca Scala/Giangi Sax/g' "$file"
    sed -i 's/Ciao, mi chiamo Gianluca\./Ciao, mi chiamo Giangi./g' "$file"
    sed -i 's/Ciao Gianluca,/Ciao Giangi,/g' "$file"
  done
  echo "Brand apply completed: Gianluca Scala -> Giangi Sax"
else
  for file in "${FILES[@]}"; do
    sed -i 's/Giangi Sax/Gianluca Scala/g' "$file"
    sed -i 's/Ciao, mi chiamo Giangi\./Ciao, mi chiamo Gianluca./g' "$file"
    sed -i 's/Ciao Giangi,/Ciao Gianluca,/g' "$file"
  done
  echo "Rollback completed: Giangi Sax -> Gianluca Scala"
fi
