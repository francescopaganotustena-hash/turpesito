import { Helmet } from 'react-helmet-async';
import { Play, ExternalLink } from 'lucide-react';
import { tracks, siteConfig } from '../data';
import { SectionTitle } from '../components/SectionTitle';
import { CTASection } from '../components/CTASection';

export function Music() {
  return (
    <>
      <Helmet>
        <meta name="description" content={`Musica di ${siteConfig.name} - Ascolta i brani originali e le cover del repertoire.`} />
      </Helmet>

      <div className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Musica"
            subtitle="Brani originali e interpretazioni che hanno conquistato il pubblico"
            centered
          />

          {/* Featured Track */}
          <div className="bg-secondary rounded-xl p-8 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <img
                  src={tracks[0].cover}
                  alt={tracks[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    className="bg-accent text-primary p-5 rounded-full hover:scale-110 transition-transform"
                    aria-label={`Riproduci ${tracks[0].title}`}
                  >
                    <Play className="w-10 h-10" fill="currentColor" />
                  </button>
                </div>
              </div>
              
              <div className="text-center lg:text-left">
                <span className="text-accent text-sm font-medium tracking-widest uppercase">
                  In Evidenza
                </span>
                <h2 className="font-heading text-4xl md:text-5xl mt-2 mb-4">
                  {tracks[0].title}
                </h2>
                <p className="text-text-muted mb-2">{tracks[0].artist}</p>
                <p className="text-text/80 mb-6">{tracks[0].description}</p>
                <a
                  href={tracks[0].spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:underline"
                >
                  Ascolta su Spotify
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* All Tracks */}
          <h3 className="font-heading text-2xl mb-8 text-center">Tutti i brani</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="bg-secondary rounded-lg overflow-hidden group hover:ring-2 hover:ring-accent/30 transition-all"
              >
                <div className="relative aspect-square">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      className="bg-accent text-primary p-4 rounded-full hover:scale-110 transition-transform"
                      aria-label={`Riproduci ${track.title}`}
                    >
                      <Play className="w-6 h-6" fill="currentColor" />
                    </button>
                  </div>
                  <div className="absolute top-3 right-3 bg-accent text-primary text-xs font-bold px-2 py-1 rounded">
                    {track.category}
                  </div>
                </div>
                
                <div className="p-5">
                  <h4 className="font-heading text-xl mb-1">{track.title}</h4>
                  <p className="text-text-muted text-sm mb-3">
                    {track.artist} • {track.year}
                  </p>
                  <p className="text-text/70 text-sm line-clamp-2">{track.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Spotify CTA */}
          <div className="mt-16 text-center bg-secondary rounded-xl p-10">
            <h3 className="font-heading text-2xl mb-4">
              Ascolta su Spotify
            </h3>
            <p className="text-text-muted mb-6 max-w-xl mx-auto">
              Segui {siteConfig.name} su Spotify per rimanere aggiornato su nuove uscite, 
              playlist e performance esclusive.
            </p>
            <a
              href={siteConfig.social.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-primary px-8 py-4 font-semibold rounded hover:bg-accent/90 transition-colors"
            >
              <Play className="w-5 h-5" fill="currentColor" />
              Apri Spotify
            </a>
          </div>
        </div>
      </div>

      <CTASection />
    </>
  );
}
