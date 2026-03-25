# Giangi Sax - Sito Web Ufficiale

Sito promozionale per Giangi Sax, cantante e musicista professionista.
Questo README descrive lo stato reale del progetto e va usato come riferimento operativo per i prossimi step.

## Stato Attuale (baseline di lavoro)

- Stack stabile: React + TypeScript + Vite + Tailwind CSS.
- Deploy: Vercel (`https://gianlucascala.vercel.app`).
- Router: `BrowserRouter` (URL puliti SEO-friendly).
- Strategia rollback: disponibile via script `npm run brand:rollback`.
- Comportamento attuale fissato direttamente nel codice.

## Stato Lavoro (aggiornato)

Ultimi interventi consolidati nel codice:

- Rimossi tutti i riferimenti geografici/zone dal sito pubblico.
- Rimossa la sezione \"Video e Live\" dalla homepage.
- Riposizionato il bottone hero \"Richiedi una data\" piu in basso, come da richiesta UX.
- Reintrodotto rollback del naming tramite script `scripts/brand-switch.sh`.
- README riallineato alla struttura reale corrente del progetto.

### Ultime modifiche salvate (2026-03-22)

- Sostituiti i video in `src/assets/videos` con il set da:
  - `/home/sviluppatore/Documenti/turpe selezionato`
- Totale video ora in uso nel sito: **29** file (`1.mp4` ... `29.mp4`).
- Verifica effettuata:
  - build produzione OK
  - pagina `/#/video` renderizza **29** card/video.
- Commit pubblicato:
  - `9c1b1a6` - `Replace site video assets with selected turpe set`

### Memoria Sessione SEO (2026-03-23)

- Inserito meta tag Google Search Console in `index.html`:
  - `<meta name="google-site-verification" content="X9yq2K6CA4byBe64b2mTg4_zxoBvkNg2L7BADaGapzI" />`
- Attivata generazione automatica sitemap/robots in prebuild:
  - `scripts/generate-sitemap.mjs`
  - script npm: `prebuild`
- File pubblici:
  - `public/sitemap.xml`
  - `public/robots.txt`
- Configurato rewrite SPA per Vercel:
  - `vercel.json`
- Dominio sitemap in uso:
  - `https://gianlucascala.vercel.app/sitemap.xml`
- Verifiche fatte:
  - `sitemap.xml` -> HTTP 200, `content-type: application/xml`
  - `robots.txt` -> HTTP 200 e contiene la riga sitemap corretta.
- Nota operativa Search Console:
  - se appare ancora "Impossibile recuperare", rimuovere la sitemap e reinviarla; spesso è un ritardo temporaneo post-deploy.

### Sezioni attive oggi

- Home: Hero + CTA
- Biografia: attiva
- Video: attiva
- Galleria: attiva
- Contatti: attiva (solo contatti diretti, senza form)
- Privacy e Cookie: attiva

### Sezioni non attive oggi

- `/musica` -> redirect a `/`
- `/eventi` -> redirect a `/`

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router DOM v7
- react-helmet-async
- Lucide React

## Struttura Progetto

```text
.
├── .github/workflows/deploy-pages.yml
├── public/
├── scripts/
│   ├── avvia-sito.sh
│   └── spegni-sito.sh
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   │   └── index.ts
│   ├── pages/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
```

## Routing Reale

Definito in [`src/App.tsx`](src/App.tsx):

- `/` -> Home
- `/biografia` -> Biography
- `/video` -> Videos
- `/galleria` -> Gallery
- `/contatti` -> Contact
- `/privacy-cookie` -> PrivacyCookie
- `/musica` -> redirect a `/`
- `/eventi` -> redirect a `/`

## Dati e Contenuti

Tutti i contenuti principali sono centralizzati in [`src/data/index.ts`](src/data/index.ts):

- `siteConfig`
- `biography`
- `tracks` (attualmente non esposta in pagina attiva)
- `videos`
- `instagramReels`
- `events` (attualmente non esposta in pagina attiva)
- `gallery`
- `eventTypes`
- `heroImages`

## Componenti Chiave

- [`src/components/Layout.tsx`](src/components/Layout.tsx)
  Gestisce struttura globale: Navbar, contenuto pagina, pulsante WhatsApp flottante, Footer.

- [`src/components/HeroSection.tsx`](src/components/HeroSection.tsx)
  Hero principale in homepage con CTA "Richiedi una data".

- [`src/components/ScrollRevealManager.tsx`](src/components/ScrollRevealManager.tsx)
  Reveal progressivo delle sezioni allo scroll (attivo).

- [`src/components/WhatsAppFloatingButton.tsx`](src/components/WhatsAppFloatingButton.tsx)
  Pulsante WhatsApp flottante sempre visibile.

- [`src/components/SmartVideo.tsx`](src/components/SmartVideo.tsx)
  Gestione video con lazy loading per ridurre il carico iniziale.

## Contatti (stato attuale)

In [`src/pages/Contact.tsx`](src/pages/Contact.tsx):

- pagina centrata su contatti diretti
- no form di richiesta attivo
- canali: telefono, WhatsApp, Instagram

## Media

- Video sito: `src/assets/videos/*.mp4`
- Video biografia: `src/assets/site-photos/biografia-sax.mp4`
- Galleria: caricata automaticamente da `src/assets/gallery/**` via `import.meta.glob`

Nota: i backup locali non versionati sono stati rimossi per liberare spazio.

## Avvio Locale

```bash
npm install
npm run dev
```

Alternativa con script locali:

```bash
./scripts/avvia-sito.sh
./scripts/spegni-sito.sh
```

## Qualita e Build

```bash
npm run lint
npm run build
npm run preview
```

## Deploy

Deploy su Vercel collegato al branch `main`.
Ogni push su `main` aggiorna la produzione.

## Convenzioni Operative (da mantenere)

- Evitare logiche temporanee di rollback nel runtime.
- Ogni cambio funzionale deve essere riflesso in questo README.
- Prima del push:
  1. `npm run lint`
  2. `npm run build`
  3. verifica rapida pagine principali (`/`, `/biografia`, `/video`, `/galleria`, `/contatti`).

## Prossimi Step Consigliati

- Aggiornare copy/SEO in modo coerente con le sezioni attive.
- Valutare pulizia di pagine/componenti non più usati (`Music`, `Events`, `ContactForm`) se confermata la dismissione.
- Pianificare una strategia editoriale contenuti (media, testi, calendario aggiornamenti).
