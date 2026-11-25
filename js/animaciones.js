/* Animaciones ligadas al scroll (GSAP + ScrollTrigger, por CDN).
   Es la única parte que toca varias secciones a la vez, porque todas comparten el mismo
   reloj de scroll. Si GSAP no carga, o si se pidió menos movimiento, no se ejecuta nada
   de aquí: la página queda con el revelado del CSS y funciona igual.
   Cada plugin llega en su propio archivo: si uno no carga, su efecto se omite y el resto
   sigue.
   Estilos relacionados: css/19-animaciones-scroll.css. */
import { $, $$, reduce } from './utiles.js';
import { lenis } from './scroll-suave.js';
import { takeOver } from './revelado.js';
import { hdr, altoPortada } from './cabecera.js';
import { algunoAbierto } from './paneles.js';
import { idioma, registrarGancho } from './idioma.js';
import { activarTinta } from './carta-completa.js';
import { laCinta, cintaALaVista, usarGsapEnCinta } from './videos.js';
import { day, fijarPaso, fijarAnclaje, progresoBarra, pasoEn } from './un-dia.js';

export function iniciarAnimaciones() {
  if (!(window.gsap && window.ScrollTrigger) || reduce) return;

  const hasSplit = !!window.SplitText, hasDraw = !!window.DrawSVGPlugin, hasFlip = !!window.Flip, hasEase = !!window.CustomEase;
  gsap.registerPlugin(...[ScrollTrigger, window.SplitText, window.DrawSVGPlugin, window.Flip, window.CustomEase].filter(Boolean));
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Una sola curva, la misma del CSS (--ease-out). La pincelada tiene la suya: arranca lenta,
  // corre y frena al final como un trazo de pincel
  if (hasEase) {
    CustomEase.create('pk-out', '.22,1,.36,1');
    CustomEase.create('pk-paint', 'M0,0 C.3,0 .18,1 1,1');
  }
  const E = hasEase ? { out: 'pk-out', paint: 'pk-paint' } : { out: 'expo.out', paint: 'power2.inOut' };

  // La portada queda quieta al hacer scroll: sin parallax de la foto ni texto que se aleja

  /* --- Un día en Pachanka: en escritorio la sección se fija y cada tramo de scroll es una hora --- */
  // Va antes que todo lo de abajo: su espacio fijo empuja la página 3 pantallas, y ScrollTrigger
  // calcula en el orden de creación (antes, las fotos de los paneles quedaban 2700 px adelantadas)
  gsap.matchMedia().add('(min-width: 900px)', () => {
    day.classList.remove('day--static');
    const bar = $('#dayBar');
    const st = ScrollTrigger.create({
      trigger: day, start: 'top top', end: () => '+=' + innerHeight * 3,
      pin: true, anticipatePin: 1, invalidateOnRefresh: true,
      onToggle: s => day.classList.toggle('is-pinned', s.isActive),
      onUpdate: s => {
        const b = progresoBarra(s.progress);
        bar.style.transform = `scaleX(${b.toFixed(4)})`;
        fijarPaso(pasoEn(b));
      }
    });
    fijarAnclaje(st);
    ScrollTrigger.sort(); // si vuelve a crearse al agrandar la ventana, recupera su lugar en el orden
    return () => { fijarAnclaje(null); day.classList.remove('is-pinned'); day.classList.add('day--static'); };
  });

  /* --- Cabecera: se esconde al bajar y vuelve al subir; arriba, una línea marca el avance --- */
  const hdrAnim = gsap.to(hdr, { yPercent: -102, duration: .3, ease: E.out, paused: true });
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: self => {
      const hide = self.direction > 0 && self.scroll() > altoPortada() * .7 && !algunoAbierto();
      hide ? hdrAnim.play() : hdrAnim.reverse();
    }
  });
  hdr.addEventListener('focusin', () => hdrAnim.reverse()); // con el teclado, la cabecera vuelve a la vista
  const prog = document.createElement('div');
  prog.className = 'scroll-prog';
  prog.setAttribute('aria-hidden', 'true');
  document.body.appendChild(prog);
  gsap.to(prog, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .3 } });

  // Las fotos de los paneles quedan quietas: solo la cortina CSS que se retira al entrar

  /* --- Cinta de videos: corre sola, se acelera con el scroll (y va hacia atrás si subes) --- */
  // Frena suave al pasar el mouse; se detiene del todo fuera de pantalla o con el video grande abierto
  const track = laCinta();
  if (track) {
    usarGsapEnCinta();
    const setX = gsap.quickSetter(track, 'xPercent');
    const THIRD = 100 / 3, SPEED = THIRD / 54;   // un tercio de la cinta cada 54 s, el mismo ritmo que con seis videos
    const sp = { base: 1, boost: 0 };
    const baseTo = gsap.quickTo(sp, 'base', { duration: .8, ease: 'power2.out' });
    const boostTo = gsap.quickTo(sp, 'boost', { duration: .5, ease: 'power3.out' });
    const calm = gsap.delayedCall(.18, () => boostTo(0)).pause();
    let pos = 0;
    gsap.ticker.add((t, dt) => {
      if (!cintaALaVista() || track.classList.contains('is-frozen')) return;
      const v = sp.base + sp.boost;
      if (Math.abs(v) < .001) return;
      pos = gsap.utils.wrap(-THIRD, 0, pos - SPEED * v * Math.min(dt, 64) / 1000);
      setX(pos);
    });
    ScrollTrigger.create({
      trigger: '#videos', start: 'top bottom', end: 'bottom top',
      onUpdate: self => { boostTo(gsap.utils.clamp(-5, 7, self.getVelocity() / 260)); calm.restart(true); }
    });
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const wrap = $('#reelWrap');
      wrap.addEventListener('mouseenter', () => baseTo(0));
      wrap.addEventListener('mouseleave', () => baseTo(1));
    }
  }

  /* --- Reseñas: la nota y el número de reseñas cuentan desde cero al aparecer --- */
  const rNum = $('.rating-num'), rCount = $('.rating-count b');
  if (rNum) {
    const fmt = v => idioma() === 'fr' ? v.toFixed(1).replace('.', ',') : v.toFixed(1);   // en francés el decimal va con coma
    const goal = { v: parseFloat(rNum.textContent.replace(',', '.')) || 0, n: rCount ? parseInt(rCount.textContent, 10) || 0 : 0 };
    const o = { v: 0, n: 0 };
    const paintNum = () => { rNum.textContent = fmt(o.v); if (rCount) rCount.textContent = Math.round(o.n); };
    paintNum();
    gsap.to(o, { v: goal.v, n: goal.n, duration: 1.8, ease: 'power3.out', onUpdate: paintNum,
      scrollTrigger: { trigger: '.rating', start: 'top 85%', once: true } });
  }

  /* --- Eventos: las tarjetas entran en cascada, con un leve giro que se endereza --- */
  const cards = $$('.ev-card');
  if (cards.length) {
    cards.forEach(takeOver);
    gsap.set(cards, { opacity: 0, y: 24 });
    ScrollTrigger.batch(cards, {
      start: 'top 90%', once: true,
      onEnter: batch => {
        // Su transición CSS de hover (transform) frenaría cada cuadro de la entrada: se apaga mientras dura
        batch.forEach(c => { c.style.transition = 'none'; });
        gsap.to(batch, { opacity: 1, y: 0, duration: .6, ease: E.out, stagger: .06, overwrite: true,
          clearProps: 'opacity,transform', onComplete: () => batch.forEach(c => { c.style.transition = ''; }) });
      }
    });
  }

  /* --- Pie: las columnas suben en cascada --- */
  gsap.from('.ftr-grid > *', { y: 12, opacity: 0, duration: .5, ease: E.out, stagger: .05,
    scrollTrigger: { trigger: '.ftr', start: 'top 92%', once: true } });

  /* --- Carta completa: subrayado que se desliza entre categorías (Flip) --- */
  if (hasFlip) activarTinta();

  /* --- Encabezados: la etiqueta se pinta como una pincelada (DrawSVG) y el título sube por líneas (SplitText) --- */
  // La pincelada usa la misma forma de la etiqueta como recorte, y tres trazos gruesos la van llenando
  const BRUSH = 'M6 12 C50 5 96 10 150 6 S258 3 293 9 L284 19 L297 27 L287 37 L295 49 C236 55 182 49 120 53 S34 57 8 51 L15 41 L3 31 L13 22 Z';
  let bpId = 0;
  const paint = (brush, done) => {
    if (!hasDraw) return [];
    const id = 'bpc' + (++bpId);
    brush.insertAdjacentHTML('afterbegin',
      `<svg class="bp" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true" focusable="false"><defs><clipPath id="${id}"><path d="${BRUSH}"/></clipPath></defs>` +
      `<g clip-path="url(#${id})"><path d="M-6 13H306"/><path d="M-6 30H306"/><path d="M-6 47H306"/></g></svg>`);
    brush.classList.add('has-paint');
    const strokes = $$('.bp g path', brush);
    gsap.set(strokes, { drawSVG: done ? '100%' : '0%' });
    if (done) brush.classList.add('is-painted');
    return strokes;
  };
  const heads = [];
  const buildHead = h => {
    const { brush, title } = h;
    const tl = gsap.timeline({ paused: true, onComplete: () => {
      h.done = true;
      if (h.split) { h.split.revert(); h.split = null; title.classList.remove('is-split'); }   // queda el texto limpio, como lo escribió el HTML
    } });
    if (brush) {
      takeOver(brush);
      const strokes = paint(brush, false);
      gsap.set(brush, { rotation: -4 });
      tl.to(brush, { rotation: -1.5, duration: .6, ease: E.out }, 0);
      if (strokes.length) tl.to(strokes, { drawSVG: '100%', duration: .62, ease: E.paint, stagger: { each: .07, from: 'random' } }, 0);
      tl.add(() => brush.classList.add('is-painted'), strokes.length ? .26 : 0);
    }
    if (title && hasSplit) {
      h.split = SplitText.create(title, { type: 'lines', mask: 'lines', linesClass: 'tl' });
      title.classList.add('is-split');
      takeOver(title);
      tl.from(h.split.lines, { yPercent: 110, duration: .8, stagger: .08, ease: E.out }, brush ? .2 : 0);
    }
    h.tl = tl;
    h.st = ScrollTrigger.create({ trigger: brush || title, start: 'top 86%', once: true, onEnter: () => tl.play() });
  };
  // Al traducir se reemplaza el contenido de los títulos: lo que no se haya animado todavía
  // se desarma antes y se vuelve a armar después, con el idioma nuevo
  registrarGancho({
    before: () => heads.forEach(h => {
      if (h.done) return;
      if (h.st) h.st.kill();
      if (h.tl) h.tl.kill();
      if (h.split) { h.split.revert(); h.split = null; h.title.classList.remove('is-split'); }
    }),
    // Las pinceladas ya pintadas se vuelven a poner completas
    after: () => heads.forEach(h => { if (!h.done) buildHead(h); else if (h.brush) paint(h.brush, true); })
  });
  // Las líneas se miden con la tipografía final: se arma cuando cargan las fuentes
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    ScrollTrigger.refresh();
    $$('main .title').forEach(title => {
      const prev = title.previousElementSibling;
      heads.push({ title, brush: prev && prev.classList.contains('brush') ? prev : null });
    });
    $$('main .brush').forEach(brush => { if (!heads.some(h => h.brush === brush)) heads.push({ brush, title: null }); });
    // En el orden de la página, de arriba abajo
    heads.sort((a, b) => ((a.brush || a.title).compareDocumentPosition(b.brush || b.title) & 4) ? -1 : 1);
    heads.forEach(buildHead);
  });
}
