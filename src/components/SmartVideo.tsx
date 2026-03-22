import { useEffect, useRef, useState, type VideoHTMLAttributes } from 'react';

type SmartVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src'> & {
  src: string;
  enableLazyLoading?: boolean;
};

export function SmartVideo({ src, enableLazyLoading = true, preload, ...props }: SmartVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [canLoad, setCanLoad] = useState(!enableLazyLoading);

  useEffect(() => {
    if (!enableLazyLoading || canLoad) return;
    const element = videoRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setCanLoad(true);
        observer.disconnect();
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [enableLazyLoading, canLoad]);

  const computedPreload = canLoad ? (preload ?? 'metadata') : 'none';

  return <video ref={videoRef} src={canLoad ? src : undefined} preload={computedPreload} {...props} />;
}
