(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Escalonado automático: índice entre hermanos que se revelan ---------- */
  const parents = new Set($$('.rv').map(el => el.parentElement));
  parents.forEach(p => $$(':scope > .rv', p).forEach((el, i) => el.style.setProperty('--i', i)));
  $$('.drawer li').forEach((li, i) => li.style.setProperty('--i', i));

  /* ---------- Revelado con IntersectionObserver ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -8% 0px', threshold: .06 });
  $$('.rv').forEach(el => io.observe(el));

  // Paneles divididos: la cortina de la foto se retira cuando el panel entra
  const splitIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    splitIO.unobserve(e.target);
  }), { threshold: .18 });
  $$('.split').forEach(el => splitIO.observe(el));

  // Mapa: carga cuando el navegador está libre, no en medio del scroll
  const mapFrame = $('.map iframe');
  if (mapFrame) {
    const mio = new IntersectionObserver(es => {
      if (!es.some(e => e.isIntersecting)) return;
      mio.disconnect();
      const load = () => { mapFrame.src = mapFrame.dataset.src; };
      'requestIdleCallback' in window ? requestIdleCallback(load, { timeout: 900 }) : setTimeout(load, 250);
    }, { rootMargin: '600px 0px' });
    mio.observe(mapFrame);
  }

  /* ---------- Scroll suave (Lenis) ---------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: .11, wheelMultiplier: 1, smoothWheel: true });
    if (!(window.gsap && window.ScrollTrigger)) {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  /* ---------- Cabecera y botón volver arriba ---------- */
  const hdr = $('#hdr'), toTop = $('#toTop'), hero = $('.hero');
  let solid = null, topOn = null, heroH = hero.offsetHeight, vh = innerHeight;
  // Medidas guardadas: leer offsetHeight en cada cuadro de scroll obliga a recalcular estilos
  addEventListener('resize', () => { heroH = hero.offsetHeight; vh = innerHeight; }, { passive: true });
  function onScroll(y) {
    const s = y > heroH - 90;
    if (s !== solid) hdr.classList.toggle('is-solid', solid = s);
    const t = y > vh * .9;
    if (t !== topOn) toTop.classList.toggle('show', topOn = t);
  }
  if (lenis) lenis.on('scroll', e => onScroll(e.scroll));
  else addEventListener('scroll', () => onScroll(scrollY), { passive: true });

  const easeInOutCubic = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const goTo = (target, done) => {
    if (lenis) lenis.scrollTo(target, { offset: target === 0 ? 0 : -72, duration: 1.2, easing: easeInOutCubic, onComplete: done });
    else {
      if (target === 0) scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      done && setTimeout(done, reduce ? 0 : 700);
    }
  };
  toTop.addEventListener('click', () => goTo(0));

  /* ---------- Menú lateral y carta completa (paneles) ---------- */
  const drawer = $('#drawer'), overlay = $('#overlay'), burger = $('#burger'), menuPanel = $('#menuPanel');
  const panelOpen = () => drawer.classList.contains('open') || menuPanel.classList.contains('open');
  const videoOpen = () => { const v = document.getElementById('vbox'); return !!v && v.classList.contains('open'); };
  const anyOpen = () => panelOpen() || videoOpen();
  const lockScroll = () => { if (lenis) anyOpen() ? lenis.stop() : lenis.start(); overlay.classList.toggle('open', panelOpen()); };

  const setDrawer = open => {
    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', !open);
    burger.setAttribute('aria-expanded', open);
    lockScroll();
    if (open) $('.drawer-close').focus({ preventScroll: true });
  };
  burger.addEventListener('click', () => setDrawer(true));
  $('#drawerClose').addEventListener('click', () => setDrawer(false));

  let lastFocus = null;
  const setMenu = (open, catId) => {
    if (open) {
      lastFocus = document.activeElement;
      if (catId) showCat(catId); else if (!currentCat) showCat(PK_MENU[0].id);
    }
    menuPanel.classList.toggle('open', open);
    menuPanel.setAttribute('aria-hidden', !open);
    lockScroll();
    if (open) $('#menuClose').focus({ preventScroll: true });
    else if (lastFocus) lastFocus.focus({ preventScroll: true });
  };
  $('#menuClose').addEventListener('click', () => setMenu(false));
  overlay.addEventListener('click', () => { setDrawer(false); setMenu(false); });
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (menuPanel.classList.contains('open')) setMenu(false);
    else if (drawer.classList.contains('open')) setDrawer(false);
  });

  /* ---------- Enlaces internos ---------- */
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const wasOpen = drawer.classList.contains('open');
    // Abrir la carta completa
    if (a.hasAttribute('data-open-menu')) {
      e.preventDefault();
      if (wasOpen) setDrawer(false);
      setTimeout(() => setMenu(true, a.dataset.openMenu || null), wasOpen ? 220 : 0);
      return;
    }
    const id = a.getAttribute('href');
    const t = id === '#inicio' ? 0 : $(id);
    if (t === null) return;
    e.preventDefault();
    if (wasOpen) setDrawer(false);
    // "Reserva aquí" y "Organizar mi evento" llevan al formulario y dejan el cursor en el nombre
    const toForm = id === '#reservar';
    if (a.dataset.occasion) form.occasion.value = a.dataset.occasion;
    setTimeout(() => goTo(t, toForm ? () => form.guest.focus({ preventScroll: true }) : null), wasOpen ? 260 : 0);
  }));

  /* ---------- Reserva: vehículo propio ---------- */
  const park = $('#rsvParking'), parkNote = $('#rsvParkNote');
  if (park) park.addEventListener('change', () => { parkNote.hidden = !park.checked; });

  /* ---------- Hora de Lima ---------- */
  const DAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  function limaNow() {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit',
      weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date()).map(x => [x.type, x.value]));
    return { date: `${p.year}-${p.month}-${p.day}`, wd: DAYS[p.weekday], mins: (+p.hour % 24) * 60 + +p.minute };
  }
  // Horario confirmado en Google Maps e Instagram: lunes a sábado 12–23 h, domingo 12–18 h
  const hoursFor = wd => wd === 0 ? [12 * 60, 18 * 60] : [12 * 60, 23 * 60];
  const wdOf = dateStr => { const [y, m, d] = dateStr.split('-').map(Number); return new Date(y, m - 1, d).getDay(); };
  const addDays = (dateStr, n) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dt = new Date(y, m - 1, d + n);
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  };
  const fmtTime = mins => {
    const h = Math.floor(mins / 60), m = mins % 60, h12 = ((h + 11) % 12) + 1;
    return `${h12}:${String(m).padStart(2, '0')} ${h < 12 ? 'a.m.' : 'p.m.'}`;
  };
  const fmtHour = mins => { const h = Math.floor(mins / 60), h12 = ((h + 11) % 12) + 1; return `${h12} ${h < 12 ? 'a.m.' : 'p.m.'}`; };

  /* ---------- Idioma ---------- */
  let lang = 'es';
  try { if (localStorage.getItem('pk-lang') === 'en') lang = 'en'; } catch (e) {}
  const T = () => PK_I18N.JS[lang];

  /* ---------- Abierto ahora / Cerrado ---------- */
  function renderStatus() {
    const t = T(), now = limaNow(), [o, c] = hoursFor(now.wd);
    const open = now.mins >= o && now.mins < c;
    let text;
    if (open) text = c - now.mins <= 60 ? `${t.closingSoon} · ${t.closesAt} ${fmtHour(c)}` : `${t.openNow} · ${t.until} ${fmtHour(c)}`;
    else if (now.mins < o) text = `${t.closed} · ${t.opensToday} ${fmtHour(o)}`;
    else text = `${t.closed} · ${t.opensTomorrow} ${fmtHour(hoursFor((now.wd + 1) % 7)[0])}`;
    $$('.js-status').forEach(el => {
      el.classList.toggle('is-open', open);
      el.classList.toggle('is-closed', !open);
      $('.status-text', el).textContent = text;
    });
    $$('#hoursList .hrow').forEach(r => {
      const today = r.dataset.days && r.dataset.days.split(',').includes(String(now.wd));
      r.classList.toggle('is-today', !!today);
      if (today) $('dt', r).dataset.today = lang === 'en' ? 'Today' : 'Hoy';
    });
  }
  // Se actualiza al cambiar de minuto
  setTimeout(() => { renderStatus(); setInterval(renderStatus, 60000); }, (60 - new Date().getSeconds()) * 1000);

  /* ---------- Formulario de reserva → WhatsApp ---------- */
  const form = $('#rsvForm'), errBox = $('#rsvError'), okBox = $('#rsvOk');
  const slotsFor = dateStr => {
    if (!dateStr) return [];
    const [o, c] = hoursFor(wdOf(dateStr)), now = limaNow(), out = [];
    // Última reserva una hora antes del cierre; hoy, desde media hora después de la hora actual
    for (let t = o; t <= c - 60; t += 30) if (dateStr !== now.date || t >= now.mins + 30) out.push(t);
    return out;
  };
  function buildPeople() {
    const keep = form.people.value || '2';
    form.people.innerHTML = [...Array.from({ length: 10 }, (_, i) => String(i + 1)), '10+']
      .map(v => `<option value="${v}">${T().people(v)}</option>`).join('');
    form.people.value = keep;
  }
  function buildTimes() {
    const keep = form.time.value, slots = slotsFor(form.date.value);
    form.time.innerHTML = slots.length
      ? `<option value="" disabled>${T().pickTime}</option>` + slots.map(t => `<option value="${t}">${fmtTime(t)}</option>`).join('')
      : `<option value="" disabled>${T().noTimes}</option>`;
    form.time.value = slots.includes(+keep) && keep !== '' ? keep : '';
    if (!form.time.value) form.time.selectedIndex = 0;
  }
  function initDate() {
    const today = limaNow().date;
    form.date.min = today;
    form.date.max = addDays(today, 90);
    if (!form.date.value || form.date.value < today) form.date.value = slotsFor(today).length ? today : addDays(today, 1);
  }
  form.date.addEventListener('change', () => { buildTimes(); form.date.removeAttribute('aria-invalid'); });
  form.addEventListener('input', e => { e.target.removeAttribute('aria-invalid'); errBox.hidden = true; });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const t = T(), today = limaNow().date;
    const name = form.guest.value.trim(), date = form.date.value, time = form.time.value;
    let bad = null, msg = '';
    if (!name) { bad = form.guest; msg = t.errName; }
    else if (!date || date < today) { bad = form.date; msg = t.errDate; }
    else if (!time || !slotsFor(date).includes(+time)) { buildTimes(); bad = form.time; msg = t.errTime; }
    $$('[aria-invalid]', form).forEach(el => el.removeAttribute('aria-invalid'));
    if (bad) {
      bad.setAttribute('aria-invalid', 'true');
      errBox.textContent = msg; errBox.hidden = false; okBox.hidden = true;
      bad.focus();
      return;
    }
    const [y, m, d] = date.split('-').map(Number);
    const niceDate = new Date(y, m - 1, d, 12).toLocaleDateString(t.locale, { weekday: 'long', day: 'numeric', month: 'long' });
    const lines = [
      t.msgHello,
      `• ${t.msgName}: ${name}`,
      `• ${t.msgPeople}: ${form.people.options[form.people.selectedIndex].text}`,
      `• ${t.msgDate}: ${niceDate}`,
      `• ${t.msgTime}: ${fmtTime(+time)}`,
      `• ${t.msgOcc}: ${form.occasion.options[form.occasion.selectedIndex].text}`
    ];
    if (form.parking && form.parking.checked) lines.push(`• ${t.msgCar}`);
    const notes = form.notes.value.trim();
    if (notes) lines.push(`• ${t.msgNotes}: ${notes}`);
    lines.push('', t.msgThanks);
    const url = 'https://wa.me/51971969101?text=' + encodeURIComponent(lines.join('\n'));
    errBox.hidden = true; okBox.hidden = false;
    // Con 'noopener' window.open siempre devuelve null, así que se corta el vínculo a mano
    const w = window.open(url, '_blank');
    if (w) w.opener = null;
    else location.href = url; // ventana bloqueada: abrir WhatsApp en la misma pestaña
  });

  /* ---------- Carta completa ---------- */
  const tabsEl = $('#mpTabs'), bodyEl = $('#mpBody');
  let currentCat = null;
  const money = p => 'S/ ' + p.toFixed(2);
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function renderTabs() {
    tabsEl.innerHTML = PK_MENU.map(c =>
      `<button class="mp-tab" type="button" role="tab" id="mpt-${c.id}" data-cat="${c.id}" aria-controls="mpBody" aria-selected="${c.id === currentCat}">${esc(c[lang])}</button>`).join('');
  }
  function renderCat() {
    const cat = PK_MENU.find(c => c.id === currentCat);
    if (!cat) return;
    let i = 0;
    bodyEl.innerHTML = cat.groups.map(g => {
      const title = g[lang] ? `<h3 class="mp-group">${esc(g[lang])}</h3>` : '';
      const items = g.items.map(it => {
        const n = it[lang] || it.es, d = (lang === 'en' ? it.den : it.des) || '';
        return `<li class="mp-item" style="--i:${Math.min(i++, 14)}"><div class="mp-row"><span class="mp-name">${esc(n)}</span><span class="mp-dots"></span><span class="mp-price">${money(it.p)}</span></div>${d ? `<p class="mp-desc">${esc(d)}</p>` : ''}</li>`;
      }).join('');
      return `${title}<ul class="mp-list">${items}</ul>`;
    }).join('');
    bodyEl.setAttribute('aria-labelledby', 'mpt-' + currentCat);
  }
  function showCat(id) {
    const changed = id !== currentCat;
    currentCat = id;
    $$('.mp-tab', tabsEl).forEach(b => b.setAttribute('aria-selected', b.dataset.cat === id));
    placeInk(changed && menuPanel.classList.contains('open'));
    const btn = $(`#mpt-${id}`);
    if (btn) tabsEl.scrollTo({ left: Math.max(0, btn.offsetLeft - 24), behavior: reduce ? 'auto' : 'smooth' });
    if (!changed && bodyEl.children.length) return;
    renderCat();
    bodyEl.scrollTop = 0;
    requestAnimationFrame(() => { syncMore(); syncTabsEnd(); });
    if (!reduce) { bodyEl.classList.add('enter'); void bodyEl.offsetWidth; bodyEl.classList.remove('enter'); }
  }
  // Subrayado de la categoría activa: con el plugin Flip se desliza de una pestaña a la otra.
  // Sin GSAP (o con movimiento reducido) queda el subrayado de CSS de cada pestaña.
  let ink = null, flipOn = false;
  function placeInk(animate) {
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
  const mpMore = $('#mpMore');
  const syncMore = () => {
    if (!mpMore) return;
    mpMore.classList.toggle('is-on', bodyEl.scrollHeight - bodyEl.scrollTop - bodyEl.clientHeight > 28);
  };
  const syncTabsEnd = () => tabsEl.classList.toggle('is-end', tabsEl.scrollLeft + tabsEl.clientWidth >= tabsEl.scrollWidth - 8);
  bodyEl.addEventListener('scroll', syncMore, { passive: true });
  tabsEl.addEventListener('scroll', syncTabsEnd, { passive: true });
  addEventListener('resize', () => { syncMore(); syncTabsEnd(); });

  tabsEl.addEventListener('click', e => { const b = e.target.closest('.mp-tab'); if (b) showCat(b.dataset.cat); });
  tabsEl.addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const ids = PK_MENU.map(c => c.id), i = ids.indexOf(currentCat);
    const next = ids[(i + (e.key === 'ArrowRight' ? 1 : -1) + ids.length) % ids.length];
    showCat(next); $(`#mpt-${next}`).focus();
  });


  /* ---------- Reseñas de Google ---------- */
  // Van pasando solas cada ocho segundos; se detienen al pasar el mouse o al usar las flechas.
  const quotes = $$('#quotes .quote'), qDots = $('#qDots');
  if (quotes.length && qDots) {
    let qi = 0, qTimer = null, revOn = false;
    qDots.innerHTML = quotes.map((_, i) =>
      `<button type="button" role="tab" aria-selected="${i === 0}" aria-label="${i + 1}"></button>`).join('');
    const dots = $$('button', qDots);
    const showQ = i => {
      qi = (i + quotes.length) % quotes.length;
      quotes.forEach((q, k) => q.classList.toggle('is-on', k === qi));
      dots.forEach((d, k) => d.setAttribute('aria-selected', k === qi));
    };
    const play = () => { if (!reduce && revOn && !qTimer) qTimer = setInterval(() => showQ(qi + 1), 8000); };
    const stop = () => { clearInterval(qTimer); qTimer = null; };
    const step = i => { stop(); showQ(i); play(); };
    $('#qPrev').addEventListener('click', () => step(qi - 1));
    $('#qNext').addEventListener('click', () => step(qi + 1));
    qDots.addEventListener('click', e => { const i = dots.indexOf(e.target); if (i >= 0) step(i); });
    const side = $('.rev-side');
    side.addEventListener('mouseenter', stop);
    side.addEventListener('mouseleave', play);
    side.addEventListener('focusin', stop);
    // Fuera de pantalla no hay nada que pasar
    new IntersectionObserver(es => { revOn = es.some(e => e.isIntersecting); revOn ? play() : stop(); }).observe(side);
  }

  /* ---------- Portada fuera de pantalla ---------- */
  // Detiene sus animaciones en bucle (brillo de velas, punto de "abierto") cuando no se ve
  new IntersectionObserver(es => hero.classList.toggle('is-off', !es.some(e => e.isIntersecting))).observe(hero);

  /* ---------- Portada en carrusel ---------- */
  // Cambia de foto cada siete segundos; las flechas reinician el tiempo. Se detiene fuera de pantalla.
  const slides = $$('.hs'), heroNum = $('#heroNum');
  if (slides.length > 1) {
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

  /* ---------- Navegación: subraya la sección a la vista ---------- */
  const navLinks = $$('#hdrNav a');
  if (navLinks.length) {
    const byId = new Map(navLinks.map(a => [a.getAttribute('href').slice(1), a]));
    const navIO = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const a = byId.get(e.target.id);
      if (a) navLinks.forEach(l => l.classList.toggle('is-current', l === a));
    }), { rootMargin: '-45% 0px -50% 0px' });
    byId.forEach((_, id) => { const s = document.getElementById(id); if (s) navIO.observe(s); });
  }

  /* ---------- Carrusel de videos ---------- */
  // Cada video es un plato de la carta: el nombre, la descripción y el precio salen de PK_MENU.
  let reelGsap = false;   // con GSAP la cinta la mueve JavaScript (ver al final) y no la animación CSS
  const REEL = [
    { f: 'lomo-saltado-1',    dish: 'lomo-saltado' },
    { f: 'carapulcra-1',      dish: 'carapulcra-sopa-seca' },
    { f: 'langostinos-1',     dish: 'langostinos-al-panko' },
    { f: 'tacu-mar-tierra-1', dish: 'tacu-tacu-mar-y-tierra' },
    { f: 'fruto-di-mare-1',   dish: 'fetuccini-fruto-di-mari' },
    { f: 'lomo-saltado-2',    dish: 'lomo-saltado' }
  ];
  const DISHES = new Map();
  PK_MENU.forEach(c => c.groups.forEach(g => g.items.forEach(d => DISHES.set(d.id, { d, cat: c }))));
  const dishName = id => { const e = DISHES.get(id); return e ? (e.d[lang] || e.d.es) : ''; };

  const track = $('#reelTrack'), vbox = $('#vbox'), vboxMedia = $('#vboxMedia'), vboxVideo = $('#vboxVideo');
  // La tarjeta avisa que el video se abre en grande
  const EXPAND = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5"/></svg>';

  function renderReel() {
    if (!track) return;
    const card = (v, i, copy) => {
      const n = esc(dishName(v.dish));
      return `<button class="vcard" type="button" data-i="${i}"${copy ? ' tabindex="-1" aria-hidden="true"' : ''} aria-label="${esc(T().vSee)}: ${n}">
        <span class="vcard-media">
          <video muted loop playsinline preload="none" poster="assets/video/${v.f}.jpg" data-src="assets/video/${v.f}.mp4" aria-hidden="true"></video>
          <span class="vcard-open">${EXPAND}<span>${esc(T().vOpen)}</span></span>
        </span>
        <span class="vcard-name">${n}</span>
      </button>`;
    };
    // La cinta lleva la lista tres veces: al correr un tercio vuelve al mismo punto sin corte
    const set = (copia) => REEL.map((v, i) => card(v, i, copia)).join('');
    track.innerHTML = set(false) + set(true) + set(true);
    if (!reduce && !reelGsap) track.classList.add('is-running');
    vio.disconnect();
    $$('video', track).forEach(v => vio.observe(v));
    playVisible();
  }

  // Los videos de la cinta solo se descargan y corren cuando la sección está a la vista
  // Con el video grande abierto, la cinta queda quieta: detrás hay un desenfoque que se recalcularía en cada cuadro
  // La cinta lleva 18 videos (la lista tres veces) y en pantalla caben 5 o 6: cada uno se descarga
  // y corre solo mientras su tarjeta se ve. Así el navegador no decodifica 18 videos a la vez.
  let reelOn = false;
  const shown = new WeakSet();
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
  if (track) {
    new IntersectionObserver(es => {
      reelOn = es.some(e => e.isIntersecting);
      playVisible();
    }, { rootMargin: '160px 0px' }).observe($('#videos'));
  }

  /* ---------- Video expandido ---------- */
  let vIdx = -1, vLast = null;
  const money2 = p => 'S/ ' + p.toFixed(2);

  function fillVideo(i) {
    vIdx = (i + REEL.length) % REEL.length;
    const v = REEL[vIdx], e = DISHES.get(v.dish);
    vboxVideo.poster = 'assets/video/' + v.f + '.jpg';
    vboxVideo.src = 'assets/video/' + v.f + '.mp4';
    vboxVideo.muted = true;                       // así puede arrancar solo; el volumen queda en los controles
    const p = vboxVideo.play(); if (p) p.catch(() => {});
    $('#vboxCat').textContent = e ? e.cat[lang] : '';
    $('#vboxName').textContent = e ? (e.d[lang] || e.d.es) : '';
    $('#vboxDesc').textContent = e ? ((lang === 'en' ? e.d.den : e.d.des) || '') : '';
    $('#vboxPrice').textContent = e ? money2(e.d.p) : '';
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
    lockScroll();
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
    lockScroll();
    if (vLast && document.contains(vLast)) vLast.focus({ preventScroll: true });
    vIdx = -1;
  }

  function stepVideo(n) {
    vboxMedia.style.transition = 'none';
    vboxMedia.style.opacity = '0';
    fillVideo(vIdx + n);
    requestAnimationFrame(() => { vboxMedia.style.transition = ''; vboxMedia.style.opacity = ''; });
  }

  if (track) {
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

  /* ---------- Cambio de idioma ---------- */
  // Las animaciones que tocan textos traducibles (títulos partidos en líneas, pinceladas) se enganchan aquí:
  // 'before' deshace lo suyo antes de cambiar los textos y 'after' lo vuelve a armar con el idioma nuevo
  const langHooks = [];
  function setLang(next, initial) {
    lang = next;
    try { localStorage.setItem('pk-lang', lang); } catch (e) {}
    langHooks.forEach(h => h.before());
    PK_I18N.apply(lang);
    langHooks.forEach(h => h.after());
    renderStatus();
    buildPeople();
    buildTimes();
    renderTabs();
    placeInk(false);
    if (currentCat) renderCat();
    renderReel();
    if (!initial && window.ScrollTrigger) ScrollTrigger.refresh();
  }
  $$('.js-lang').forEach(b => b.addEventListener('click', () => setLang(lang === 'es' ? 'en' : 'es')));
  initDate();
  setLang(lang, true);

  /* ---------- Pantalla de carga ---------- */
  // Se retira cuando fuentes, fotos de portada y página ya cargaron: el trabajo pesado queda detrás de la carga
  const loader = $('#loader');
  const reveal = () => document.body.classList.add('ready');
  scrollTo(0, 0);
  if (reduce || !loader) { loader && loader.remove(); reveal(); }
  else {
    let started = false;
    lenis && lenis.stop();
    const start = () => {
      if (started) return; started = true;
      loader.classList.add('done');
      lenis && lenis.start();
      setTimeout(reveal, 180);
      setTimeout(() => loader.remove(), 1000);
    };
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const pageLoaded = new Promise(r => document.readyState === 'complete' ? r() : addEventListener('load', r, { once: true }));
    const heroImages = $$('.hero img').map(im => im.decode ? im.decode().catch(() => {}) : null);
    const fontsReady = document.fonts ? document.fonts.ready : null;
    Promise.race([Promise.all([fontsReady, pageLoaded, ...heroImages]), wait(2800)])
      .then(() => requestAnimationFrame(() => setTimeout(start, Math.max(0, 1500 - performance.now()))));
    loader.addEventListener('click', start, { once: true });
  }

  /* ---------- Un día en Pachanka ---------- */
  const day = $('#un-dia');
  const moments = $$('.m', day), frames = $$('.fr', day), stepBtns = $$('.day-step', day), dots = $$('.day-dot', day);
  const STEPS = moments.length;
  // La barra recorre la línea en el primer 88% del scroll fijo; el 12% final se queda en la última hora
  const HOLD = .12;
  let step = 0, dayST = null;
  // Arranca como lista; GSAP la convierte en sección fija solo en escritorio
  day.classList.add('day--static');
  function setStep(n) {
    if (n === step) return;
    step = n;
    day.style.setProperty('--s', n);
    day.dataset.step = n;
    moments.forEach((m, i) => m.classList.toggle('is-active', i === n));
    frames.forEach((f, i) => { f.classList.toggle('is-active', i === n); f.classList.toggle('is-past', i < n); });
    stepBtns.forEach((b, i) => { b.classList.toggle('is-active', i === n); b.classList.toggle('is-reached', i <= n); });
    dots.forEach((d, i) => d.classList.toggle('is-reached', i <= n));
  }
  // Progreso del scroll fijo → posición de la barra (0 a 1) → hora alcanzada
  const barProgress = p => Math.min(1, p / (1 - HOLD));
  const stepAt = b => b >= 1 ? STEPS - 1 : Math.floor(b * (STEPS - 1) + 1e-6);
  stepBtns.forEach((b, i) => b.addEventListener('click', () => {
    if (!dayST) return;
    // Justo después del punto de esa hora en la línea
    const p = i === STEPS - 1 ? 1 - HOLD / 2 : (i / (STEPS - 1)) * (1 - HOLD) + .01;
    const y = dayST.start + (dayST.end - dayST.start) * p;
    lenis ? lenis.scrollTo(y, { duration: 1, easing: easeInOutCubic }) : scrollTo({ top: y, behavior: 'smooth' });
  }));

  /* ---------- Animaciones ligadas al scroll (GSAP) ---------- */
  if (window.gsap && window.ScrollTrigger && !reduce) {
    // Cada plugin llega en su propio archivo: si uno no carga, su efecto se omite y el resto sigue
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

    // Las animaciones de abajo reemplazan el revelado CSS (.rv) de sus elementos
    const takeOver = el => { el.classList.remove('rv'); io.unobserve(el); };

    // La portada queda quieta al hacer scroll: sin parallax de la foto ni texto que se aleja

    /* --- Un día en Pachanka: en escritorio la sección se fija y cada tramo de scroll es una hora --- */
    // Va antes que todo lo de abajo: su espacio fijo empuja la página 3 pantallas, y ScrollTrigger
    // calcula en el orden de creación (antes, las fotos de los paneles quedaban 2700 px adelantadas)
    gsap.matchMedia().add('(min-width: 900px)', () => {
      day.classList.remove('day--static');
      const bar = $('#dayBar');
      dayST = ScrollTrigger.create({
        trigger: day, start: 'top top', end: () => '+=' + innerHeight * 3,
        pin: true, anticipatePin: 1, invalidateOnRefresh: true,
        onToggle: st => day.classList.toggle('is-pinned', st.isActive),
        onUpdate: s => {
          const b = barProgress(s.progress);
          bar.style.transform = `scaleX(${b.toFixed(4)})`;
          setStep(stepAt(b));
        }
      });
      ScrollTrigger.sort(); // si vuelve a crearse al agrandar la ventana, recupera su lugar en el orden
      return () => { dayST = null; day.classList.remove('is-pinned'); day.classList.add('day--static'); };
    });

    /* --- Cabecera: se esconde al bajar y vuelve al subir; arriba, una línea marca el avance --- */
    const hdrAnim = gsap.to(hdr, { yPercent: -102, duration: .3, ease: E.out, paused: true });
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: self => {
        const hide = self.direction > 0 && self.scroll() > heroH * .7 && !anyOpen();
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
    if (track) {
      reelGsap = true;
      track.classList.remove('is-running');
      const setX = gsap.quickSetter(track, 'xPercent');
      const THIRD = 100 / 3, SPEED = THIRD / 40;   // un tercio de la cinta cada 40 s, como antes
      const sp = { base: 1, boost: 0 };
      const baseTo = gsap.quickTo(sp, 'base', { duration: .8, ease: 'power2.out' });
      const boostTo = gsap.quickTo(sp, 'boost', { duration: .5, ease: 'power3.out' });
      const calm = gsap.delayedCall(.18, () => boostTo(0)).pause();
      let pos = 0;
      gsap.ticker.add((t, dt) => {
        if (!reelOn || track.classList.contains('is-frozen')) return;
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
      const fmt = v => v.toFixed(1);   // punto decimal en los dos idiomas, igual que los precios (S/ 39.00)
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
    if (hasFlip) { flipOn = true; placeInk(false); }

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
    langHooks.push({
      before: () => heads.forEach(h => {
        if (h.done) return;
        if (h.st) h.st.kill();
        if (h.tl) h.tl.kill();
        if (h.split) { h.split.revert(); h.split = null; h.title.classList.remove('is-split'); }
      }),
      // Al traducir se reemplaza el contenido: las pinceladas ya pintadas se vuelven a poner completas
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
})();
