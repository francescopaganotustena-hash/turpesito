import { useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Biography } from './pages/Biography';
import { Videos } from './pages/Videos';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { PrivacyCookie } from './pages/PrivacyCookie';

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
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
