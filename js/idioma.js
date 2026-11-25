/* Idioma activo de la página: lo recuerda, lo cambia con el selector ES · EN · FR y
   dice cómo se llama cada plato en ese idioma.
   Depende de js/textos.js (el motor que pasa la página de idioma).

   Ganchos: las animaciones que tocan textos traducibles (títulos partidos en líneas,
   pinceladas) se enganchan aquí con registrarGancho(): 'before' deshace lo suyo antes
   de cambiar los textos y 'after' lo vuelve a armar con el idioma nuevo. */
import { $$ } from './utiles.js';
import { aplicarTextos, mensajes } from './textos.js';

const LANGS = ['es', 'en', 'fr'];
let lang = 'es';
// El idioma se comparte con la carta digital (mismo dominio)
try { const s = localStorage.getItem('pk-lang'); if (LANGS.includes(s)) lang = s; } catch (e) {}

/** 'es', 'en' o 'fr' */
export const idioma = () => lang;
/** Mensajes que arma el JavaScript, en el idioma activo. */
export const T = () => mensajes(lang);
/** Nombre de un plato, una categoría o un grupo de PK_MENU (si falta, el español). */
export const nameOf = d => d[lang] || d.es;
/** Descripción de un plato (si falta, la española). */
export const descOf = d => (lang === 'en' ? d.den : lang === 'fr' ? d.dfr : d.des) || d.des || '';
/** La palabra "hoy" en el horario de la sección Ubícanos. */
export const TODAY = { es: 'Hoy', en: 'Today', fr: 'Aujourd’hui' };

const ganchos = [];
/** Registra una animación que hay que deshacer y rehacer al cambiar de idioma. */
export const registrarGancho = g => ganchos.push(g);

let alCambiar = () => {};

function setLang(next, initial) {
  lang = next;
  try { localStorage.setItem('pk-lang', lang); } catch (e) {}
  ganchos.forEach(g => g.before());
  aplicarTextos(lang);
  ganchos.forEach(g => g.after());
  $$('.lang [data-l]').forEach(b => b.setAttribute('aria-pressed', b.dataset.l === lang));
  alCambiar(initial);
  if (!initial && window.ScrollTrigger) ScrollTrigger.refresh();
}

/**
 * Pone la página en el idioma guardado y conecta los dos selectores
 * (el de la cabecera y el del menú lateral).
 * @param repintar  se llama después de cada cambio, para rehacer lo que armó el JS.
 */
export function iniciarIdioma(repintar) {
  alCambiar = repintar;
  $$('.lang [data-l]').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.l !== lang) setLang(b.dataset.l, false);
  }));
  setLang(lang, true);
}
