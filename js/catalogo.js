/* Índice de los platos de contenido/carta.js, para que el resto de la página pueda
   pedir un plato por su id. Esa misma llave une la carta, los paneles de la portada
   (data-plato="lomo-saltado" en index.html) y los videos.
   Solo lee datos; no define ninguno. */
import { $$, money } from './utiles.js';
import { nameOf } from './idioma.js';

/** id de plato → { d: el plato, cat: su categoría } */
export const DISHES = new Map();
window.PK_MENU.forEach(c => c.groups.forEach(g => g.items.forEach(d => DISHES.set(d.id, { d, cat: c }))));

/** Nombre de un plato en el idioma activo. */
export const nombrePlato = id => { const e = DISHES.get(id); return e ? nameOf(e.d) : ''; };

/** Los precios de "Nuestros clásicos", "Del mar" y "Criollo fusión" salen de la carta:
    así un precio se cambia en un solo lugar (contenido/carta.js). */
export function pintarPrecios() {
  $$('[data-plato]').forEach(el => { const e = DISHES.get(el.dataset.plato); if (e) el.textContent = money(e.d.p); });
}
