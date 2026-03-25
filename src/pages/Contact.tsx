import { Helmet } from 'react-helmet-async';
import { Phone, Instagram, MessageCircle } from 'lucide-react';
import { siteConfig } from '../data';
import { SectionTitle } from '../components/SectionTitle';

export function Contact() {
  const whatsappNumber = siteConfig.phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const contactRowClass = 'flex items-center gap-4 justify-center w-full';
  const contactTextClass = 'w-60 text-left';

  return (
    <>
      <Helmet>
        <meta name="description" content={`Contatta ${siteConfig.name} per richiedere un preventivo per il tuo evento. Matrimoni, serate private, eventi aziendali.`} />
      </Helmet>

      <div className="relative overflow-hidden pt-32 pb-24">
        <div className="contact-music-bg" aria-hidden="true">
          <div className="contact-staff contact-staff-a" />
          <div className="contact-staff contact-staff-b" />
          <div className="contact-notes contact-notes-a" />
          <div className="contact-notes contact-notes-b" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16">
            {/* Contact Info */}
            <div className="max-w-3xl mx-auto w-full text-center">
              <SectionTitle
                title="Contatti"
                subtitle="Parliamo del tuo evento"
                centered
              />
              
              <p className="text-text/80 mb-10 max-w-lg mx-auto text-center">
                Ogni evento è unico. Raccontami la tua idea e creiamo insieme 
                un'esperienza musicale che renderà la tua serata indimenticabile.
              </p>

              <div className="space-y-6 mb-10">
                <div className={contactRowClass}>
                  <div className="bg-secondary p-3 rounded-lg shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div className={contactTextClass}>
                    <p className="text-sm text-text-muted mb-1">Telefono</p>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="block text-lg hover:text-accent transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className={contactRowClass}>
                  <div className="bg-secondary p-3 rounded-lg shrink-0">
                    <MessageCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div className={contactTextClass}>
                    <p className="text-sm text-text-muted mb-1">WhatsApp</p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-lg hover:text-accent transition-colors"
                      aria-label="Contattami su WhatsApp"
                    >
                      Contattami su WhatsApp
                    </a>
                  </div>
                </div>

                <div className={contactRowClass}>
                  <div className="bg-secondary p-3 rounded-lg shrink-0">
                    <Instagram className="w-5 h-5 text-accent" />
                  </div>
                  <div className={contactTextClass}>
                    <p className="text-sm text-text-muted mb-1">Instagram</p>
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-lg hover:text-accent transition-colors"
                    >
                      Segui il profilo ufficiale
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-sm text-text-muted mb-4">Seguimi su</p>
                <div className="flex gap-4 justify-center">
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary p-3 rounded-lg hover:bg-accent/10 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-accent" />
                  </a>
                </div>
              </div>

              {/* Info Box */}
              <div className="mt-10 bg-accent/10 border border-accent/20 rounded-lg p-6 max-w-2xl mx-auto text-center">
                <h3 className="font-heading text-lg mb-2">Informazioni importanti</h3>
                <ul className="text-sm text-text/70 space-y-2">
                  <li>• Rispondo a tutte le richieste entro 24 ore</li>
                  <li>• Possibile incontro preliminare per conoscersi</li>
                  <li>• Preventivo personalizzato senza impegno</li>
                  <li>• Contattami per conoscere le mie disponibilità</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
