import { Helmet } from 'react-helmet-async';
import { HeroSection } from '../components/HeroSection';
import { MusicPreview } from '../components/MusicPreview';
import { VideoPreview } from '../components/VideoPreview';
import { EventList } from '../components/EventList';
import { CTASection } from '../components/CTASection';
import { siteConfig } from '../data';

export function Home() {
  return (
    <>
      <Helmet>
        <title>{siteConfig.name} | {siteConfig.subtitle}</title>
        <meta name="description" content={siteConfig.description} />
      </Helmet>

      <HeroSection />
      <MusicPreview />
      <VideoPreview />
      <EventList />
      <CTASection />
    </>
  );
}
