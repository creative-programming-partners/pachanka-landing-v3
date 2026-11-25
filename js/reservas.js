/* Formulario de reserva. No envía nada a ningún servidor: arma el mensaje y abre
   WhatsApp con él escrito. El número está en contenido/restaurante.js.
   Las horas que se pueden elegir salen del horario de atención: la última reserva es
   una hora antes del cierre y, para hoy, desde media hora después de la hora actual. */
import { $, $$ } from './utiles.js';
import { T } from './idioma.js';
import { limaNow, hoursFor, wdOf, addDays, fmtTime } from './hora-lima.js';

const form = $('#rsvForm'), errBox = $('#rsvError'), okBox = $('#rsvOk');

/** Deja escrita la ocasión (lo usan los botones de "Organizar mi evento"). */
export const fijarOcasion = v => { form.occasion.value = v; };
/** Deja el cursor en el nombre (al llegar desde "Reserva aquí"). */
export const enfocarNombre = () => form.guest.focus({ preventScroll: true });

const slotsFor = dateStr => {
  if (!dateStr) return [];
  const [o, c] = hoursFor(wdOf(dateStr)), now = limaNow(), out = [];
  for (let t = o; t <= c - 60; t += 30) if (dateStr !== now.date || t >= now.mins + 30) out.push(t);
  return out;
};

/** Rehace la lista de personas (cambia con el idioma). */
export function construirPersonas() {
  const keep = form.people.value || '2';
  form.people.innerHTML = [...Array.from({ length: 10 }, (_, i) => String(i + 1)), '10+']
    .map(v => `<option value="${v}">${T().people(v)}</option>`).join('');
  form.people.value = keep;
}

/** Rehace las horas disponibles para la fecha elegida. */
export function construirHoras() {
  const keep = form.time.value, slots = slotsFor(form.date.value);
  form.time.innerHTML = slots.length
    ? `<option value="" disabled>${T().pickTime}</option>` + slots.map(t => `<option value="${t}">${fmtTime(t)}</option>`).join('')
    : `<option value="" disabled>${T().noTimes}</option>`;
  form.time.value = slots.includes(+keep) && keep !== '' ? keep : '';
  if (!form.time.value) form.time.selectedIndex = 0;
}

/** Pone la fecha de hoy como mínimo y deja elegido el primer día con horas libres. */
export function iniciarFecha() {
  const today = limaNow().date;
  form.date.min = today;
  form.date.max = addDays(today, 90);
  if (!form.date.value || form.date.value < today) form.date.value = slotsFor(today).length ? today : addDays(today, 1);
}

export function iniciarReservas() {
  // Casilla de vehículo propio: muestra el aviso del estacionamiento
  const park = $('#rsvParking'), parkNote = $('#rsvParkNote');
  if (park) park.addEventListener('change', () => { parkNote.hidden = !park.checked; });

  form.date.addEventListener('change', () => { construirHoras(); form.date.removeAttribute('aria-invalid'); });
  form.addEventListener('input', e => { e.target.removeAttribute('aria-invalid'); errBox.hidden = true; });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const t = T(), today = limaNow().date;
    const name = form.guest.value.trim(), date = form.date.value, time = form.time.value;
    let bad = null, msg = '';
    if (!name) { bad = form.guest; msg = t.errName; }
    else if (!date || date < today) { bad = form.date; msg = t.errDate; }
    else if (!time || !slotsFor(date).includes(+time)) { construirHoras(); bad = form.time; msg = t.errTime; }
    $$('[aria-invalid]', form).forEach(el => el.removeAttribute('aria-invalid'));
    if (bad) {
      bad.setAttribute('aria-invalid', 'true');
      errBox.textContent = msg; errBox.hidden = false; okBox.hidden = true;
      bad.focus();
      return;
    }
    const [y, m, d] = date.split('-').map(Number);
    const niceDate = new Date(y, m - 1, d, 12).toLocaleDateString(t.locale, { weekday: 'long', day: 'numeric', month: 'long' });
    const lines = [
      t.msgHello,
      `• ${t.msgName}: ${name}`,
      `• ${t.msgPeople}: ${form.people.options[form.people.selectedIndex].text}`,
      `• ${t.msgDate}: ${niceDate}`,
      `• ${t.msgTime}: ${fmtTime(+time)}`,
      `• ${t.msgOcc}: ${form.occasion.options[form.occasion.selectedIndex].text}`
    ];
    if (form.parking && form.parking.checked) lines.push(`• ${t.msgCar}`);
    const notes = form.notes.value.trim();
    if (notes) lines.push(`• ${t.msgNotes}: ${notes}`);
    lines.push('', t.msgThanks);
    const url = 'https://wa.me/' + window.PK_RESTAURANTE.whatsapp + '?text=' + encodeURIComponent(lines.join('\n'));
    errBox.hidden = true; okBox.hidden = false;
    // Con 'noopener' window.open siempre devuelve null, así que se corta el vínculo a mano
    const w = window.open(url, '_blank');
    if (w) w.opener = null;
    else location.href = url; // ventana bloqueada: abrir WhatsApp en la misma pestaña
  });
}
