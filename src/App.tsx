import { HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Biography } from './pages/Biography';
import { Music } from './pages/Music';
import { Videos } from './pages/Videos';
import { Events } from './pages/Events';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';

function App() {
  return (
    <HelmetProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="biografia" element={<Biography />} />
            <Route path="musica" element={<Music />} />
            <Route path="video" element={<Videos />} />
            <Route path="eventi" element={<Events />} />
            <Route path="galleria" element={<Gallery />} />
            <Route path="contatti" element={<Contact />} />
          </Route>
        </Routes>
      </HashRouter>
    </HelmetProvider>
  );
}

export default App;
