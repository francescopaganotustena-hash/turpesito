const parseBooleanEnv = (value: string | undefined, defaultValue = false): boolean => {
  if (!value) return defaultValue;
  const normalized = value.trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
};

// Eventi disattivati di default; attivali con VITE_ENABLE_EVENTS=true
export const enableEvents = parseBooleanEnv(import.meta.env.VITE_ENABLE_EVENTS, false);

// Form "Invia una richiesta" disattivato di default; attivalo con VITE_ENABLE_CONTACT_FORM=true
export const enableContactForm = parseBooleanEnv(import.meta.env.VITE_ENABLE_CONTACT_FORM, false);

// Sezione "Ultime uscite" in Home disattivata di default; attivala con VITE_ENABLE_HOME_MUSIC_PREVIEW=true
export const enableHomeMusicPreview = parseBooleanEnv(import.meta.env.VITE_ENABLE_HOME_MUSIC_PREVIEW, false);

// Pagina "Musica" disattivata di default; attivala con VITE_ENABLE_MUSIC_PAGE=true
export const enableMusicPage = parseBooleanEnv(import.meta.env.VITE_ENABLE_MUSIC_PAGE, false);

// Pagina "Video" attiva di default; disattivala con VITE_ENABLE_VIDEO_PAGE=false
export const enableVideoPage = parseBooleanEnv(import.meta.env.VITE_ENABLE_VIDEO_PAGE, true);

// Card Reel Instagram in Home attive di default; disattivale con VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS=false
export const enableInstagramVideoEmbeds = parseBooleanEnv(import.meta.env.VITE_ENABLE_INSTAGRAM_VIDEO_EMBEDS, true);

// Scroll reveal attivo di default; disattivalo con VITE_ENABLE_SCROLL_REVEAL=false
export const enableScrollReveal = parseBooleanEnv(import.meta.env.VITE_ENABLE_SCROLL_REVEAL, true);

// Pulsante WhatsApp floating attivo di default; disattivalo con VITE_ENABLE_WHATSAPP_FLOATING_BUTTON=false
export const enableWhatsAppFloatingButton = parseBooleanEnv(
  import.meta.env.VITE_ENABLE_WHATSAPP_FLOATING_BUTTON,
  true
);
