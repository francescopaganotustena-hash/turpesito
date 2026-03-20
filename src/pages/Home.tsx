import { Helmet } from 'react-helmet-async';
import { HeroSection } from '../components/HeroSection';
import { MusicPreview } from '../components/MusicPreview';
import { VideoPreview } from '../components/VideoPreview';
import { EventList } from '../components/EventList';
import { CTASection } from '../components/CTASection';
import { siteConfig } from '../data';
import { enableEvents, enableHomeMusicPreview, enableMusicPage } from '../config/featureFlags';

export function Home() {
  return (
    <>
      <Helmet>
        <title>{siteConfig.name} | {siteConfig.subtitle}</title>
        <meta name="description" content={siteConfig.description} />
      </Helmet>

      <HeroSection />
      {enableHomeMusicPreview && enableMusicPage && <MusicPreview />}
      <VideoPreview />
      {enableEvents && <EventList />}
      <CTASection showContactLine={false} />
    </>
  );
}
