import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { gallery } from '../data';
import { SectionTitle } from './SectionTitle';

export function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (id: number) => setSelectedImage(id);
  const closeLightbox = () => setSelectedImage(null);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const currentIndex = gallery.findIndex((img) => img.id === selectedImage);
    let newIndex: number;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % gallery.length;
    } else {
      newIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    }

    setSelectedImage(gallery[newIndex].id);
  };

  return (
    <section className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Galleria"
          subtitle="Momenti dal vivo e backstage"
          centered
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((image) => (
            <button
              key={image.id}
              onClick={() => openLightbox(image.id)}
              className="group relative aspect-square rounded-lg overflow-hidden"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-text text-sm font-medium text-center px-4">
                    {image.title}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-text hover:text-accent transition-colors"
            aria-label="Chiudi"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            className="absolute left-4 text-text hover:text-accent transition-colors"
            aria-label="Immagine precedente"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            className="absolute right-4 text-text hover:text-accent transition-colors"
            aria-label="Immagine successiva"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="max-w-4xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={gallery.find((img) => img.id === selectedImage)?.src}
              alt={gallery.find((img) => img.id === selectedImage)?.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-center mt-4 text-text">
              {gallery.find((img) => img.id === selectedImage)?.title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
