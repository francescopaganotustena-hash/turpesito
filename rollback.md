# Rollback Operativo Sezioni Sito

Questo documento ti permette di riattivare (o spegnere) rapidamente le sezioni del sito senza toccare il codice.

Stato attuale predefinito:
- Eventi: OFF
- Form contatti ("Invia una richiesta"): OFF
- Preview musica Home ("Ultime uscite"): OFF
- Pagina Musica (/musica): OFF

---

## 1) Dove si controlla tutto

Le feature flags sono lette da:
- `src/config/featureFlags.ts`

Le variabili ambiente sono definite (con esempi) in:
- `.env.example`

Per usarle davvero in locale:
1. Crea file `.env.local` nella root del progetto (`/home/sviluppatore/Documenti/Gianluca/.env.local`).
2. Inserisci le variabili che vuoi attivare/disattivare.
3. Riavvia il server (`npm run dev` oppure `scripts/spegni-sito.sh` + `scripts/avvia-sito.sh`).

Nota importante:
- Vite legge le variabili `VITE_*` solo all'avvio.
- Se cambi una flag e non riavvii, il sito non riflette il cambio.

---

## 2) Catalogo rapido toggle (cosa fa ogni flag)

`VITE_ENABLE_EVENTS`
- `false`: nasconde menu Eventi, nasconde preview Eventi in Home, `/eventi` fa redirect a `/`.
- `true`: riattiva menu, sezione Home e pagina Eventi.
- File coinvolti: `src/App.tsx`, `src/data/index.ts`, `src/pages/Home.tsx`.

`VITE_ENABLE_CONTACT_FORM`
- `false`: in `/contatti` resta solo Booking con contatti diretti (niente form).
- `true`: riattiva il blocco "Invia una richiesta".
- File coinvolti: `src/pages/Contact.tsx`.

`VITE_ENABLE_HOME_MUSIC_PREVIEW`
- `false`: nasconde la sezione "Ultime uscite" in Home.
- `true`: mostra la sezione preview musica in Home.
- File coinvolti: `src/pages/Home.tsx`.

`VITE_ENABLE_MUSIC_PAGE`
- `false`: nasconde voce menu Musica, nasconde CTA hero verso Musica, `/musica` redirect a `/`.
- `true`: riattiva pagina Musica e collegamenti.
- File coinvolti: `src/App.tsx`, `src/data/index.ts`, `src/components/HeroSection.tsx`, `src/pages/Home.tsx`.

---

## 3) Configurazioni pronte all'uso (copia/incolla)

### Profilo A: sito minimale (stato attuale)
```bash
VITE_ENABLE_EVENTS=false
VITE_ENABLE_CONTACT_FORM=false
VITE_ENABLE_HOME_MUSIC_PREVIEW=false
VITE_ENABLE_MUSIC_PAGE=false
```

### Profilo B: solo Musica completa
```bash
VITE_ENABLE_EVENTS=false
VITE_ENABLE_CONTACT_FORM=false
VITE_ENABLE_HOME_MUSIC_PREVIEW=true
VITE_ENABLE_MUSIC_PAGE=true
```

### Profilo C: solo Eventi attivi
```bash
VITE_ENABLE_EVENTS=true
VITE_ENABLE_CONTACT_FORM=false
VITE_ENABLE_HOME_MUSIC_PREVIEW=false
VITE_ENABLE_MUSIC_PAGE=false
```

### Profilo D: contatti avanzati (con form) ma niente Eventi/Musica
```bash
VITE_ENABLE_EVENTS=false
VITE_ENABLE_CONTACT_FORM=true
VITE_ENABLE_HOME_MUSIC_PREVIEW=false
VITE_ENABLE_MUSIC_PAGE=false
```

### Profilo E: tutte le sezioni ON (assetto completo)
```bash
VITE_ENABLE_EVENTS=true
VITE_ENABLE_CONTACT_FORM=true
VITE_ENABLE_HOME_MUSIC_PREVIEW=true
VITE_ENABLE_MUSIC_PAGE=true
```

---

## 4) Procedura standard di riattivazione (safe)

1. Apri o crea `.env.local`.
2. Imposta le variabili desiderate (`true`/`false`).
3. Riavvia il server:
   - opzione npm: `npm run dev`
   - opzione script: `./scripts/spegni-sito.sh && ./scripts/avvia-sito.sh`
4. Verifica da browser:
   - Home (`/#/`)
   - Musica (`/#/musica`)
   - Eventi (`/#/eventi`)
   - Contatti (`/#/contatti`)
5. Esegui build di controllo:
   - `npm run build`

---

## 5) Matrice verifiche per non lasciare collegamenti orfani

Se `VITE_ENABLE_MUSIC_PAGE=false`:
- Menu non deve mostrare "Musica".
- Hero non deve mostrare pulsante "Ascolta ora".
- `/#/musica` deve redirigere su Home.

Se `VITE_ENABLE_EVENTS=false`:
- Menu non deve mostrare "Eventi".
- Home non deve mostrare preview Eventi.
- `/#/eventi` deve redirigere su Home.

Se `VITE_ENABLE_CONTACT_FORM=false`:
- In `/#/contatti` non deve comparire "Invia una richiesta".
- Deve restare solo blocco Booking con contatti diretti.

Se `VITE_ENABLE_HOME_MUSIC_PREVIEW=false`:
- Home non deve mostrare sezione "Ultime uscite".

---

## 6) Troubleshooting

Problema: ho cambiato `.env.local` ma non cambia nulla.
- Causa probabile: server non riavviato.
- Soluzione: stop/start server e hard refresh browser.

Problema: la route `/musica` o `/eventi` risponde ancora.
- Causa probabile: flag su `true` o build vecchia in cache.
- Soluzione: controlla `.env.local`, riavvia, svuota cache.

Problema: in LAN altri PC non vedono il sito.
- Avvia con `./scripts/avvia-sito.sh` (default host `0.0.0.0`).
- Usa URL `http://IP_DEL_PC:5173/`.
- Se non raggiungibile: verificare firewall/policy aziendale.

Problema: script avvio lanciato con `sh` dava errori.
- Stato: gestito, gli script si auto-rilanciano sotto bash.

---

## 7) Riferimenti file (per modifiche future)

- Feature flags: `src/config/featureFlags.ts`
- Routing pagine: `src/App.tsx`
- Navigazione menu: `src/data/index.ts`
- Home composition: `src/pages/Home.tsx`
- CTA Hero: `src/components/HeroSection.tsx`
- Contatti/Booking: `src/pages/Contact.tsx`
- Esempi env: `.env.example`
- Documentazione generale: `README.md`

---

## 8) Script automatico profili rollback

E disponibile uno script dedicato:
- `scripts/profilo-rollback.sh`

Comandi principali:
```bash
# Elenco profili disponibili
./scripts/profilo-rollback.sh list

# Applica profilo (scrive .env.local)
./scripts/profilo-rollback.sh minimal
./scripts/profilo-rollback.sh full
./scripts/profilo-rollback.sh events-only
./scripts/profilo-rollback.sh contact-advanced
./scripts/profilo-rollback.sh music-full

# Preview senza scrivere file
./scripts/profilo-rollback.sh minimal --dry-run
```

Dettagli operativi script:
- aggiorna solo il blocco gestito tra marker:
  - `# >>> rollback-profile (managed) >>>`
  - `# <<< rollback-profile (managed) <<<`
- mantiene eventuali altre variabili gia presenti in `.env.local`
- se `.env.local` esiste, crea backup automatico:
  - `.env.local.bak.YYYYMMDD_HHMMSS`

Dopo l'applicazione di un profilo:
1. riavvia il server
2. verifica Home, Contatti, Musica, Eventi in base al profilo scelto
