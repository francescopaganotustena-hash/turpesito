import { Helmet } from 'react-helmet-async';
import { biography, heroImages, siteConfig } from '../data';
import { CTASection } from '../components/CTASection';

export function Biography() {
  const [firstName, ...rest] = siteConfig.name.split(' ');
  const lastName = rest.join(' ');
  const biographyText = [biography.intro, ...biography.paragraphs].join(' ');

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

      <CTASection />
    </>
  );
}
