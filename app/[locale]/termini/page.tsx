import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo/metadata';
import { Link } from '@/i18n/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({
    titleIt: 'Termini e Condizioni',
    titleEn: 'Terms & Conditions',
    descriptionIt: 'Termini e condizioni di prenotazione e regolamento della casa di Cosmia Hospitality.',
    descriptionEn: "Cosmia Hospitality's booking terms and conditions and house rules.",
    locale,
    path: '/termini',
    locales: ['it', 'en'],
  });
}

export function generateStaticParams() {
  return (['it', 'en'] as const).map((locale) => ({ locale }));
}

export default async function TerminiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const isIt = locale === 'it';
  const lastUpdated = isIt ? '1 luglio 2026' : 'July 1, 2026';

  return (
    <>
      <Header />
      <main id="main-content" className="bg-brand-ivory min-h-screen">
        <div className="bg-brand-navy pt-40 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-white text-4xl lg:text-5xl font-light">
              {isIt ? 'Termini e Condizioni' : 'Terms & Conditions'}
            </h1>
            <p className="mt-3 text-white/50 text-sm">
              {isIt ? `Ultimo aggiornamento: ${lastUpdated}` : `Last updated: ${lastUpdated}`}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20 prose prose-slate max-w-none">
          {isIt ? (
            <div className="space-y-8 text-slate-600 text-base leading-relaxed">
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">1. Check-in e check-out</h2>
                <p>Il check-in è consentito a partire dalle ore 15:00; il check-out deve avvenire entro le ore 11:00. Su richiesta e compatibilmente con la disponibilità, è possibile concordare orari diversi direttamente con l&apos;host. L&apos;accoglienza avviene sempre di persona; l&apos;ospite è tenuto a comunicare in anticipo l&apos;orario di arrivo previsto.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">2. Acconto e pagamento</h2>
                <p>Alla conferma della prenotazione è richiesto il versamento di un acconto pari al 20% dell&apos;importo totale del soggiorno per bloccare l&apos;alloggio. Il saldo residuo (80%) è dovuto al momento del check-in. Sono accettati i seguenti metodi di pagamento: bonifico bancario, contanti, carta di credito o debito.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">3. Tassa di soggiorno</h2>
                <p>La tassa di soggiorno applicata dal Comune di Mattinata non è inclusa nel prezzo del soggiorno. Il relativo importo viene comunicato all&apos;ospite nel preventivo, in modo da consentire un unico pagamento comprensivo al momento del check-in.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">4. Politica di cancellazione e mancata presentazione</h2>
                <p>L&apos;acconto versato ai sensi del punto 2 non è rimborsabile, salvo i seguenti casi: (a) cancellazione comunicata entro 1 giorno dalla ricezione della conferma di prenotazione; oppure (b) cancellazione comunicata almeno 30 giorni prima della data di arrivo. In entrambi i casi l&apos;acconto è rimborsato integralmente. Per il saldo si applicano invece le seguenti condizioni: (a) cancellazione comunicata oltre 7 giorni prima della data di arrivo: rimborso del 100% del saldo; (b) cancellazione comunicata tra 7 giorni e 48 ore prima della data di arrivo: rimborso del 50% del saldo; (c) cancellazione comunicata nelle 48 ore precedenti l&apos;arrivo, o mancata presentazione senza preavviso (no-show): nessun rimborso del saldo.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">5. Modifica delle date</h2>
                <p>È possibile richiedere la modifica delle date del soggiorno, subordinatamente alla disponibilità dell&apos;alloggio nel nuovo periodo richiesto. Eventuali differenze di prezzo derivanti dal nuovo periodo (ad esempio per cambio di stagionalità) sono a carico o a favore dell&apos;ospite.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">6. Registrazione degli ospiti</h2>
                <p>Ai sensi della normativa italiana in materia di pubblica sicurezza, al momento del check-in è richiesto un documento d&apos;identità valido per ciascun ospite maggiorenne, ai fini della comunicazione obbligatoria alla Questura territorialmente competente tramite il portale Alloggiati Web.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">7. Età minima</h2>
                <p>L&apos;intestatario della prenotazione deve avere compiuto 18 anni ed essere fisicamente presente presso l&apos;alloggio per l&apos;intera durata del soggiorno.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">8. Animali domestici</h2>
                <p>Gli animali domestici sono ammessi esclusivamente previa richiesta e approvazione scritta da parte dell&apos;host prima della conferma della prenotazione. Non è previsto alcun supplemento per l&apos;ammissione di animali autorizzati.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">9. Divieto di fumo</h2>
                <p>È vietato fumare in tutti gli ambienti interni dell&apos;alloggio. Il fumo è consentito esclusivamente negli spazi esterni (terrazzo o balcone, ove presenti).</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">10. Soggiorno minimo</h2>
                <p>Il soggiorno minimo richiesto è di 2 notti nei fine settimana e di 3 notti nel periodo di alta stagione (giugno–settembre).</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">11. Danni e responsabilità</h2>
                <p>Non è richiesta alcuna cauzione preventiva. L&apos;ospite è comunque responsabile del risarcimento integrale di eventuali danni arrecati a cose o all&apos;immobile, riscontrati durante o al termine del soggiorno.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">12. Effetti personali</h2>
                <p>Cosmia Hospitality non è responsabile per il furto, lo smarrimento o il danneggiamento di effetti personali degli ospiti durante il soggiorno.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">13. Numero massimo di ospiti</h2>
                <p>La capienza massima consentita è di 4 persone per Casa Lira e 8 persone per Casa Vela, senza possibilità di deroga. È inoltre vietato ospitare un numero di persone superiore a quello dichiarato in fase di prenotazione, anche qualora inferiore alla capienza massima, salvo preventivo accordo con l&apos;host.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">14. Regolamento della casa</h2>
                <p>Ai fini della quiete e del decoro, si richiede: silenzio dalle ore 22:00; divieto di feste ed eventi; divieto di ospitare persone esterne non dichiarate in fase di prenotazione; rispetto del vicinato e degli spazi comuni condominiali.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">15. Cause di forza maggiore</h2>
                <p>Qualora Cosmia Hospitality sia costretta ad annullare la prenotazione per cause di forza maggiore non imputabili alla propria volontà (a titolo esemplificativo, gravi problemi strutturali dell&apos;immobile), l&apos;ospite ha diritto, a propria scelta, al rimborso integrale di quanto versato oppure a una sistemazione alternativa di caratteristiche equivalenti.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">16. Legge applicabile e foro competente</h2>
                <p>Le presenti condizioni sono regolate dalla legge italiana. Per qualsiasi controversia relativa alla loro interpretazione o esecuzione è competente in via esclusiva il Foro di Foggia.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">17. Diritto di recesso</h2>
                <p>Ai sensi dell&apos;articolo 59, comma 1, lettera n) del Codice del Consumo (D.Lgs. 206/2005), il diritto di recesso di 14 giorni previsto per i contratti a distanza non si applica ai contratti di fornitura di servizi di alloggio con una data o un periodo di esecuzione specifico. Trovano pertanto applicazione esclusivamente le condizioni di cancellazione di cui al punto 4.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">18. Violazioni gravi del regolamento</h2>
                <p>In caso di violazione grave delle presenti condizioni — a titolo esemplificativo, subaffitto dell&apos;alloggio a terzi non dichiarati, organizzazione di eventi non autorizzati, svolgimento di attività illecite — Cosmia Hospitality si riserva il diritto di richiedere l&apos;allontanamento immediato dell&apos;ospite dall&apos;alloggio, senza obbligo di rimborso di alcun importo versato.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">19. Segnalazione di problemi durante il soggiorno</h2>
                <p>Eventuali problemi o disservizi riscontrati devono essere segnalati tempestivamente durante il soggiorno tramite i contatti ufficiali di Cosmia Hospitality, in modo da consentire un intervento risolutivo. I reclami sollevati successivamente alla conclusione del soggiorno, e non segnalati durante lo stesso, non danno diritto ad alcun rimborso.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">20. Ritardo nella riconsegna dell&apos;alloggio</h2>
                <p>L&apos;ospite è invitato a concordare in anticipo con l&apos;host eventuali necessità di check-out oltre l&apos;orario indicato al punto 1. Non è prevista una penale fissa; l&apos;eventuale gestione di un ritardo non concordato è valutata caso per caso dall&apos;host.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">21. Limitazione di responsabilità</h2>
                <p>Cosmia Hospitality non è responsabile per disservizi non direttamente imputabili alla propria volontà, quali, a titolo esemplificativo, interruzioni nell&apos;erogazione di energia elettrica, acqua o connessione internet causate da fornitori terzi o dal Comune, nonché rumori provenienti dall&apos;esterno dell&apos;immobile.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">22. Accettazione delle condizioni</h2>
                <p>Confermando la prenotazione e versando l&apos;acconto di cui al punto 2, l&apos;ospite dichiara di aver letto, compreso e accettato integralmente le presenti condizioni, nella versione pubblicata sul sito al momento della prenotazione.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">23. Utenze</h2>
                <p>Le utenze di energia elettrica, acqua, gas e connessione Wi-Fi sono incluse nel prezzo del soggiorno per un utilizzo domestico ordinario. Cosmia Hospitality si riserva il diritto di richiedere un supplemento esclusivamente in caso di consumo palesemente anomalo rispetto alla durata del soggiorno.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">24. Letto aggiuntivo e culla</h2>
                <p>Letto aggiuntivo e culla per bambini sono disponibili su richiesta preventiva, subordinatamente alla disponibilità. L&apos;eventuale supplemento è concordato direttamente con l&apos;host prima della conferma della prenotazione.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">25. Comunicazioni ufficiali</h2>
                <p>Le comunicazioni relative a cancellazioni, modifiche delle date o altre richieste sono valide ed efficaci esclusivamente se effettuate per iscritto tramite email o messaggio WhatsApp ai contatti ufficiali di Cosmia Hospitality indicati sul sito. Ai fini della determinazione della data di comunicazione fa fede la data di invio del messaggio.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">26. Lingua di riferimento</h2>
                <p>Le presenti condizioni sono pubblicate in lingua italiana e in lingua inglese. In caso di discrepanza o contrasto interpretativo tra le due versioni, prevale il testo in lingua italiana.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">27. Tempistiche di rimborso</h2>
                <p>Gli eventuali rimborsi dovuti ai sensi delle presenti condizioni sono elaborati entro 14 giorni lavorativi dalla data di comunicazione della cancellazione, mediante lo stesso metodo di pagamento utilizzato per il versamento originario.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">28. Clausola di salvaguardia</h2>
                <p>Qualora una o più delle presenti clausole siano dichiarate nulle, invalide o inefficaci, le restanti disposizioni continuano a produrre pieno effetto tra le parti.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">29. Trattamento dei documenti raccolti</h2>
                <p>
                  I documenti d&apos;identità raccolti ai fini della registrazione degli ospiti di cui al punto 6 sono trattati secondo quanto indicato nella{' '}
                  <Link href="/privacy" className="text-brand-gold hover:underline">Privacy Policy</Link>
                  , alla quale si rimanda integralmente per ogni dettaglio relativo al trattamento dei dati personali.
                </p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">30. Smarrimento delle chiavi</h2>
                <p>In caso di smarrimento delle chiavi da parte dell&apos;ospite, il costo di sostituzione delle chiavi e/o della serratura è interamente a carico dell&apos;ospite.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">31. Servizio di pulizia durante il soggiorno</h2>
                <p>La pulizia finale dell&apos;alloggio è inclusa nel prezzo del soggiorno. Per soggiorni di durata superiore a 7 notti, l&apos;ospite può richiedere un servizio intermedio di pulizia e cambio biancheria, il cui eventuale supplemento è concordato con l&apos;host.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">32. Reperibilità</h2>
                <p>Cosmia Hospitality è raggiungibile per qualsiasi necessità o emergenza durante il soggiorno tramite i contatti ufficiali indicati sul sito (telefono, WhatsApp, email).</p>
              </section>
            </div>
          ) : (
            <div className="space-y-8 text-slate-600 text-base leading-relaxed">
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">1. Check-in and Check-out</h2>
                <p>Check-in is available from 3:00 PM; check-out must take place by 11:00 AM. Subject to request and availability, different times may be arranged directly with the host. Guests are always welcomed in person; the guest is required to communicate the expected arrival time in advance.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">2. Deposit and Payment</h2>
                <p>A deposit of 20% of the total stay amount is required to secure the booking. The remaining balance (80%) is due at check-in. Accepted payment methods: bank transfer, cash, credit or debit card.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">3. Tourist Tax</h2>
                <p>The tourist tax applied by the Municipality of Mattinata is not included in the stay price. The exact amount is communicated to the guest in the quote, allowing for a single combined payment at check-in.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">4. Cancellation Policy and No-Show</h2>
                <p>The deposit paid under point 2 is non-refundable, except in the following cases: (a) cancellation notified within 1 day of receiving the booking confirmation; or (b) cancellation notified at least 30 days before the arrival date. In both cases the deposit is refunded in full. The following conditions instead apply to the balance: (a) cancellation notified more than 7 days before arrival: 100% refund of the balance; (b) cancellation notified between 7 days and 48 hours before arrival: 50% refund of the balance; (c) cancellation notified within 48 hours of arrival, or failure to show up without notice (no-show): no refund of the balance.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">5. Date Changes</h2>
                <p>A change of stay dates may be requested, subject to availability for the new period. Any price differences resulting from the new period (e.g., a change in season) are charged to or credited to the guest.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">6. Guest Registration</h2>
                <p>In accordance with Italian public security regulations, a valid identity document is required for each adult guest at check-in, for the purpose of the mandatory report to the competent police authority via the Alloggiati Web portal.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">7. Minimum Age</h2>
                <p>The person named on the booking must be at least 18 years old and must be physically present at the property for the entire duration of the stay.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">8. Pets</h2>
                <p>Pets are admitted only upon prior request and written approval by the host before the booking is confirmed. No surcharge applies to approved pets.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">9. No Smoking</h2>
                <p>Smoking is prohibited in all indoor areas of the property. Smoking is permitted only in outdoor spaces (terrace or balcony, where present).</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">10. Minimum Stay</h2>
                <p>The minimum stay required is 2 nights on weekends and 3 nights during high season (June–September).</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">11. Damages and Liability</h2>
                <p>No security deposit is required in advance. The guest is nonetheless liable for the full compensation of any damage caused to property or to the premises found during or after the stay.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">12. Personal Belongings</h2>
                <p>Cosmia Hospitality is not liable for theft, loss, or damage to guests&apos; personal belongings during the stay.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">13. Maximum Number of Guests</h2>
                <p>The maximum occupancy allowed is 4 people for Casa Lira and 8 people for Casa Vela, with no exceptions. It is also prohibited to host a number of people exceeding that declared at the time of booking, even if below maximum occupancy, without prior agreement with the host.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">14. House Rules</h2>
                <p>For the sake of quiet and decorum, the following are required: silence from 10:00 PM; no parties or events; no hosting of external guests not declared at the time of booking; respect for neighbours and shared condominium areas.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">15. Force Majeure</h2>
                <p>Should Cosmia Hospitality be forced to cancel the booking due to force majeure beyond its control (for example, a serious structural issue with the property), the guest is entitled, at their choice, to a full refund of amounts paid or to equivalent alternative accommodation.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">16. Governing Law and Competent Court</h2>
                <p>These terms are governed by Italian law. The Court of Foggia has exclusive jurisdiction over any dispute concerning their interpretation or performance.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">17. Right of Withdrawal</h2>
                <p>Pursuant to Article 59, paragraph 1, letter n) of the Italian Consumer Code (Legislative Decree 206/2005), the 14-day right of withdrawal provided for distance contracts does not apply to contracts for the provision of accommodation services with a specific date or period of performance. Accordingly, only the cancellation terms set out in point 4 apply.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">18. Serious Violations</h2>
                <p>In the event of a serious violation of these terms — including, without limitation, subletting the property to undeclared third parties, organising unauthorised events, or engaging in unlawful activity — Cosmia Hospitality reserves the right to require the guest&apos;s immediate removal from the property, with no obligation to refund any amount paid.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">19. Reporting Issues During the Stay</h2>
                <p>Any problems or service issues must be reported promptly during the stay through Cosmia Hospitality&apos;s official contacts, to allow for a resolution. Complaints raised only after the stay has ended, and not reported during the stay, do not entitle the guest to any refund.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">20. Late Check-out</h2>
                <p>The guest is invited to arrange in advance with the host any need for check-out later than the time indicated in point 1. No fixed penalty is set; any unarranged delay is assessed by the host on a case-by-case basis.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">21. Limitation of Liability</h2>
                <p>Cosmia Hospitality is not liable for service disruptions beyond its control, including, without limitation, interruptions in electricity, water, or internet connection caused by third-party providers or the Municipality, and noise originating from outside the property.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">22. Acceptance of Terms</h2>
                <p>By confirming the booking and paying the deposit referred to in point 2, the guest declares to have read, understood, and fully accepted these terms, in the version published on the website at the time of booking.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">23. Utilities</h2>
                <p>Electricity, water, gas, and Wi-Fi are included in the stay price for ordinary domestic use. Cosmia Hospitality reserves the right to request a surcharge only in the event of clearly abnormal consumption relative to the length of the stay.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">24. Extra Bed and Crib</h2>
                <p>An extra bed or crib is available upon prior request, subject to availability. Any surcharge is agreed directly with the host before the booking is confirmed.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">25. Official Communications</h2>
                <p>Communications regarding cancellations, date changes, or other requests are valid and effective only if made in writing via email or WhatsApp message to Cosmia Hospitality&apos;s official contacts listed on the website. The date of sending the message determines the effective date of communication.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">26. Governing Language</h2>
                <p>These terms are published in Italian and in English. In the event of any discrepancy or conflict in interpretation between the two versions, the Italian text shall prevail.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">27. Refund Timing</h2>
                <p>Any refunds due under these terms are processed within 14 business days of the cancellation notice, using the same payment method used for the original payment.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">28. Severability</h2>
                <p>Should any of these clauses be declared null, invalid, or unenforceable, the remaining provisions shall continue in full force and effect between the parties.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">29. Processing of Collected Documents</h2>
                <p>
                  Identity documents collected for the purpose of guest registration under point 6 are processed in accordance with the{' '}
                  <Link href="/privacy" className="text-brand-gold hover:underline">Privacy Policy</Link>
                  , to which reference is made in full for further details on the processing of personal data.
                </p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">30. Lost Keys</h2>
                <p>In the event of loss of keys by the guest, the cost of replacing the keys and/or lock is fully borne by the guest.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">31. Cleaning Service During the Stay</h2>
                <p>Final cleaning of the property is included in the stay price. For stays longer than 7 nights, the guest may request an intermediate cleaning and linen-change service, with any surcharge agreed with the host.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">32. Availability</h2>
                <p>Cosmia Hospitality can be reached for any need or emergency during the stay through the official contacts listed on the website (phone, WhatsApp, email).</p>
              </section>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
