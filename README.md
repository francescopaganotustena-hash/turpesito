# Gianluca Scala - Sito Web Ufficiale

Sito web promozionale per il cantante e musicista professionista Gianluca Scala. Progettato per valorizzare l'immagine dell'artista, promuovere la sua musica e generare richieste di contatto e booking per eventi, live, matrimoni, serate private e collaborazioni artistiche.

## Concept

**"Emozione dal Vivo"** — Un'esperienza digitale che cattura l'intensità di una performance live.

- **Mood**: Raffinato, cinematografico, coinvolgente
- **Palette**: Nero profondo (#0a0a0a) + Oro caldo (#d4a574) + Bianco caldo (#fafafa)
- **Tipografia**: Cormorant Garamond (headings) + Inter (body)

## Tech Stack

| Tecnologia | Utilizzo |
|------------|----------|
| React 19 + TypeScript | Framework UI |
| Vite | Build tool e dev server |
| Tailwind CSS v4 | Stile (via @tailwindcss/vite) |
| React Router DOM v7 | Navigazione multipagina |
| Radix UI | Componenti accessibili (Dialog, Label, Slot) |
| Lucide React | Icone |
| react-helmet-async | SEO e meta tag |
| clsx + tailwind-merge | Utility per classi dinamiche |

## Struttura Progetto

```
src/
├── components/
│   ├── Navbar.tsx          # Navigazione responsive con menu mobile
│   ├── Footer.tsx          # Footer con contatti, social, navigazione
│   ├── Layout.tsx          # Layout principale (Navbar + Outlet + Footer)
│   ├── Button.tsx           # Componente pulsante con varianti
│   ├── SectionTitle.tsx    # Titoli sezioni con linea accent
│   ├── HeroSection.tsx     # Hero d'impatto fullscreen
│   ├── CTASection.tsx      # Call to action booking
│   ├── MusicPreview.tsx    # Anteprima brani (Home)
│   ├── VideoPreview.tsx     # Anteprima video (Home)
│   ├── EventList.tsx       # Lista eventi con card
│   ├── GalleryGrid.tsx     # Griglia foto con lightbox
│   ├── ContactForm.tsx     # Form contatti completo con validazione
│   └── index.ts            # Export componenti
├── pages/
│   ├── Home.tsx            # Homepage completa
│   ├── Biography.tsx       # Biografia + achievements
│   ├── Music.tsx           # Catalogo brani + featured track
│   ├── Videos.tsx          # Raccolta video locali (.mp4) in griglia portrait
│   ├── Events.tsx          # Eventi passati/futuri
│   ├── Gallery.tsx         # Galleria fotografica
│   └── Contact.tsx         # Pagina booking/contatti
├── data/
│   └── index.ts            # Tutti i dati mock centralizzati
├── App.tsx                 # Routing React Router
├── main.tsx                # Entry point
└── index.css               # Stili globali + Tailwind + theme vars
```

## Pagine

| Pagina | Percorso | Contenuto |
|--------|----------|-----------|
| Home | `/` | Hero, video preview, CTA (musica/eventi opzionali via feature flag) |
| Biografia | `/biografia` | Storia artista, achievements con numeri |
| Musica | `/musica` | Featured track, catalogo brani con cover (abilitabile via feature flag) |
| Video | `/video` | Pagina opzionale (attivabile via feature flag) |
| Eventi | `/eventi` | Eventi futuri (confermati) e passati, attivabile via feature flag |
| Galleria | `/galleria` | Foto con lightbox (senza filtri categoria) |
| Contatti | `/contatti` | Booking con contatti diretti (form opzionale via feature flag) |

## Design System

### Color Palette
```css
--color-primary: #0a0a0a      /* Nero profondo - sfondo principale */
--color-secondary: #1a1a1a    /* Grigio scurissimo - card, sezioni */
--color-accent: #d4a574       /* Oro caldo - accent, CTA, elementi chiave */
--color-accent-dark: #8b7355  /* Bronzo - hover states */
--color-text: #fafafa         /* Bianco caldo - testo principale */
--color-text-muted: #a0a0a0  /* Grigio chiaro - testo secondario */
```

### Componenti Principali
- **Navbar**: Fixed, trasparente → solid on scroll, hamburger menu su mobile
- **HeroSection**: Fullscreen con overlay gradient, animate bounce scroll indicator
- **MusicPreview/VideoPreview**: Grid responsive con hover effects
- **EventList**: Card con badge status, date iconiche italiane
- **GalleryGrid**: Griglia responsive con lightbox e navigazione prev/next
- **ContactForm**: Validazione completa, feedback stati (loading/success/error), attivabile via feature flag

## Setup e Avvio

```bash
# Installazione dipendenze
npm install

# Avvio dev server (http://localhost:5173)
npm run dev

# Build produzione
npm run build

# Preview build produzione
npm run preview
```

## Aggiornamento Contenuti

Tutti i contenuti sono centralizzati in **`src/data/index.ts`**:

```typescript
// Configurazione sito
siteConfig: { name, tagline, subtitle, email, phone, location, social, navigation }

// Biografia
biography: { intro, paragraphs[], achievements[] }

// Brani musicali
tracks: [{ id, title, artist, duration, category, year, cover, spotifyUrl, description }]

// Video preview (modalita classica Home quando Instagram e disattivato)
videos: [{ id, title, description, thumbnail, youtubeId, duration, date }]

// Reels Instagram (modalita Home di default)
instagramReels: [{ id, title, description, date, url, thumbnail }]

// Eventi
events: [{ id, title, type, date, time, location, city, description, status }]

// Galleria
gallery: [{ id, title, category, src, alt }]

// Immagini hero
heroImages: { hero, biography, cta }
```

### Step per Personalizzazione
1. **Media**: Sostituire asset locali in `src/assets/` (hero, cover brani, reels, galleria, video mp4)
2. **Testi**: Modificare `siteConfig`, `biography`, `tracks`, `videos`, `events`
3. **Social**: Aggiornare `siteConfig.social` con link reali
4. **Eventi**: Modificare `events` (status: "upcoming" | "past")

## Feature Flag Eventi (Rollback Rapido)

La sezione Eventi e disattivata di default e rimossa da:
- menu di navigazione
- homepage (preview eventi)
- pagina `/eventi` (redirect automatico a Home quando disattiva)

Per riattivarla rapidamente:

1. Crea un file `.env.local` nella root del progetto.
2. Aggiungi:

```bash
VITE_ENABLE_EVENTS=true
```

3. Riavvia il dev server (`npm run dev`).

Per disattivarla di nuovo, imposta `VITE_ENABLE_EVENTS=false` (o rimuovi la variabile).

## Feature Flag Form Contatti (Rollback Rapido)

La sezione "Invia una richiesta" in `/contatti` e disattivata di default.
La pagina mantiene solo Booking con contatti diretti (email, telefono, zona, social).

Per riattivare il form:

1. Crea (o aggiorna) `.env.local` nella root del progetto.
2. Aggiungi:

```bash
VITE_ENABLE_CONTACT_FORM=true
```

3. Riavvia il dev server (`npm run dev`).

Per nasconderlo di nuovo, imposta `VITE_ENABLE_CONTACT_FORM=false` (o rimuovi la variabile).

## Feature Flag Music Preview Home (Rollback Rapido)

La sezione "Ultime uscite" in Home e disattivata di default.

Per riattivarla:

1. Crea (o aggiorna) `.env.local` nella root del progetto.
2. Aggiungi:

```bash
VITE_ENABLE_HOME_MUSIC_PREVIEW=true
```

3. Riavvia il dev server (`npm run dev`).

Per nasconderla di nuovo, imposta `VITE_ENABLE_HOME_MUSIC_PREVIEW=false` (o rimuovi la variabile).

## Feature Flag Pagina Musica (Rollback Rapido)

La pagina `/musica` e disattivata di default.
Quando disattiva:
- la voce "Musica" sparisce dalla navigazione
- la route `/musica` fa redirect automatico a Home
- i pulsanti Home che puntano a Musica vengono nascosti

Per riattivarla:

1. Crea (o aggiorna) `.env.local` nella root del progetto.
2. Aggiungi:

```bash
VITE_ENABLE_MUSIC_PAGE=true
```

3. Riavvia il dev server (`npm run dev`).

Per disattivarla di nuovo, imposta `VITE_ENABLE_MUSIC_PAGE=false` (o rimuovi la variabile).

## Feature Flag Reel Instagram in Home (Rollback Rapido)

Controlla la sezione "Video e Live" in Home:
- `true` (default): card Reel Instagram (senza iframe)
- `false`: preview video classica basata sui dati `videos`

Per impostarla:

1. Crea (o aggiorna) `.env.local` nella root del progetto.
2. Aggiungi:

```bash
VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS=true
```

3. Riavvia il dev server (`npm run dev`).

Valore consigliato attuale: `VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS=true`.

## Feature Flag Pagina Video (Rollback Rapido)

La pagina `/video` e attiva di default.
Quando disattivata:
- la voce "Video" sparisce dalla navigazione
- la route `/video` fa redirect automatico a Home

Per riattivarla:

1. Crea (o aggiorna) `.env.local` nella root del progetto.
2. Aggiungi:

```bash
VITE_ENABLE_VIDEO_PAGE=true
```

3. Riavvia il dev server (`npm run dev`).

Per disattivarla di nuovo, imposta `VITE_ENABLE_VIDEO_PAGE=false`.

## Pubblicazione

```bash
# Build produzione
npm run build

# La cartella dist/ contiene il sito statico pronto
```

### Deploy diretto su GitHub Pages (senza servizi esterni)

Il progetto e gia configurato per deploy automatico su GitHub Pages tramite workflow:

- [deploy-pages.yml](/home/sviluppatore/Documenti/Gianluca/.github/workflows/deploy-pages.yml)

Passi:
1. Pubblica la repo su GitHub.
2. Assicurati che il branch principale sia `main`.
3. In GitHub vai su `Settings > Pages`.
4. In `Build and deployment`, imposta `Source: GitHub Actions`.
5. Fai push su `main`: il workflow builda e pubblica automaticamente.

Nota routing:
- Il sito usa `HashRouter` per essere compatibile al 100% con GitHub Pages.
- URL pagine: `/#/galleria`, `/#/contatti` (e `/#/musica`, `/#/eventi`, `/#/video` solo se abilitate via feature flag)

## SEO

- Meta description e keywords in ogni pagina
- Open Graph tags per social sharing
- URL hash-based per compatibilita GitHub Pages (`/#/contatti`, `/#/galleria`, ...)
- Semantic HTML (h1-h6 strutturati, alt text immagini)
- Google Fonts ottimizzate con preconnect

## Note di Sviluppo

- Il form contatti (quando attivato) simula invio lato frontend - collegare a backend reale (es. Formspree, EmailJS, Resend API).
- La pagina `/video` usa file locali `src/assets/videos/*.mp4`: valutare compressione periodica per ridurre tempi di build/deploy.
- Se usi `.env.local`, ricorda che e ignorato da Git: i default condivisi vanno mantenuti in `.env.example`.

```bash
npm run build    # Production build
npm run dev      # Development server
```
