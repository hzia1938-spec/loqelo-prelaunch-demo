(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const studio = $('.motion-studio');
  if (!studio) return;
  const stage = $('.motion-stage');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const text = {
    en: {
      pause: 'Pause motion', play: 'Play motion', restart: 'Restart story', storyLabel: 'THE LOQELO IDEA, IN MOTION',
      requestLabel: 'One simple request', request: '“Clean my windows and tidy the garden.”', windows: 'Window cleaning', garden: 'Gardening',
      hub: 'One request. The right connections.', offers: 'Explore your options', offerA: 'Offer A', offerB: 'Offer B',
      offerASub: 'Look at the details', offerBSub: 'Compare what fits', complete: 'Your place. Your choice.',
      describe: 'Describe', match: 'Match', compare: 'Compare', choose: 'Choose',
      phase0: 'It starts with you. Describe what your place needs in your own words.',
      phase1: 'Loqelo connects your request with relevant local service providers.',
      phase2: 'Explore the offers and compare the options for your project.',
      phase3: 'Choose who you want to work with. You’re in control of the next step.',
      preview: 'Illustrative product story', stepLabel: 'Show step', controls: 'Product story controls', timeline: 'Explore the four stages'
    },
    pl: {
      pause: 'Wstrzymaj ruch', play: 'Włącz animacje', restart: 'Od początku', storyLabel: 'IDEA LOQELO W RUCHU',
      requestLabel: 'Jedno proste zgłoszenie', request: '„Umyj okna i uporządkuj ogród.”', windows: 'Mycie okien', garden: 'Ogrodnictwo',
      hub: 'Jedno zgłoszenie. Właściwe kontakty.', offers: 'Poznaj możliwości', offerA: 'Oferta A', offerB: 'Oferta B',
      offerASub: 'Sprawdź szczegóły', offerBSub: 'Porównaj możliwości', complete: 'Twoje miejsce. Twój wybór.',
      describe: 'Opisz', match: 'Dopasuj', compare: 'Porównaj', choose: 'Wybierz',
      phase0: 'Wszystko zaczyna się od Ciebie. Opisz własnymi słowami, czego potrzebuje Twoje miejsce.',
      phase1: 'Loqelo łączy Twoje zgłoszenie z odpowiednimi lokalnymi usługodawcami.',
      phase2: 'Poznaj oferty i porównaj możliwości dla swojego projektu.',
      phase3: 'Wybierz, z kim chcesz pracować. To Ty decydujesz o kolejnym kroku.',
      preview: 'Przykładowa prezentacja produktu', stepLabel: 'Pokaż krok', controls: 'Sterowanie prezentacją', timeline: 'Poznaj cztery etapy'
    },
    de: {
      pause: 'Animation pausieren', play: 'Animation abspielen', restart: 'Neu starten', storyLabel: 'DIE LOQELO-IDEE IN BEWEGUNG',
      requestLabel: 'Eine einfache Anfrage', request: '„Fenster reinigen und den Garten pflegen.”', windows: 'Fensterreinigung', garden: 'Gartenpflege',
      hub: 'Eine Anfrage. Passende Kontakte.', offers: 'Entdecke deine Optionen', offerA: 'Angebot A', offerB: 'Angebot B',
      offerASub: 'Details ansehen', offerBSub: 'Möglichkeiten vergleichen', complete: 'Dein Ort. Deine Wahl.',
      describe: 'Beschreiben', match: 'Zuordnen', compare: 'Vergleichen', choose: 'Auswählen',
      phase0: 'Es beginnt mit dir. Beschreibe in eigenen Worten, was dein Ort braucht.',
      phase1: 'Loqelo verbindet deine Anfrage mit passenden lokalen Dienstleistern.',
      phase2: 'Entdecke die Angebote und vergleiche die Möglichkeiten für dein Projekt.',
      phase3: 'Wähle, mit wem du arbeiten möchtest. Du entscheidest über den nächsten Schritt.',
      preview: 'Beispielhafte Produktgeschichte', stepLabel: 'Schritt anzeigen', controls: 'Steuerung der Produktgeschichte', timeline: 'Die vier Schritte entdecken'
    }
  };
  const copy = key => (text[document.documentElement.lang] || text.en)[key] || text.en[key];
  let stored = null;
  try { stored = localStorage.getItem('loqelo-motion'); } catch { /* preferences remain session-only */ }
  let playing = stored !== 'paused' && !preference.matches;
  let inView = false;
  let phase = preference.matches ? 3 : 0;
  let elapsed = 0;
  let previous = 0;
  let frame = 0;
  const phaseDuration = 3600;
  const steps = $$('[data-motion-step]');

  function setPhase(next, reset = true) {
    phase = ((next % 4) + 4) % 4;
    if (reset) { elapsed = 0; previous = 0; }
    stage.dataset.phase = String(phase);
    steps.forEach((button, index) => {
      if (index === phase) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
      button.classList.toggle('is-complete', index < phase);
    });
    $('[data-motion-caption]').textContent = copy('phase' + phase);
    studio.style.setProperty('--phase-progress', String(elapsed / phaseDuration));
  }
  function tick(now) {
    if (!playing || !inView || document.hidden) { frame = 0; return; }
    if (previous) elapsed += Math.min(now - previous, 100);
    previous = now;
    if (elapsed >= phaseDuration) setPhase(phase + 1);
    studio.style.setProperty('--phase-progress', String(Math.min(elapsed / phaseDuration, 1)));
    frame = requestAnimationFrame(tick);
  }
  function syncPlayback() {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    document.body.classList.toggle('motion-paused', !playing);
    document.body.classList.toggle('motion-hidden', document.hidden);
    studio.dataset.inView = String(inView);
    $$('[data-motion-toggle]').forEach(button => {
      button.setAttribute('aria-label', copy(playing ? 'pause' : 'play'));
      button.querySelector('[data-motion-control-text]').textContent = copy(playing ? 'pause' : 'play');
    });
    if (playing && inView && !document.hidden) frame = requestAnimationFrame(tick);
  }
  function renderLanguage() {
    $$('[data-motion-copy]').forEach(el => { el.textContent = copy(el.dataset.motionCopy); });
    steps.forEach((button, index) => button.setAttribute('aria-label', `${copy('stepLabel')} ${index + 1}: ${copy(['describe','match','compare','choose'][index])}`));
    $('.motion-controls').setAttribute('aria-label', copy('controls'));
    $('.motion-timeline').setAttribute('aria-label', copy('timeline'));
    $('[data-motion-restart]').setAttribute('aria-label', copy('restart'));
    setPhase(phase, false);
    syncPlayback();
  }
  function smallAnimation(element, keyframes, options) {
    if (!element || !playing || preference.matches || document.hidden || typeof element.animate !== 'function') return;
    element.animate(keyframes, options);
  }
  $$('[data-motion-toggle]').forEach(button => button.addEventListener('click', () => {
    playing = !playing;
    document.body.classList.remove('motion-intro');
    try { localStorage.setItem('loqelo-motion', playing ? 'playing' : 'paused'); } catch { /* optional preference */ }
    // Pause any short interaction animation that may already be in flight.
    if (!playing) document.getAnimations().filter(animation => !animation.animationName).forEach(animation => animation.finish());
    syncPlayback();
  }));
  $('[data-motion-restart]').addEventListener('click', () => { setPhase(0); syncPlayback(); });
  steps.forEach(button => button.addEventListener('click', () => {
    setPhase(Number(button.dataset.motionStep));
    syncPlayback();
  }));
  document.addEventListener('visibilitychange', syncPlayback);
  preference.addEventListener('change', () => {
    if (preference.matches) { playing = false; setPhase(3); }
    syncPlayback();
  });
  $('#language').addEventListener('change', renderLanguage);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      syncPlayback();
    }, { threshold: .15 });
    observer.observe(studio);
  } else { inView = true; }
  $('#tour-image').addEventListener('load', event => smallAnimation(event.currentTarget, [{ opacity: .65, translate: '0 10px' }, { opacity: 1, translate: '0 0' }], { duration: 450, easing: 'cubic-bezier(.2,.7,.2,1)' }));
  $$('.example-action,[data-example]').forEach(button => button.addEventListener('click', () => {
    smallAnimation($('.example-result'), [{ opacity: .4, translate: '0 7px' }, { opacity: 1, translate: '0 0' }], { duration: 380, easing: 'ease-out' });
    $$('[data-match-chips]>span').forEach((chip, index) => smallAnimation(chip, [{ opacity: 0, scale: .9 }, { opacity: 1, scale: 1 }], { duration: 300, delay: index * 65, easing: 'ease-out', fill: 'backwards' }));
  }));
  // A single master state controls all decorative loops and this product story.
  document.body.classList.add('motion-enabled');
  if (playing && !preference.matches) {
    document.body.classList.add('motion-intro');
    setTimeout(() => document.body.classList.remove('motion-intro'), 1800);
  }
  renderLanguage();
})();
