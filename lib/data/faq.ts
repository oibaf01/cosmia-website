import type { Localized } from '@/lib/locale';

export interface FaqItem {
  id: string;
  question: Localized;
  answer: Localized;
  link?: { href: string; label: Localized };
}

export const faqItems: FaqItem[] = [
  {
    id: 'arrivo',
    question: {
      it: 'Come si raggiungono gli appartamenti senza auto?',
      en: 'How do I get to the apartments without a car?',
      fr: 'Comment rejoindre les appartements sans voiture ?',
      de: 'Wie erreicht man die Wohnungen ohne Auto?',
    },
    answer: {
      it: 'Mattinata è collegata da bus provenienti dalle principali città della provincia di Foggia; una volta in paese, entrambi gli appartamenti sono raggiungibili a piedi dalla fermata del centro. Per muoverti dal paese al mare, consulta gli orari del CityBus nella pagina dedicata.',
      en: 'Mattinata is served by buses from the main towns in the province of Foggia; once in town, both apartments are within walking distance of the central stop. To get from town to the beach, check the CityBus timetable on our dedicated page.',
      fr: "Mattinata est desservie par des bus depuis les principales villes de la province de Foggia ; une fois en ville, les deux appartements sont accessibles à pied depuis l'arrêt central. Pour se déplacer du centre à la mer, consultez les horaires du CityBus sur notre page dédiée.",
      de: 'Mattinata ist mit Bussen aus den wichtigsten Städten der Provinz Foggia zu erreichen; im Ort selbst sind beide Wohnungen von der zentralen Haltestelle aus zu Fuß erreichbar. Für die Strecke vom Ortszentrum zum Meer prüfen Sie bitte die Fahrpläne des CityBus auf unserer eigenen Seite.',
    },
    link: {
      href: '/orari-bus',
      label: {
        it: 'Vedi gli orari del bus',
        en: 'See the bus timetable',
        fr: 'Voir les horaires du bus',
        de: 'Busfahrplan ansehen',
      },
    },
  },
  {
    id: 'parcheggio',
    question: {
      it: "C'è un parcheggio disponibile?",
      en: 'Is parking available?',
      fr: 'Y a-t-il un parking disponible ?',
      de: 'Gibt es einen Parkplatz?',
    },
    answer: {
      it: 'Sì, il parcheggio è gratuito ma pubblico e non custodito: va cercato lungo le vie del centro o nella piazza vicina agli appartamenti.',
      en: "Yes, parking is free but public and unattended: you'll find space along the streets in the centre or in the square near the apartments.",
      fr: 'Oui, le stationnement est gratuit mais public et non surveillé : il faut chercher une place dans les rues du centre ou sur la place proche des appartements.',
      de: 'Ja, das Parken ist kostenlos, aber öffentlich und unbewacht: Sie müssen einen Platz in den Straßen des Zentrums oder auf dem Platz in der Nähe der Wohnungen suchen.',
    },
  },
  {
    id: 'orari',
    question: {
      it: 'Che orari sono previsti per check-in e check-out?',
      en: 'What are the check-in and check-out times?',
      fr: "Quels sont les horaires d'arrivée et de départ ?",
      de: 'Welche Check-in- und Check-out-Zeiten gelten?',
    },
    answer: {
      it: 'Il check-in è dalle 15:00, il check-out entro le 11:00. Un late check-out può essere richiesto in base alla disponibilità.',
      en: 'Check-in is from 3:00 PM, check-out by 11:00 AM. A late check-out can be requested subject to availability.',
      fr: "L'arrivée se fait à partir de 15h00, le départ avant 11h00. Un départ tardif peut être demandé selon disponibilité.",
      de: 'Der Check-in ist ab 15:00 Uhr möglich, der Check-out bis 11:00 Uhr. Ein späterer Check-out kann je nach Verfügbarkeit angefragt werden.',
    },
    link: {
      href: '/contatti',
      label: {
        it: 'Scrivici',
        en: 'Contact us',
        fr: 'Écrivez-nous',
        de: 'Schreiben Sie uns',
      },
    },
  },
  {
    id: 'clima',
    question: {
      it: "L'aria condizionata è inclusa?",
      en: 'Is air conditioning included?',
      fr: 'La climatisation est-elle incluse ?',
      de: 'Ist die Klimaanlage inbegriffen?',
    },
    answer: {
      it: "Sì, è inclusa nel prezzo del soggiorno in entrambi gli appartamenti. Per i dettagli specifici, consulta la pagina del singolo appartamento.",
      en: "Yes, it's included in the stay price in both apartments. For room-by-room details, check each apartment's page.",
      fr: "Oui, elle est incluse dans le prix du séjour dans les deux appartements. Pour les détails pièce par pièce, consultez la page de chaque appartement.",
      de: 'Ja, sie ist im Übernachtungspreis in beiden Wohnungen enthalten. Details zu den einzelnen Räumen finden Sie auf der jeweiligen Wohnungsseite.',
    },
    link: {
      href: '/appartamenti',
      label: {
        it: 'Vedi gli appartamenti',
        en: 'See the apartments',
        fr: 'Voir les appartements',
        de: 'Wohnungen ansehen',
      },
    },
  },
  {
    id: 'biancheria',
    question: {
      it: 'Biancheria e asciugamani sono inclusi?',
      en: 'Are linens and towels included?',
      fr: 'Le linge de maison et les serviettes sont-ils inclus ?',
      de: 'Sind Bettwäsche und Handtücher inbegriffen?',
    },
    answer: {
      it: 'Sì: il kit di benvenuto comprende lenzuola, federe e asciugamani. Un servizio di pulizia e cambio biancheria durante il soggiorno è disponibile su richiesta, con supplemento a parte.',
      en: 'Yes: the welcome kit includes sheets, pillowcases and towels. A mid-stay cleaning and linen-change service is available on request, at an extra charge.',
      fr: "Oui : le kit de bienvenue comprend draps, taies d'oreiller et serviettes. Un service de ménage et de changement du linge en cours de séjour est disponible sur demande, moyennant un supplément.",
      de: 'Ja: Das Willkommenspaket umfasst Bettlaken, Kissenbezüge und Handtücher. Ein Reinigungs- und Wäschewechselservice während des Aufenthalts ist auf Anfrage gegen Aufpreis verfügbar.',
    },
  },
  {
    id: 'acconto',
    question: {
      it: "Come funziona l'acconto per confermare la prenotazione?",
      en: 'How does the deposit work to confirm a booking?',
      fr: "Comment fonctionne l'acompte pour confirmer la réservation ?",
      de: 'Wie funktioniert die Anzahlung zur Bestätigung der Buchung?',
    },
    answer: {
      it: "Per bloccare l'appartamento è richiesto un acconto del 20% del totale al momento della conferma; il saldo restante (80%) va corrisposto entro il check-in.",
      en: 'To secure the apartment, a 20% deposit of the total is required upon confirmation; the remaining balance (80%) is due by check-in.',
      fr: "Pour bloquer l'appartement, un acompte de 20 % du total est demandé à la confirmation ; le solde restant (80 %) est dû au plus tard à l'arrivée.",
      de: 'Um die Wohnung zu sichern, ist bei der Bestätigung eine Anzahlung von 20 % des Gesamtbetrags erforderlich; der Restbetrag (80 %) ist spätestens beim Check-in fällig.',
    },
  },
  {
    id: 'cancellazione',
    question: {
      it: 'Qual è la politica di cancellazione?',
      en: 'What is the cancellation policy?',
      fr: "Quelle est la politique d'annulation ?",
      de: 'Wie lautet die Stornierungsbedingung?',
    },
    answer: {
      it: "L'acconto non è rimborsabile, salvo se cancelli entro 1 giorno dalla conferma di prenotazione o almeno 30 giorni prima dell'arrivo — in questi casi viene rimborsato per intero. Per il saldo: rimborso 100% oltre 7 giorni prima dell'arrivo, 50% tra 7 giorni e 48 ore prima, nessun rimborso sotto le 48 ore o in caso di mancata presentazione.",
      en: 'The deposit is non-refundable, unless you cancel within 1 day of the booking confirmation or at least 30 days before arrival — in these cases it is refunded in full. For the balance: 100% refund more than 7 days before arrival, 50% between 7 days and 48 hours before, no refund within 48 hours or in case of no-show.',
      fr: "L'acompte n'est pas remboursable, sauf en cas d'annulation dans un délai de 1 jour après la confirmation de réservation, ou au moins 30 jours avant l'arrivée — dans ces cas, il est intégralement remboursé. Pour le solde : remboursement à 100 % au-delà de 7 jours avant l'arrivée, 50 % entre 7 jours et 48 heures avant, aucun remboursement en deçà de 48 heures ou en cas de non-présentation.",
      de: 'Die Anzahlung ist nicht erstattungsfähig, außer bei Stornierung innerhalb von 1 Tag nach der Buchungsbestätigung oder mindestens 30 Tage vor der Anreise — in diesen Fällen wird sie vollständig erstattet. Für den Restbetrag: 100 % Erstattung bei Stornierung mehr als 7 Tage vor der Anreise, 50 % zwischen 7 Tagen und 48 Stunden vorher, keine Erstattung innerhalb von 48 Stunden oder bei Nichterscheinen.',
    },
    link: {
      href: '/termini',
      label: {
        it: 'Leggi i Termini e Condizioni',
        en: 'Read the Terms & Conditions',
        fr: 'Lire les Conditions Générales',
        de: 'AGB lesen',
      },
    },
  },
];
