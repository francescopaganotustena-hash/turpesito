import { Helmet } from 'react-helmet-async';
import { Phone, MapPin, Instagram, MessageCircle } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { siteConfig } from '../data';
import { SectionTitle } from '../components/SectionTitle';
import { enableContactForm } from '../config/featureFlags';

export function Contact() {
  const isCenteredLayout = !enableContactForm;
  const whatsappNumber = siteConfig.phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <>
      <Helmet>
        <title>Contatti | {siteConfig.name}</title>
        <meta name="description" content={`Contatta ${siteConfig.name} per richiedere un preventivo per il tuo evento. Matrimoni, serate private, eventi aziendali.`} />
      </Helmet>

      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 ${enableContactForm ? 'lg:grid-cols-2' : ''} gap-16`}>
            {/* Contact Info */}
            <div className={isCenteredLayout ? 'max-w-3xl mx-auto w-full text-center' : ''}>
              <SectionTitle
                title="Contatti"
                subtitle="Parliamo del tuo evento"
                centered={isCenteredLayout}
              />
              
              <p className={`text-text/80 mb-10 max-w-lg mx-auto ${isCenteredLayout ? 'text-center' : 'text-center md:text-left'}`}>
                Ogni evento è unico. Raccontami la tua idea e creiamo insieme 
                un'esperienza musicale che renderà la tua serata indimenticabile.
              </p>

              <div className="space-y-6 mb-10">
                <div className={`flex gap-4 ${isCenteredLayout ? 'items-center justify-center text-left' : 'items-start'}`}>
                  <div className="bg-secondary p-3 rounded-lg">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">Telefono</p>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="block text-lg hover:text-accent transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className={`flex gap-4 ${isCenteredLayout ? 'items-center justify-center text-left' : 'items-start'}`}>
                  <div className="bg-secondary p-3 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
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

                <div className={`flex gap-4 ${isCenteredLayout ? 'items-center justify-center text-left' : 'items-start'}`}>
                  <div className="bg-secondary p-3 rounded-lg">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">Zona</p>
                    <p className="text-lg">{siteConfig.location}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-sm text-text-muted mb-4">Seguimi su</p>
                <div className={`flex gap-4 ${isCenteredLayout ? 'justify-center' : ''}`}>
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
              <div className={`mt-10 bg-accent/10 border border-accent/20 rounded-lg p-6 ${isCenteredLayout ? 'max-w-2xl mx-auto text-center' : ''}`}>
                <h4 className="font-heading text-lg mb-2">Informazioni importanti</h4>
                <ul className="text-sm text-text/70 space-y-2">
                  <li>• Rispondo a tutte le richieste entro 24 ore</li>
                  <li>• Possibile incontro preliminare per conoscersi</li>
                  <li>• Preventivo personalizzato senza impegno</li>
                  <li>• Disponibile per eventi a Napoli e provincia</li>
                </ul>
              </div>
            </div>

            {/* Contact Form (feature-flagged for quick rollback) */}
            {enableContactForm && (
              <div className="bg-secondary rounded-xl p-8 lg:p-10">
                <h3 className="font-heading text-2xl mb-6">Invia una richiesta</h3>
                <ContactForm />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
