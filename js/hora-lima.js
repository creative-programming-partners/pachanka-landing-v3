/* La hora de Lima y el horario de atención. Todo lo que dependa de "qué hora es allá"
   pasa por aquí: el aviso de abierto o cerrado, el tema claro u oscuro y las horas que
   se pueden elegir al reservar.
   El horario sale de contenido/restaurante.js ([abre, cierra] por día, en 24 h). */
import { idioma } from './idioma.js';

const DAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Ahora mismo en Lima: { date: 'AAAA-MM-DD', wd: día de la semana, mins: minutos del día }. */
export function limaNow() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit',
    weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  }).formatToParts(new Date()).map(x => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, wd: DAYS[p.weekday], mins: (+p.hour % 24) * 60 + +p.minute };
}

const DAY_KEYS = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
const toMin = t => { const [h, m] = String(t).split(':').map(Number); return h * 60 + (m || 0); };
const HOURS = DAY_KEYS.map(k => window.PK_RESTAURANTE.horario[k].map(toMin));

/** [abre, cierra] de un día de la semana, en minutos del día. */
export const hoursFor = wd => HOURS[wd];

/** Día de la semana de una fecha 'AAAA-MM-DD'. */
export const wdOf = dateStr => { const [y, m, d] = dateStr.split('-').map(Number); return new Date(y, m - 1, d).getDay(); };

/** Suma días a una fecha 'AAAA-MM-DD'. */
export const addDays = (dateStr, n) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d + n);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
};

// Español e inglés en 12 h (12:30 p.m.); francés en 24 h, como se usa en Francia (12 h 30)
/** Hora con minutos: "12:30 p.m." */
export const fmtTime = mins => {
  const h = Math.floor(mins / 60), m = mins % 60, h12 = ((h + 11) % 12) + 1;
  if (idioma() === 'fr') return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`;
  return `${h12}:${String(m).padStart(2, '0')} ${h < 12 ? 'a.m.' : 'p.m.'}`;
};

/** Hora en punto, para el aviso de abierto o cerrado: "11 p.m." */
export const fmtHour = mins => {
  const h = Math.floor(mins / 60), h12 = ((h + 11) % 12) + 1;
  return idioma() === 'fr' ? `${h} h` : `${h12} ${h < 12 ? 'a.m.' : 'p.m.'}`;
};
