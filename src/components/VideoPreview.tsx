import { ExternalLink, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { instagramReels } from '../data';
import { SectionTitle } from './SectionTitle';

export function VideoPreview() {
  const previewReels = instagramReels.slice(0, 3);

  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Video e Live"
          subtitle="Guarda le esibizioni e i momenti più belli dal vivo"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {previewReels.map((reel) => (
            <div
              key={reel.id}
              className="bg-primary/20 rounded-lg overflow-hidden w-full max-w-sm"
            >
              <a href={reel.url} target="_blank" rel="noreferrer" className="group block relative aspect-[9/16]">
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="bg-accent/90 text-primary p-5 rounded-full transform scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-8 h-8" fill="currentColor" />
                </div>
              </div>
              </a>

              <div className="p-5">
                <a
                  href={reel.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-dark transition-colors"
                >
                  Apri su Instagram
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/video"
            className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
          >
            Guarda tutti i video
            <Play className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
