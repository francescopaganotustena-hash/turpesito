import { Helmet } from 'react-helmet-async';
import { Play, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { videos, siteConfig } from '../data';
import { SectionTitle } from '../components/SectionTitle';
import { CTASection } from '../components/CTASection';

export function Videos() {
  const [searchParams] = useSearchParams();
  const queryVideoId = searchParams.get('id');
  const querySelectedVideo = videos.find((video) => String(video.id) === queryVideoId)?.youtubeId ?? null;
  const [selectedVideo, setSelectedVideo] = useState<string | null>(querySelectedVideo);

  return (
    <>
      <Helmet>
        <title>Video | {siteConfig.name}</title>
        <meta name="description" content={`Video e live performance di ${siteConfig.name}. Guarda le esibizioni più belle.`} />
      </Helmet>
      
      <div className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Video"
            subtitle="Live performance, sessioni acustiche e momenti dal vivo"
            centered
          />

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-secondary rounded-lg overflow-hidden"
              >
                <div className="relative aspect-video">
                  {(selectedVideo ?? querySelectedVideo) === video.youtubeId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setSelectedVideo(video.youtubeId)}
                        className="absolute inset-0 flex items-center justify-center bg-primary/30 hover:bg-primary/50 transition-colors"
                        aria-label={`Riproduci ${video.title}`}
                      >
                        <div className="bg-accent text-primary p-5 rounded-full hover:scale-110 transition-transform">
                          <Play className="w-10 h-10" fill="currentColor" />
                        </div>
                      </button>
                    </>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-text-muted mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-accent" />
                      {video.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-accent" />
                      {video.duration}
                    </span>
                  </div>
                  
                  <h3 className="font-heading text-2xl mb-2">{video.title}</h3>
                  <p className="text-text/70">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTASection />
    </>
  );
}
