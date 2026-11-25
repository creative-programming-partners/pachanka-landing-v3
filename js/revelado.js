/* Revelado al hacer scroll: lo que lleva la clase .rv entra cuando aparece en pantalla,
   escalonado entre hermanos. El movimiento lo hace el CSS (css/06-revelado.css); aquí
   solo se añade .is-in cuando le toca.
   También entran por aquí la cortina de los paneles divididos y la carga del mapa. */
import { $, $$ } from './utiles.js';

const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('is-in');
  io.unobserve(e.target);
}), { rootMargin: '0px 0px -8% 0px', threshold: .06 });

/** Las animaciones de GSAP reemplazan el revelado CSS de sus elementos. */
export const takeOver = el => { el.classList.remove('rv'); io.unobserve(el); };

export function iniciarRevelado() {
  // Escalonado automático: a cada elemento se le pone su índice entre los hermanos que se revelan
  const parents = new Set($$('.rv').map(el => el.parentElement));
  parents.forEach(p => $$(':scope > .rv', p).forEach((el, i) => el.style.setProperty('--i', i)));
  $$('.drawer li').forEach((li, i) => li.style.setProperty('--i', i));

  $$('.rv').forEach(el => io.observe(el));

  // Paneles divididos: la cortina de la foto se retira cuando el panel entra
  const splitIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    splitIO.unobserve(e.target);
  }), { threshold: .18 });
  $$('.split').forEach(el => splitIO.observe(el));

  // Mapa: carga cuando el navegador está libre, no en medio del scroll
  const mapFrame = $('.map iframe');
  if (mapFrame) {
    const mio = new IntersectionObserver(es => {
      if (!es.some(e => e.isIntersecting)) return;
      mio.disconnect();
      const load = () => { mapFrame.src = mapFrame.dataset.src; };
      'requestIdleCallback' in window ? requestIdleCallback(load, { timeout: 900 }) : setTimeout(load, 250);
    }, { rootMargin: '600px 0px' });
    mio.observe(mapFrame);
  }
}
