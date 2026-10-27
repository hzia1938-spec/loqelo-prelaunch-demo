/* Loqelo pre-launch site: language, "Describe it" demo, categories, platform tour, video,
   countdown, waitlist forms, consent-gated GA4. No frameworks, no build step. */
(function () {
  'use strict';
  var D = document, W = window;
  var CFG = Object.assign({ launchDate: '2027-02-01T00:00:00+01:00', ga4Id: '', formEndpoint: '', showDemoNote: true,
    languages: ['en', 'pl', 'de'], defaultLanguage: 'en', debug: false }, W.LOQELO_CONFIG || {});
  var I18N = W.LOQELO_I18N, DATA = W.LOQELO_DATA;
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return W.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { W.localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var reduced = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- location + language ---------------- */
  var TZ_COUNTRY = { 'Europe/Warsaw': 'PL', 'Europe/Berlin': 'DE', 'Europe/Busingen': 'DE', 'Europe/Vienna': 'AT', 'Europe/Zurich': 'CH',
    'Europe/Vaduz': 'LI', 'Europe/London': 'GB', 'Europe/Dublin': 'IE', 'Europe/Amsterdam': 'NL', 'Europe/Brussels': 'BE',
    'Europe/Luxembourg': 'LU', 'Europe/Paris': 'FR', 'Europe/Madrid': 'ES', 'Europe/Lisbon': 'PT', 'Europe/Rome': 'IT',
    'Europe/Prague': 'CZ', 'Europe/Bratislava': 'SK', 'Europe/Budapest': 'HU', 'Europe/Vilnius': 'LT', 'Europe/Riga': 'LV',
    'Europe/Tallinn': 'EE', 'Europe/Copenhagen': 'DK', 'Europe/Stockholm': 'SE', 'Europe/Oslo': 'NO', 'Europe/Helsinki': 'FI',
    'Europe/Kyiv': 'UA', 'Europe/Kiev': 'UA', 'Europe/Bucharest': 'RO', 'Europe/Sofia': 'BG', 'Europe/Athens': 'GR',
    'Europe/Zagreb': 'HR', 'Europe/Ljubljana': 'SI', 'Europe/Belgrade': 'RS', 'Europe/Istanbul': 'TR', 'Asia/Karachi': 'PK',
    'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN', 'Asia/Dubai': 'AE', 'America/New_York': 'US', 'America/Chicago': 'US',
    'America/Denver': 'US', 'America/Los_Angeles': 'US', 'America/Toronto': 'CA', 'Australia/Sydney': 'AU' };
  var COUNTRY_LANG = { PL: 'pl', DE: 'de', AT: 'de', CH: 'de', LI: 'de' };
  var CODES = ('AD AE AF AG AI AL AM AO AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BW BY BZ CA CC CD CF ' +
    'CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI ' +
    'GL GM GN GP GQ GR GT GU GW GY HK HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB ' +
    'LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR ' +
    'NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX ' +
    'SY SZ TC TD TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG US UY UZ VA VC VE VG VI VN VU WF WS XK YE YT ZA ZM ZW').split(' ');

  function detectCountry() {
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { /* old browser */ }
    if (TZ_COUNTRY[tz]) return { code: TZ_COUNTRY[tz], from: 'location' };
    var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < langs.length; i++) {
      var m = /^[a-z]{2,3}-([A-Z]{2})$/i.exec(langs[i] || '');
      if (m) return { code: m[1].toUpperCase(), from: 'browser' };
    }
    return { code: '', from: '' };
  }
  var GEO = detectCountry();

  var lang = CFG.defaultLanguage, langSource = 'default';
  function detectLang() {
    var q = new URLSearchParams(W.location.search).get('lang');
    if (q && I18N[q]) { langSource = 'url'; return q; }
    var saved = store.get('loqelo_lang');
    if (saved && I18N[saved]) { langSource = 'saved'; return saved; }
    if (GEO.from === 'location' && COUNTRY_LANG[GEO.code]) { langSource = 'location'; return COUNTRY_LANG[GEO.code]; }
    var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
    for (var i = 0; i < prefs.length; i++) {
      var b = String(prefs[i]).toLowerCase().split('-')[0];
      if (I18N[b]) { langSource = 'browser'; return b; }
    }
    return CFG.defaultLanguage;
  }

  function t(k, vars) {
    var s = (I18N[lang] && I18N[lang][k] != null) ? I18N[lang][k] : (I18N.en[k] != null ? I18N.en[k] : '');
    if (vars) s = s.replace(/\{(\w+)\}/g, function (_, v) { return vars[v] != null ? vars[v] : ''; });
    return s;
  }
  function countryName(code) {
    if (!code) return '';
    try { return new Intl.DisplayNames([lang], { type: 'region' }).of(code) || code; } catch (e) { return code; }
  }

  function applyLang(l, silent) {
    lang = l;
    D.documentElement.lang = l;
    $$('[data-i18n]').forEach(function (el) { var v = t(el.getAttribute('data-i18n')); if (v) el.textContent = v; });
    $$('[data-i18n-html]').forEach(function (el) { var v = t(el.getAttribute('data-i18n-html')); if (v) el.innerHTML = v; });
    $$('[data-i18n-ph]').forEach(function (el) { el.setAttribute('data-ph', t(el.getAttribute('data-i18n-ph'))); if (!el.matches('#ask-input') || askUser) el.placeholder = el.getAttribute('data-ph'); });
    $$('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    $$('[data-i18n-alt]').forEach(function (el) { el.alt = t(el.getAttribute('data-i18n-alt')); });
    D.title = t('meta.title');
    var md = $('meta[name="description"]'); if (md) md.setAttribute('content', t('meta.desc'));
    var cur = $('[data-lang-current]'); if (cur) cur.textContent = l.toUpperCase();
    $$('[data-set-lang]').forEach(function (b) {
      var on = b.getAttribute('data-set-lang') === l;
      b.setAttribute('aria-pressed', on); if (b.getAttribute('role') === 'option') b.setAttribute('aria-selected', on);
    });
    renderCats(); fillCountries(); updateRoleTexts(); refreshFound(); restartDemo(); updateCountryChip(); updateDone();
    if (!silent) {
      store.set('loqelo_lang', l);
      try { var u = new URL(W.location.href); u.searchParams.set('lang', l); W.history.replaceState(null, '', u); } catch (e) { /* file:// */ }
      track('language_change', { language: l });
    }
  }

  /* ---------------- analytics (GA4, only after consent) ---------------- */
  var consent = store.get('loqelo_consent');
  function loadGA() {
    if (!CFG.ga4Id || W.__loqeloGA) return;
    W.__loqeloGA = true;
    W.dataLayer = W.dataLayer || [];
    W.gtag = function () { W.dataLayer.push(arguments); };
    W.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    W.gtag('js', new Date());
    W.gtag('config', CFG.ga4Id, { anonymize_ip: true });
    var s = D.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CFG.ga4Id);
    D.head.appendChild(s);
  }
  /* Events never carry the email address or any form text. */
  function track(name, params) {
    params = params || {};
    if (!params.language) params.language = lang;
    if (consent === 'granted' && W.gtag) W.gtag('event', name, params);
    if (CFG.debug) console.info('[analytics]', name, params);
  }
  function showCookie(force) {
    var box = $('[data-cookie]');
    if (!box) return;
    if (force || !consent) setTimeout(function () { box.hidden = false; }, force ? 0 : 1400);
  }
  D.addEventListener('click', function (e) {
    var b = e.target.closest('[data-consent]');
    if (b) {
      consent = b.getAttribute('data-consent');
      store.set('loqelo_consent', consent);
      $('[data-cookie]').hidden = true;
      if (consent === 'granted') { loadGA(); track('consent_granted'); }
    }
    if (e.target.closest('[data-cookie-settings]')) showCookie(true);
  });

  /* ---------------- nav ---------------- */
  var nav = $('#nav'), burger = $('.nav__burger'), mmenu = $('#mobile-menu');
  function closeMenu() { if (!mmenu) return; mmenu.hidden = true; burger.setAttribute('aria-expanded', 'false'); }
  if (burger) burger.addEventListener('click', function () {
    var open = mmenu.hidden; mmenu.hidden = !open; burger.setAttribute('aria-expanded', String(open));
  });
  if (mmenu) mmenu.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
  var langMenu = $('[data-lang-menu]');
  if (langMenu) {
    var lb = $('.lang__btn', langMenu), ll = $('.lang__list', langMenu);
    lb.addEventListener('click', function (e) { e.stopPropagation(); ll.hidden = !ll.hidden; lb.setAttribute('aria-expanded', String(!ll.hidden)); });
    D.addEventListener('click', function () { ll.hidden = true; lb.setAttribute('aria-expanded', 'false'); });
  }
  D.addEventListener('click', function (e) {
    var b = e.target.closest('[data-set-lang]');
    if (b) { applyLang(b.getAttribute('data-set-lang')); closeMenu(); hideToast(); }
  });
  W.addEventListener('scroll', function () { nav.classList.toggle('is-scrolled', W.scrollY > 12); }, { passive: true });

  /* language toast after automatic detection */
  function showToast() {
    var box = $('[data-toast]');
    if (!box || lang === 'en' || (langSource !== 'location' && langSource !== 'browser')) return;
    $('[data-toast-text]', box).textContent = t('toast.' + langSource);
    $('[data-toast-switch]', box).textContent = 'English';
    setTimeout(function () { box.hidden = false; }, 900);
    setTimeout(hideToast, 9000);
  }
  function hideToast() { var box = $('[data-toast]'); if (box) box.hidden = true; }
  D.addEventListener('click', function (e) {
    if (e.target.closest('[data-toast-switch]')) applyLang('en');
    if (e.target.closest('[data-toast-switch]') || e.target.closest('[data-toast-close]')) hideToast();
  });

  /* ---------------- "What do you need? Describe it." ---------------- */
  var ask = $('[data-describe]'), ta = $('#ask-input'), demoEl = $('[data-demo-text]');
  var askUser = false, demoTimer = null, demoIdx = 0, foundIds = [], foundKey = '', askStarted = false;

  function recognise(text) {
    var hits = [];
    Object.keys(DATA.services).forEach(function (id) {
      var i = text.search(DATA.services[id].re);
      if (i > -1) hits.push({ id: id, i: i });
    });
    var ids = hits.sort(function (a, b) { return a.i - b.i; }).map(function (h) { return h.id; });
    if (ids.indexOf('officeclean') > -1) ids = ids.filter(function (x) { return x !== 'office' && x !== 'cleaning'; });
    if (ids.indexOf('lawn') > -1 || ids.indexOf('hedge') > -1) ids = ids.filter(function (x) { return x !== 'garden'; });
    if (ids.indexOf('roof') > -1) ids = ids.filter(function (x) { return x !== 'renovation' || /renov|remont|sanier|umbau/i.test(text); });
    return ids.slice(0, 6);
  }
  function setFound(ids) {
    foundIds = ids;
    var key = ids.join(',') + '|' + lang;
    if (key === foundKey) return;
    var prev = foundKey.split('|')[0].split(',');
    foundKey = key;
    $('[data-found-list]').innerHTML = ids.map(function (id) {
      var s = DATA.services[id];
      return '<li' + (prev.indexOf(id) > -1 ? ' style="animation:none"' : '') + '><span class="svc__ico c-' + s.c + '"><svg class="i"><use href="assets/icons.svg#i-' + s.icon + '"/></svg></span>' + esc(s.label[lang] || s.label.en) + '</li>';
    }).join('');
    var n = ids.length, label = $('[data-found-label]'), p = $('.ask__count');
    if (!n) { label.textContent = t('hero.found.zero'); p.classList.add('is-empty'); return; }
    p.classList.remove('is-empty');
    var cat = 'other';
    try { cat = new Intl.PluralRules(lang).select(n); } catch (e) { /* ignore */ }
    label.textContent = (t('hero.found.' + cat) || t('hero.found.other')).replace('{n}', n);
  }
  function refreshFound() { foundKey = ''; setFound(askUser ? recognise(ta.value) : foundIds); }

  function renderDemo(segs, n) {
    var out = '', left = n, done = [];
    for (var k = 0; k < segs.length && left > 0; k++) {
      var txt = segs[k][0], id = segs[k][1], part = txt.slice(0, left);
      left -= txt.length;
      if (id && part.length === txt.length) { out += '<mark class="hl hl--' + (DATA.hl[id] || 'mint') + '">' + esc(part) + '</mark>'; done.push(id); }
      else out += esc(part);
    }
    demoEl.innerHTML = out + '<span class="caret"></span>';
    setFound(done);
  }
  function runDemo() {
    var demos = DATA.demos[lang] || DATA.demos.en, segs = demos[demoIdx % demos.length];
    var full = segs.map(function (s) { return s[0]; }).join(''), n = 0;
    if (reduced) { renderDemo(segs, full.length); return; }
    renderDemo(segs, 0);
    (function step() {
      if (askUser) return;
      n += 1; renderDemo(segs, n);
      if (n < full.length) demoTimer = setTimeout(step, 30 + Math.random() * 45);
      else demoTimer = setTimeout(function () { if (!askUser) { demoIdx += 1; runDemo(); } }, 3600);
    })();
  }
  function restartDemo() { if (askUser) return; clearTimeout(demoTimer); demoIdx = 0; ta.placeholder = ''; runDemo(); }
  function userMode(on) {
    askUser = on; ask.classList.toggle('is-user', on); clearTimeout(demoTimer);
    if (on) { ta.placeholder = ta.getAttribute('data-ph') || ''; setFound(recognise(ta.value)); }
    else { ta.placeholder = ''; restartDemo(); }
  }
  if (ta) {
    ta.addEventListener('focus', function () { userMode(true); });
    ta.addEventListener('input', function () {
      setFound(recognise(ta.value));
      if (!askStarted) { askStarted = true; track('describe_start'); }
    });
    ta.addEventListener('blur', function () { if (!ta.value.trim()) setTimeout(function () { if (D.activeElement !== ta && !ta.value.trim()) userMode(false); }, 2500); });
    ta.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('[data-cta="hero-describe"]').click(); } });
  }
  /* optional voice input (Chrome, Edge, Safari) */
  var SR = W.SpeechRecognition || W.webkitSpeechRecognition, speakBtn = $('[data-speak]');
  if (SR && speakBtn) {
    speakBtn.hidden = false;
    var rec = null;
    speakBtn.addEventListener('click', function () {
      if (rec) { rec.stop(); return; }
      rec = new SR(); rec.lang = { en: 'en-GB', pl: 'pl-PL', de: 'de-DE' }[lang]; rec.interimResults = true;
      speakBtn.classList.add('is-on'); $('span', speakBtn).textContent = t('hero.listening');
      userMode(true);
      rec.onresult = function (ev) {
        var s = ''; for (var i = 0; i < ev.results.length; i++) s += ev.results[i][0].transcript;
        ta.value = s; setFound(recognise(s));
      };
      rec.onend = rec.onerror = function () { rec = null; speakBtn.classList.remove('is-on'); $('span', speakBtn).textContent = t('hero.speak'); };
      try { rec.start(); track('describe_voice'); } catch (e) { rec = null; }
    });
  }
  function updateCountryChip() { var el = $('[data-country-name]'); if (el) el.textContent = countryName(GEO.code) || t('hero.yourCountry'); }

  /* ---------------- categories ---------------- */
  var catsShown = false;
  function renderCats() {
    var box = $('[data-cats]');
    if (!box) return;
    var openEl = $('.cat.is-open', box), open = openEl ? openEl.getAttribute('data-id') : '';
    box.innerHTML = DATA.categories.map(function (c) {
      var isOpen = c.id === open;
      return '<article class="cat reveal' + (catsShown ? ' in' : '') + (isOpen ? ' is-open' : '') + '" data-id="' + c.id + '">' +
        '<div class="cat__img"><img src="assets/img/' + c.img + '" width="720" height="520" alt="' + esc(c.name[lang] || c.name.en) + '" loading="lazy"></div>' +
        '<button class="cat__row" type="button" aria-expanded="' + isOpen + '" aria-controls="sub-' + c.id + '">' +
        '<span class="cat__ico"><svg class="i"><use href="assets/icons.svg#i-' + c.icon + '"/></svg></span>' +
        '<span class="cat__name">' + esc(c.name[lang] || c.name.en) + '</span>' +
        '<span class="cat__chev"><svg class="i"><use href="assets/icons.svg#i-chevDown"/></svg></span></button>' +
        '<div class="cat__subs" id="sub-' + c.id + '"><div><ul>' +
        (c.subs[lang] || c.subs.en).map(function (s) { return '<li><svg class="i"><use href="assets/icons.svg#i-' + c.icon + '"/></svg>' + esc(s) + '</li>'; }).join('') +
        '</ul><a class="cat__more" href="#waitlist" data-role-link="customer" data-cta="category-' + c.id + '">' + esc(t('cat.more')) +
        '<svg class="i"><use href="assets/icons.svg#i-arrowRight"/></svg></a></div></div></article>';
    }).join('');
    if (!catsShown) $$('.reveal', box).forEach(function (el, i) { el.style.setProperty('--d', (i % 4) * 0.08 + 's'); observe(el); });
  }
  D.addEventListener('click', function (e) {
    var hit = e.target.closest('.cat__row, .cat__img');
    if (!hit) return;
    var card = hit.closest('.cat'), willOpen = !card.classList.contains('is-open');
    $$('.cat.is-open').forEach(function (c) { c.classList.remove('is-open'); $('.cat__row', c).setAttribute('aria-expanded', 'false'); });
    if (willOpen) { card.classList.add('is-open'); $('.cat__row', card).setAttribute('aria-expanded', 'true'); track('category_open', { category: card.getAttribute('data-id') }); }
  });

  /* ---------------- platform tour ---------------- */
  var tour = $('[data-tour]'), tabIdx = 0, tourTimer = null, tourUser = false, tourVisible = false;
  function selectTab(i) {
    tabIdx = i;
    $$('.tab', tour).forEach(function (b, k) { b.setAttribute('aria-selected', String(k === i)); });
    $$('.browser__view img', tour).forEach(function (im, k) { im.classList.toggle('is-on', k === i); });
    var ph = DATA.tour[i] ? DATA.tour[i].phone : 0;
    $$('.phone__screen img', tour).forEach(function (im, k) { im.classList.toggle('is-on', k === ph); });
    $('[data-tour-url]', tour).textContent = DATA.tour[i] ? DATA.tour[i].url : 'loqelo.com';
    if (tour.classList.contains('is-auto')) { tour.classList.remove('is-auto'); void tour.offsetWidth; tour.classList.add('is-auto'); }
  }
  function autoTour() {
    clearInterval(tourTimer);
    if (tourUser || !tourVisible || reduced) { tour.classList.remove('is-auto'); return; }
    tour.classList.add('is-auto');
    tourTimer = setInterval(function () { selectTab((tabIdx + 1) % 5); }, 7000);
  }
  if (tour) {
    $$('.tab', tour).forEach(function (b) {
      b.addEventListener('click', function () { tourUser = true; autoTour(); selectTab(+b.getAttribute('data-tab')); track('platform_tab', { tab: +b.getAttribute('data-tab') + 1 }); });
    });
    if ('IntersectionObserver' in W) new IntersectionObserver(function (en) { tourVisible = en[0].isIntersecting; autoTour(); }, { threshold: 0.35 }).observe(tour);
  }

  /* ---------------- video ---------------- */
  var player = $('[data-player]'), video = $('[data-video]'), marks = {};
  function startVideo() {
    if (player.classList.contains('is-playing')) return;
    player.classList.add('is-playing'); video.controls = true;
    var p = video.play(); if (p && p.catch) p.catch(function () { /* autoplay blocked: controls are visible */ });
    track('video_start');
  }
  if (player) {
    $('[data-play]', player).addEventListener('click', startVideo);
    $$('[data-seek]').forEach(function (b) {
      b.addEventListener('click', function () {
        var sec = +b.getAttribute('data-seek');
        startVideo();
        if (video.readyState >= 1) video.currentTime = sec;
        else video.addEventListener('loadedmetadata', function () { video.currentTime = sec; }, { once: true });
        track('video_chapter', { second: sec });
      });
    });
    video.addEventListener('timeupdate', function () {
      var r = video.currentTime / (video.duration || 1);
      [0.5, 0.95].forEach(function (m) { if (r >= m && !marks[m]) { marks[m] = true; track(m < 0.9 ? 'video_progress_50' : 'video_complete'); } });
    });
  }

  /* ---------------- countdown ---------------- */
  var target = new Date(CFG.launchDate).getTime();
  function tick() {
    var diff = Math.max(0, target - Date.now());
    var d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
    var pad = function (x) { return (x < 10 ? '0' : '') + x; };
    var set = function (k, v) { var el = $('[data-cd="' + k + '"]'); if (el && el.textContent !== v) el.textContent = v; };
    set('d', String(d)); set('h', pad(h)); set('m', pad(m)); set('s', pad(s));
  }

  /* ---------------- waitlist ---------------- */
  var form = $('[data-form]'), done = $('[data-done]'), role = 'customer', shownAt = Date.now(), formStarted = false, lastSignup = null;
  function updateRoleTexts() {
    if (!form) return;
    var p = role === 'customer' ? 'c' : 'p';
    $('[data-role-text="title"]').textContent = t('f.' + p + '.title');
    $('[data-role-text="sub"]').textContent = t('f.' + p + '.sub');
    $('[data-role-text="country"]').textContent = t('f.' + p + '.country');
    $('[data-role-text="submit"]').textContent = t('f.' + p + '.submit');
  }
  function setRole(r, viaLink) {
    role = r;
    $$('.seg [data-role]').forEach(function (b) { b.setAttribute('aria-selected', String(b.getAttribute('data-role') === r)); });
    updateRoleTexts();
    if (!done.hidden && viaLink) showForm();
  }
  $$('.seg [data-role]').forEach(function (b) { b.addEventListener('click', function () { setRole(b.getAttribute('data-role')); track('waitlist_tab', { role: role }); }); });
  D.addEventListener('click', function (e) {
    var a = e.target.closest('[data-role-link]');
    if (a) { setRole(a.getAttribute('data-role-link'), true); track('waitlist_cta_click', { location: a.getAttribute('data-cta') || 'link', role: role }); }
    var pv = e.target.closest('[data-privacy]');
    if (pv) { e.preventDefault(); var dlg = $('[data-privacy-dialog]'); if (dlg && dlg.showModal) dlg.showModal(); }
  });
  function fillCountries() {
    var sel = $('[data-country]');
    if (!sel) return;
    var cur = sel.value || GEO.code, collator;
    try { collator = new Intl.Collator(lang); } catch (e) { collator = { compare: function (a, b) { return a < b ? -1 : 1; } }; }
    var list = CODES.map(function (c) { return { c: c, n: countryName(c) }; }).sort(function (a, b) { return collator.compare(a.n, b.n); });
    sel.innerHTML = '<option value="">' + esc(t('f.choose')) + '</option>' + list.map(function (x) {
      return '<option value="' + x.c + '"' + (x.c === cur ? ' selected' : '') + '>' + esc(x.n) + '</option>';
    }).join('');
  }
  function fieldErr(name, msg) {
    var el = $('[data-err="' + name + '"]'); if (el) el.textContent = msg || '';
    var f = el && el.closest('.field'); if (f) f.classList.toggle('is-bad', !!msg);
  }
  function showForm() { done.hidden = true; form.hidden = false; }
  function updateDone() {
    if (!lastSignup) return;
    $('[data-done-text]').textContent = t(lastSignup.role === 'customer' ? 'f.okC' : 'f.okP', { email: lastSignup.email, country: countryName(lastSignup.country) });
  }
  if (form) {
    if (CFG.showDemoNote && !CFG.formEndpoint) $('[data-demo-note]').hidden = false;
    form.addEventListener('focusin', function () { if (!formStarted) { formStarted = true; track('form_start', { role: role }); } });
    form.addEventListener('input', function (e) { if (e.target.name) fieldErr(e.target.name === 'account_type' ? '' : e.target.name, ''); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      ['email', 'country', 'consent'].forEach(function (n) { fieldErr(n, ''); });
      var email = form.email.value.trim(), country = form.country.value, consentOk = form.consent.checked;
      var typeEl = $('input[name="account_type"]:checked', form), type = typeEl ? typeEl.value : '';
      var bad = [];
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { fieldErr('email', t('f.errEmail')); bad.push(form.email); }
      if (!country) { fieldErr('country', t('f.errCountry')); bad.push(form.country); }
      if (!consentOk) { fieldErr('consent', t('f.errConsent')); bad.push(form.consent); }
      if (bad.length) { bad[0].focus(); track('form_error', { role: role, field: bad[0].name }); return; }
      /* spam protection: hidden honeypot field, minimum fill time, max 5 sign-ups per browser per hour */
      var recent = JSON.parse(store.get('loqelo_recent') || '[]').filter(function (x) { return Date.now() - x < 36e5; });
      if (form.website.value || Date.now() - shownAt < 2500 || recent.length >= 5) { fieldErr('consent', t('f.errSpam')); return; }
      var list = JSON.parse(store.get('loqelo_waitlist') || '[]');
      if (list.some(function (x) { return x.email.toLowerCase() === email.toLowerCase() && x.role === role; })) { fieldErr('email', t('f.errDup')); form.email.focus(); return; }
      var rec = { role: role, email: email, country: country, account_type: type, language: lang, consent: true,
        consent_text: t('f.consent').replace(/<[^>]+>/g, ''), created_at: new Date().toISOString(), page: W.location.href.split('?')[0] };
      var btn = $('button[type="submit"]', form); btn.disabled = true;
      var send = CFG.formEndpoint
        ? fetch(CFG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(rec) })
            .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); })
        : Promise.resolve();
      send.then(function () {
        list.push(rec); store.set('loqelo_waitlist', JSON.stringify(list));
        recent.push(Date.now()); store.set('loqelo_recent', JSON.stringify(recent));
        track('sign_up', { method: 'waitlist', role: role, account_type: type || 'not_set', country: country });
        lastSignup = rec; updateDone();
        form.hidden = true; done.hidden = false; done.focus();
      }).catch(function () { fieldErr('consent', t('f.errSend')); }).then(function () { btn.disabled = false; });
    });
    $('[data-again]').addEventListener('click', function () { form.reset(); fillCountries(); showForm(); form.email.focus(); });
    $('[data-share]').addEventListener('click', function () {
      var url = W.location.href.split('?')[0], b = this;
      track('share');
      if (navigator.share) { navigator.share({ title: 'Loqelo', text: t('f.shareText'), url: url }).catch(function () {}); return; }
      (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(function () {
        $('span', b).textContent = t('f.copied'); setTimeout(function () { $('span', b).textContent = t('f.share'); }, 2200);
      }).catch(function () {});
    });
  }

  /* ---------------- reveal on scroll ---------------- */
  var io = 'IntersectionObserver' in W ? new IntersectionObserver(function (en) {
    en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;
  function observe(el) { if (io && !reduced) io.observe(el); else el.classList.add('in'); }

  /* ---------------- start ---------------- */
  applyLang(detectLang(), true);
  catsShown = true;
  $$('.reveal').forEach(function (el) {
    if (!el.style.getPropertyValue('--d')) {
      var sib = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.setProperty('--d', Math.min(sib, 4) * 0.07 + 's');
    }
    observe(el);
  });
  tick(); setInterval(tick, 1000);
  if (consent === 'granted') loadGA();
  showCookie(false);
  showToast();
  W.LOQELO = { t: t, lang: function () { return lang; }, setLang: applyLang, track: track,
    /* used for screenshots: show the first example fully typed */
    freeze: function () { clearTimeout(demoTimer); askUser = true; var d = (DATA.demos[lang] || DATA.demos.en)[0];
      renderDemo(d, d.map(function (x) { return x[0]; }).join('').length); } };
})();
