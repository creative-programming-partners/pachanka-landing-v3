/* Pantalla de carga. Se retira cuando las fuentes y la primera foto de la portada ya
   cargaron (o a los 1.6 s, lo que ocurra primero), y nunca antes de que termine de
   armarse el logo (1.1 s). No espera al resto de la página: las demás fotos siguen
   cargando detrás y la portada aparece antes.
   Solo se ve la primera vez en cada visita: si la persona recarga o vuelve desde la
   carta digital, entra directo (la marca "sin-intro" la pone index.html antes de pintar).
   Mientras tanto el scroll queda detenido. Tocándola se salta. */
import { $, reduce } from './utiles.js';
import { lenis } from './scroll-suave.js';

const ESPERA_MAXIMA = 1600; // ms: aunque la foto o las fuentes tarden, no se espera más
const LOGO_ARMADO = 1100;   // ms desde que abrió la página: lo que dura la animación del logo

export function iniciarPantallaDeCarga() {
  const loader = $('#loader');
  const reveal = () => document.body.classList.add('ready');
  scrollTo(0, 0);
  const yaLaVio = document.documentElement.classList.contains('sin-intro');
  if (reduce || yaLaVio || !loader) { loader && loader.remove(); reveal(); return; }

  let started = false;
  lenis && lenis.stop();
  const start = () => {
    if (started) return; started = true;
    try { sessionStorage.setItem('pk-intro', '1'); } catch (e) {}
    loader.classList.add('done');
    lenis && lenis.start();
    setTimeout(reveal, 180);
    setTimeout(() => loader.remove(), 1000);
  };
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const primeraFoto = $('.hero .hs.is-on img') || $('.hero img');
  const fotoLista = primeraFoto && primeraFoto.decode ? primeraFoto.decode().catch(() => {}) : null;
  const fontsReady = document.fonts ? document.fonts.ready : null;
  Promise.race([Promise.all([fontsReady, fotoLista]), wait(ESPERA_MAXIMA)])
    .then(() => requestAnimationFrame(() => setTimeout(start, Math.max(0, LOGO_ARMADO - performance.now()))));
  loader.addEventListener('click', start, { once: true });
}
