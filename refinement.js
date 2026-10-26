(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const words = {
    en:{collectionLink:'Explore ideas',suggestions:'A FEW IDEAS TO GET STARTED',next:'Be first to try Loqelo',expand:'View larger',expandLabel:'Expand platform preview',previewKicker:'A FIRST LOOK AT LOQELO',previewTitle:'A closer look.',previewHelp:'Scroll inside the preview to explore the interface.',previewNote:'Official platform preview · Design may evolve',close:'Close platform preview',region:'Expanded platform screenshot',mobileKicker:'COMING FEBRUARY 2027',mobileTitle:'A little help is on the way.',customer:'Get early access',provider:'Join as a provider',homeTitle:'A happier home starts here.',gardenTitle:'A little more room to grow.',officeTitle:'Make space for better work.',homeIntro:'From a fresh start to a quick fix. Pick an idea, or describe the task that would make your day easier.',gardenIntro:'The lawn, the hedge, that outdoor project. Start with an idea and make it your own.',officeIntro:'Keep your space working as hard as you do. Explore a task, then tell us what you have in mind.'},
    pl:{collectionLink:'Odkryj pomysły',suggestions:'KILKA POMYSŁÓW NA POCZĄTEK',next:'Poznaj Loqelo jako pierwszy',expand:'Powiększ',expandLabel:'Powiększ podgląd platformy',previewKicker:'PIERWSZE SPOJRZENIE NA LOQELO',previewTitle:'Przyjrzyj się bliżej.',previewHelp:'Przewijaj podgląd, aby poznać interfejs.',previewNote:'Oficjalny podgląd platformy · Projekt może ulec zmianie',close:'Zamknij podgląd platformy',region:'Powiększony zrzut ekranu platformy',mobileKicker:'START W LUTYM 2027',mobileTitle:'Pomoc jest coraz bliżej.',customer:'Dołącz wcześniej',provider:'Dołącz jako usługodawca',homeTitle:'Tu zaczyna się lepszy dom.',gardenTitle:'Więcej miejsca na zieleń.',officeTitle:'Przestrzeń do lepszej pracy.',homeIntro:'Od nowego początku po drobną naprawę. Wybierz pomysł lub opisz zadanie, które ułatwi Ci dzień.',gardenIntro:'Trawnik, żywopłot, projekt na zewnątrz. Wybierz pomysł i dopasuj go do siebie.',officeIntro:'Niech Twoja przestrzeń pracuje równie dobrze jak Ty. Wybierz zadanie i opisz swój pomysł.'},
    de:{collectionLink:'Ideen entdecken',suggestions:'EIN PAAR IDEEN FÜR DEN ANFANG',next:'Loqelo als Erste entdecken',expand:'Vergrößern',expandLabel:'Plattformvorschau vergrößern',previewKicker:'EIN ERSTER BLICK AUF LOQELO',previewTitle:'Schau genauer hin.',previewHelp:'Scrolle in der Vorschau, um die Oberfläche zu entdecken.',previewNote:'Offizielle Plattformvorschau · Design kann sich ändern',close:'Plattformvorschau schließen',region:'Vergrößerte Plattformansicht',mobileKicker:'START IM FEBRUAR 2027',mobileTitle:'Ein bisschen Hilfe ist unterwegs.',customer:'Früh dabei sein',provider:'Als Anbieter dabei',homeTitle:'Hier beginnt ein schöneres Zuhause.',gardenTitle:'Ein bisschen mehr Raum zum Wachsen.',officeTitle:'Raum für besseres Arbeiten.',homeIntro:'Vom frischen Start bis zur kleinen Reparatur. Wähle eine Idee oder beschreibe, was deinen Alltag leichter macht.',gardenIntro:'Der Rasen, die Hecke, das Projekt im Freien. Wähle eine Idee und passe sie an deine Wünsche an.',officeIntro:'Dein Arbeitsplatz soll dich unterstützen. Entdecke eine Aufgabe und beschreibe, was du dir vorstellst.'}
  };
  // Suggestions are local examples, never submitted as real service requests.
  const tasks = {
    home:[
      {en:['Sparkling windows','I need my windows cleaned inside and out.'],pl:['Czyste okna','Potrzebuję mycia okien od wewnątrz i na zewnątrz.'],de:['Saubere Fenster','Bitte meine Fenster innen und außen reinigen.']},
      {en:['A little repair','I need a plumber to fix a leaking tap.'],pl:['Drobna naprawa','Potrzebuję hydraulika do naprawy cieknącego kranu.'],de:['Eine kleine Reparatur','Ich brauche Hilfe bei einem tropfenden Wasserhahn.']},
      {en:['Freshly painted walls','I need my living room walls painted.'],pl:['Świeżo pomalowane ściany','Potrzebuję malowania ścian w salonie.'],de:['Frisch gestrichene Wände','Ich möchte die Wände im Wohnzimmer streichen lassen.']}
    ],
    garden:[
      {en:['A tidier lawn','I need the garden lawn mowed and the grass tidied.'],pl:['Zadbany trawnik','Potrzebuję koszenia trawnika w ogrodzie.'],de:['Ein gepflegter Rasen','Bitte den Rasen im Garten mähen.']},
      {en:['A fresh hedge trim','I need the garden hedges trimmed.'],pl:['Przycięty żywopłot','Potrzebuję przycięcia żywopłotu w ogrodzie.'],de:['Eine geschnittene Hecke','Bitte die Hecke im Garten schneiden.']},
      {en:['Ready for spring','I need help cleaning and tidying the garden for spring.'],pl:['Gotowy na wiosnę','Potrzebuję sprzątania ogrodu przed wiosną.'],de:['Bereit für den Frühling','Bitte den Garten für den Frühling reinigen und vorbereiten.']}
    ],
    office:[
      {en:['Better lighting','We need an electrician to install new office lights.'],pl:['Lepsze oświetlenie','Potrzebujemy elektryka do nowego oświetlenia w biurze.'],de:['Besseres Licht','Wir suchen einen Elektriker für neue Lampen im Büro.']},
      {en:['A cleaner workspace','We need office cleaning and window cleaning.'],pl:['Czyste miejsce pracy','Potrzebujemy sprzątania biura i mycia okien.'],de:['Ein sauberer Arbeitsplatz','Wir brauchen eine Büroreinigung und saubere Fenster.']},
      {en:['Room for a new start','We need help moving office furniture to a new workspace.'],pl:['Miejsce na nowy start','Potrzebujemy pomocy przy przeprowadzce biura.'],de:['Platz für einen Neuanfang','Wir brauchen Hilfe beim Umzug in ein neues Büro.']}
    ]
  };
  const language = () => words[document.documentElement.lang] ? document.documentElement.lang : 'en';
  const copy = key => words[language()][key];
  let collection = 'home';
  let selectedTask = null;
  const input = $('#example-request');
  const dialog = $('#preview-dialog');
  const mobile = $('.mobile-access');
  function renderTasks() {
    const buttons = tasks[collection].map((task,index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = task[language()][0];
      button.setAttribute('aria-pressed',String(index === selectedTask));
      button.addEventListener('click',() => {
        input.value = task[language()][1];
        input.dispatchEvent(new Event('input',{bubbles:true}));
        selectedTask = index;
        $('.example-action').click();
        $$('.suggestion-buttons button').forEach((item,i) => item.setAttribute('aria-pressed',String(i === index)));
      });
      return button;
    });
    $('.suggestion-buttons').replaceChildren(...buttons);
    const heading = $('.explorer-copy h3');
    const description = $('.explorer-copy p');
    heading.textContent = copy(collection+'Title');
    description.textContent = copy(collection+'Intro');
    $$('.category-card[data-collection]').forEach(card => {
      const active = card.dataset.collection === collection;
      card.classList.toggle('is-selected',active);
      if (active) card.setAttribute('aria-current','true');
      else card.removeAttribute('aria-current');
    });
  }
  function renderMobileRole() {
    const role = $('[data-signup-role="provider"]')?.getAttribute('aria-pressed') === 'true' ? 'provider' : 'customer';
    $('[data-mobile-cta]').dataset.roleChoice = role;
    $('[data-mobile-label]').textContent = copy(role);
  }
  function render() {
    $$('[data-refine-copy]').forEach(element => {element.textContent = copy(element.dataset.refineCopy);});
    $('.preview-expand').setAttribute('aria-label',copy('expandLabel'));
    dialog.querySelector('.dialog-close').setAttribute('aria-label',copy('close'));
    $('.preview-canvas').setAttribute('aria-label',copy('region'));
    renderTasks();
    renderMobileRole();
  }
  $$('[data-collection]').forEach(link => link.addEventListener('click',() => {
    collection = link.dataset.collection;
    selectedTask = null;
    $(`.example-chips [data-example="${collection}"]`)?.click();
    renderTasks();
  }));
  $$('.example-chips [data-example]').forEach(button => button.addEventListener('click',() => {
    collection = button.dataset.example;
    selectedTask = null;
    renderTasks();
  }));
  input?.addEventListener('input',() => {
    selectedTask = null;
    $$('.suggestion-buttons button').forEach(button => button.setAttribute('aria-pressed','false'));
  });
  $('#language').addEventListener('change',() => {
    // A translated suggestion stays a suggestion; visitor-written text is left intact.
    if (selectedTask !== null) {
      input.value = tasks[collection][selectedTask][language()][1];
      $('.example-action').click();
    }
    render();
  });
  $('.preview-expand').addEventListener('click',() => {
    const source = $('#tour-image');
    const expanded = dialog.querySelector('img');
    expanded.src = source.getAttribute('src');
    expanded.alt = source.alt;
    dialog.showModal();
    $('.preview-canvas').scrollTop = 0;
    $('.preview-canvas').scrollLeft = 0;
  });
  $('[data-mobile-cta]').addEventListener('click',() => {
    const role = $('[data-mobile-cta]').dataset.roleChoice;
    $(`[data-signup-role="${role}"]`)?.click();
  });
  new MutationObserver(renderMobileRole).observe($('.role-tabs'),{subtree:true,attributes:true,attributeFilter:['aria-pressed']});
  const sectionLinks = $$('.desktop-nav a');
  const sections = sectionLinks.map(link => $(link.getAttribute('href'))).filter(Boolean);
  let queued = false;
  function updatePosition() {
    const threshold = Math.min(220,innerHeight*.3);
    const active = sections.find(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= threshold && rect.bottom > threshold;
    });
    sectionLinks.forEach(link => {
      if (active && link.getAttribute('href') === '#'+active.id) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
    const heroBottom = $('.hero').getBoundingClientRect().bottom;
    const waitlistTop = $('#waitlist').getBoundingClientRect().top;
    mobile.hidden = !(matchMedia('(max-width:760px)').matches && heroBottom < 115 && waitlistTop > innerHeight);
    queued = false;
  }
  function queuePosition() {if(!queued){queued=true;requestAnimationFrame(updatePosition);}}
  addEventListener('scroll',queuePosition,{passive:true});
  addEventListener('resize',queuePosition,{passive:true});
  addEventListener('load',queuePosition,{once:true});
  render();
  updatePosition();
})();
