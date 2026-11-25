/* Aviso de "Abierto ahora" o "Cerrado", con la hora a la que cierra o vuelve a abrir.
   Aparece en la cabecera y en la sección Ubícanos, y en el horario marca el día de hoy.
   Se rehace cada minuto (ver js/main.js) y al cambiar de idioma. */
import { $, $$ } from './utiles.js';
import { T, TODAY, idioma } from './idioma.js';
import { limaNow, hoursFor, fmtHour } from './hora-lima.js';

export function pintarEstado() {
  const t = T(), now = limaNow(), [o, c] = hoursFor(now.wd);
  const open = now.mins >= o && now.mins < c;
  let text;
  if (open) text = c - now.mins <= 60 ? `${t.closingSoon} · ${t.closesAt} ${fmtHour(c)}` : `${t.openNow} · ${t.until} ${fmtHour(c)}`;
  else if (now.mins < o) text = `${t.closed} · ${t.opensToday} ${fmtHour(o)}`;
  else text = `${t.closed} · ${t.opensTomorrow} ${fmtHour(hoursFor((now.wd + 1) % 7)[0])}`;
  $$('.js-status').forEach(el => {
    el.classList.toggle('is-open', open);
    el.classList.toggle('is-closed', !open);
    $('.status-text', el).textContent = text;
  });
  $$('#hoursList .hrow').forEach(r => {
    const today = r.dataset.days && r.dataset.days.split(',').includes(String(now.wd));
    r.classList.toggle('is-today', !!today);
    if (today) $('dt', r).dataset.today = TODAY[idioma()];
  });
}
