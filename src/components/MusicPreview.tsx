import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tracks } from '../data';
import { SectionTitle } from './SectionTitle';

export function MusicPreview() {
  const previewTracks = tracks.slice(0, 3);

  return (
    <section className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Ultime uscite"
          subtitle="Scopri i brani originali e le interpretazioni che hanno conquistato il pubblico"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewTracks.map((track) => (
            <div
              key={track.id}
              className="group bg-secondary rounded-lg overflow-hidden hover:ring-2 hover:ring-accent/50 transition-all text-center"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    className="bg-accent text-primary p-4 rounded-full hover:scale-110 transition-transform"
                    aria-label={`Riproduci ${track.title}`}
                  >
                    <Play className="w-8 h-8" fill="currentColor" />
                  </button>
                </div>
                <div className="absolute top-4 right-4 bg-accent text-primary text-xs font-bold px-2 py-1 rounded">
                  {track.category}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-heading text-xl mb-1">{track.title}</h3>
                <p className="text-text-muted text-sm mb-3">{track.artist}</p>
                <p className="text-text/70 text-sm line-clamp-2">{track.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/musica"
            className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
          >
            Scopri tutto il repertorio
            <Play className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
