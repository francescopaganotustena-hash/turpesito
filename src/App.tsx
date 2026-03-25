import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';

const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const Biography = lazy(() => import('./pages/Biography').then((module) => ({ default: module.Biography })));
const Videos = lazy(() => import('./pages/Videos').then((module) => ({ default: module.Videos })));
const Gallery = lazy(() => import('./pages/Gallery').then((module) => ({ default: module.Gallery })));
const Contact = lazy(() => import('./pages/Contact').then((module) => ({ default: module.Contact })));
const PrivacyCookie = lazy(() => import('./pages/PrivacyCookie').then((module) => ({ default: module.PrivacyCookie })));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="pt-32 pb-24 text-center text-text-muted">Caricamento...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="biografia" element={<Biography />} />
              <Route path="musica" element={<Navigate to="/" replace />} />
              <Route path="video" element={<Videos />} />
              <Route path="eventi" element={<Navigate to="/" replace />} />
              <Route path="galleria" element={<Gallery />} />
              <Route path="contatti" element={<Contact />} />
              <Route path="privacy-cookie" element={<PrivacyCookie />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
