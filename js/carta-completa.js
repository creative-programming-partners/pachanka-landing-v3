/* Carta completa: el panel con las categorías arriba y la lista de platos debajo.
   Los platos salen de contenido/carta.js; aquí solo se arman la barra, la lista y los
   avisos de que la carta sigue (la flecha de abajo y el borde difuminado de la derecha).
   El subrayado que se desliza entre categorías lo enciende js/animaciones.js (Flip). */
import { $, $$, esc, money, reduce } from './utiles.js';
import { nameOf, descOf } from './idioma.js';
import { panelCartaAbierto, mostrarPanelCarta } from './paneles.js';

const tabsEl = $('#mpTabs'), bodyEl = $('#mpBody'), mpMore = $('#mpMore');
let currentCat = null;

/** id de la categoría que se está viendo, o null. */
export const categoriaActual = () => currentCat;

/** Dibuja la barra de categorías (se rehace al cambiar de idioma). */
export function pintarPestanas() {
  tabsEl.innerHTML = window.PK_MENU.map(c =>
    `<button class="mp-tab" type="button" role="tab" id="mpt-${c.id}" data-cat="${c.id}" aria-controls="mpBody" aria-selected="${c.id === currentCat}">${esc(nameOf(c))}</button>`).join('');
}

/** Dibuja los platos de la categoría que se está viendo. */
export function pintarCategoria() {
  const cat = window.PK_MENU.find(c => c.id === currentCat);
  if (!cat) return;
  let i = 0;
  bodyEl.innerHTML = cat.groups.map(g => {
    const title = g.es ? `<h3 class="mp-group">${esc(nameOf(g))}</h3>` : '';
    const items = g.items.map(it => {
      const n = nameOf(it), d = descOf(it);
      return `<li class="mp-item" style="--i:${Math.min(i++, 14)}"><div class="mp-row"><span class="mp-name">${esc(n)}</span><span class="mp-dots"></span><span class="mp-price">${money(it.p)}</span></div>${d ? `<p class="mp-desc">${esc(d)}</p>` : ''}</li>`;
    }).join('');
    return `${title}<ul class="mp-list">${items}</ul>`;
  }).join('');
  bodyEl.setAttribute('aria-labelledby', 'mpt-' + currentCat);
}

/* Cambia de categoría dentro del panel. */
function mostrarCategoria(id) {
  const changed = id !== currentCat;
  currentCat = id;
  $$('.mp-tab', tabsEl).forEach(b => b.setAttribute('aria-selected', b.dataset.cat === id));
  colocarTinta(changed && panelCartaAbierto());
  const btn = $(`#mpt-${id}`);
  if (btn) tabsEl.scrollTo({ left: Math.max(0, btn.offsetLeft - 24), behavior: reduce ? 'auto' : 'smooth' });
  if (!changed && bodyEl.children.length) return;
  pintarCategoria();
  bodyEl.scrollTop = 0;
  requestAnimationFrame(() => { syncMore(); syncTabsEnd(); });
  if (!reduce) { bodyEl.classList.add('enter'); void bodyEl.offsetWidth; bodyEl.classList.remove('enter'); }
}

/** Abre el panel en una categoría (o en la primera, si no se dice cuál). */
export function abrirCartaCompleta(catId) {
  if (catId) mostrarCategoria(catId);
  else if (!currentCat) mostrarCategoria(window.PK_MENU[0].id);
  mostrarPanelCarta(true);
}

/* ---------- Subrayado de la categoría activa ----------
   Con el plugin Flip se desliza de una pestaña a la otra. Sin GSAP (o con movimiento
   reducido) queda el subrayado de CSS de cada pestaña. */
let ink = null, flipOn = false;

/** Lo enciende js/animaciones.js cuando Flip está disponible. */
export function activarTinta() { flipOn = true; colocarTinta(false); }

export function colocarTinta(animate) {
  if (!flipOn || !currentCat) return;
  const btn = $(`#mpt-${currentCat}`);
  if (!btn) return;
  if (!ink) { ink = document.createElement('span'); ink.className = 'mp-ink'; ink.setAttribute('aria-hidden', 'true'); }
  tabsEl.classList.add('has-ink');
  if (animate && ink.isConnected && ink.parentNode !== btn) {
    const state = Flip.getState(ink);
    btn.appendChild(ink);
    Flip.from(state, { duration: .3, ease: window.CustomEase ? 'pk-out' : 'expo.out', scale: true });
  } else btn.appendChild(ink);
}

// Avisos de que la carta sigue: flecha abajo mientras quede lista, y el borde
// difuminado de las categorías mientras queden más a la derecha
const syncMore = () => {
  if (!mpMore) return;
  mpMore.classList.toggle('is-on', bodyEl.scrollHeight - bodyEl.scrollTop - bodyEl.clientHeight > 28);
};
const syncTabsEnd = () => tabsEl.classList.toggle('is-end', tabsEl.scrollLeft + tabsEl.clientWidth >= tabsEl.scrollWidth - 8);

export function iniciarCartaCompleta() {
  bodyEl.addEventListener('scroll', syncMore, { passive: true });
  tabsEl.addEventListener('scroll', syncTabsEnd, { passive: true });
  addEventListener('resize', () => { syncMore(); syncTabsEnd(); });

  tabsEl.addEventListener('click', e => { const b = e.target.closest('.mp-tab'); if (b) mostrarCategoria(b.dataset.cat); });
  tabsEl.addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const ids = window.PK_MENU.map(c => c.id), i = ids.indexOf(currentCat);
    const next = ids[(i + (e.key === 'ArrowRight' ? 1 : -1) + ids.length) % ids.length];
    mostrarCategoria(next); $(`#mpt-${next}`).focus();
  });
}
