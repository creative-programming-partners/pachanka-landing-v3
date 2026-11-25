/* Pantalla de carga. Se retira cuando las fuentes, las fotos de la portada y la página
   ya cargaron (o a los 2.8 s, lo que ocurra primero): así el trabajo pesado del arranque
   queda detrás de ella y la portada aparece entera, no a medio armar.
   Mientras tanto el scroll queda detenido. Tocándola se salta. */
import { $, $$, reduce } from './utiles.js';
import { lenis } from './scroll-suave.js';

export function iniciarPantallaDeCarga() {
  const loader = $('#loader');
  const reveal = () => document.body.classList.add('ready');
  scrollTo(0, 0);
  if (reduce || !loader) { loader && loader.remove(); reveal(); return; }

  let started = false;
  lenis && lenis.stop();
  const start = () => {
    if (started) return; started = true;
    loader.classList.add('done');
    lenis && lenis.start();
    setTimeout(reveal, 180);
    setTimeout(() => loader.remove(), 1000);
  };
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const pageLoaded = new Promise(r => document.readyState === 'complete' ? r() : addEventListener('load', r, { once: true }));
  const heroImages = $$('.hero img').map(im => im.decode ? im.decode().catch(() => {}) : null);
  const fontsReady = document.fonts ? document.fonts.ready : null;
  Promise.race([Promise.all([fontsReady, pageLoaded, ...heroImages]), wait(2800)])
    .then(() => requestAnimationFrame(() => setTimeout(start, Math.max(0, 1500 - performance.now()))));
  loader.addEventListener('click', start, { once: true });
}
