import heroMain from '../assets/hero-main.png';
import reel1 from '../assets/reels/reel-1.jpg';
import reel2 from '../assets/reels/reel-2.jpg';
import reel3 from '../assets/reels/reel-3.jpg';
import reel4 from '../assets/reels/reel-4.jpg';
import { enableEvents, enableMusicPage, enableVideoPage } from '../config/featureFlags';

export const siteConfig = {
  name: "Gianluca Scala",
  tagline: "Voce che emoziona, performance che restano",
  subtitle: "Cantante e Musicista Professionista",
  enableHeroAnimation: true,
  description: "Un'esperienza musicale di alto livello per matrimoni, eventi aziendali, serate private e live performance. Gianluca Scala porta sul palco anni di esperienza, una voce inconfondibile e un repertorio che spazia dal jazz al pop, dalla musica italiana ai classici internazionali.",
  bookingTitle: "Richiedi una data",
  bookingSubtitle: "Contattami per il tuo evento",
  email: "info@gianlucascala.it",
  phone: "+39 333 1234567",
  location: "Milano e provincia",
  availability: "Disponibile per eventi in tutta Italia",
  social: {
    instagram: "https://www.instagram.com/giangi_sax?igsh=NXp5MWdhdnJzcmVz",
    facebook: "https://facebook.com/gianlucascala",
    youtube: "https://youtube.com/@gianlucascala",
    spotify: "https://open.spotify.com/artist/gianlucascala",
  },
  navigation: [
    { label: "Home", path: "/" },
    { label: "Biografia", path: "/biografia" },
    ...(enableMusicPage ? [{ label: "Musica", path: "/musica" }] : []),
    ...(enableVideoPage ? [{ label: "Video", path: "/video" }] : []),
    ...(enableEvents ? [{ label: "Eventi", path: "/eventi" }] : []),
    { label: "Galleria", path: "/galleria" },
    { label: "Booking", path: "/contatti" },
  ],
};

export const biography = {
  intro: "Gianluca Scala è un cantante e musicista italiano che ha costruito la sua carriera sull'arte della performance dal vivo. Con un percorso che attraversa generi musicali diversi, ha saputo creare uno stile personale fatto di eleganza vocale, presenza scenica e capacità di coinvolgere il pubblico.",
  
  paragraphs: [
    "La sua voce ha accompagnato cerimonie di matrimonio, animato serate di gala, fatto vibrare i palchi di locali esclusivi e raccontato storie attraverso la musica italiana e internazionale. Ogni esibizione è un viaggio emotivo che lascia un'impronta indelebile.",
    "Formatosi presso istituti musicali di prestigio, Gianluca ha affinato la sua tecnica vocale e la sua sensibilità artistica nel corso di anni di pratica e palchi. Il suo repertorio spazia dai grandi classici della canzone italiana ai brani pop e jazz più amati, fino alle hit contemporanee.",
    "Ma ciò che distingue davvero Gianluca è la sua capacità di comprendere ogni evento: leggere l'atmosfera, interpretare i desideri del pubblico, creare un'esperienza unica e irripetibile. Perché ogni serata merita la sua colonna sonora perfetta.",
  ],
  
  achievements: [
    "Oltre 500 eventi dal vivo",
    "Specializzazione in matrimoni ed eventi eleganti",
    "Repertorio di oltre 200 brani",
    "Collaborazioni con artisti e band di primo livello",
  ],
};

export const tracks = [
  {
    id: 1,
    title: "Estate",
    artist: "Gianluca Scala",
    duration: "3:45",
    category: "Singolo",
    year: 2024,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    spotifyUrl: "https://open.spotify.com",
    description: "Un brano originale che racconta il calore delle serate d'estate, l'amore e la bellezza dei momenti condivisi.",
  },
  {
    id: 2,
    title: "Mi riconosci",
    artist: "Gianluca Scala",
    duration: "4:12",
    category: "Singolo",
    year: 2023,
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
    spotifyUrl: "https://open.spotify.com",
    description: "Una ballad emotiva che esplora i sentimenti e le emozioni più profonde.",
  },
  {
    id: 3,
    title: "Notte di Luna",
    artist: "Gianluca Scala",
    duration: "3:58",
    category: "Album",
    year: 2023,
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
    spotifyUrl: "https://open.spotify.com",
    description: "Dal album 'Emozioni', questo brano unisce melodia classica e arrangiamenti moderni.",
  },
  {
    id: 4,
    title: "Parole al Vento",
    artist: "Gianluca Scala",
    duration: "4:30",
    category: "Singolo",
    year: 2022,
    cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
    spotifyUrl: "https://open.spotify.com",
    description: "Un pezzo intenso che parla di ricordi, perdita e speranza.",
  },
  {
    id: 5,
    title: "Ricominciamo",
    artist: "Gianluca Scala",
    duration: "3:22",
    category: "Singolo",
    year: 2022,
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    spotifyUrl: "https://open.spotify.com",
    description: "Un brano uptempo perfetto per chiudere le serate con energia positiva.",
  },
];

export const videos = [
  {
    id: 1,
    title: "Live at Teatro Manzoni",
    description: "Esibizione live completa con repertorio classico italiano. Un viaggio emozionale attraverso i più bei brani della canzone d'autore.",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    duration: "12:34",
    date: "Dicembre 2024",
  },
  {
    id: 2,
    title: "Wedding Live - Villa Melzi",
    description: "Momenti dal matrimonio di Sara e Marco. Musica e emozioni in una location da sogno sul Lago di Como.",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    duration: "8:45",
    date: "Settembre 2024",
  },
  {
    id: 3,
    title: "Session Acustica - Barefoot",
    description: "Versioni acustiche dei brani più amati, registrate in un'atmosfera intima e autentica.",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    duration: "15:20",
    date: "Luglio 2024",
  },
  {
    id: 4,
    title: "Corporate Event - Milano",
    description: "Performance per evento aziendale di alto profilo. Eleganza e professionalità per una serata indimenticabile.",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    duration: "10:15",
    date: "Novembre 2024",
  },
];

export const instagramReels = [
  {
    id: 1,
    title: "Reel Instagram #1",
    description: "Clip Instagram in evidenza dal profilo ufficiale.",
    date: "Instagram",
    url: "https://www.instagram.com/reel/DQPU9uzjI89/",
    thumbnail: reel1,
  },
  {
    id: 2,
    title: "Reel Instagram #2",
    description: "Clip Instagram in evidenza dal profilo ufficiale.",
    date: "Instagram",
    url: "https://www.instagram.com/reel/DQPU2DxjNfV/",
    thumbnail: reel2,
  },
  {
    id: 3,
    title: "Reel Instagram #3",
    description: "Clip Instagram in evidenza dal profilo ufficiale.",
    date: "Instagram",
    url: "https://www.instagram.com/reel/DSxzF0QDJXj/",
    thumbnail: reel3,
  },
  {
    id: 4,
    title: "Reel Instagram #4",
    description: "Clip Instagram in evidenza dal profilo ufficiale.",
    date: "Instagram",
    url: "https://www.instagram.com/reel/DQRW4wjjPJf/",
    thumbnail: reel4,
  },
];

export const events = [
  {
    id: 1,
    title: "Matrimonio Rossi-Bianchi",
    type: "Matrimonio",
    date: "2026-04-25",
    time: "19:30",
    location: "Villa Gustavia, Lago di Como",
    city: "Como",
    description: "Cerimonia e ricevimento con repertorio romantico e classici italiani.",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Serata Privata - Cavaliere",
    type: "Serata Privata",
    date: "2026-04-12",
    time: "21:00",
    location: "Tenuta San Giovanni",
    city: "Firenze",
    description: "Festa di compleanno con playlist personalizzata e performance live.",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Gala Beneficenza",
    type: "Evento Aziendale",
    date: "2026-05-10",
    time: "20:00",
    location: "Palazzo della Regione, Milano",
    city: "Milano",
    description: "Serata di gala con ospiti illustri e intrattenimento musicale di alto livello.",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Matrimonio Conti-Ferrari",
    type: "Matrimonio",
    date: "2026-05-24",
    time: "18:00",
    location: "Castello di San Lorenzo",
    city: "Torino",
    description: "Matrimonio esclusivo con repertorio classico napoletano e canzone d'autore.",
    status: "upcoming",
  },
  {
    id: 5,
    title: "Inaugurazione Ristorante",
    type: "Evento Aziendale",
    date: "2026-06-05",
    time: "20:30",
    location: " Osteria Francescana",
    city: "Modena",
    description: "Evento inaugurale con performance acustica e jazz.",
    status: "upcoming",
  },
  {
    id: 6,
    title: "Festa di Laurea",
    type: "Festa Privata",
    date: "2025-12-15",
    time: "20:00",
    location: "Villa Borghese, Roma",
    city: "Roma",
    description: "Celebrazione con repertorio moderno e classici dance.",
    status: "past",
  },
];

export const gallery = [
  {
    id: 1,
    title: "Live al tramonto",
    category: "Live Performance",
    src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=600&fit=crop",
    alt: "Gianluca Scala durante esibizione live al tramonto",
  },
  {
    id: 2,
    title: "Backstage",
    category: "Backstage",
    src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop",
    alt: "Momento di pausa prima dello show",
  },
  {
    id: 3,
    title: "Matrimonio Villa Melzi",
    category: "Matrimonio",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
    alt: "Esecuzione durante cerimonia nuziale",
  },
  {
    id: 4,
    title: "Jazz Club Milano",
    category: "Live Performance",
    src: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop",
    alt: "Performance in jazz club con trio",
  },
  {
    id: 5,
    title: "Corporate Event",
    category: "Evento Aziendale",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    alt: "Elegante esibizione per evento aziendale",
  },
  {
    id: 6,
    title: "Session Fotografica",
    category: "Portrait",
    src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop",
    alt: "Portrait professionale dell'artista",
  },
  {
    id: 7,
    title: "Pianobar",
    category: "Live Performance",
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
    alt: "Atmosfera intima del pianobar",
  },
  {
    id: 8,
    title: "Acustica Estate",
    category: "Live Performance",
    src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
    alt: "Session acustica all'aperto",
  },
];

export const eventTypes = [
  "Matrimonio",
  "Cerimonia",
  "Serata Privata",
  "Evento Aziendale",
  "Festa di Compleanno",
  "Inaugurazione",
  "Cena di Gala",
  "Altro",
];

export const heroImages = {
  // Previous hero backup:
  // https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop
  // SharePoint test link backup:
  // https://studio81srl-my.sharepoint.com/:i:/g/personal/francesco_pagano_studio81_it/IQCVZ5w833lHTbOOkBtJD776AXSapo95rexZHWK12Ohpoqg?e=pwAmZq
  hero: heroMain,
  biography: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=1200&fit=crop",
  cta: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1920&h=600&fit=crop",
};
