import { Helmet } from 'react-helmet-async';
import { Award, Mic, Calendar, Music } from 'lucide-react';
import { biography, heroImages, siteConfig } from '../data';
import { SectionTitle } from '../components/SectionTitle';
import { CTASection } from '../components/CTASection';

export function Biography() {
  const [firstName, ...rest] = siteConfig.name.split(' ');
  const lastName = rest.join(' ');

  return (
    <>
      <Helmet>
        <title>Biografia | {siteConfig.name}</title>
        <meta name="description" content={`Biografia di ${siteConfig.name} - ${siteConfig.subtitle}. ${biography.intro}`} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${encodeURI(heroImages.biography)}")` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
                La Storia
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-6">
                {firstName}
                {lastName && (
                  <>
                    {' '}
                    <span className="text-accent">{lastName}</span>
                  </>
                )}
              </h1>
              <p className="text-lg md:text-xl text-text-muted mb-8">
                {siteConfig.subtitle}
              </p>
              <p className="text-base md:text-lg text-text/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {biography.intro}
              </p>
            </div>

            <div className="hidden lg:block">
              <img
                src={heroImages.biography}
                alt={siteConfig.name}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Biography Content */}
      <section className="py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Il Percorso"
            subtitle="Dalla formazione alla professione"
          />

          <div className="space-y-8">
            {biography.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg text-text/80 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Esperienza"
            subtitle="Numeri e traguardi"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <Mic className="w-8 h-8 text-accent" />
              </div>
              <p className="font-heading text-5xl text-accent mb-2">
                {biography.achievements[0].split(' ')[0]}
              </p>
              <p className="text-text-muted">Eventi dal vivo</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <p className="font-heading text-5xl text-accent mb-2">
                {biography.achievements[1].split(' ')[0]}
              </p>
              <p className="text-text-muted">Specializzazione</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <Music className="w-8 h-8 text-accent" />
              </div>
              <p className="font-heading text-5xl text-accent mb-2">
                {biography.achievements[2].split(' ')[0]}
              </p>
              <p className="text-text-muted">Brani nel repertorio</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-accent" />
              </div>
              <p className="font-heading text-5xl text-accent mb-2">10+</p>
              <p className="text-text-muted">Anni di carriera</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
