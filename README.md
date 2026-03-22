# Gianluca Scala - Sito Web Ufficiale

Sito promozionale per Gianluca Scala, cantante e musicista professionista.
Questo README descrive lo stato reale del progetto e va usato come riferimento operativo per i prossimi step.

## Stato Attuale (baseline di lavoro)

- Stack stabile: React + TypeScript + Vite + Tailwind CSS.
- Deploy: GitHub Pages via GitHub Actions.
- Router: `HashRouter` (compatibile con Pages).
- Strategia rollback: rimossa dal progetto (niente feature flag runtime, niente script di profilo rollback).
- Comportamento attuale fissato direttamente nel codice.

## Stato Lavoro (aggiornato)

Ultimi interventi consolidati nel codice:

- Rimossi tutti i riferimenti geografici/zone dal sito pubblico.
- Rimossa la sezione \"Video e Live\" dalla homepage.
- Riposizionato il bottone hero \"Richiedi una data\" piu in basso, come da richiesta UX.
- Rimossa infrastruttura rollback (feature flags, script e documenti collegati).
- README riallineato alla struttura reale corrente del progetto.

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

Deploy automatico su GitHub Pages tramite workflow:

- [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)

Ogni push su `main` genera la nuova pubblicazione.

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
