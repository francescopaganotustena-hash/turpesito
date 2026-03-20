import { Link } from 'react-router-dom';
import { Music, Instagram, Facebook, Youtube, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '../data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Music className="w-6 h-6 text-accent" />
              <span className="font-heading text-xl font-medium">{siteConfig.name}</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-md mb-4">
              {siteConfig.tagline}. {siteConfig.subtitle.toLowerCase()} disponibile per eventi in tutta Italia.
            </p>
            <div className="flex gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg mb-4">Navigazione</h4>
            <ul className="space-y-2">
              {siteConfig.navigation.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-text-muted text-sm hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg mb-4">Contatti</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-text-muted text-sm">
                <Phone className="w-4 h-4 text-accent" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-accent transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-text-muted text-sm">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span>{siteConfig.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            © {currentYear} {siteConfig.name}. Tutti i diritti riservati.
          </p>
          <p className="text-text-muted text-xs">
            Progettato con passione per la musica
          </p>
        </div>
      </div>
    </footer>
  );
}
