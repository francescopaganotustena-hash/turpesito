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
- Sostituire contenuti placeholder (immagini, link social, YouTube ID).
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
