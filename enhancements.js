(() => {
  'use strict';
  if (window.__loqeloEnhancements) return;
  window.__loqeloEnhancements = true;

  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const languages = {
    en: {
      sceneHome: 'Home', sceneGarden: 'Garden', sceneOffice: 'Office',
      roleCustomer: 'I need a service', roleProvider: 'I provide services',
      customerCaption: 'Describe what you need once. Get offers from local people who can help. Choose who’s right for your home, garden or office.',
      providerCaption: 'Discover relevant requests nearby. Send your offer and connect with people who need your skills.',
      customerCta: 'Get early access', providerCta: 'Join as a provider',
      homeTag: 'A LITTLE MORE ROOM TO LIVE', homeSmall: 'Your home.', homeStrong: 'In good hands.',
      gardenTag: 'GOOD THINGS GROW HERE', gardenSmall: 'Your garden.', gardenStrong: 'Room to flourish.',
      officeTag: 'MAKE SPACE FOR WHAT’S NEXT', officeSmall: 'Your workspace.', officeStrong: 'Working better.',
      homeAlt: 'Window-cleaning professionals at work in a bright home',
      gardenAlt: 'A gardener trimming a green hedge',
      officeAlt: 'A service professional carrying out an installation repair',
      exampleHome: 'At home', exampleGarden: 'In the garden', exampleOffice: 'At work',
      exampleLabel: 'A LITTLE PREVIEW', exampleTitle: 'What’s on your to-do list?',
      exampleIntro: 'One simple sentence. A good place to start.',
      exampleInputLabel: 'Describe your task', exampleAction: 'Preview the match',
      exampleNote: 'Illustrative preview based on keywords. No request is sent.',
      previewLabel: 'Illustrative preview',
      homeExample: 'I need my windows cleaned and the living room painted.',
      gardenExample: 'Please mow the lawn and trim the garden hedge.',
      officeExample: 'We need an electrician to install new office lights.',
      resultTitle: 'A little help with {services}.',
      resultDescription: 'A request like this could connect you with local providers offering these services. Join the waitlist to hear when Loqelo launches.',
      unknownTitle: 'Tell us a little more.',
      unknownDescription: 'Try a task such as cleaning the windows, mowing the lawn or fixing a leaking tap to explore this preview.',
      cleaning: 'cleaning', garden: 'garden care', electrical: 'electrical work',
      painting: 'painting', moving: 'moving', plumbing: 'plumbing'
    },
    pl: {
      sceneHome: 'Dom', sceneGarden: 'Ogród', sceneOffice: 'Biuro',
      roleCustomer: 'Szukam usługi', roleProvider: 'Świadczę usługi',
      customerCaption: 'Opisz raz, czego potrzebujesz. Otrzymaj oferty od lokalnych fachowców i wybierz odpowiednią osobę do domu, ogrodu lub biura.',
      providerCaption: 'Odkrywaj pasujące zlecenia w pobliżu. Wysyłaj oferty i nawiązuj kontakt z osobami, które potrzebują Twoich umiejętności.',
      customerCta: 'Chcę być pierwszy', providerCta: 'Dołącz jako usługodawca',
      homeTag: 'WIĘCEJ MIEJSCA NA ŻYCIE', homeSmall: 'Twój dom.', homeStrong: 'W dobrych rękach.',
      gardenTag: 'TU ROSNĄ DOBRE RZECZY', gardenSmall: 'Twój ogród.', gardenStrong: 'Miejsce na rozkwit.',
      officeTag: 'MIEJSCE NA NOWE MOŻLIWOŚCI', officeSmall: 'Twoje biuro.', officeStrong: 'Pracuje lepiej.',
      homeAlt: 'Fachowcy myjący okna w jasnym domu',
      gardenAlt: 'Ogrodnik przycinający zielony żywopłot',
      officeAlt: 'Fachowiec wykonujący naprawę instalacji',
      exampleHome: 'W domu', exampleGarden: 'W ogrodzie', exampleOffice: 'W pracy',
      exampleLabel: 'MAŁA ZAPOWIEDŹ', exampleTitle: 'Co masz na swojej liście zadań?',
      exampleIntro: 'Jedno proste zdanie. Dobry początek.',
      exampleInputLabel: 'Opisz swoje zadanie', exampleAction: 'Zobacz dopasowanie',
      exampleNote: 'Przykładowy podgląd na podstawie słów kluczowych. Nie wysyłamy zgłoszenia.',
      previewLabel: 'Przykładowy podgląd',
      homeExample: 'Potrzebuję mycia okien i malowania salonu.',
      gardenExample: 'Proszę skosić trawnik i przyciąć żywopłot w ogrodzie.',
      officeExample: 'Szukamy elektryka do montażu nowego oświetlenia biura.',
      resultTitle: 'Pomoc w zakresie: {services}.',
      resultDescription: 'Takie zgłoszenie mogłoby połączyć Cię z lokalnymi fachowcami oferującymi te usługi. Dołącz do listy, aby dowiedzieć się o starcie Loqelo.',
      unknownTitle: 'Dodaj kilka szczegółów.',
      unknownDescription: 'Wpisz zadanie, takie jak mycie okien, koszenie trawnika lub naprawa cieknącego kranu, aby wypróbować ten podgląd.',
      cleaning: 'sprzątanie', garden: 'pielęgnacja ogrodu', electrical: 'prace elektryczne',
      painting: 'malowanie', moving: 'przeprowadzki', plumbing: 'hydraulika'
    },
    de: {
      sceneHome: 'Zuhause', sceneGarden: 'Garten', sceneOffice: 'Büro',
      roleCustomer: 'Ich suche Hilfe', roleProvider: 'Ich biete Dienste an',
      customerCaption: 'Beschreibe einmal, was du brauchst. Erhalte Angebote von lokalen Profis und wähle die passende Hilfe für Haus, Garten oder Büro.',
      providerCaption: 'Entdecke passende Anfragen in deiner Nähe. Sende dein Angebot und finde Menschen, die dein Können brauchen.',
      customerCta: 'Früh dabei sein', providerCta: 'Als Dienstleister dabei sein',
      homeTag: 'MEHR RAUM FÜRS LEBEN', homeSmall: 'Dein Zuhause.', homeStrong: 'In guten Händen.',
      gardenTag: 'HIER WÄCHST GUTES', gardenSmall: 'Dein Garten.', gardenStrong: 'Raum zum Aufblühen.',
      officeTag: 'PLATZ FÜR NEUE MÖGLICHKEITEN', officeSmall: 'Dein Arbeitsplatz.', officeStrong: 'Einfach besser.',
      homeAlt: 'Fachkräfte reinigen Fenster in einem hellen Zuhause',
      gardenAlt: 'Ein Gärtner schneidet eine grüne Hecke',
      officeAlt: 'Eine Fachkraft führt eine Installationsreparatur durch',
      exampleHome: 'Zuhause', exampleGarden: 'Im Garten', exampleOffice: 'Bei der Arbeit',
      exampleLabel: 'EINE KLEINE VORSCHAU', exampleTitle: 'Was steht auf deiner Aufgabenliste?',
      exampleIntro: 'Ein einfacher Satz. Ein guter Anfang.',
      exampleInputLabel: 'Beschreibe deine Aufgabe', exampleAction: 'Zuordnung ansehen',
      exampleNote: 'Beispielvorschau anhand von Stichwörtern. Es wird keine Anfrage gesendet.',
      previewLabel: 'Beispielvorschau',
      homeExample: 'Meine Fenster brauchen eine Reinigung und das Wohnzimmer einen neuen Anstrich.',
      gardenExample: 'Bitte den Rasen mähen und die Gartenhecke schneiden.',
      officeExample: 'Wir suchen einen Elektriker für neue Lampen im Büro.',
      resultTitle: 'Unterstützung bei {services}.',
      resultDescription: 'Eine solche Anfrage könnte dich mit lokalen Anbietern dieser Dienste verbinden. Trag dich ein und erfahre, wann Loqelo startet.',
      unknownTitle: 'Erzähl uns ein bisschen mehr.',
      unknownDescription: 'Probiere eine Aufgabe wie Fenster reinigen, Rasen mähen oder einen tropfenden Wasserhahn reparieren aus, um diese Vorschau zu erkunden.',
      cleaning: 'Reinigung', garden: 'Gartenpflege', electrical: 'Elektroarbeiten',
      painting: 'Malerarbeiten', moving: 'Umzug', plumbing: 'Sanitärarbeiten'
    }
  };
  const getLanguage = () => languages[document.documentElement.lang] ? document.documentElement.lang : 'en';
  const copy = key => languages[getLanguage()][key] || languages.en[key] || '';
  let scene = 'home';
  let heroRole = 'customer';
  let example = 'home';
  let usingExample = true;
  let resultShown = false;
  let sceneVersion = 0;

  function renderScene(changeImage = true) {
    const visual = $('.hero-scene');
    const image = $('.scene-image');
    if (!visual || !image) return;
    visual.dataset.scene = scene;
    $$('[data-scene-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.sceneChoice === scene)));
    const tag = $('.scene-top-tag');
    const small = $('.scene-bottom-copy small');
    const strong = $('.scene-bottom-copy strong');
    if (tag) tag.textContent = copy(scene + 'Tag');
    if (small) small.textContent = copy(scene + 'Small');
    if (strong) strong.textContent = copy(scene + 'Strong');
    image.alt = copy(scene + 'Alt');
    const source = `assets/scene-${scene}.webp`;
    if (!changeImage || image.getAttribute('src') === source) return;
    const version = ++sceneVersion;
    const loadedImage = new Image();
    loadedImage.onload = () => {
      if (version !== sceneVersion) return;
      image.src = source;
      if (!motionPreference.matches && !document.body.classList.contains('motion-paused') && typeof image.animate === 'function') {
        image.animate([{ opacity: 0.75, transform: 'scale(1.025)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 420, easing: 'ease-out' });
      }
    };
    // Keep the current scene visible if a replacement image is unavailable.
    loadedImage.onerror = () => {};
    loadedImage.src = source;
  }

  function renderRole() {
    $$('[data-hero-role]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.heroRole === heroRole)));
    const caption = $('.hero-role-caption');
    if (caption) caption.textContent = copy(heroRole + 'Caption');
    const cta = $('[data-hero-cta]');
    if (!cta) return;
    cta.dataset.roleChoice = heroRole;
    const label = cta.querySelector('[data-hero-cta-label]') || cta.querySelector('[data-i18n="earlyAccess"]') || cta.querySelector('span');
    if (label) {
      // The base script translates the rest of the page; this label depends on the chosen audience.
      label.removeAttribute('data-i18n');
      label.textContent = copy(heroRole + 'Cta');
    }
  }

  function chooseRole(role, syncForm = true) {
    heroRole = role === 'provider' ? 'provider' : 'customer';
    renderRole();
    if (syncForm) $(`[data-signup-role="${heroRole}"]`)?.click();
  }

  const servicePatterns = {
    cleaning: /clean|window|tidy|sprzat|myci|okien|okna|reinig|putz|fenster/,
    garden: /garden|lawn|hedge|grass|ogrod|traw|zywoplot|garten|rasen|heck/,
    electrical: /electric|outlet|socket|wiring|light|elektry|gniazd|oswietl|elektr|strom|steckdose|beleucht|lamp/,
    painting: /paint|wall|malow|scian|anstrich|streich|wand/,
    moving: /\bmov|relocat|przeprowadz|transport|umzug|umzieh/,
    plumbing: /plumb|leak|\btap\b|faucet|drain|pipe|hydraul|kran|przeciek|odplyw|wyciek|klempner|sanitar|rohr|wasserhahn|abfluss/
  };
  function matchedServices(value) {
    const normalized = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');
    return Object.keys(servicePatterns).filter(key => servicePatterns[key].test(normalized));
  }
  function formatServices(keys) {
    const names = keys.map(copy);
    try { return new Intl.ListFormat(getLanguage(), { style: 'long', type: 'conjunction' }).format(names); }
    catch { return names.join(', '); }
  }
  function renderResult() {
    const input = $('#example-request');
    const result = $('.example-result');
    if (!input || !result) return;
    const services = matchedServices(input.value);
    const title = result.querySelector('[data-match-title]');
    const description = result.querySelector('[data-match-description]');
    if (title) title.textContent = services.length ? copy('resultTitle').replace('{services}', formatServices(services)) : copy('unknownTitle');
    if (description) description.textContent = copy(services.length ? 'resultDescription' : 'unknownDescription');
    const chips = result.querySelector('[data-match-chips]');
    if (chips) chips.replaceChildren(...services.map(key => {
      const chip = document.createElement('span');
      chip.textContent = copy(key);
      return chip;
    }));
    result.dataset.state = services.length ? 'matched' : 'prompt';
    result.hidden = false;
    resultShown = true;
  }
  function renderExample() {
    const input = $('#example-request');
    if (!input) return;
    if (usingExample) input.value = copy(example + 'Example');
    $$('[data-example]').forEach(button => button.setAttribute('aria-pressed', String(usingExample && button.dataset.example === example)));
    if (resultShown) renderResult();
  }
  function renderLanguage() {
    $$('[data-enhance-copy]').forEach(element => {
      const value = copy(element.dataset.enhanceCopy);
      if (value) element.textContent = value;
    });
    renderScene(false);
    renderRole();
    renderExample();
    const languageControl = $('#language');
    if (languageControl) languageControl.setAttribute('aria-label', { en: 'Choose language', pl: 'Wybierz język', de: 'Sprache wählen' }[getLanguage()]);
  }

  $$('[data-scene-choice]').forEach(button => button.addEventListener('click', () => {
    if (!['home', 'garden', 'office'].includes(button.dataset.sceneChoice)) return;
    scene = button.dataset.sceneChoice;
    renderScene();
  }));
  $$('[data-hero-role]').forEach(button => button.addEventListener('click', () => chooseRole(button.dataset.heroRole)));
  $('[data-hero-cta]')?.addEventListener('click', () => $(`[data-signup-role="${heroRole}"]`)?.click());
  $$('[data-signup-role]').forEach(button => button.addEventListener('click', () => {
    heroRole = button.dataset.signupRole === 'provider' ? 'provider' : 'customer';
    renderRole();
  }));
  $$('[data-role-choice]').forEach(link => link.addEventListener('click', () => {
    heroRole = link.dataset.roleChoice === 'provider' ? 'provider' : 'customer';
    renderRole();
  }));
  $$('[data-example]').forEach(button => button.addEventListener('click', () => {
    if (!['home', 'garden', 'office'].includes(button.dataset.example)) return;
    example = button.dataset.example;
    usingExample = true;
    renderExample();
    renderResult();
  }));
  $('#example-request')?.addEventListener('input', () => {
    usingExample = false;
    $$('[data-example]').forEach(button => button.setAttribute('aria-pressed', 'false'));
    // Leave the previous result readable until the visitor explicitly previews new text.
    const result = $('.example-result');
    if (result) result.hidden = true;
    resultShown = false;
  });
  $('.example-action')?.addEventListener('click', event => { event.preventDefault(); renderResult(); });
  $('#example-request')?.addEventListener('keydown', event => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      renderResult();
    }
  });
  $('#language')?.addEventListener('change', renderLanguage);

  const progress = $('.page-progress');
  if (progress) {
    progress.setAttribute('aria-hidden', 'true');
    let queued = false;
    const update = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      progress.style.transform = `scaleX(${percentage})`;
      queued = false;
    };
    const queue = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue, { passive: true });
    window.addEventListener('load', queue, { once: true });
    update();
  }

  function revealContent() {
    const targets = $$('[data-reveal], .section-heading, .category-card, .step, .provider-section, .signup-card, .story-copy');
    if (motionPreference.matches || !('IntersectionObserver' in window)) return;
    let observer;
    const showAll = () => {
      targets.forEach(element => element.classList.add('is-revealed', 'is-visible'));
      document.body.classList.remove('motion-ready');
      observer?.disconnect();
    };
    try {
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed', 'is-visible');
        observer.unobserve(entry.target);
      }), { threshold: 0.06, rootMargin: '0px 0px -18px 0px' });
      targets.forEach(element => {
        element.setAttribute('data-reveal', '');
        element.classList.add('reveal');
        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight && bounds.bottom > 0) element.classList.add('is-revealed', 'is-visible');
        observer.observe(element);
      });
      document.body.classList.add('motion-ready');
      document.addEventListener('focusin', event => event.target.closest('[data-reveal]')?.classList.add('is-revealed', 'is-visible'));
      motionPreference.addEventListener?.('change', event => { if (event.matches) showAll(); });
      // Content is visible without scripting and cannot remain hidden after a suspended observer.
      window.addEventListener('pageshow', event => { if (event.persisted) showAll(); });
      setTimeout(showAll, 18000);
    } catch { showAll(); }
  }

  renderLanguage();
  renderScene();
  renderResult();
  revealContent();
})();
