/* =========================================================
   TEXTOS EN ESPAÑOL (solo los mensajes)
   ---------------------------------------------------------
   Cada línea es   'clave': 'texto',
   Cambia solo el texto de la derecha, sin borrar las comillas ni la coma del final.
   - La clave de la izquierda conecta el texto con su lugar en index.html
     (allí aparece como data-i18n="clave"). No la cambies.
   - Si a una clave le falta su texto aquí, la página muestra el español.
   - Para un apóstrofo usa la comilla curva ’ (por ejemplo: l’heure, Grandma’s),
     no la recta ', que cierra el texto antes de tiempo.
   - <br> es un salto de línea; &nbsp; es un espacio que no se corta.
   Los demás textos en español están directamente en index.html.
   Más ayuda: COMO-EDITAR.md, en la carpeta principal.
   ========================================================= */
window.PK_TEXTOS = window.PK_TEXTOS || {};

PK_TEXTOS.es = {
  // Mensajes que arma la página: aviso de abierto/cerrado, formulario de reserva y mensaje de WhatsApp
  mensajes: {
        title: 'Pachanka Restaurant — Comida criolla y fusión en Jesús María, Lima',
        desc: 'Restaurante criollo y fusión en Jesús María, Lima. Pachanka: platos del mar, especiales de fin de semana y música en vivo. Carta completa y reservas por WhatsApp.',
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
  }
};
