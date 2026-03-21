# Project Memory

## Contesto progetto
- Sito promozionale artista: **Gianluca Scala**.
- Stack: React 19 + TypeScript + Vite + Tailwind CSS v4 + React Router + Helmet.
- Repo GitHub: `francescopaganotustena-hash/turpesito`.
- Hosting: **GitHub Pages** (senza servizi esterni).

## Stato attuale
- Deploy pubblico funzionante su:
  - `https://francescopaganotustena-hash.github.io/turpesito/`
- Routing compatibile GitHub Pages con `HashRouter`.
- Workflow deploy automatico attivo su push in `main`.
- Scroll reset su navigazione attivo (le pagine si aprono dall'alto).
- Ricognizione locale del 2026-03-21 completata:
  - `npm run lint` OK
  - `npm run build` OK
  - feature flags correnti:
    - `VITE_ENABLE_EVENTS=false`
    - `VITE_ENABLE_CONTACT_FORM=false`
    - `VITE_ENABLE_HOME_MUSIC_PREVIEW=false`
    - `VITE_ENABLE_MUSIC_PAGE=false`
    - `VITE_ENABLE_VIDEO_PAGE=true`
    - `VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS=true`

## Decisioni tecniche chiave
- Router cambiato da `BrowserRouter` a `HashRouter` per evitare 404 su refresh in Pages.
- `vite.config.ts` configurato con `base: './'` per path statici robusti in sottocartella repo.
- Workflow GitHub Actions in `.github/workflows/deploy-pages.yml`:
  - Build + deploy Pages.
  - Forzato Node 24 per le JavaScript actions:
    - `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: "true"`.

## Fix UX/UI applicati
- Corretto problema globale di layout “sballato”:
  - Stili globali in `src/index.css` spostati dentro `@layer base` per non rompere utility Tailwind.
- Migliorata coerenza spaziature/centrature tra pagine.
- Navbar mobile stabilizzata.
- Homepage: titolo hero ripristinato come richiesto:
  - `Gianluca` bianco, `Scala` accent.
- Footer navigation: ora ogni cambio pagina parte da cima viewport.

## File principali toccati
- `src/index.css`
- `src/App.tsx`
- `src/components/HeroSection.tsx`
- `src/components/Navbar.tsx`
- `src/pages/*` (allineamenti/layout)
- `vite.config.ts`
- `.github/workflows/deploy-pages.yml`
- `README.md`

## Cronologia commit principali
- `2449d9e` feat: inizializza sito e configura deploy su GitHub Pages
- `ffa5542` ci: force GitHub Actions to run on Node 24
- `b9d39c2` style: set full homepage hero title to accent color
- `13d2883` style: restore white first name in hero title
- `6d3e4fb` fix: reset scroll to top on route navigation

## Comandi utili rapidi
- Dev: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Preview build: `npm run preview`

## Note operative importanti
- Il repository locale in questa cartella e stato inizializzato da zero durante la sessione.
- `dist/` e `node_modules/` sono ignorati da `.gitignore`.
- Per future modifiche UI, verificare sempre:
  - desktop + mobile
  - `npm run lint`
  - `npm run build`

## Prossimi step consigliati
- Allineare e mantenere coerenti documentazione operativa (`README.md`, `rollback.md`, `.env.example`) con i default reali.
- Ottimizzare media pesanti (immagini/video) per migliorare build, deploy e performance.
- Valutare pulizia dipendenze non usate.
- Eventuale ottimizzazione SEO Open Graph (immagine/social cards reali).

## Animazione hero homepage (stato attuale)
- Richiesta: animare leggermente l'immagine di sfondo della hero in home.
- Implementazione:
  - Toggle config in `src/data/index.ts`: `siteConfig.enableHeroAnimation`.
  - Classe condizionale in `src/components/HeroSection.tsx`: `hero-bg-animated`.
  - Keyframes in `src/index.css` (`heroBackgroundDrift`) con zoom + micro-pan.
  - Supporto accessibilita: disattivazione automatica con `prefers-reduced-motion: reduce`.
- Tuning effettuato:
  - prima versione molto soft -> aumentata progressivamente su richiesta.
  - versione corrente: movimento percepibile ma ancora cinematico.
- Rollback rapido:
  - impostare `enableHeroAnimation: false` in `src/data/index.ts`.

## Gestione immagine hero (aggiornamento recente)
- Test con link SharePoint/OneDrive fallito:
  - il link condiviso non era un direct image URL (`403 FORBIDDEN` lato fetch server), quindi non utilizzabile come `background-image`.
- Soluzione adottata:
  - immagine locale fornita dall'utente: `/home/sviluppatore/Documenti/Gianluca/Turpe.png`
  - copiata in path pubblico progetto: `public/images/Turpe.png`
  - hero aggiornata su path locale stabile in `src/data/index.ts`:
    - `hero: "/images/Turpe.png"`
- Backup mantenuti in `src/data/index.ts`:
  - vecchio Unsplash hero
  - link SharePoint test

## Aggiornamento finale hero (stato definitivo corrente)
- Dopo alcuni test, e stato adottato un approccio definitivo e robusto:
  - file locale in repository: `src/assets/hero-main.png`
  - import in `src/data/index.ts`:
    - `import heroMain from '../assets/hero-main.png';`
    - `hero: heroMain`
- Questo evita problemi di:
  - URL esterni non affidabili
  - path errati su GitHub Pages
  - accessi bloccati da provider esterni (OneDrive/SharePoint).

## Cronologia recente da ricordare
- Sono stati fatti test intermedi con:
  - URL SharePoint (non utilizzabile come direct image URL)
  - path `public/images/Turpe.png`
  - fix con `import.meta.env.BASE_URL` (valido ma poi superato da asset importato).
- Stato corrente da mantenere:
  - hero locale importata da `src/assets/hero-main.png`.

## Nota operativa Git (molto importante)
- In questa macchina il push SSH su `origin` fallisce periodicamente:
  - errore: `Permission denied to deploy key`.
- Quando succede:
  - usare push HTTPS con PAT temporaneo.
- Best practice futura:
  - configurare in modo stabile l'autenticazione Git (HTTPS + credential manager o SSH key con write access) per evitare blocchi ricorrenti.

## Strategia futura: area amministratore (in valutazione)
Obiettivo:
- Creare una pagina/admin panel protetta da username/password per modificare contenuti del sito (foto, link YouTube, descrizioni, eventi, contatti, sezioni home, ecc.).

Piano sintetico concordato:
1. Definire MVP e permessi (admin/editor, bozza/pubblicato, rollback).
2. Separare sito pubblico e area admin.
3. Spostare i dati da `src/data/index.ts` a entita persistenti (DB/API).
4. Implementare autenticazione sicura (password hashate, token, rate limiting).
5. Creare API CRUD per tutte le sezioni contenuto + upload immagini.
6. Costruire UI admin modulare con preview e validazioni.
7. Integrare pubblicazione contenuti verso il sito pubblico (cache invalidation).
8. Aggiungere test, audit log, backup e monitoraggio.

Nota architetturale importante:
- Il sito pubblico puo continuare su GitHub Pages.
- Un admin “serio” con login e salvataggio runtime richiede backend + database.
- Alternativa Git-centrica (in sola valutazione): scrittura contenuti su repo via GitHub API + rebuild automatico con Actions; soluzione possibile ma piu delicata lato sicurezza/usabilita.

Roadmap proposta (non ancora implementata):
- Fase 1 (MVP): auth + CRUD contenuti principali + upload + publish.
- Fase 2: versioning/audit e UX editor.
- Fase 3: ruoli avanzati, analytics, ottimizzazioni.

## Hosting e dominio (discussione salvata)
Obiettivo discusso:
- Cliente acquistara un dominio.
- Valutazione infrastruttura per sito pubblico + futura area admin con login/modifica contenuti.

Conclusioni operative:
- VPS Linux Debian e una scelta valida e robusta per controllo completo.
- Per funzionalita admin complete (auth, DB, upload) non basta un hosting statico puro.
- Git puo restare il centro del flusso con deploy automatico da push (CI/CD).

Alternative considerate:
1. GitHub Pages:
- Ottimo per frontend statico.
- Non sufficiente da solo per backend/admin runtime.

2. VPS/Dedicated self-managed:
- Massimo controllo (Nginx, backend API, DB, backup, sicurezza).
- Maggiori responsabilita operative.

3. PaaS/managed:
- Meno complessita sistemistica, piu semplicita di deploy.
- Meno controllo rispetto a VPS puro.

Provider citati:
- Aruba:
  - Hosting condiviso non ideale per stack admin Node completo.
  - Aruba Cloud VPS / Dedicated adatti.
- IONOS:
  - Deploy Now utile per static/PHP.
  - VPS/Cloud adatti per backend + DB + admin.

Nota Git/deploy:
- Le modifiche su Git possono essere ereditate automaticamente dai gestori tramite GitHub Actions/pipeline deploy.

## Aggiornamento operativo: script avvio/spegnimento localhost (2026-03-20)
Problema segnalato:
- Gli script `scripts/avvia-sito.sh` e `scripts/spegni-sito.sh` risultavano instabili in alcuni casi (PID orfani / stop incompleto).

Correzione applicata:
- `avvia-sito.sh` ora:
  - avvia Vite con `setsid` (gruppo processo separato),
  - usa `--strictPort`,
  - salva in `.vite-dev.pid` i campi `PID`, `PGID`, `PORT`,
  - attende che la porta risulti realmente in ascolto prima di confermare l'avvio.
- `spegni-sito.sh` ora:
  - prova prima a chiudere il gruppo processo via `PGID`,
  - poi chiude eventuali PID residui sulla porta,
  - esegue fallback con `kill -9` se necessario,
  - verifica finale sulla porta per confermare stop completo.

Comandi d'uso confermati:
- `./scripts/avvia-sito.sh`
- `./scripts/spegni-sito.sh`
- Porta custom supportata: `./scripts/avvia-sito.sh 3000` / `./scripts/spegni-sito.sh 3000`

Esito:
- Utente ha confermato che gli script ora funzionano correttamente.

## Aggiornamento funzionale recente (2026-03-20): strategia rollback per sezioni sito
Obiettivo operativo richiesto:
- Rimuovere alcune sezioni/pagine dal sito pubblico, mantenendo la possibilita di riattivarle rapidamente.

Approccio adottato:
- Introduzione feature flags centralizzate in:
  - `src/config/featureFlags.ts`
- Ogni area disattivata e governata da una variabile `VITE_*`.
- In quella fase (2026-03-20) lo stato di default richiesto era: sezioni principali **OFF**.

Feature flags attive nel progetto:
- `VITE_ENABLE_EVENTS=false`
  - Effetto: voce menu Eventi nascosta, preview eventi home nascosta, route `/eventi` redirect a `/`.
- `VITE_ENABLE_CONTACT_FORM=false`
  - Effetto: in `/contatti` e nascosta la sezione "Invia una richiesta"; resta solo Booking con contatti diretti.
- `VITE_ENABLE_HOME_MUSIC_PREVIEW=false`
  - Effetto: nascosta la sezione "Ultime uscite" in Home.
- `VITE_ENABLE_MUSIC_PAGE=false`
  - Effetto: pagina `/musica` disattivata (redirect `/`), voce menu Musica nascosta, CTA hero verso Musica nascosta.

File principali coinvolti dalle disattivazioni:
- Routing e redirect:
  - `src/App.tsx`
- Navigazione:
  - `src/data/index.ts`
- Home:
  - `src/pages/Home.tsx`
  - `src/components/HeroSection.tsx`
- Contatti:
  - `src/pages/Contact.tsx`
- Config rollback:
  - `src/config/featureFlags.ts`
  - `.env.example`
  - `README.md`

UI contatti (aggiornamento aggiuntivo):
- In assenza form (`VITE_ENABLE_CONTACT_FORM=false`) il blocco Booking e stato centrato in pagina (titolo, testo, contatti, social, info box).

Script dev/LAN (aggiornamento aggiuntivo):
- `scripts/avvia-sito.sh` aggiornato per:
  - bind rete con host configurabile (default `0.0.0.0`),
  - uso in rete LAN aziendale (es. `10.0.0.x`),
  - compatibilita con esecuzione tramite `sh` (auto-rilancio sotto bash).
- `scripts/spegni-sito.sh` aggiornato con stessa compatibilita `sh` -> bash.

Documento operativo dedicato:
- Creato `rollback.md` (root progetto) per gestione semplice, guidata e dettagliata delle riattivazioni future.
- Creato script `scripts/profilo-rollback.sh` per applicare profili `.env.local` in un comando (con `list` e `--dry-run`).

## Aggiornamento contenuti visual (2026-03-20)
Richiesta utente:
- sostituire le immagini del sito con foto reali dalla cartella locale:
  - `/home/sviluppatore/Documenti/Turpe`

Implementazione:
- create cartelle asset locali nel progetto:
  - `src/assets/site-photos/` (hero/bio/cta, cover tracce, thumbs video, reel)
  - `src/assets/gallery/Backstage`
  - `src/assets/gallery/Live-Performance`
  - `src/assets/gallery/Matrimonio`
- tutte le immagini principali ora sono embedd tramite import asset in `src/data/index.ts`.

Dettaglio galleria:
- prima: galleria con 8 immagini curate manualmente.
- ora: galleria generata automaticamente da **tutte** le foto presenti in `src/assets/gallery/**`.
- conteggio sorgente importata:
  - Backstage: 61 file
  - Live-Performance: 20 file
  - Matrimonio: 15 file
  - Totale: 96 file
- costruzione runtime:
  - uso `import.meta.glob(..., { eager: true, import: 'default' })`
  - mapping categoria da path cartella:
    - `Live-Performance` -> `Live Performance`
    - `Matrimonio` -> `Matrimonio`
    - altrimenti -> `Backstage`

Nota tecnica build:
- in output `dist/assets` puo comparire un numero leggermente inferiore di file WhatsApp con naming originale per deduplica asset del bundler.
- verifica effettuata: asset fotografici serviti correttamente in preview locale (HTTP 200 su file campione).

## Aggiornamento area Video/Home (2026-03-20)
- pagina `/video` disattivata via feature flag con rollback:
  - `VITE_ENABLE_VIDEO_PAGE=false` default.
- sezione Home "Video e Live" mantenuta attiva con card Reel Instagram (senza iframe nativo Instagram, per evitare UI forzata).
- fix GitHub Pages:
  - thumbnail reel ora in asset bundle (import da `src/assets`), non path statico fragile.

Nota aggiornamento successivo (2026-03-21):
- `VITE_ENABLE_VIDEO_PAGE` e stato riportato a default `true`.
- `VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS` e stato portato a default `true`.

## Aggiornamento contatti Booking (2026-03-20)
- in pagina `Booking e Contatti`:
  - rimossi blocco email e icona/link Facebook.
- aggiornati dati contatto globali in `siteConfig`:
  - telefono: `+39 338 2147345`
  - zona: `Napoli e provincia`

## Aggiornamento sessione (2026-03-21): Video/Biografia/Galleria
Obiettivi richiesti:
- inserire un video MP4 embedded nella pagina Biografia;
- creare/attivare una pagina Video con file locali;
- rifinire layout Video (portrait, solo player, link Instagram);
- semplificare Galleria rimuovendo categorie/filtri.

Interventi eseguiti:
- Biografia:
  - aggiunto video locale `src/assets/site-photos/biografia-sax.mp4` nella sezione "Il Percorso" con layout 2 colonne (testo a sinistra, video a destra);
  - player impostato con autoplay muto, loop, controls nativi (rimosso pulsante audio custom).
- Pagina Video:
  - sostituita logica Reel/YouTube con raccolta di video locali da `src/assets/videos/*.mp4` (18 file importati da `/home/sviluppatore/Documenti/VideoGianluca`);
  - card in stile sito con cornice elegante;
  - player in formato portrait (aspect ratio 9:16), autoplay muto, controls nativi;
  - aggiunto link in testa pagina a Instagram con icona e testo:
    - "Visita il mio profilo instagram per vedere altri contenuti";
  - rimossi titoli e descrizioni sotto ai video (pagina minimale: solo player).
- Layout griglia Video:
  - introdotto toggle rapido in `src/pages/Videos.tsx`:
    - `useThreeColumnsDesktop = true` per 3 video per riga su desktop (`xl:grid-cols-3`);
    - basta impostarlo a `false` per rollback immediato a 2 colonne.
- Feature flag Video:
  - pagina Video ora attiva di default nel codice:
    - `enableVideoPage` default `true` in `src/config/featureFlags.ts`;
  - `.env.example` aggiornato coerentemente con `VITE_ENABLE_VIDEO_PAGE=true`.
- Galleria:
  - rimossa completamente la barra categorie/filtro;
  - ora mostra direttamente tutte le immagini.

File principali coinvolti:
- `src/pages/Biography.tsx`
- `src/assets/site-photos/biografia-sax.mp4`
- `src/pages/Videos.tsx`
- `src/assets/videos/` (1.mp4 ... 18.mp4)
- `src/config/featureFlags.ts`
- `.env.example`
- `src/components/GalleryGrid.tsx`

Note operative:
- `.env.local` resta ignorato da Git (voluto): non usare `.env.local` per modifiche che devono comparire in remoto.
- verifiche build locale effettuate con esito positivo durante la sessione.

## Aggiornamento sessione (2026-03-21): documentazione, social, contatti e CTA
Obiettivi richiesti:
- riallineare documentazione/config allo stato reale del progetto;
- rimuovere ogni richiamo a YouTube dal sito;
- migliorare CTA social (Instagram/WhatsApp) in footer e pagina Contatti;
- eliminare duplicazione in navbar tra "Contatti" e "Contattami";
- ottimizzare inquadratura e leggibilita della sezione CTA in Home.

Interventi eseguiti e gia pubblicati:
- Documentazione/rollback allineati ai default reali:
  - aggiornati `README.md`, `PROJECT_MEMORY.md`, `.env.example`, `rollback.md`, `scripts/profilo-rollback.sh`.
- Backlog strategico salvato e versionato:
  - creato `MARKETING_SEO_BACKLOG.md`.
- YouTube rimosso da UI e dati:
  - rimossi link/icona YouTube in footer e contatti;
  - rimossi campi `youtubeId` dai dati video.
- Footer:
  - CTA Instagram resa piu evidente ("Seguimi su Instagram");
  - aggiunto link WhatsApp diretto su numero configurato.
- Pagina Contatti:
  - rinominata UI da "Booking" a "Contatti";
  - aggiunto blocco WhatsApp dedicato e allineato graficamente al blocco Telefono.
- Navigazione:
  - voce menu finale rinominata "Contatti";
  - rimosso il duplicato "Contattami" in navbar;
  - mantenuta una sola CTA colorata "Contatti" (desktop+mobile).

Commit pubblicati in questa sessione:
- `c04e12a` docs: allinea documentazione e rollback ai default feature flags correnti
- `ed0ec17` docs: aggiunge backlog marketing seo per pianificazione futura
- `510393f` refactor: rimuove riferimenti youtube da sito e dati
- `eb6dd83` feat: migliora footer home con CTA instagram e whatsapp
- `ea00bd9` refactor: uniforma sezione contatti e navigazione senza duplicati

Intervento finale in corso (non ancora commit/push al momento di questa nota):
- iniziale tentativo su Hero (poi risultato non rilevante rispetto al target visuale);
- correzione effettiva su CTA Home ("Il tuo evento merita la voce giusta"):
  - classe dedicata per inquadratura background (`cta-bg-position`) con posizionamento ottimizzato;
  - badge "Disponibile per eventi..." reso piu leggibile con contrasto maggiore;
  - bottone "Richiedi una data" reso progressivamente piu trasparente su richiesta.

File locali attualmente modificati (dirty) da validare/committare:
- `src/components/CTASection.tsx`
- `src/components/HeroSection.tsx`
- `src/index.css`

Nota importante:
- il blocco mostrato negli screenshot utente era la CTA, non la Hero principale; questo e stato chiarito in sessione e corretto nel flusso di lavoro.
