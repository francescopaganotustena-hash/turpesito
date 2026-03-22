import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { events, siteConfig } from '../data';
import { SectionTitle } from '../components/SectionTitle';
import { CTASection } from '../components/CTASection';

export function Events() {
  const upcomingEvents = events.filter((e) => e.status === 'upcoming');
  const pastEvents = events.filter((e) => e.status === 'past');

  return (
    <>
      <Helmet>
        <title>Eventi | {siteConfig.name}</title>
        <meta name="description" content={`Prossimi eventi di ${siteConfig.name}. Matrimoni, serate private, eventi aziendali e live performance.`} />
      </Helmet>
      
      <div className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Eventi"
            subtitle="Prossime date e performance passate"
            centered
          />

          {/* Upcoming Events */}
          <h2 className="font-heading text-3xl mb-8 text-center">Prossimi Eventi</h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-secondary rounded-lg p-6 border border-accent/20 hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-accent text-sm font-medium">{event.type}</span>
                    <span className="bg-accent/10 text-accent text-xs px-3 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Confermato
                    </span>
                  </div>

                  <h3 className="font-heading text-xl mb-4 text-center">{event.title}</h3>

                  <div className="space-y-2 text-text-muted text-sm mb-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>
                        {new Date(event.date).toLocaleDateString('it-IT', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  <p className="text-text/70 text-sm text-center">{event.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-secondary rounded-lg p-10 text-center mb-16">
              <p className="text-text-muted text-lg">
                Nessun evento in programma al momento.
              </p>
              <p className="text-text/60 mt-2">
                Contattami per proporre una data per il tuo evento.
              </p>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <>
              <h2 className="font-heading text-3xl mb-8 text-center mt-16">Eventi Passati</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-secondary/50 rounded-lg p-6 border border-accent/10 opacity-75"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-text-muted text-sm font-medium">{event.type}</span>
                      <span className="text-text-muted text-xs">Archiviato</span>
                    </div>

                    <h3 className="font-heading text-xl mb-4">{event.title}</h3>

                    <div className="space-y-2 text-text-muted text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent/50" />
                        <span>
                          {new Date(event.date).toLocaleDateString('it-IT', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Availability Note */}
          <div className="mt-16 bg-secondary rounded-xl p-10 text-center">
            <h3 className="font-heading text-2xl mb-4">
              {siteConfig.availability}
            </h3>
            <p className="text-text-muted mb-6 max-w-xl mx-auto">
              Se stai cercando un cantante per il tuo evento, non esitare a contattarmi. 
              Ogni serata merita la sua colonna sonora perfetta.
            </p>
          </div>
        </div>
      </div>

      <CTASection />
    </>
  );
}
