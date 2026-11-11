/* Traducciones. El español vive en el HTML; aquí está el inglés.
   Marcas en el HTML: data-i18n (contenido), data-i18n-aria, data-i18n-alt, data-i18n-ph (placeholder), data-i18n-title. */
(function () {
  const EN = {
    'nav.open': 'Open menu',
    'nav.home': 'Pachanka, home',
    'nav.main': 'Main menu',
    'nav.close': 'Close menu',
    'lang.switch': 'Ver en español',
    'cta.book': 'Book a table',
    'nav.day': 'A day at Pachanka',
    'nav.menu': 'Our menu',
    'nav.fullmenu': 'Full menu',
    'nav.videos': 'Videos',
    'nav.reviews': 'Reviews',
    'nav.book': 'Reservations',
    'nav.events': 'Events & celebrations',
    'nav.find': 'Find us',

    'mp.brush': 'Our menu',
    'mp.title': 'Full menu',
    'mp.close': 'Close menu',
    'mp.tabs': 'Menu categories',
    'mp.note': '*Prices in Peruvian soles (S/).',
    'mp.pdf': 'Open the digital menu',

    'nav.sections': 'Sections',
    'nav.homeShort': 'Home',
    'nav.dayShort': 'A day',
    'nav.menuShort': 'Menu',
    'nav.eventsShort': 'Events',

    'hero.l1': 'Welcome,',
    'hero.l2': 'to the criollo fiesta',
    'hero.meta': 'Criollo · Fusion — Jesús María, Lima',
    'hero.lede': 'Criollo cooking with a fusion twist, seafood and live music. Long tables, a buzzing bar and a wok that never stops.',
    'hero.today': 'Today at Pachanka',
    'hero.music': 'Live criollo music on mid-month and end-of-month Fridays.',
    'hero.prev': 'Previous photo',
    'hero.next': 'Next photo',
    'rs.brush': 'Your table is waiting',
    'loc.brush': 'See you soon',
    'ev.brush': 'Celebrate with us',
    'ev.s1': 'Mid and end of month', 'ev.d1': 'Live criollo music, and the table ends up as the dance floor.',
    'ev.s2': 'Decorations & a toast', 'ev.d2': 'We set the table with you: decorations, starters to share and the bar ready.',
    'ev.s3': 'Family, friends or the office', 'ev.d3': 'Starters in the middle and dishes to share among everyone.',
    'ev.s4': 'Dates to remember', 'ev.d4': 'Tell us the date and the number of guests, and we plan it together.',

    'day.k0': 'Noon · 12:00 p.m.',
    'day.t0': 'Criollo lunch',
    'day.p0': 'We open at noon and the wok never stops: lomo saltado, causas and ceviches for the long family table or the office crew.',
    'day.k1': 'Afternoon · 4:00 p.m.',
    'day.t1': 'Starters to share',
    'day.p1': 'Ceviche Pachanka, causa acevichada and panko prawns in the middle of the table. The afternoon stretches on and nobody checks the clock.',
    'day.k2': 'Evening · 7:00 p.m.',
    'day.t2': 'After office',
    'day.p2': 'The bar lights up: house mocktails, herb lemonades and passion fruit by the liter until eleven.',
    'day.k3': 'Fiesta · 9:00 p.m.',
    'day.t3': 'Live music',
    'day.p3': 'On mid-month and end-of-month Fridays the party starts: live criollo music and the table ends up as a dance floor.',
    'day.note': '*Only on mid-month and end-of-month Fridays.',
    'day.cue': 'Keep scrolling',
    'day.steps': 'Moments of the day',
    'day.go0': 'Go to 12:00', 'day.go1': 'Go to 16:00', 'day.go2': 'Go to 19:00', 'day.go3': 'Go to 21:00',


    'alt.mesa': 'A table set with several dishes from the Pachanka menu, seen from above',
    'alt.piqueo': 'Piqueo pachankero to share, with two house drinks',
    'alt.barra': 'The Pachanka bar with two house drinks freshly served',
    'alt.musica': 'A singer performing live on the Pachanka stage under the night lights',
    'alt.show': 'Live criollo music show with dancers in red and white',
    'alt.lomo': 'Lomo saltado with yellow potatoes and rice, served in the Pachanka dining room',
    'alt.ceviche': 'Ceviche Pachanka in a deep bowl, with avocado, cancha corn and a crisp topping',
    'alt.plate': 'Creamy rice with lomo saltado, from the Pachanka menu',
    'alt.salon': 'A table set in the Pachanka dining room, with the bar behind',
    'alt.bday': 'A toast with house drinks at a table in Pachanka',
    'alt.family2': 'A long table of guests raising their glasses, with piqueos in the middle',
    'alt.team': 'The Pachanka team celebrating its fifth anniversary',

    'vd.brush': 'Pachanka in motion',
    'vd.title': 'The dishes,<br>on video',
    'vd.lede': 'From the wok to the plate. Tap any video to see it big.',
    'vd.close': 'Close the video',
    'vd.prev': 'Previous video',
    'vd.next': 'Next video',
    'c1.brush': 'Our classics',
    'c1.title': 'Discover<br>our menu',
    'c1.lede': 'The classics done right: the wok, the grill and Peruvian yellow potato.',
    'c1.d1': 'Wok-tossed beef tenderloin and vegetables, crispy yellow potatoes and corn rice.',
    'c1.d2': 'Crispy bean-and-rice cake, wok-tossed beef, egg and plantain.',
    'c1.d3': 'With fries, rice and a mixed salad.',
    'c1.d4': 'With grilled beef steak or breaded chicken.',
    'c1.d5': 'Spaghetti stir-fried with chicken and vegetables in carretillera sauce.',
    'c1.fine': 'To start: ceviche Pachanka, causa acevichada, leche de tigre and panko prawns.<br>*Prices in soles.',
    'cta.fullmenu': 'See full menu',
    'cta.digital': 'Digital menu',
    'c2.brush': 'From the sea',
    'c2.title': 'The sea<br>on your table',
    'c2.lede': 'Fresh fish, seafood and the house Callao twist, from the ceviche to the creamy rice.',
    'c2.d1': 'Diced fish, thin octopus slices and avocado.',
    'c2.d2': 'Fish and prawns in ceviche sauce, with a crispy pork skewer.',
    'c2.d3': 'Creamy rice sautéed with seafood, with our Callao twist.',
    'c2.d4': 'Creamy seafood rice, house ceviche and crispy calamari rings.',
    'c2.d5': 'Seafood in butter and white wine, with a grilled fish fillet.',
    'cta.allsea': 'See everything from the sea',
    'c3.brush': 'Criollo fusion',
    'c3.title': 'Our own twists',
    'c3.hours': 'The Amazon, chifa and huancaína at the same table',
    'c3.d1': 'Creamy ají amarillo and parmesan rice, topped with wok-tossed beef.',
    'c3.d2': 'Short ribs slow-cooked for three hours, with rustic mash and sautéed vegetables.',
    'c3.d3': 'Cecina, Amazonian chorizo, crispy chicken, plantain and cocona chili.',
    'c3.d4': 'Creamy fettuccine with beef tenderloin and mushroom stroganoff.',
    'c3.d5': 'Panko chicken breast with mushroom stroganoff and Peruvian potatoes.',
    'c3.fine': 'Saturdays and Sundays: crispy caja china pork, carapulcra with sopa seca and beans with braised goat.',
    'cta.allfusion': 'See all criollo fusion',

    'rev.brush': 'What Google says',
    'rev.aria': '4.4 out of 5 stars on Google',
    'rev.num': '4.4',
    'rev.count': 'reviews on Google Maps',
    'rev.cta': 'Read the reviews on Google',
    'rev.date': 'Rating and reviews from Google Maps, September 2026.',
    'rev.source': 'Google review (in Spanish)',
    'rev.prev': 'Previous review',
    'rev.next': 'Next review',
    'rev.dots': 'Reviews',
    'rev.dist': 'How they rate it on Google',
    'rev.stars': 'stars',
    'rev.star': 'star',
    'rev.dnote': 'of the 287 reviews give it 4 or 5 stars.',

    'rs.title': 'Reservations',
    'rs.h': 'Book your table',
    'rs.p': 'Fill in the details and WhatsApp will open with your booking ready to send. We confirm in the same chat.',
    'f.name': 'Name',
    'f.people': 'Guests',
    'f.date': 'Date',
    'f.time': 'Time',
    'f.occasion': 'Occasion',
    'o.meal': 'Lunch or dinner',
    'o.birthday': 'Birthday',
    'o.afteroffice': 'After office',
    'o.work': 'Business meeting',
    'o.anniversary': 'Anniversary',
    'o.event': 'Event or celebration',
    'f.notes': 'Comments (optional)',
    'f.parking': 'I will arrive by car',
    'f.parking.note': 'When you send the booking we will confirm parking availability on WhatsApp.',
    'f.notes.ph': 'E.g. table near the music, high chair',
    'f.submit': 'Send booking via WhatsApp',
    'f.ok': 'Done: send the message on WhatsApp and we will confirm your booking.',
    'rs.dh': 'Delivery',
    'rs.dp': 'Order your favorite dishes at home. For large or office orders, message us at 971 969 101.',
    'rs.dcta': 'Order on PedidosYa',

    'ev.q': 'Planning a birthday or a get-together?',
    'ev.p1': 'Live criollo music on mid-month and end-of-month Fridays, games on screen and long tables to celebrate. We plan it with you: decorations, starters to share and the bar ready.',
    'ev.p2': 'Tell us the date and the number of guests.',
    'ev.p3': 'The Pachanka team will help you plan a celebration to remember.',
    'ev.g1': 'Criollo nights', 'ev.g2': 'Birthdays', 'ev.g3': 'Long tables', 'ev.g4': 'Anniversaries',
    'ev.cta': 'Plan my event',

    'map.title': 'Map showing Pachanka location',
    'loc.city': 'Jesús María – Lima, Peru',
    'loc.maps': 'View on Google Maps',
    'loc.waze': 'Open in Waze',
    'loc.hours': 'Opening hours',
    'loc.monsat': 'Monday to Saturday',
    'loc.monsat.h': '12:00 p.m. to 11:00 p.m.',
    'loc.sun': 'Sunday',
    'loc.sun.h': '12:00 p.m. to 6:00 p.m.',
    'loc.ao.h': '7:00 p.m. to 11:00 p.m.',

    'ftr.home': 'Back to top',
    'ftr.about': 'About Pachanka',
    'ftr.more': 'More information',
    'ftr.pdf1': 'Digital menu',
    'ftr.delivery': 'Delivery on PedidosYa',
    'ftr.proposal': 'Web design proposal · Mockup',
    'ftr.top': 'Back to top'
  };

  /* Textos que arma el JavaScript (estado de apertura, formulario, mensaje de WhatsApp) */
  const JS = {
    es: {
      title: 'Pachanka Restaurant — Criollo · Fusión en Jesús María',
      desc: 'Pachanka: cocina criolla con fusión, platos del mar, especiales de fin de semana y música en vivo en Jesús María, Lima. Reserva tu mesa por WhatsApp.',
      openNow: 'Abierto ahora', until: 'hasta las', closed: 'Cerrado', opensToday: 'abre hoy a las', opensTomorrow: 'abre mañana a las',
      closingSoon: 'Cierra pronto', closesAt: 'cierra a las',
      people: n => n === '10+' ? 'Más de 10' : n + (n === '1' ? ' persona' : ' personas'),
      pickTime: 'Elige una hora', noTimes: 'Sin horarios disponibles',
      errName: 'Escribe tu nombre.', errDate: 'Elige una fecha desde hoy.', errTime: 'Elige una hora disponible.',
      msgHello: 'Hola Pachanka, quisiera reservar una mesa:',
      msgName: 'Nombre', msgPeople: 'Personas', msgDate: 'Fecha', msgTime: 'Hora', msgOcc: 'Ocasión', msgNotes: 'Comentario', msgThanks: '¡Gracias!',
      vSee: 'Ver el video', vOf: 'de', vOpen: 'Ver en grande',
      msgCar: 'Llegaré en vehículo propio, ¿hay estacionamiento?',
      locale: 'es-PE'
    },
    en: {
      title: 'Pachanka Restaurant — Criollo · Fusion in Jesús María, Lima',
      desc: 'Pachanka: criollo cuisine with a fusion twist, seafood, weekend specials and live music in Jesús María, Lima. Book your table via WhatsApp.',
      openNow: 'Open now', until: 'until', closed: 'Closed', opensToday: 'opens today at', opensTomorrow: 'opens tomorrow at',
      closingSoon: 'Closing soon', closesAt: 'closes at',
      people: n => n === '10+' ? 'More than 10' : n + (n === '1' ? ' guest' : ' guests'),
      pickTime: 'Choose a time', noTimes: 'No times available',
      errName: 'Please enter your name.', errDate: 'Choose a date from today on.', errTime: 'Choose an available time.',
      msgHello: 'Hi Pachanka, I would like to book a table:',
      msgName: 'Name', msgPeople: 'Guests', msgDate: 'Date', msgTime: 'Time', msgOcc: 'Occasion', msgNotes: 'Comments', msgThanks: 'Thank you!',
      vSee: 'Watch the video', vOf: 'of', vOpen: 'See it big',
      msgCar: 'I will arrive by car, is there parking?',
      locale: 'en-US'
    }
  };

  const originals = new Map();
  function keep(el, prop, value) {
    if (!originals.has(el)) originals.set(el, {});
    const o = originals.get(el);
    if (!(prop in o)) o[prop] = value;
    return o[prop];
  }
  const ATTRS = [['i18nAria', 'aria-label'], ['i18nAlt', 'alt'], ['i18nPh', 'placeholder'], ['i18nTitle', 'title']];

  function apply(lang) {
    const en = lang === 'en';
    document.documentElement.lang = en ? 'en' : 'es';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const es = keep(el, 'html', el.innerHTML);
      const v = en ? EN[el.dataset.i18n] : es;
      if (v !== undefined && el.innerHTML !== v) el.innerHTML = v;
    });
    ATTRS.forEach(([ds, attr]) => {
      document.querySelectorAll('[data-' + ds.replace(/[A-Z]/g, c => '-' + c.toLowerCase()) + ']').forEach(el => {
        const es = keep(el, attr, el.getAttribute(attr));
        const v = en ? EN[el.dataset[ds]] : es;
        if (v !== undefined && v !== null) el.setAttribute(attr, v);
      });
    });
    const t = JS[en ? 'en' : 'es'];
    document.title = t.title;
    const d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute('content', t.desc);
  }

  window.PK_I18N = { EN, JS, apply };
})();
