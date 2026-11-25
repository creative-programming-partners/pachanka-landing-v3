/* Portada: el carrusel de fotos cambia cada siete segundos, las flechas reinician el
   tiempo y se puede deslizar en el celular.
   Fuera de pantalla se detiene todo, incluidas las animaciones en bucle del CSS
   (brillo de las velas, punto de "abierto"): por eso la clase is-off. */
import { $, $$, reduce } from './utiles.js';

export function iniciarPortada() {
  const hero = $('.hero');

  new IntersectionObserver(es => hero.classList.toggle('is-off', !es.some(e => e.isIntersecting))).observe(hero);

  const slides = $$('.hs'), heroNum = $('#heroNum');
  if (slides.length <= 1) return;

  let si = 0, sTimer = null, heroOn = true;
  const showS = i => {
    si = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('is-on', k === si));
    if (heroNum) heroNum.textContent = String(si + 1);
  };
  const sStop = () => { clearInterval(sTimer); sTimer = null; };
  const sPlay = () => { sStop(); if (!reduce && heroOn) sTimer = setInterval(() => showS(si + 1), 7000); };
  $('#heroPrev').addEventListener('click', () => { showS(si - 1); sPlay(); });
  $('#heroNext').addEventListener('click', () => { showS(si + 1); sPlay(); });
  new IntersectionObserver(es => { heroOn = es.some(e => e.isIntersecting); heroOn ? sPlay() : sStop(); }).observe(hero);

  let sx = null;
  hero.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', e => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 60) { showS(si + (dx < 0 ? 1 : -1)); sPlay(); }
  }, { passive: true });
}
