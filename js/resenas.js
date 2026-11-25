/* Reseñas de Google: van pasando solas cada ocho segundos; se detienen al pasar el
   mouse, al usar las flechas o cuando la sección no está a la vista.
   El contador de la nota (que cuenta desde cero) lo anima js/animaciones.js. */
import { $, $$, reduce } from './utiles.js';

export function iniciarResenas() {
  const quotes = $$('#quotes .quote'), qDots = $('#qDots');
  if (!quotes.length || !qDots) return;

  let qi = 0, qTimer = null, revOn = false;
  qDots.innerHTML = quotes.map((_, i) =>
    `<button type="button" role="tab" aria-selected="${i === 0}" aria-label="${i + 1}"></button>`).join('');
  const dots = $$('button', qDots);
  const showQ = i => {
    qi = (i + quotes.length) % quotes.length;
    quotes.forEach((q, k) => q.classList.toggle('is-on', k === qi));
    dots.forEach((d, k) => d.setAttribute('aria-selected', k === qi));
  };
  const play = () => { if (!reduce && revOn && !qTimer) qTimer = setInterval(() => showQ(qi + 1), 8000); };
  const stop = () => { clearInterval(qTimer); qTimer = null; };
  const step = i => { stop(); showQ(i); play(); };
  $('#qPrev').addEventListener('click', () => step(qi - 1));
  $('#qNext').addEventListener('click', () => step(qi + 1));
  qDots.addEventListener('click', e => { const i = dots.indexOf(e.target); if (i >= 0) step(i); });
  const side = $('.rev-side');
  side.addEventListener('mouseenter', stop);
  side.addEventListener('mouseleave', play);
  side.addEventListener('focusin', stop);
  // Fuera de pantalla no hay nada que pasar
  new IntersectionObserver(es => { revOn = es.some(e => e.isIntersecting); revOn ? play() : stop(); }).observe(side);
}
