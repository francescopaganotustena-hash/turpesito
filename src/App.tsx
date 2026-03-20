import { useEffect } from 'react';
import { HashRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Biography } from './pages/Biography';
import { Music } from './pages/Music';
import { Videos } from './pages/Videos';
import { Events } from './pages/Events';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { enableEvents, enableMusicPage } from './config/featureFlags';

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
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="biografia" element={<Biography />} />
            <Route
              path="musica"
              element={enableMusicPage ? <Music /> : <Navigate to="/" replace />}
            />
            <Route path="video" element={<Videos />} />
            <Route
              path="eventi"
              element={enableEvents ? <Events /> : <Navigate to="/" replace />}
            />
            <Route path="galleria" element={<Gallery />} />
            <Route path="contatti" element={<Contact />} />
          </Route>
        </Routes>
      </HashRouter>
    </HelmetProvider>
  );
}

export default App;
