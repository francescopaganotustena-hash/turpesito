import heroMain from '../assets/hero-main.png';
import bioImage from '../assets/site-photos/bio.jpg';
import track1Cover from '../assets/site-photos/track-1.jpg';
import track2Cover from '../assets/site-photos/track-2.jpg';
import track3Cover from '../assets/site-photos/track-3.jpg';
import track4Cover from '../assets/site-photos/track-4.jpg';
import track5Cover from '../assets/site-photos/track-5.jpg';
import video1Thumb from '../assets/site-photos/video-1.jpg';
import video2Thumb from '../assets/site-photos/video-2.jpg';
import video3Thumb from '../assets/site-photos/video-3.jpg';
import video4Thumb from '../assets/site-photos/video-4.jpg';
import reel1 from '../assets/site-photos/reel-1.jpg';
import reel2 from '../assets/site-photos/reel-2.jpg';
import reel3 from '../assets/site-photos/reel-3.jpg';
import reel4 from '../assets/site-photos/reel-4.jpg';
import ctaCustom from '../assets/gallery/Backstage/WhatsApp Image 2026-03-20 at 00.03.37 (5).jpeg';

const galleryModules = import.meta.glob('../assets/gallery/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const mapGalleryCategory = (path: string): string => {
  const normalized = path.toLowerCase();
  if (normalized.includes('/live-performance/')) return 'Live Performance';
  if (normalized.includes('/matrimonio/')) return 'Matrimonio';
  return 'Backstage';
};

export const siteConfig = {
  name: "Gianluca Scala",
  tagline: "Voce che emoziona, performance che restano",
  subtitle: "Cantante e Musicista Professionista",
  enableHeroAnimation: true,
  description: "Un'esperienza musicale di alto livello per matrimoni, eventi aziendali, serate private e live performance. Gianluca Scala porta sul palco anni di esperienza, una voce inconfondibile e un repertorio che spazia dal jazz al pop, dalla musica italiana ai classici internazionali.",
  bookingTitle: "Richiedi una data",
  bookingSubtitle: "Contattami per il tuo evento",
  email: "",
  phone: "+39 338 2147345",
  availability: "Contattami per conoscere le mie disponibilità",
  social: {
    instagram: "https://www.instagram.com/giangi_sax",
    spotify: "https://open.spotify.com/artist/gianlucascala",
  },
  navigation: [
    { label: "Home", path: "/" },
    { label: "Biografia", path: "/biografia" },
    { label: "Video", path: "/video" },
    { label: "Galleria", path: "/galleria" },
    { label: "Contatti", path: "/contatti" },
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
    cover: track1Cover,
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
    cover: track2Cover,
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
    cover: track3Cover,
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
    cover: track4Cover,
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
    cover: track5Cover,
    spotifyUrl: "https://open.spotify.com",
    description: "Un brano uptempo perfetto per chiudere le serate con energia positiva.",
  },
];

export const videos = [
  {
    id: 1,
    title: "Live at Teatro Manzoni",
    description: "Esibizione live completa con repertorio classico italiano. Un viaggio emozionale attraverso i più bei brani della canzone d'autore.",
    thumbnail: video1Thumb,
    duration: "12:34",
    date: "Dicembre 2024",
  },
  {
    id: 2,
    title: "Wedding Live - Cerimonia Serale",
    description: "Momenti dal matrimonio di Sara e Marco. Musica, emozioni e un repertorio pensato per accompagnare ogni fase dell'evento.",
    thumbnail: video2Thumb,
    duration: "8:45",
    date: "Settembre 2024",
  },
  {
    id: 3,
    title: "Session Acustica - Barefoot",
    description: "Versioni acustiche dei brani più amati, registrate in un'atmosfera intima e autentica.",
    thumbnail: video3Thumb,
    duration: "15:20",
    date: "Luglio 2024",
  },
  {
    id: 4,
    title: "Corporate Event - Live Session",
    description: "Performance per evento aziendale di alto profilo. Eleganza e professionalità per una serata indimenticabile.",
    thumbnail: video4Thumb,
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
    description: "Cerimonia e ricevimento con repertorio romantico e classici italiani.",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Serata Privata - Cavaliere",
    type: "Serata Privata",
    date: "2026-04-12",
    time: "21:00",
    description: "Festa di compleanno con playlist personalizzata e performance live.",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Gala Beneficenza",
    type: "Evento Aziendale",
    date: "2026-05-10",
    time: "20:00",
    description: "Serata di gala con ospiti illustri e intrattenimento musicale di alto livello.",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Matrimonio Conti-Ferrari",
    type: "Matrimonio",
    date: "2026-05-24",
    time: "18:00",
    description: "Matrimonio esclusivo con repertorio classico e canzone d'autore.",
    status: "upcoming",
  },
  {
    id: 5,
    title: "Inaugurazione Ristorante",
    type: "Evento Aziendale",
    date: "2026-06-05",
    time: "20:30",
    description: "Evento inaugurale con performance acustica e jazz.",
    status: "upcoming",
  },
  {
    id: 6,
    title: "Festa di Laurea",
    type: "Festa Privata",
    date: "2025-12-15",
    time: "20:00",
    description: "Celebrazione con repertorio moderno e classici dance.",
    status: "past",
  },
];

const galleryPathEntries = Object.entries(galleryModules).sort(([a], [b]) => a.localeCompare(b));
const galleryCategoryCounters: Record<string, number> = {};

export const gallery = galleryPathEntries.map(([path, src], index) => {
  const category = mapGalleryCategory(path);
  galleryCategoryCounters[category] = (galleryCategoryCounters[category] ?? 0) + 1;
  const progressive = galleryCategoryCounters[category];

  return {
    id: index + 1,
    title: `${category} ${progressive}`,
    category,
    src,
    alt: `${category} - scatto ${progressive}`,
  };
});

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
  biography: bioImage,
  cta: ctaCustom,
};
