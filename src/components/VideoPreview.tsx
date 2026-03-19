import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { videos } from '../data';
import { SectionTitle } from './SectionTitle';

export function VideoPreview() {
  const previewVideos = videos.slice(0, 2);

  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Video e Live"
          subtitle="Guarda le esibizioni e i momenti più belli dal vivo"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {previewVideos.map((video) => (
            <Link
              key={video.id}
              to={`/video?id=${video.id}`}
              className="group relative aspect-video rounded-lg overflow-hidden"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent z-10" />
              
              {/* Play Button */}
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="bg-accent/90 text-primary p-5 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transform scale-90 md:scale-75 md:group-hover:scale-100 transition-all">
                  <Play className="w-8 h-8" fill="currentColor" />
                </div>
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-center">
                <p className="text-accent text-sm font-medium mb-2">{video.date}</p>
                <h3 className="font-heading text-2xl mb-2">{video.title}</h3>
                <p className="text-text/70 text-sm line-clamp-2">{video.description}</p>
              </div>

              {/* Duration */}
              <div className="absolute top-4 right-4 z-20 bg-primary/80 text-text text-sm px-2 py-1 rounded">
                {video.duration}
              </div>
            </Link>
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
