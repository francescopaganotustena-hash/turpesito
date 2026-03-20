import { Helmet } from 'react-helmet-async';
import { GalleryGrid } from '../components/GalleryGrid';
import { CTASection } from '../components/CTASection';
import { siteConfig } from '../data';

export function Gallery() {
  return (
    <>
      <Helmet>
        <title>Galleria | {siteConfig.name}</title>
        <meta name="description" content={`Galleria fotografica di ${siteConfig.name}. Live performance e backstage.`} />
      </Helmet>

      <div className="pt-28">
        <GalleryGrid />
      </div>

      <CTASection />
    </>
  );
}
