import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { events } from '../data';
import { SectionTitle } from './SectionTitle';

export function EventList() {
  const upcomingEvents = events.filter((e) => e.status === 'upcoming').slice(0, 3);

  return (
    <section className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Prossimi Eventi"
          subtitle="Non perderti le prossime esibizioni dal vivo"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-secondary rounded-lg p-6 border border-accent/10 hover:border-accent/30 transition-colors text-center"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-accent text-sm font-medium">{event.type}</span>
                <span className="bg-accent/10 text-accent text-xs px-3 py-1 rounded-full">
                  Prenotato
                </span>
              </div>

              <h3 className="font-heading text-xl mb-4">{event.title}</h3>

              <div className="space-y-2 text-text-muted text-sm">
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>{new Date(event.date).toLocaleDateString('it-IT', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>{event.time}</span>
                </div>
              </div>

              <p className="mt-4 text-text/70 text-sm">{event.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/eventi"
            className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
          >
            Vedi tutti gli eventi
          </Link>
        </div>
      </div>
    </section>
  );
}
