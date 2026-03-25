import { Helmet } from 'react-helmet-async';
import { Award, Mic, Calendar, Music } from 'lucide-react';
import { biography, heroImages, siteConfig } from '../data';
import { SectionTitle } from '../components/SectionTitle';
import { CTASection } from '../components/CTASection';

export function Biography() {
  const [firstName, ...rest] = siteConfig.name.split(' ');
  const lastName = rest.join(' ');
  const biographyText = [biography.intro, ...biography.paragraphs].join(' ');
  const stats = [
    { icon: Mic, value: '500+', label: 'Eventi dal vivo' },
    { icon: Award, value: 'Matrimoni', label: 'Specializzazione' },
    { icon: Music, value: '200+', label: 'Brani nel repertorio' },
    { icon: Calendar, value: '30+', label: 'Anni di carriera' },
  ];

  return (
    <>
      <Helmet>
        <meta name="description" content={`Biografia di ${siteConfig.name} - ${siteConfig.subtitle}. ${biography.intro}`} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${heroImages.biography}")` }}
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
              <p className="text-base md:text-lg text-text/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {biographyText}
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

      {/* Achievements */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Esperienza"
            subtitle="Numeri e traguardi"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center p-6 h-full flex flex-col items-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4 shrink-0">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <p className="font-heading text-4xl md:text-5xl text-accent mb-2 leading-none whitespace-nowrap">
                    {stat.value}
                  </p>
                  <p className="text-text-muted">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
