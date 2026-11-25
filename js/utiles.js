/* Ayudas que usan todos los módulos: buscar en el DOM, escapar texto para el HTML
   y escribir precios. No depende de nada ni toca la página. */

/** true si en el sistema se pidió menos movimiento. */
export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

export const $ = (s, c = document) => c.querySelector(s);
export const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/** Texto seguro para meter dentro del HTML (nombres y descripciones de la carta). */
export const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** 39 → "S/ 39.00" */
export const money = p => 'S/ ' + p.toFixed(2);
