# Rollback Operativo Sezioni Sito

Questo documento ti permette di riattivare (o spegnere) rapidamente le sezioni del sito senza toccare il codice.

Stato attuale predefinito:
- Eventi: OFF
- Form contatti ("Invia una richiesta"): OFF
- Preview musica Home ("Ultime uscite"): OFF
- Pagina Musica (/musica): OFF
- Pagina Video (/video): ON
- Preview Reel Instagram in Home: ON
- Sezione "Video e Live" in Home: OFF
- Scroll reveal sezioni: ON
- Pulsante WhatsApp floating: ON (versione discreta a sola icona)
- Media lazy loading: ON
- Media autoplay pesanti: OFF

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

`VITE_ENABLE_VIDEO_PAGE`
- `false`: nasconde voce menu Video e disattiva route `/video` (redirect a `/`).
- `true`: riattiva pagina Video e voce menu.
- File coinvolti: `src/App.tsx`, `src/data/index.ts`, `src/components/VideoPreview.tsx`.

`VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS`
- `false`: in Home usa la preview video classica basata su `videos` (`src/data/index.ts`).
- `true`: in Home mostra card Reel Instagram collegate al profilo.
- File coinvolti: `src/config/featureFlags.ts`, `src/components/VideoPreview.tsx`, `src/data/index.ts`.

`VITE_ENABLE_HOME_VIDEO_PREVIEW`
- `false`: nasconde completamente la sezione "Video e Live" dalla homepage.
- `true`: riattiva la sezione "Video e Live" in Home.
- File coinvolti: `src/config/featureFlags.ts`, `src/pages/Home.tsx`, `src/components/VideoPreview.tsx`.

`VITE_ENABLE_SCROLL_REVEAL`
- `false`: disattiva tutte le animazioni reveal in ingresso allo scroll.
- `true`: abilita reveal progressivo delle sezioni (`main section`) con Intersection Observer.
- File coinvolti: `src/config/featureFlags.ts`, `src/components/ScrollRevealManager.tsx`, `src/index.css`, `src/components/Layout.tsx`.

`VITE_ENABLE_WHATSAPP_FLOATING_BUTTON`
- `false`: nasconde il pulsante WhatsApp flottante.
- `true`: mostra il pulsante fisso in basso a destra su tutte le pagine.
- File coinvolti: `src/config/featureFlags.ts`, `src/components/WhatsAppFloatingButton.tsx`, `src/components/Layout.tsx`.

`VITE_ENABLE_MEDIA_LAZY_LOADING`
- `false`: carica subito i video pesanti (comportamento legacy).
- `true`: carica i video solo vicino al viewport (meno traffico iniziale).
- File coinvolti: `src/config/featureFlags.ts`, `src/components/SmartVideo.tsx`, `src/pages/Biography.tsx`, `src/pages/Videos.tsx`.

`VITE_ENABLE_MEDIA_AUTOPLAY`
- `false`: disattiva autoplay dei video pesanti.
- `true`: riattiva autoplay automatico (comportamento legacy).
- File coinvolti: `src/config/featureFlags.ts`, `src/pages/Biography.tsx`, `src/pages/Videos.tsx`.

---

## 3) Configurazioni pronte all'uso (copia/incolla)

### Profilo A: sito minimale (stato attuale)
```bash
VITE_ENABLE_EVENTS=false
VITE_ENABLE_CONTACT_FORM=false
VITE_ENABLE_HOME_MUSIC_PREVIEW=false
VITE_ENABLE_MUSIC_PAGE=false
VITE_ENABLE_VIDEO_PAGE=true
VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS=true
VITE_ENABLE_HOME_VIDEO_PREVIEW=false
VITE_ENABLE_SCROLL_REVEAL=true
VITE_ENABLE_WHATSAPP_FLOATING_BUTTON=true
VITE_ENABLE_MEDIA_LAZY_LOADING=true
VITE_ENABLE_MEDIA_AUTOPLAY=false
```

### Profilo B: solo Musica completa
```bash
VITE_ENABLE_EVENTS=false
VITE_ENABLE_CONTACT_FORM=false
VITE_ENABLE_HOME_MUSIC_PREVIEW=true
VITE_ENABLE_MUSIC_PAGE=true
VITE_ENABLE_VIDEO_PAGE=false
VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS=true
VITE_ENABLE_HOME_VIDEO_PREVIEW=false
VITE_ENABLE_SCROLL_REVEAL=true
VITE_ENABLE_WHATSAPP_FLOATING_BUTTON=true
VITE_ENABLE_MEDIA_LAZY_LOADING=true
VITE_ENABLE_MEDIA_AUTOPLAY=false
```

### Profilo C: solo Eventi attivi
```bash
VITE_ENABLE_EVENTS=true
VITE_ENABLE_CONTACT_FORM=false
VITE_ENABLE_HOME_MUSIC_PREVIEW=false
VITE_ENABLE_MUSIC_PAGE=false
VITE_ENABLE_VIDEO_PAGE=false
VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS=true
VITE_ENABLE_HOME_VIDEO_PREVIEW=false
VITE_ENABLE_SCROLL_REVEAL=true
VITE_ENABLE_WHATSAPP_FLOATING_BUTTON=true
VITE_ENABLE_MEDIA_LAZY_LOADING=true
VITE_ENABLE_MEDIA_AUTOPLAY=false
```

### Profilo D: contatti avanzati (con form) ma niente Eventi/Musica
```bash
VITE_ENABLE_EVENTS=false
VITE_ENABLE_CONTACT_FORM=true
VITE_ENABLE_HOME_MUSIC_PREVIEW=false
VITE_ENABLE_MUSIC_PAGE=false
VITE_ENABLE_VIDEO_PAGE=false
VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS=true
VITE_ENABLE_HOME_VIDEO_PREVIEW=false
VITE_ENABLE_SCROLL_REVEAL=true
VITE_ENABLE_WHATSAPP_FLOATING_BUTTON=true
VITE_ENABLE_MEDIA_LAZY_LOADING=true
VITE_ENABLE_MEDIA_AUTOPLAY=false
```

### Profilo E: tutte le sezioni ON (assetto completo)
```bash
VITE_ENABLE_EVENTS=true
VITE_ENABLE_CONTACT_FORM=true
VITE_ENABLE_HOME_MUSIC_PREVIEW=true
VITE_ENABLE_MUSIC_PAGE=true
VITE_ENABLE_VIDEO_PAGE=true
VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS=true
VITE_ENABLE_HOME_VIDEO_PREVIEW=true
VITE_ENABLE_SCROLL_REVEAL=true
VITE_ENABLE_WHATSAPP_FLOATING_BUTTON=true
VITE_ENABLE_MEDIA_LAZY_LOADING=true
VITE_ENABLE_MEDIA_AUTOPLAY=false
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

Se `VITE_ENABLE_VIDEO_PAGE=false`:
- Menu non deve mostrare "Video".
- `/#/video` deve redirigere su Home.

Se `VITE_ENABLE_HOME_VIDEO_PREVIEW=false`:
- Home non deve mostrare la sezione "Video e Live".

Se `VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS=true`:
- In Home deve comparire la sezione "Video e Live" con card Reel Instagram.
- Non devono comparire iframe Instagram con UI nativa.

Se `VITE_ENABLE_SCROLL_REVEAL=false`:
- Le sezioni devono apparire senza animazione in ingresso.

Se `VITE_ENABLE_WHATSAPP_FLOATING_BUTTON=false`:
- Non deve comparire il pulsante flottante in basso a destra.

Se `VITE_ENABLE_MEDIA_LAZY_LOADING=true`:
- I video nella pagina Biografia e Video devono iniziare a caricarsi solo vicino alla viewport.

Se `VITE_ENABLE_MEDIA_AUTOPLAY=false`:
- I video nella pagina Biografia e Video non devono avviarsi automaticamente.

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
- Pagina video: `src/pages/Videos.tsx`
- Preview video home: `src/components/VideoPreview.tsx`
- Scroll reveal manager: `src/components/ScrollRevealManager.tsx`
- Pulsante WhatsApp floating: `src/components/WhatsAppFloatingButton.tsx`
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

---

## 9) Ottimizzazione video con backup (ffmpeg locale)

Sono disponibili due script dedicati:
- `scripts/ottimizza-video.sh`
- `scripts/ripristina-video.sh`

Prerequisito:
- dipendenza dev `ffmpeg-static` installata nel progetto (`package.json`).

Ottimizzazione (con backup automatico):
```bash
./scripts/ottimizza-video.sh
```

Cosa fa:
- crea backup versionato in `media-backups/videos-YYYYMMDD_HHMMSS/`
- genera report per-file in `report.tsv`
- sostituisce il file originale solo se la versione ottimizzata e piu piccola
- aggiorna symlink ultimo backup: `media-backups/latest-videos`

Rollback completo dall'ultimo backup:
```bash
./scripts/ripristina-video.sh
```

Rollback da backup specifico:
```bash
./scripts/ripristina-video.sh "/percorso/backup/videos-YYYYMMDD_HHMMSS"
```
