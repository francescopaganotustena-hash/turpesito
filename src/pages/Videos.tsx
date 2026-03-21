import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../data';
import { SectionTitle } from '../components/SectionTitle';
import { CTASection } from '../components/CTASection';

const videoModules = import.meta.glob('../assets/videos/*.mp4', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

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
        <title>Video | {siteConfig.name}</title>
        <meta name="description" content={`Video live di ${siteConfig.name}. Raccolta completa delle performance embedded nel sito.`} />
      </Helmet>

      <div className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Video"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {localVideos.map((video) => (
              <div
                key={video.id}
                className="relative p-[2px] rounded-2xl bg-gradient-to-br from-accent/60 via-accent/25 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              >
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-accent/25 bg-secondary">
                  <video
                    className="w-full h-full object-cover"
                    src={video.src}
                    autoPlay
                    muted
                    playsInline
                    loop
                    controls
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
