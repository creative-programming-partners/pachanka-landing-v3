/* "Un día en Pachanka": la línea del tiempo con las horas del restaurante.
   En celular es una lista (clase day--static). En escritorio, js/animaciones.js fija la
   sección y convierte el scroll en el avance de la barra: cada tramo es una hora.
   La barra recorre la línea en el primer 88 % del scroll fijo; el 12 % final se queda
   en la última hora. */
import { $, $$ } from './utiles.js';
import { lenis, easeInOutCubic } from './scroll-suave.js';

export const day = $('#un-dia');
const moments = $$('.m', day), frames = $$('.fr', day), stepBtns = $$('.day-step', day), dots = $$('.day-dot', day);
const STEPS = moments.length;
const HOLD = .12;

let step = 0, dayST = null;

/** Progreso del scroll fijo → posición de la barra (0 a 1). */
export const progresoBarra = p => Math.min(1, p / (1 - HOLD));
/** Posición de la barra → hora alcanzada. */
export const pasoEn = b => b >= 1 ? STEPS - 1 : Math.floor(b * (STEPS - 1) + 1e-6);

/** Marca la hora n: el momento, la foto, el botón y el punto de la línea. */
export function fijarPaso(n) {
  if (n === step) return;
  step = n;
  day.style.setProperty('--s', n);
  day.dataset.step = n;
  moments.forEach((m, i) => m.classList.toggle('is-active', i === n));
  frames.forEach((f, i) => { f.classList.toggle('is-active', i === n); f.classList.toggle('is-past', i < n); });
  stepBtns.forEach((b, i) => { b.classList.toggle('is-active', i === n); b.classList.toggle('is-reached', i <= n); });
  dots.forEach((d, i) => d.classList.toggle('is-reached', i <= n));
}

/** Lo llama js/animaciones.js al fijar (o soltar) la sección en escritorio. */
export function fijarAnclaje(st) { dayST = st; }

export function iniciarUnDia() {
  // Arranca como lista; GSAP la convierte en sección fija solo en escritorio
  day.classList.add('day--static');
  stepBtns.forEach((b, i) => b.addEventListener('click', () => {
    if (!dayST) return;
    // Justo después del punto de esa hora en la línea
    const p = i === STEPS - 1 ? 1 - HOLD / 2 : (i / (STEPS - 1)) * (1 - HOLD) + .01;
    const y = dayST.start + (dayST.end - dayST.start) * p;
    lenis ? lenis.scrollTo(y, { duration: 1, easing: easeInOutCubic }) : scrollTo({ top: y, behavior: 'smooth' });
  }));
}
