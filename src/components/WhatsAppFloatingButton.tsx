import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../data';

const defaultMessage = encodeURIComponent('Ciao Gianluca, vorrei informazioni per il mio evento.');

export function WhatsAppFloatingButton() {
  const whatsappNumber = siteConfig.phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#25D366]/90 text-primary shadow-[0_8px_22px_rgba(0,0,0,0.28)] transition-all hover:scale-105 hover:bg-[#25D366] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-primary"
      aria-label="Contattami su WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
