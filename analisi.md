# Analisi Progetto: Giangi Sax (turpesito)

**Data revisione:** 12 Aprile 2026  
**Versione progetto:** 0.0.0 (private)  
**URL produzione:** https://gianlucascala.vercel.app  
**Autore revisione:** Codex (su base analisi precedente)

---

## 1. Executive Summary

Analisi complessiva solida: progetto frontend moderno, stack aggiornato, design coerente con target eventi/matrimoni, ma con debito tecnico concentrato su routing, contenuti disallineati e asset/script non puliti.

Stato generale:
- Architettura React/Vite buona e semplice da mantenere.
- UX primaria funzionante (home, bio, video, galleria, contatti).
- Qualita operativa ridotta da codice morto, script incompleti e incoerenze branding/SEO.

Valutazione sintetica:
- **Struttura tecnica:** buona
- **Prontezza produzione:** discreta, migliorabile
- **Priorita immediata:** alta su pulizia e coerenza

---

## 2. Scope e Obiettivo del Sito

Sito portfolio/promozionale per cantante/musicista professionista:
- presentazione artista
- showcase foto/video
- contatto diretto (telefono, WhatsApp, Instagram)

Non include:
- e-commerce
- booking engine
- gestione eventi lato backend

---

## 3. Stack Tecnologico (Sintesi)

- React 19 + React Router 7
- Vite 8
- TypeScript 5.9 (strict)
- Tailwind CSS v4
- React Helmet Async
- Componenti UI custom + Radix Slot/Dialog/Label

Punto positivo: stack attuale e coerente.  
Punto da migliorare: dipendenze residue non usate (`ffmpeg-static`).

---

## 4. Stato Funzionale Attuale

Route attive:
- `/`
- `/biografia`
- `/video`
- `/galleria`
- `/contatti`
- `/privacy-cookie`

Route disattivate via redirect:
- `/musica` -> `/`
- `/eventi` -> `/`

Nota: manca gestione esplicita `404` (`*`).

---

## 5. Findings Principali (Ricalibrati)

## Bloccanti/Alta Priorita

1. **Favicon mancante**
- `index.html` punta a `/favicon.svg` non presente.
- Impatto: 404 costante su ogni load, qualita percepita e log sporchi.

2. **Mancanza route 404**
- URL non valide rendono layout senza contenuto utile.
- Impatto: UX confusa, perdita fiducia utente.

3. **Gestione title duplicata**
- `document.title` via switch in `App.tsx` + meta via Helmet per pagina.
- Impatto: rischio incoerenza futura, manutenzione fragile.

4. **Script `hero-image-switch.sh` rotto**
- Cerca import non piu esistenti in `src/data/index.ts`.
- Impatto: automazione non affidabile.

## Priorita Media

5. **Codice morto**
- Pagine: `Music.tsx`, `Events.tsx` (route disabilitate).
- Componenti: `MusicPreview`, `VideoPreview`, `EventList`, `ContactForm` non usati.

6. **`ContactForm` simulato (fake submit)**
- Attende timeout e mostra successo senza invio reale.
- Rischio alto solo se viene riattivato in UI.

7. **Dati Spotify incoerenti**
- `tracks[].spotifyUrl` punta homepage Spotify, non risorsa utile.

8. **`siteConfig.email` vuota**
- Dato incompleto in configurazione.

9. **Asset duplicati**
- Reel thumbnails presenti in 3 posizioni, una sola usata.

10. **File spazzatura root**
- `vervelsynctest` senza utilita.

11. **Naming immagini gallery poco manutenibile**
- Nomi export WhatsApp con spazi/parentesi.

## Priorita Bassa

12. **`SectionTitle` prop `light` inefficace**
- ramo true/false produce stessa classe.

13. **Hardcode brand nel footer**
- copyright non allineato a `siteConfig.name`.

14. **`brand-switch.sh` incompleto**
- non copre tutte le occorrenze reali.

15. **Data layer senza tipi dedicati**
- nessuna interfaccia per config, track, event, gallery.

16. **Meta social incomplete**
- assenti `og:image`, `og:url`, `twitter:card`, `twitter:image`.

---

## 6. Correzione Classificazione Severita

Rispetto alla versione precedente:
- `spotifyUrl` e `email vuota` passano da **critico** a **medio** (impatto business/qualita, non fault tecnico bloccante).
- Restano in cima come **azioni rapide ad alto valore**.

---

## 7. Piano Raccomandato (Solo Documento, Nessuna Implementazione)

## Fase 1 - Stabilita e UX base
1. Aggiungere favicon reale.
2. Aggiungere pagina/route 404.
3. Unificare title/meta management (preferibilmente per-pagina via Helmet).
4. Riparare o dismettere `hero-image-switch.sh`.

## Fase 2 - Pulizia repo
5. Eliminare codice morto o spostarlo in branch archivio.
6. Rimuovere file spazzatura e asset duplicati.
7. Rimuovere dipendenze inutilizzate (`ffmpeg-static` se confermato).

## Fase 3 - Qualita dati e branding
8. Allineare branding in tutti i punti (footer incluso).
9. Sistemare link Spotify (target reale).
10. Completare o rimuovere campi config non usati (`email`).
11. Tipizzare data layer.

## Fase 4 - SEO/social polish
12. Completare meta OG/Twitter.
13. Validare sitemap/robots post-cleanup.

---

## 8. Rischi Operativi se Non Intervenuti

- Esperienza utente opaca su URL errate (assenza 404).
- Manutenzione lenta per presenza di codice e asset non attivi.
- Possibili errori futuri da doppia gestione metadata.
- Automazioni interne non affidabili (script rotti/incompleti).

---

## 9. Conclusione

Progetto con buona base tecnica e identita visiva coerente.  
Problemi principali non sono architetturali: sono soprattutto di **igiene repo, coerenza contenuti e rifinitura produzione**.  
Con una passata mirata di cleanup e allineamento, il progetto puo passare da "buono ma disomogeneo" a "snello, affidabile, pronto".

---

*Fine revisione documentale - 12 Aprile 2026*
