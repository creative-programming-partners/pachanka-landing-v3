/* Scroll suave con Lenis (librería externa, por CDN) y el "ir a" que usan los enlaces
   internos y los botones de la línea del tiempo.
   Si Lenis no carga, o si se pidió menos movimiento, la página usa el scroll del
   navegador y todo sigue funcionando igual. */
import { reduce } from './utiles.js';

/** La instancia de Lenis, o null si no se usa. */
export const lenis = (!reduce && window.Lenis) ? new Lenis({ lerp: .11, wheelMultiplier: 1, smoothWheel: true }) : null;

// Con GSAP el reloj lo lleva el ticker de GSAP (ver js/animaciones.js); si no, va aquí
if (lenis && !(window.gsap && window.ScrollTrigger)) {
  const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}

export const easeInOutCubic = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Lleva la página a un elemento (o a 0, el inicio).
 * @param done  se llama al terminar el recorrido.
 */
export const irA = (target, done) => {
  if (lenis) lenis.scrollTo(target, { offset: target === 0 ? 0 : -72, duration: 1.2, easing: easeInOutCubic, onComplete: done });
  else {
    if (target === 0) scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    done && setTimeout(done, reduce ? 0 : 700);
  }
};
