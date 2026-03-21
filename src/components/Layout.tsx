import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollRevealManager } from './ScrollRevealManager';
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollRevealManager />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <WhatsAppFloatingButton />
      <Footer />
    </div>
  );
}
