/* Los dos paneles que se sobreponen a la página: el menú lateral (el botón de las
   rayas) y el panel de la carta completa. Mientras uno está abierto, el fondo no se
   mueve y aparece la capa oscura.
   El panel de la carta lo llena js/carta-completa.js; aquí solo se abre y se cierra. */
import { $ } from './utiles.js';
import { lenis } from './scroll-suave.js';

const drawer = $('#drawer'), overlay = $('#overlay'), burger = $('#burger'), menuPanel = $('#menuPanel');
let lastFocus = null;

export const menuLateralAbierto = () => drawer.classList.contains('open');
export const panelCartaAbierto = () => menuPanel.classList.contains('open');
const panelAbierto = () => menuLateralAbierto() || panelCartaAbierto();
// El video grande también detiene el fondo; se mira el DOM para no depender de js/videos.js
const videoAbierto = () => { const v = document.getElementById('vbox'); return !!v && v.classList.contains('open'); };

/** true si hay algo sobrepuesto: menú, carta o video. */
export const algunoAbierto = () => panelAbierto() || videoAbierto();

/** Detiene o suelta el scroll del fondo según lo que haya abierto. */
export const sincronizarBloqueo = () => {
  if (lenis) algunoAbierto() ? lenis.stop() : lenis.start();
  overlay.classList.toggle('open', panelAbierto());
};

/** Abre o cierra el menú lateral. */
export function abrirMenuLateral(open) {
  drawer.classList.toggle('open', open);
  drawer.setAttribute('aria-hidden', !open);
  burger.setAttribute('aria-expanded', open);
  sincronizarBloqueo();
  if (open) $('.drawer-close').focus({ preventScroll: true });
}

/** Muestra u oculta el panel de la carta completa (el contenido ya debe estar puesto). */
export function mostrarPanelCarta(open) {
  if (open) lastFocus = document.activeElement;
  menuPanel.classList.toggle('open', open);
  menuPanel.setAttribute('aria-hidden', !open);
  sincronizarBloqueo();
  if (open) $('#menuClose').focus({ preventScroll: true });
  else if (lastFocus) lastFocus.focus({ preventScroll: true });
}

export function iniciarPaneles() {
  burger.addEventListener('click', () => abrirMenuLateral(true));
  $('#drawerClose').addEventListener('click', () => abrirMenuLateral(false));
  $('#menuClose').addEventListener('click', () => mostrarPanelCarta(false));
  overlay.addEventListener('click', () => { abrirMenuLateral(false); mostrarPanelCarta(false); });
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (panelCartaAbierto()) mostrarPanelCarta(false);
    else if (menuLateralAbierto()) abrirMenuLateral(false);
  });
}
