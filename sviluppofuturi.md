# Sviluppi Futuri Strategici e Tecnici

Basato sullo stato attuale del progetto e sul backlog esistente, ecco le principali aree di intervento per far compiere un salto di qualità al sito web di Gianluca Scala.

## 1. ⚡ Performance e Ottimizzazione Media (Vittoria Veloce)
Attualmente il sito carica foto e video (inclusi 18 file `.mp4` locali) direttamente dal bundle. Per un sito artistico la fluidità è tutto.
*   **Compressione e Formati Next-Gen**: Convertire tutte le immagini `.png`/`.jpg` nel formato `WebP` o `AVIF`. Ritagliare e comprimere fortemente i video `.mp4` (offrendo versioni a 720p molto leggere per il web).
*   **Lazy Loading Interattivo**: Assicurarsi che i componenti video (soprattutto nella griglia di `Videos.tsx`) vengano caricati in modalità "lazy" o che mostrino una copertina statica prima dell'interazione dell'utente (mouse hover o tap). Questo abbatterà i tempi di caricamento (Core Web Vitals) e migliorerà l'esperienza su smartphone.

## 2. 🎨 UI/UX e "Effetto Wow" (Miglioramento Estetico)
Il sito usa Tailwind in maniera impeccabile, ma per un musicista l'emozione visiva deve rispecchiare quella sonora.
*   **Micro-animazioni (Scroll Reveal)**: Integrare librerie leggere (o CSS nativo) per far apparire le sezioni in modo fluido mentre si scrolla (es. *fade-in-up* per le foto della galleria e per i testi). Dà un senso di altissima qualità e cura dei dettagli (design "Premium").
*   **Pulsante WhatsApp Fluttuante (Floating FAB)**: Oltre ai bottoni nella pagina Contatti, un'icona WhatsApp fissa in basso a destra dello schermo aumenta statisticamente le conversioni e le prenotazioni per i servizi locali del 30-40%.

## 3. 📈 SEO Locale e Social Sharing (Farsi trovare)
Il backlog cita giustamente la SEO Locale. Visto che il sito usa React/Vite (SPA), dobbiamo assicurarci che Google lo legga perfettamente:
*   **Sitemap e Robots.txt**: Aggiungere un plugin Vite per generare automaticamente una `sitemap.xml` da inviare a Google Search Console.
*   **Dati Strutturati (JSON-LD)**: Inserire nel tag `<head>` (es. tramite `react-helmet-async`) i dati strutturati per `LocalBusiness` e `MusicGroup`. Aiuta Google a creare schede "Knowledge Panel" evidenziando l'area operativa (es. *Napoli e provincia*).
*   **Open Graph Card Dinamiche**: Assicurarsi che quando il link del sito viene condiviso su WhatsApp o Facebook, appaia un'eccellente card di anteprima con una foto in alta qualità dell'artista e un copy accattivante, non un link spoglio.

## 4. 🧠 La Transizione al Dinamico (Da Statico a Headless CMS)
Attualmente i dati del progetto risiedono in `src/data/index.ts`. Sebbene l'idea di un pannello Admin esista su `PROJECT_MEMORY.md`, costruire backend, database e auth portal da zero è lungo e oneroso da manutenere.
*   **Raccomandazione**: Integrare un **Headless CMS gratuito** e pronto all'uso come *Supabase*, *Sanity.io* o *Firebase*. 
*   **Vantaggio**: Gianluca godrebbe di un'apposita dashboard visiva moderna (CMS) per caricare nuove foto, cambiare date degli eventi e organizzare le informazioni autonomamente dal suo smartphone. Il sito React resterebbe identico: farebbe solo una *fetch* asincrona dei dati, consentendo un hosting frontend a costo zero come su GitHub Pages.

## 5. 💍 Targetizzazione Business (Destination Wedding)
Napoli e la Costiera Amalfitana rappresentano uno dei mercati più redditizi in Europa per chi organizza matrimoni internazionali. 
*   **Internazionalizzazione (i18n)**: Rilasciare una versione in lingua inglese del sito. Gli stranieri che cercano *"Wedding singer Amalfi Coast"* hanno un elevato potere di spesa, e proporsi con un sito tradotto perfettamente aprirebbe il campo a collaborazioni internazionali ad alto margine.

## 6. 🤝 Social Proof (Recensioni e Testimonianze)
Tra i miglioramenti ad alto impatto manca ancora la certificazione della qualità tramite una vera "riprova sociale":
*   **Modulo Recensioni**: Inserire una sezione strutturata in Homepage *"Dicono di me"* o *"Testimonianze"*. Riportare i commenti autentici degli sposi, gli anni di servizio passati, o agenzie di live entertainment con nome della location ed eventuale data. Genera immediatamente fiducia prima che il cliente apra la pagina Contatti.
