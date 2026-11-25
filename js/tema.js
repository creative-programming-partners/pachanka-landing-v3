/* Tema claro u oscuro según la hora de Lima.
   El <head> ya puso el tema al cargar (antes de pintar, para que no haya un salto de
   color). Aquí se revisa cada minuto (ver js/main.js): a las 6 p.m. pasa a oscuro y a
   las 6 a.m. a claro, con un fundido corto. Con ?tema=claro o ?tema=oscuro en la
   dirección queda fijo (para mostrar uno a mano).
   Los colores del tema claro están en css/20-tema-claro.css. */
import { $ } from './utiles.js';
import { limaNow } from './hora-lima.js';

const fijado = /^(claro|oscuro)$/.test(new URLSearchParams(location.search).get('tema') || '');

export function revisarTema() {
  if (fijado) return;
  const h = Math.floor(limaNow().mins / 60);
  const t = h >= 6 && h < 18 ? 'light' : 'dark';
  const root = document.documentElement;
  if (root.dataset.theme === t) return;
  root.classList.add('theme-fade');
  root.dataset.theme = t;
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', t === 'light' ? '#f5f0e7' : '#110f0f');
  setTimeout(() => root.classList.remove('theme-fade'), 700);
}
