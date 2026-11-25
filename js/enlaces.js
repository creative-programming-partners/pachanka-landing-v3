/* Enlaces internos de la página (los que empiezan con #): cierran el menú lateral si
   está abierto, llevan suave hasta la sección y, en el caso de la carta, abren su panel
   en vez de desplazarse.
   "Reserva aquí" y "Organizar mi evento" llevan al formulario y dejan el cursor en el
   nombre; los de eventos además dejan escrita la ocasión. */
import { $, $$ } from './utiles.js';
import { irA } from './scroll-suave.js';
import { abrirMenuLateral, menuLateralAbierto } from './paneles.js';
import { abrirCartaCompleta } from './carta-completa.js';
import { fijarOcasion, enfocarNombre } from './reservas.js';

export function iniciarEnlaces() {
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const wasOpen = menuLateralAbierto();
    // Abrir la carta completa
    if (a.hasAttribute('data-open-menu')) {
      e.preventDefault();
      if (wasOpen) abrirMenuLateral(false);
      setTimeout(() => abrirCartaCompleta(a.dataset.openMenu || null), wasOpen ? 220 : 0);
      return;
    }
    const id = a.getAttribute('href');
    const t = id === '#inicio' ? 0 : $(id);
    if (t === null) return;
    e.preventDefault();
    if (wasOpen) abrirMenuLateral(false);
    const toForm = id === '#reservar';
    if (a.dataset.occasion) fijarOcasion(a.dataset.occasion);
    setTimeout(() => irA(t, toForm ? enfocarNombre : null), wasOpen ? 260 : 0);
  }));
}
