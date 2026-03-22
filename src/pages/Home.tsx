import { Helmet } from 'react-helmet-async';
import { HeroSection } from '../components/HeroSection';
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
      <CTASection showContactLine={false} />
    </>
  );
}
