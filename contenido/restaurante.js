/* =========================================================
   DATOS DEL RESTAURANTE
   ---------------------------------------------------------
   Cambia los valores de la derecha, sin borrar las comillas ni las comas.
   Más ayuda: COMO-EDITAR.md, en la carpeta principal.
   ========================================================= */
window.PK_RESTAURANTE = {

  // Número de WhatsApp que recibe las reservas del formulario.
  // Código de país (51) + número, todo junto, sin espacios, guiones ni "+".
  // Los enlaces de WhatsApp del pie y el número escrito en la página están en
  // index.html: si cambias el número, búscalo también allí (971 969 101).
  whatsapp: '51971969101',

  // Horario de atención, en formato de 24 horas: [abre, cierra].
  // Se usa para el aviso "Abierto ahora / Cerrado" y para las horas que se
  // pueden elegir al reservar (la última, una hora antes de cerrar).
  // El horario escrito que se ve en la sección "Ubícanos" está en index.html
  // y en contenido/textos-en.js y textos-fr.js: cámbialo también allí.
  horario: {
    lunes:     ['12:00', '23:00'],
    martes:    ['12:00', '23:00'],
    miercoles: ['12:00', '23:00'],
    jueves:    ['12:00', '23:00'],
    viernes:   ['12:00', '23:00'],
    sabado:    ['12:00', '23:00'],
    domingo:   ['12:00', '18:00']
  },

  // Videos de la sección "Los platos, en video", en el orden en que aparecen.
  //   archivo: nombre del video en assets/video, sin ".mp4". Junto a cada video
  //            va una foto con el mismo nombre en .jpg, que se ve mientras carga.
  //   plato:   el id del plato en contenido/carta.js; de ahí salen su nombre,
  //            descripción y precio en los tres idiomas.
  videos: [
    { archivo: 'lomo-saltado-1',    plato: 'lomo-saltado' },
    { archivo: 'carapulcra-1',      plato: 'carapulcra-sopa-seca' },
    { archivo: 'langostinos-1',     plato: 'langostinos-al-panko' },
    { archivo: 'tacu-mar-tierra-1', plato: 'tacu-tacu-mar-y-tierra' },
    { archivo: 'fruto-di-mare-1',   plato: 'fetuccini-fruto-di-mari' },
    { archivo: 'lomo-saltado-2',    plato: 'lomo-saltado' }
  ]
};
