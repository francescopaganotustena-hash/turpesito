import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../data';
import { SectionTitle } from '../components/SectionTitle';

export function PrivacyCookie() {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={`Informativa privacy e cookie policy del sito di ${siteConfig.name}.`}
        />
      </Helmet>

      <div className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Privacy e Cookie Policy"
            subtitle="Informativa semplificata"
            centered
          />

          <div className="mt-10 space-y-8 text-text/85">
            <section>
              <h2 className="font-heading text-2xl mb-3">Titolare del trattamento</h2>
              <p>
                Il titolare del trattamento dei dati e del sito è {siteConfig.name}.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl mb-3">Dati trattati</h2>
              <p>
                Questo sito raccoglie solo i dati che l&apos;utente invia volontariamente tramite
                contatti diretti (telefono, WhatsApp, social) o eventuali form presenti nel sito.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl mb-3">Finalita</h2>
              <p>
                I dati vengono usati esclusivamente per rispondere alle richieste di informazioni,
                preventivi e gestione contatti relativi ai servizi musicali.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl mb-3">Cookie</h2>
              <p>
                Al momento il sito non utilizza cookie di profilazione o marketing. Possono essere
                presenti solo cookie tecnici necessari al funzionamento del sito e della piattaforma
                di hosting.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl mb-3">Conservazione dei dati</h2>
              <p>
                I dati sono conservati per il tempo strettamente necessario a gestire la richiesta e
                gli eventuali rapporti professionali conseguenti.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl mb-3">Diritti dell&apos;interessato</h2>
              <p>
                L&apos;utente puo richiedere accesso, rettifica, cancellazione o limitazione del
                trattamento dei propri dati, nei limiti previsti dalla normativa vigente.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl mb-3">Contatti</h2>
              <p>
                Per richieste relative ai dati personali: {siteConfig.phone}.
              </p>
            </section>

            <p className="text-sm text-text-muted">
              Ultimo aggiornamento: 22 marzo 2026.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
