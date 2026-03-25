import { Link } from 'react-router-dom';
import { ArrowRight, Mic } from 'lucide-react';
import { siteConfig, heroImages } from '../data';

export function HeroSection() {
  const [firstName, ...rest] = siteConfig.name.split(' ');
  const lastName = rest.join(' ');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-no-repeat hero-bg-position ${siteConfig.enableHeroAnimation ? 'hero-bg-animated' : ''}`}
        style={{ backgroundImage: `url("${heroImages.hero}")` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="relative min-h-[68vh] text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-2 mb-8">
            <Mic className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium tracking-wide">
              {siteConfig.subtitle}
            </span>
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium mb-6 tracking-tight leading-[1.05]">
            {firstName}
            {lastName && (
              <>
                {' '}
                <span className="text-accent">{lastName}</span>
              </>
            )}
          </h1>

          <div className="mt-56 sm:mt-60 md:mt-64 flex flex-col sm:flex-row gap-4 justify-center w-full px-4">
            <Link
              to="/contatti"
              className="inline-flex items-center justify-center gap-2 border-2 border-text text-text px-8 py-4 text-lg font-semibold rounded hover:bg-text hover:text-primary transition-all"
            >
              Richiedi una data
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
