/* Carrusel de videos y video expandido.
   Cada video es un plato de la carta: la lista está en contenido/restaurante.js y el
   nombre, la descripción y el precio salen de contenido/carta.js.
   La cinta lleva la lista tres veces: al correr un tercio vuelve al mismo punto sin
   corte. Con GSAP la mueve JavaScript (js/animaciones.js); si no, la mueve el CSS.
   En pantalla caben cinco o seis tarjetas: cada video se descarga y corre solo mientras
   la suya se ve, para no decodificar veinticuatro a la vez. */
import { $, $$, esc, money, reduce } from './utiles.js';
import { T, nameOf, descOf } from './idioma.js';
import { DISHES, nombrePlato } from './catalogo.js';
import { sincronizarBloqueo } from './paneles.js';

// Las tarjetas de la cinta son chicas: Cloudflare entrega su foto de portada a 480 px
// de ancho y en el formato más liviano que acepte el navegador. El video grande usa
// la foto original. (En este computador lo resuelve servidor-local.py.)
const POSTER_CHICO = 'cdn-cgi/image/width=480,quality=78,format=auto/';

const REEL = window.PK_RESTAURANTE.videos.map(v => ({ f: v.archivo, dish: v.plato }));
const track = $('#reelTrack'), vbox = $('#vbox'), vboxMedia = $('#vboxMedia'), vboxVideo = $('#vboxVideo');
// La tarjeta avisa que el video se abre en grande
const EXPAND = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5"/></svg>';

let reelGsap = false, reelOn = false;
const shown = new WeakSet();

/** La cinta, o null si esta página no la tiene. */
export const laCinta = () => track;
/** true mientras la sección de videos está a la vista. */
export const cintaALaVista = () => reelOn;
/** Lo llama js/animaciones.js: de aquí en adelante la cinta la mueve GSAP. */
export function usarGsapEnCinta() { reelGsap = true; track.classList.remove('is-running'); }

/* ---------- La cinta ---------- */
const syncVideo = v => {
  if (reelOn && (!vbox || vbox.hidden) && shown.has(v)) {
    if (!v.src) v.src = v.dataset.src;
    const p = v.play(); if (p) p.catch(() => {});
  } else if (!v.paused) v.pause();
};
const vio = new IntersectionObserver(es => es.forEach(e => {
  e.isIntersecting ? shown.add(e.target) : shown.delete(e.target);
  syncVideo(e.target);
}), { rootMargin: '80px 0px' });

function playVisible() {
  if (track) track.classList.toggle('is-paused', !reelOn);
  $$('#reelTrack video').forEach(syncVideo);
}

/** Dibuja la cinta (se rehace al cambiar de idioma: los nombres van en la tarjeta). */
export function pintarCinta() {
  if (!track) return;
  const card = (v, i, copy) => {
    const n = esc(nombrePlato(v.dish));
    return `<button class="vcard" type="button" data-i="${i}"${copy ? ' tabindex="-1" aria-hidden="true"' : ''} aria-label="${esc(T().vSee)}: ${n}">
        <span class="vcard-media">
          <video muted loop playsinline preload="none" poster="${POSTER_CHICO}assets/video/${v.f}.jpg?v=2" data-src="assets/video/${v.f}.mp4" aria-hidden="true"></video>
          <span class="vcard-open">${EXPAND}<span>${esc(T().vOpen)}</span></span>
        </span>
        <span class="vcard-name">${n}</span>
      </button>`;
  };
  const set = copia => REEL.map((v, i) => card(v, i, copia)).join('');
  track.innerHTML = set(false) + set(true) + set(true);
  if (!reduce && !reelGsap) track.classList.add('is-running');
  vio.disconnect();
  $$('video', track).forEach(v => vio.observe(v));
  playVisible();
}

/* ---------- Video expandido ---------- */
let vIdx = -1, vLast = null;

function fillVideo(i) {
  vIdx = (i + REEL.length) % REEL.length;
  const v = REEL[vIdx], e = DISHES.get(v.dish);
  vboxVideo.poster = 'assets/video/' + v.f + '.jpg?v=2';
  vboxVideo.src = 'assets/video/' + v.f + '.mp4';
  vboxVideo.muted = true;                       // así puede arrancar solo; el volumen queda en los controles
  const p = vboxVideo.play(); if (p) p.catch(() => {});
  $('#vboxCat').textContent = e ? nameOf(e.cat) : '';
  $('#vboxName').textContent = e ? nameOf(e.d) : '';
  $('#vboxDesc').textContent = e ? descOf(e.d) : '';
  $('#vboxPrice').textContent = e ? money(e.d.p) : '';
  $('#vboxCount').textContent = (vIdx + 1) + ' ' + T().vOf + ' ' + REEL.length;
}

// La tarjeta crece desde donde estaba hasta el centro (y al cerrar vuelve a su sitio)
function growFrom(rect, back) {
  if (reduce || !rect) return;
  const m = vboxMedia.getBoundingClientRect();
  if (!m.width) return;
  const k = rect.width / m.width;
  const dx = (rect.left + rect.width / 2) - (m.left + m.width / 2);
  const dy = (rect.top + rect.height / 2) - (m.top + m.height / 2);
  const from = 'translate3d(' + dx + 'px,' + dy + 'px,0) scale(' + k + ')';
  if (back) { vboxMedia.style.transform = from; return; }
  vboxMedia.style.transition = 'none';
  vboxMedia.style.transform = from;
  requestAnimationFrame(() => { vboxMedia.style.transition = ''; vboxMedia.style.transform = ''; });
}

const cardRect = el => {
  const m = el && el.querySelector ? el.querySelector('.vcard-media') : null;
  return m ? m.getBoundingClientRect() : null;
};

function openVideo(i, card) {
  vLast = card || null;
  track.classList.add('is-frozen');             // la cinta se congela: la tarjeta no se mueve bajo la animación
  vbox.hidden = false;
  playVisible();
  void vbox.offsetWidth;
  vbox.classList.add('open');
  fillVideo(i);
  growFrom(cardRect(card), false);
  sincronizarBloqueo();
  $('#vboxClose').focus({ preventScroll: true });
}

function closeVideo() {
  if (vbox.hidden) return;
  growFrom(cardRect(vLast), true);
  vbox.classList.remove('open');
  const done = () => {
    vbox.hidden = true;
    playVisible();
    vboxVideo.pause(); vboxVideo.removeAttribute('src'); vboxVideo.load();
    vboxMedia.style.transition = ''; vboxMedia.style.transform = '';
    track.classList.remove('is-frozen');
  };
  reduce ? done() : setTimeout(done, 460);
  sincronizarBloqueo();
  if (vLast && document.contains(vLast)) vLast.focus({ preventScroll: true });
  vIdx = -1;
}

function stepVideo(n) {
  vboxMedia.style.transition = 'none';
  vboxMedia.style.opacity = '0';
  fillVideo(vIdx + n);
  requestAnimationFrame(() => { vboxMedia.style.transition = ''; vboxMedia.style.opacity = ''; });
}

export function iniciarVideos() {
  if (!track) return;

  // Los videos de la cinta solo se descargan y corren cuando la sección está a la vista.
  // Con el video grande abierto la cinta queda quieta: detrás hay un desenfoque que se
  // recalcularía en cada cuadro
  new IntersectionObserver(es => {
    reelOn = es.some(e => e.isIntersecting);
    playVisible();
  }, { rootMargin: '160px 0px' }).observe($('#videos'));

  track.addEventListener('click', e => {
    const b = e.target.closest('.vcard');
    if (b) openVideo(+b.dataset.i, b);
  });
  $('#vboxClose').addEventListener('click', closeVideo);
  $('#vboxBg').addEventListener('click', closeVideo);     // tocar fuera del video lo cierra
  $('#vboxPrev').addEventListener('click', () => stepVideo(-1));
  $('#vboxNext').addEventListener('click', () => stepVideo(1));
  addEventListener('keydown', e => {
    if (vbox.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); closeVideo(); }
    else if (e.key === 'ArrowRight') stepVideo(1);
    else if (e.key === 'ArrowLeft') stepVideo(-1);
  });
  let vx = null;
  vbox.addEventListener('touchstart', e => { vx = e.touches[0].clientX; }, { passive: true });
  vbox.addEventListener('touchend', e => {
    if (vx === null) return;
    const dx = e.changedTouches[0].clientX - vx; vx = null;
    if (Math.abs(dx) > 60) stepVideo(dx < 0 ? 1 : -1);
  }, { passive: true });
}
