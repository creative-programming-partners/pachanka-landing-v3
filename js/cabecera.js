/* Cabecera: se vuelve sólida al dejar la portada, subraya la sección que se está
   leyendo, y el botón de volver arriba aparece pasada una pantalla.
   Las medidas (alto de la portada y de la ventana) se guardan: leerlas en cada cuadro
   de scroll obliga al navegador a recalcular estilos. */
import { $, $$ } from './utiles.js';
import { lenis, irA } from './scroll-suave.js';

export const hdr = $('#hdr');
const hero = $('.hero');
const toTop = $('#toTop');

let solid = null, topOn = null, heroH = hero.offsetHeight, vh = innerHeight;

/** Alto de la portada, medido una vez (y al cambiar el tamaño de la ventana). */
export const altoPortada = () => heroH;

function onScroll(y) {
  const s = y > heroH - 90;
  if (s !== solid) hdr.classList.toggle('is-solid', solid = s);
  const t = y > vh * .9;
  if (t !== topOn) toTop.classList.toggle('show', topOn = t);
}

export function iniciarCabecera() {
  addEventListener('resize', () => { heroH = hero.offsetHeight; vh = innerHeight; }, { passive: true });
  if (lenis) lenis.on('scroll', e => onScroll(e.scroll));
  else addEventListener('scroll', () => onScroll(scrollY), { passive: true });
  toTop.addEventListener('click', () => irA(0));

  // Subraya en el menú la sección que está a la vista
  const navLinks = $$('#hdrNav a');
  if (!navLinks.length) return;
  const byId = new Map(navLinks.map(a => [a.getAttribute('href').slice(1), a]));
  const navIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const a = byId.get(e.target.id);
    if (a) navLinks.forEach(l => l.classList.toggle('is-current', l === a));
  }), { rootMargin: '-45% 0px -50% 0px' });
  byId.forEach((_, id) => { const s = document.getElementById(id); if (s) navIO.observe(s); });
}
