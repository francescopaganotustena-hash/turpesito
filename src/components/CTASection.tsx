import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { siteConfig, heroImages } from '../data';

type CTASectionProps = {
  showContactLine?: boolean;
};

export function CTASection({ showContactLine = true }: CTASectionProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat cta-bg-position"
        style={{ backgroundImage: `url("${heroImages.cta}")` }}
      />
      <div className="absolute inset-0 bg-primary/30" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/65 border border-accent/45 rounded-full px-4 py-2 mb-6">
          <Star className="w-4 h-4 text-accent" />
          <span className="text-sm text-accent font-semibold">
            Disponibile per eventi in tutta Italia
          </span>
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
          Il tuo evento merita la{' '}
          <span className="text-accent">voce giusta</span>
        </h2>

        <p className="text-lg text-text/80 mb-10 max-w-2xl mx-auto">
          Matrimoni, serate private, eventi aziendali, locali. Ogni occasione è unica. 
          Contattami per creare insieme l'esperienza musicale perfetta per il tuo momento speciale.
        </p>

        <Link
          to="/contatti"
          className="inline-flex items-center gap-3 bg-accent/40 text-primary px-10 py-5 text-xl font-bold rounded hover:bg-accent/50 transition-all hover:scale-105"
        >
          {siteConfig.bookingTitle}
          <ArrowRight className="w-6 h-6" />
        </Link>

        {showContactLine && (
          <p className="mt-6 text-text-muted text-sm">
            {siteConfig.phone}
          </p>
        )}
      </div>
    </section>
  );
}
