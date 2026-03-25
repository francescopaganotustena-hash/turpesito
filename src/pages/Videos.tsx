import { Helmet } from 'react-helmet-async';
import { Instagram } from 'lucide-react';
import { siteConfig } from '../data';
import { SectionTitle } from '../components/SectionTitle';
import { CTASection } from '../components/CTASection';
import { SmartVideo } from '../components/SmartVideo';

const videoModules = import.meta.glob('../assets/videos/*.mp4', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

// Toggle rapido layout: true = 3 video per riga su desktop, false = 2 per riga.
const useThreeColumnsDesktop = true;

export function Videos() {
  const localVideos = Object.entries(videoModules)
    .map(([path, src]) => {
      const fileName = path.split('/').pop() ?? '';
      const number = Number.parseInt(fileName.replace('.mp4', ''), 10);
      return {
        id: Number.isNaN(number) ? Number.MAX_SAFE_INTEGER : number,
        src,
      };
    })
    .sort((a, b) => a.id - b.id);

  return (
    <>
      <Helmet>
        <meta name="description" content={`Video live di ${siteConfig.name}. Raccolta completa delle performance embedded nel sito.`} />
      </Helmet>

      <div className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-center">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-accent/40 bg-secondary/70 px-6 py-3 text-sm font-medium text-text transition hover:border-accent hover:text-accent"
            >
              <Instagram className="h-5 w-5" />
              <span>Visita il mio profilo instagram per vedere altri contenuti</span>
            </a>
          </div>

          <SectionTitle
            title="Video"
            centered
          />

          <div className={`grid grid-cols-1 md:grid-cols-2 ${useThreeColumnsDesktop ? 'xl:grid-cols-3' : ''} gap-6`}>
            {localVideos.map((video) => (
              <div
                key={video.id}
                className="relative p-[2px] rounded-2xl bg-gradient-to-br from-accent/60 via-accent/25 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              >
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-accent/25 bg-secondary">
                  <SmartVideo
                    className="w-full h-full object-cover"
                    src={video.src}
                    enableLazyLoading
                    autoPlay={false}
                    muted
                    playsInline
                    loop
                    controls
                    preload="metadata"
                  />
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
