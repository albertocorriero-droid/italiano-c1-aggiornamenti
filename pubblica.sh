#!/bin/bash
# Uso:  ./pubblica.sh "Nuove letture per la settimana 3"
# Crea manifest.json (versione +1, hash SHA-256 di ogni file), poi commit e push.
# Il pulsante «Scarica aggiornamento» sul Mac di Aya legge questo manifest.
cd "$(dirname "$0")" || exit 1
NOTA="${1:-}"
if [ -z "$NOTA" ]; then echo 'Scrivi una nota breve: ./pubblica.sh "Cosa è cambiato"'; exit 1; fi
NOTA="${NOTA//\"/}"; NOTA="${NOTA//\\/}"
VER=$(grep -o '"versione": *[0-9]*' manifest.json 2>/dev/null | grep -o '[0-9]*$')
VER=$(( ${VER:-0} + 1 ))
FILES=$(find . -type f \( -name '*.js' -o -name '*.css' -o -name '*.html' -o -name '*.json' -o -name '*.txt' -o -name '*.jpg' -o -name '*.jpeg' -o -name '*.png' -o -name '*.webp' -o -name '*.svg' \) ! -name manifest.json ! -name '.*' ! -path './.git/*' | sed 's|^\./||' | sort)
if echo "$FILES" | grep -qvE '^[A-Za-z0-9_./-]+$'; then
  echo "Nomi di file non ammessi (solo lettere, numeri, _ - . /):"; echo "$FILES" | grep -vE '^[A-Za-z0-9_./-]+$'; exit 1
fi
{
  echo '{'
  echo "  \"versione\": $VER,"
  echo "  \"data\": \"$(date +%F)\","
  echo "  \"note\": \"$NOTA\","
  echo '  "files": ['
  first=1
  while IFS= read -r f; do
    h=$(shasum -a 256 "$f" | cut -d' ' -f1)
    [ $first = 1 ] || echo ','
    first=0
    printf '    {"path": "%s", "sha256": "%s"}' "$f" "$h"
  done <<< "$FILES"
  echo
  echo '  ]'
  echo '}'
} > manifest.json.tmp && mv manifest.json.tmp manifest.json
echo "Versione $VER pronta ($(echo "$FILES" | wc -l | tr -d ' ') file)."
git add -A && git commit -q -m "Versione $VER: $NOTA" && git push -q origin HEAD && echo "Pubblicato. Aya può scaricare l'aggiornamento dal pulsante."
