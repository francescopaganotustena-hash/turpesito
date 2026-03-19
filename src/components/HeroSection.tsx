import { Link } from 'react-router-dom';
import { Play, ArrowRight, Mic } from 'lucide-react';
import { siteConfig, heroImages } from '../data';

export function HeroSection() {
  const [firstName, ...rest] = siteConfig.name.split(' ');
  const lastName = rest.join(' ');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${siteConfig.enableHeroAnimation ? 'hero-bg-animated' : ''}`}
        style={{ backgroundImage: `url(${heroImages.hero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center">
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

          <p className="text-lg sm:text-xl md:text-2xl text-text-muted max-w-2xl mx-auto mb-4 font-light">
            {siteConfig.tagline}
          </p>

          <p className="text-base md:text-lg text-text/70 max-w-xl mx-auto mb-10">
            {siteConfig.description.split('.')[0]}.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/musica"
              className="inline-flex items-center gap-2 bg-accent text-primary px-8 py-4 text-lg font-semibold rounded hover:bg-accent/90 transition-all hover:scale-105"
            >
              <Play className="w-5 h-5" />
              Ascolta ora
            </Link>
            <Link
              to="/contatti"
              className="inline-flex items-center gap-2 border-2 border-text text-text px-8 py-4 text-lg font-semibold rounded hover:bg-text hover:text-primary transition-all"
            >
              Richiedi una data
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-text/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
