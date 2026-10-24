(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const config = window.LOQELO_CONFIG || {};
  const safeRead = (storage, key) => { try { return storage.getItem(key); } catch { return null; } };
  const safeWrite = (storage, key, value) => { try { storage.setItem(key, value); return true; } catch { return false; } };
  const en = Object.fromEntries($$('[data-i18n]').map(el => [el.dataset.i18n, [...el.childNodes].map(n => n.nodeName === 'BR' ? '\n' : n.textContent).join('')]));
  Object.assign(en, {
    countryProvider: 'Country where you provide services',
    tourOffersDescription: 'Compare the offers for your project and choose the provider who fits.',
    tourProviderDescription: 'See relevant opportunities and manage your work from one clear dashboard.',
    requestAlt: 'Official Loqelo preview: describe a job in your own words',
    offersAlt: 'Official Loqelo preview: compare offers from service providers',
    providerAlt: 'Official Loqelo preview: service provider dashboard and nearby jobs',
    formFailed: 'We couldn’t save your sign-up. Please try again.',
    waitMoment: 'Please take a moment to check your details, then try again.',
    saving: 'Saving your place…',
    deleted: 'Your local demo entries have been deleted.',
    realSuccessTitle: 'You’re on the list.',
    realSuccessDescription: 'Thank you for joining. We’ll email you with launch news and updates for your country.'
  });
  const pl = {
    skip:'Przejdź do treści',announcement:'Nadchodzi prostszy sposób na codzienne sprawy.',date:'Luty 2027',navHow:'Jak to działa',navFor:'Dla Ciebie',navPeek:'Pierwsze spojrzenie',language:'Wybierz język',join:'Dołącz do listy',heroEyebrow:'MNIEJ SZUKANIA. WIĘCEJ ŻYCIA.',heroOne:'Wszystko,',heroTwo:'czego potrzebuje',heroThree:'Twoje miejsce.',heroDescription:'Od drobnych napraw po wielkie plany. Znajdź odpowiednich lokalnych fachowców do domu, ogrodu i biura — w jednym miejscu.',earlyAccess:'Chcę być pierwszy',watch:'Poznaj Loqelo',heroNote:'Dowiedz się pierwszy. Bez zobowiązań, z nowymi możliwościami.',visualNote:'CODZIENNOŚĆ STAJE SIĘ PROSTSZA.',photoCaption:'Twoje miejsce. W dobrych rękach.',requestTitle:'Wystarczy jedno proste zdanie.',sampleRequest:'„Potrzebuję mycia okien i przygotowania ogrodu na wiosnę.”',windowTag:'Mycie okien',gardenTag:'Ogrodnictwo',matched:'Dopasowano',previewNote:'Mała zapowiedź tego, co przed nami.',promiseIntro:'Tu toczy się życie.\nPomagamy o to zadbać.',yourHome:'Twój dom',yourGarden:'Twój ogród',yourOffice:'Twoje biuro',andBeyond:'I wszystko pomiędzy. ↗',possibilityEyebrow:'WIELKIE PLANY. CODZIENNE SPRAWY.',possibilityOne:'Jedno miejsce.',possibilityTwo:'Tyle możliwości.',possibilityDescription:'Dom, w którym chce się być. Ogród, który cieszy. Biuro, w którym dobrze się pracuje. Na każdą sprawę znajdzie się fachowiec.',catHome:'Dom pełen spokoju.',catHomeDescription:'Sprzątanie, naprawy i odkładane „na później” sprawy.',catGarden:'Więcej zieleni.',catGardenDescription:'Pielęgnacja ogrodu, prace na zewnątrz i nowe początki.',catOffice:'Przestrzeń do działania.',catOfficeDescription:'Instalacje, konserwacja i lepsze miejsce pracy.',howEyebrow:'OD „POTRZEBUJĘ” DO „GOTOWE”.',howTitle:'Lista zadań?\nCzas je odhaczyć.',howDescription:'Bez niekończących się poszukiwań i tłumaczenia wszystkiego od nowa. Po prostu łatwiejszy sposób na znalezienie pomocy.',stepOneTitle:'Powiedz, czego potrzebujesz.',stepOneDescription:'Drobna naprawa czy wielki pomysł? Opisz to własnymi słowami. Dodaj zdjęcie, jeśli pomoże.',stepOneExample:'„Kuchnia potrzebuje odświeżenia ścian.”',stepTwoTitle:'Daj się znaleźć fachowcom.',stepTwoDescription:'Loqelo łączy Twoje zgłoszenie z odpowiednimi usługodawcami. Oferty trafiają do Ciebie.',stepTwoExample:'Lokalni fachowcy. Mniej szukania.',stepThreeTitle:'Wybierz swoją pomoc.',stepThreeDescription:'Porównaj oferty, znajdź najlepszą dla swojego projektu i zdecyduj, z kim chcesz pracować.',stepThreeExample:'Twój kolejny projekt rusza z miejsca.',platformEyebrow:'PIERWSZE SPOJRZENIE NA LOQELO',platformTitle:'Prościej.\nOd pierwszego kliknięcia.',platformDescription:'Twoje zgłoszenia, oferty i rozmowy w jednym miejscu. Zobacz, jak będzie wyglądać platforma.',tourRequest:'Zgłoszenie',tourOffers:'Oferty',tourProvider:'Twoja firma',tourRequestDescription:'Opisz raz. Loqelo pomoże zamienić Twoje słowa w odpowiednie zgłoszenie.',tourOffersDescription:'Porównaj oferty i wybierz usługodawcę, który pasuje do Twojego projektu.',tourProviderDescription:'Zobacz pasujące zlecenia i zarządzaj pracą w przejrzystym panelu.',productSticker:'Lokalne kontakty.\nWiększe możliwości.',screenNote:'Oficjalny podgląd platformy · Projekt może ulec zmianie',storyEyebrow:'MAŁE CHWILE. WIELKA RÓŻNICA.',storyTitle:'Mniej zadań.\nWięcej życia.',storyDescription:'Tworzymy Loqelo wokół prostej idei: znalezienie pomocy do swojego miejsca powinno być łatwe. Zobacz, jak ta idea ożywa.',storyButton:'Obejrzyj historię Loqelo',videoLabel:'Odrobina pomocy zmienia wszystko.',providerEyebrow:'JESTEŚ DOBRY W TYM, CO ROBISZ?',providerTitle:'Twój kolejny klient może być tuż za rogiem.',providerDescription:'Pokaż swoje umiejętności osobom, które ich potrzebują. Dołącz do listy usługodawców i przygotuj się na nowe możliwości.',providerButton:'Jestem usługodawcą',waitlistEyebrow:'TWÓJ NOWY ROZDZIAŁ ZACZYNA SIĘ TUTAJ',waitlistOne:'Dobre rzeczy',waitlistTwo:'nadchodzą.',waitlistThree:'Bądź pierwszy.',waitlistDescription:'Łatwiejszy sposób na znalezienie pomocy. Nowa droga do klientów. Zostaw email, a damy znać, gdy Loqelo będzie gotowe.',launchMonth:'LUT',launchTitle:'Nowy początek już wkrótce.',launchDescription:'Planowany start: luty 2027',formTitle:'Zróbmy miejsce na lepsze.',formIntro:'Wybierz swoją rolę. My zajmiemy się resztą.',customer:'Szukam usługi',provider:'Świadczę usługi',emailLabel:'Adres email',countryLabel:'Twój kraj',countryProvider:'Kraj, w którym świadczysz usługi',countryPlaceholder:'Wybierz kraj',typeLabel:'Dołączam jako',optional:'(opcjonalnie)',typePlaceholder:'Wybierz opcję',individual:'Osoba prywatna',business:'Firma',consentText:'Zgadzam się na wiadomości o starcie i nowościach Loqelo. Mogę zrezygnować w dowolnym momencie.',privacyLink:'Informacja o prywatności',formSubmit:'Dołączam',formReassurance:'Tylko dobre wiadomości. Twoja skrzynka należy do Ciebie.',demoNote:'Interaktywne demo: zapisy pozostają tylko w tej przeglądarce. Nie wysyłamy emaili.',successEyebrow:'CZAS NA NOWE MOŻLIWOŚCI',successTitle:'Jesteś na liście demo.',successDescription:'Zapis został zachowany w tej przeglądarce. W wersji produkcyjnej tak zacznie się Twoja przygoda z Loqelo.',export:'Pobierz demo CSV',another:'Wypróbuj kolejny zapis',faqEyebrow:'KILKA DOBRYCH PYTAŃ',faqTitle:'Chcesz wiedzieć\ncoś więcej?',faqOneQ:'Czym jest Loqelo?',faqOneA:'Loqelo to powstająca platforma łącząca klientów z usługodawcami do domu, ogrodu i biura. Opisz swoją potrzebę, otrzymaj oferty i wybierz wykonawcę.',faqTwoQ:'Kiedy wystartuje Loqelo?',faqTwoA:'Planujemy start w lutym 2027. Dołącz do listy, aby otrzymywać informacje o premierze i dostępności w Twoim kraju.',faqThreeQ:'Czy mogę dołączyć jako usługodawca?',faqThreeA:'Oczywiście. Niezależnie od tego, czy pracujesz samodzielnie, czy prowadzisz firmę, wybierz „Świadczę usługi” i podaj kraj, w którym działasz.',faqFourQ:'Czy to działająca usługa Loqelo?',faqFourA:'To demo strony przedpremierowej. Ekrany platformy pokazują planowane rozwiązania. Zapisy pozostają w przeglądarce i nie trafiają na rzeczywistą listę mailingową.',footerTagline:'Wszystko, czego potrzebuje Twoje miejsce.',footerCta:'Dobre rzeczy przed nami. Dołącz ↗',footerRights:'Koncepcja przedpremierowa.',cookieSettings:'Ustawienia cookies',demoBadge:'DEMO',videoCredit:'Oficjalny film promocyjny Loqelo.',privacyTitle:'Twoja prywatność, jasno.',privacyBody:'To publiczne demo zapisuje dane formularza wyłącznie w pamięci sesji tej przeglądarki. Nie wysyłamy emaili ani danych do systemu marketingowego. Dane znikają po zakończeniu sesji karty. Możesz pobrać lub usunąć lokalne dane demo.',privacyAnalytics:'Analityka jest wyłączona w tym demo. Preferencje przechowujemy lokalnie. Wersja produkcyjna wymaga własnej polityki prywatności, usługi mailingowej i konfiguracji zgód.',hostingNotice:'Stronę udostępnia GitHub Pages, które może przetwarzać techniczne dane połączenia.',hostingPolicy:'Polityka prywatności GitHub ↗',deleteEntries:'Usuń lokalne dane demo',done:'Gotowe',cookieTitle:'Wybór to dobra rzecz.',cookieBody:'Niezbędna pamięć zachowuje język i wybory prywatności. Opcjonalna analityka pomaga zrozumieć odwiedziny i konwersje bez udostępniania adresów email ani zawartości formularzy. W demo nie skonfigurowano analityki.',essentialOnly:'Tylko niezbędne',allowAnalytics:'Zezwól na analitykę',requestAlt:'Oficjalny podgląd Loqelo: opisz zlecenie własnymi słowami',offersAlt:'Oficjalny podgląd Loqelo: porównaj oferty usługodawców',providerAlt:'Oficjalny podgląd Loqelo: panel usługodawcy i pobliskie zlecenia',formFailed:'Nie udało się zapisać danych. Spróbuj ponownie.',waitMoment:'Sprawdź swoje dane i spróbuj za chwilę.',saving:'Zapisujemy Twoje miejsce…',deleted:'Lokalne dane demo zostały usunięte.',realSuccessTitle:'Jesteś na liście.',realSuccessDescription:'Dziękujemy. Powiadomimy Cię o starcie i dostępności w Twoim kraju.'
  };
  const de = {
    skip:'Zum Inhalt springen',announcement:'Bald wird das Erledigen einfacher.',date:'Februar 2027',navHow:'So funktioniert’s',navFor:'Für dich gemacht',navPeek:'Ein erster Blick',language:'Sprache wählen',join:'Zur Warteliste',heroEyebrow:'WENIGER SUCHEN. MEHR LEBEN.',heroOne:'Alles, was',heroTwo:'dein Zuhause',heroThree:'braucht.',heroDescription:'Von kleinen Reparaturen bis zu großen Plänen. Finde passende lokale Profis für dein Zuhause, deinen Garten und dein Büro — alles an einem Ort.',earlyAccess:'Früh dabei sein',watch:'Loqelo kennenlernen',heroNote:'Erfahre es zuerst. Ganz unverbindlich, voller Möglichkeiten.',visualNote:'DER ALLTAG. EIN BISSCHEN LEICHTER.',photoCaption:'Dein Zuhause. In guten Händen.',requestTitle:'Es beginnt mit einem einfachen Satz.',sampleRequest:'„Meine Fenster brauchen eine Reinigung und der Garten soll fit für den Frühling werden.“',windowTag:'Fensterreinigung',gardenTag:'Gartenarbeit',matched:'Gefunden',previewNote:'Ein kleiner Vorgeschmack auf das, was kommt.',promiseIntro:'Hier findet das Leben statt.\nWir helfen dir, dich darum zu kümmern.',yourHome:'Dein Zuhause',yourGarden:'Dein Garten',yourOffice:'Dein Büro',andBeyond:'Und alles dazwischen. ↗',possibilityEyebrow:'GROSSE PLÄNE. KLEINE ALLTAGSAUFGABEN.',possibilityOne:'Ein Ort.',possibilityTwo:'So viele Möglichkeiten.',possibilityDescription:'Ein Zuhause zum Wohlfühlen. Ein Garten zum Genießen. Ein Büro, das funktioniert. Für jede Aufgabe gibt es die passende Person.',catHome:'Mehr Wohlfühlen.',catHomeDescription:'Reinigung, Reparaturen und die „Mache ich später“-Aufgaben.',catGarden:'Ein bisschen grüner.',catGardenDescription:'Gartenpflege, Projekte im Freien und neue Anfänge.',catOffice:'Raum für mehr.',catOfficeDescription:'Installationen, Wartung und ein besserer Arbeitsplatz.',howEyebrow:'VON „ICH BRAUCHE“ ZU „ERLEDIGT“.',howTitle:'Aus der Aufgabenliste\nwird die Erledigt-Liste.',howDescription:'Kein endloses Suchen. Kein wiederholtes Erklären. Einfach ein leichterer Weg, Unterstützung zu finden.',stepOneTitle:'Sag uns, was du brauchst.',stepOneDescription:'Kleine Reparatur oder große Idee? Beschreibe es mit deinen eigenen Worten. Füge bei Bedarf ein Foto hinzu.',stepOneExample:'„Die Küche braucht einen neuen Anstrich.“',stepTwoTitle:'Die passenden Profis finden dich.',stepTwoDescription:'Loqelo verbindet deine Anfrage mit passenden Dienstleistern. So kommen die Angebote zu dir.',stepTwoExample:'Lokales Wissen. Weniger Aufwand.',stepThreeTitle:'Wähle deine Unterstützung.',stepThreeDescription:'Vergleiche Angebote und entscheide, wer am besten zu deinem Projekt passt.',stepThreeExample:'Dein nächstes Projekt kommt voran.',platformEyebrow:'EIN ERSTER BLICK AUF LOQELO',platformTitle:'Einfacher.\nAb dem ersten Klick.',platformDescription:'Anfragen, Angebote und Gespräche an einem Ort. Entdecke einen ersten Einblick in die Plattform.',tourRequest:'Deine Anfrage',tourOffers:'Deine Angebote',tourProvider:'Dein Geschäft',tourRequestDescription:'Einmal beschreiben. Loqelo hilft dir, daraus die passende Serviceanfrage zu machen.',tourOffersDescription:'Vergleiche Angebote für dein Projekt und wähle den passenden Dienstleister.',tourProviderDescription:'Entdecke passende Aufträge und verwalte deine Arbeit über ein übersichtliches Dashboard.',productSticker:'Lokale Kontakte.\nNeue Möglichkeiten.',screenNote:'Offizielle Plattformvorschau · Design kann sich ändern',storyEyebrow:'KLEINE MOMENTE. GROSSER UNTERSCHIED.',storyTitle:'Weniger Aufgaben.\nMehr vom Leben.',storyDescription:'Wir entwickeln Loqelo aus einer einfachen Idee: Hilfe für deinen Ort zu finden, sollte leicht sein. Sieh zu, wie die Idee Wirklichkeit wird.',storyButton:'Die Loqelo-Geschichte ansehen',videoLabel:'Ein bisschen Hilfe verändert alles.',providerEyebrow:'GUT IN DEM, WAS DU TUST?',providerTitle:'Dein nächster Kunde könnte gleich um die Ecke sein.',providerDescription:'Zeige dein Können Menschen, die es brauchen. Trag dich als Dienstleister ein und sei bereit für neue Möglichkeiten.',providerButton:'Ich bin Dienstleister',waitlistEyebrow:'DEIN NÄCHSTES KAPITEL BEGINNT HIER',waitlistOne:'Gute Dinge',waitlistTwo:'kommen bald.',waitlistThree:'Sei dabei.',waitlistDescription:'Ein einfacherer Weg, Hilfe zu finden. Ein neuer Weg zu Kunden. Hinterlasse deine E-Mail-Adresse und erfahre, wann Loqelo bereit ist.',launchMonth:'FEB',launchTitle:'Ein neuer Anfang steht bevor.',launchDescription:'Geplanter Start: Februar 2027',formTitle:'Machen wir Platz für Besseres.',formIntro:'Wähle deine Seite. Wir kümmern uns um den Rest.',customer:'Ich suche Hilfe',provider:'Ich biete Dienste an',emailLabel:'E-Mail-Adresse',countryLabel:'Dein Land',countryProvider:'Land, in dem du Dienste anbietest',countryPlaceholder:'Land auswählen',typeLabel:'Ich bin',optional:'(optional)',typePlaceholder:'Eine Option wählen',individual:'Eine Privatperson',business:'Ein Unternehmen',consentText:'Ich möchte Neuigkeiten zum Start und Updates von Loqelo erhalten. Ich kann mich jederzeit abmelden.',privacyLink:'Datenschutzhinweis',formSubmit:'Ich bin dabei',formReassurance:'Nur gute Neuigkeiten. Dein Postfach bleibt deins.',demoNote:'Interaktive Demo: Einträge bleiben nur in diesem Browser. Es wird keine E-Mail gesendet.',successEyebrow:'AUF NEUE MÖGLICHKEITEN',successTitle:'Du stehst auf der Demo-Liste.',successDescription:'Dein Eintrag wurde in diesem Browser gespeichert. In der Live-Version beginnt hier deine Reise mit Loqelo.',export:'Demo-CSV herunterladen',another:'Einen weiteren Eintrag testen',faqEyebrow:'EIN PAAR GUTE FRAGEN',faqTitle:'Du möchtest\nmehr wissen?',faqOneQ:'Was ist Loqelo?',faqOneA:'Loqelo ist eine kommende Plattform, die Menschen mit Dienstleistern für Haus, Garten und Büro verbindet. Beschreibe deinen Bedarf, erhalte Angebote und wähle einen Anbieter.',faqTwoQ:'Wann startet Loqelo?',faqTwoA:'Der geplante Start ist im Februar 2027. Trag dich ein, um Neuigkeiten und Informationen zur Verfügbarkeit in deinem Land zu erhalten.',faqThreeQ:'Kann ich als Dienstleister mitmachen?',faqThreeA:'Natürlich. Ob selbstständig oder mit einem Unternehmen: Wähle „Ich biete Dienste an“ und gib an, in welchem Land du arbeitest.',faqFourQ:'Ist dies bereits der Live-Service?',faqFourA:'Dies ist eine Vorschau-Website. Die Plattformbilder zeigen das geplante Erlebnis. Demo-Einträge bleiben im Browser und werden keiner echten Mailingliste hinzugefügt.',footerTagline:'Alles, was dein Zuhause braucht.',footerCta:'Gute Dinge kommen. Sei dabei ↗',footerRights:'Ein Konzept vor dem Start.',cookieSettings:'Cookie-Einstellungen',demoBadge:'DEMO',videoCredit:'Der offizielle Loqelo-Werbefilm.',privacyTitle:'Deine Privatsphäre. Klar erklärt.',privacyBody:'Diese öffentliche Konzept-Demo speichert Formulareinträge nur im Sitzungsspeicher dieses Browsers. Es werden keine E-Mails gesendet und keine Daten an ein Marketingsystem übermittelt. Die Einträge verschwinden, wenn die Browser-Sitzung dieses Tabs endet. Du kannst lokale Demo-Einträge exportieren oder löschen.',privacyAnalytics:'In dieser Demo sind Analysen deaktiviert. Einstellungen werden lokal gespeichert. Ein Live-Betrieb benötigt eigene Datenschutzhinweise, einen Mailing-Dienst und eine Einwilligungskonfiguration.',hostingNotice:'GitHub Pages stellt diese Website bereit und kann technische Verbindungsdaten verarbeiten.',hostingPolicy:'GitHub-Datenschutzerklärung ↗',deleteEntries:'Lokale Demo-Einträge löschen',done:'Fertig',cookieTitle:'Ein bisschen Wahlfreiheit tut gut.',cookieBody:'Notwendiger Speicher merkt sich Sprache und Datenschutzauswahl. Optionale Analysen könnten Besuche und Anmeldequoten messen, ohne E-Mail-Adressen oder Formularinhalte zu teilen. In dieser Demo ist kein Analysedienst eingerichtet.',essentialOnly:'Nur notwendige',allowAnalytics:'Analysen erlauben',requestAlt:'Offizielle Loqelo-Vorschau: einen Auftrag mit eigenen Worten beschreiben',offersAlt:'Offizielle Loqelo-Vorschau: Angebote von Dienstleistern vergleichen',providerAlt:'Offizielle Loqelo-Vorschau: Dashboard für Dienstleister und Aufträge in der Nähe',formFailed:'Dein Eintrag konnte nicht gespeichert werden. Bitte versuche es erneut.',waitMoment:'Überprüfe deine Angaben und versuche es in einem Moment erneut.',saving:'Dein Platz wird gespeichert…',deleted:'Deine lokalen Demo-Einträge wurden gelöscht.',realSuccessTitle:'Du stehst auf der Liste.',realSuccessDescription:'Vielen Dank. Wir informieren dich über den Start und die Verfügbarkeit in deinem Land.'
  };
  const dictionaries = { en, pl, de };
  const browserLanguage = (navigator.language || 'en').slice(0, 2);
  let language = safeRead(localStorage, 'loqelo-language') || browserLanguage;
  if (!dictionaries[language]) language = 'en';
  let signupRole = 'customer';
  let selectedTour = 'request';
  let demoEntries = [];
  try { demoEntries = JSON.parse(safeRead(sessionStorage, 'loqelo-demo-signups') || '[]'); if (!Array.isArray(demoEntries)) demoEntries = []; } catch { demoEntries = []; }
  const text = key => dictionaries[language][key] || en[key] || key;
  const setText = (el, value) => {
    el.replaceChildren(...value.split('\n').flatMap((part, i) => i ? [document.createElement('br'), document.createTextNode(part)] : [document.createTextNode(part)]));
  };
  // ISO 3166-1 country codes: display names are provided by the visitor's browser.
  const countries = 'AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(' ');
  function renderCountries() {
    const select = $('#country');
    const value = select.value;
    let names;
    try { names = new Intl.DisplayNames([language], { type: 'region' }); } catch { names = null; }
    const options = countries.map(code => ({ code, name: names ? names.of(code) : code })).sort((a, b) => a.name.localeCompare(b.name, language));
    const placeholder = new Option(text('countryPlaceholder'), '');
    select.replaceChildren(placeholder, ...options.map(({ code, name }) => new Option(name, code)));
    if (value) select.value = value;
  }
  function renderLanguage() {
    document.documentElement.lang = language;
    $('#language').value = language;
    $$('[data-i18n]').forEach(el => setText(el, text(el.dataset.i18n)));
    document.title = `Loqelo — ${text('footerTagline')}`;
    renderCountries();
    setRole(signupRole);
    updateTourCaption();
  }
  function setRole(role) {
    signupRole = role;
    $$('[data-signup-role]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.signupRole === role)));
    $('#country-label').textContent = text(role === 'provider' ? 'countryProvider' : 'countryLabel');
  }
  function updateTourCaption() {
    const key = 'tour' + selectedTour[0].toUpperCase() + selectedTour.slice(1) + 'Description';
    $('#tour-description').textContent = text(key);
    $('#tour-description').dataset.i18n = key;
    $('#tour-image').alt = text(selectedTour + 'Alt');
  }
  function setTour(tour, focus = false) {
    selectedTour = tour;
    $$('[data-tour]').forEach(button => {
      const active = button.dataset.tour === tour;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      if (active && focus) button.focus();
    });
    $('#tour-panel').setAttribute('aria-labelledby', `tab-${tour}`);
    $('#tour-image').src = `assets/platform-${tour}.webp`;
    $('#tour-panel').scrollTop = 0;
    $('#tour-panel').scrollLeft = 0;
    updateTourCaption();
  }
  $('#language').addEventListener('change', e => { language = e.target.value; safeWrite(localStorage, 'loqelo-language', language); renderLanguage(); });
  $$('[data-signup-role]').forEach(button => button.addEventListener('click', () => setRole(button.dataset.signupRole)));
  $$('[data-role-choice]').forEach(link => link.addEventListener('click', () => { showForm(); setRole(link.dataset.roleChoice); }));
  $$('[data-tour]').forEach(button => button.addEventListener('click', () => setTour(button.dataset.tour)));
  $('.tour-tabs').addEventListener('keydown', e => {
    const tourOrder = ['request', 'offers', 'provider'];
    const index = tourOrder.indexOf(selectedTour);
    if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) {
      e.preventDefault();
      const next = e.key === 'Home' ? 0 : e.key === 'End' ? 2 : (index + (e.key === 'ArrowRight' ? 1 : -1) + 3) % 3;
      setTour(tourOrder[next], true);
    }
  });
  const menuButton = $('.menu-button');
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    $('#mobile-nav').hidden = expanded;
  });
  $$('#mobile-nav a').forEach(link => link.addEventListener('click', () => { menuButton.setAttribute('aria-expanded', 'false'); $('#mobile-nav').hidden = true; }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { menuButton.setAttribute('aria-expanded', 'false'); $('#mobile-nav').hidden = true; } });
  $$('.watch-button').forEach(button => button.addEventListener('click', () => { $('#video-dialog').showModal(); $('#video-dialog video').play().catch(() => {}); analyticsEvent('video_open'); }));
  $('#video-dialog').addEventListener('close', () => $('#video-dialog video').pause());
  $$('.privacy-button').forEach(button => button.addEventListener('click', () => $('#privacy-dialog').showModal()));
  $('#privacy-done').addEventListener('click', () => $('#privacy-dialog').close());
  $('#cookie-settings').addEventListener('click', () => $('#cookies-dialog').showModal());
  $$('dialog').forEach(dialog => {
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  });
  let analyticsConsent = safeRead(localStorage, 'loqelo-analytics-consent') === 'granted';
  let analyticsInitialized = false;
  const validGaId = /^G-[A-Z0-9]+$/.test(config.gaMeasurementId || '');
  function initAnalytics() {
    if (!analyticsConsent || !validGaId || analyticsInitialized) return;
    analyticsInitialized = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.gaMeasurementId}`;
    document.head.append(script);
    window.gtag('js', new Date());
    window.gtag('config', config.gaMeasurementId, { allow_google_signals: false, allow_ad_personalization_signals: false, page_location: location.origin + location.pathname });
  }
  function analyticsEvent(name, role) {
    if (!analyticsConsent || !analyticsInitialized || !window.gtag) return;
    // Only fixed event names and the audience category are sent; never form data.
    window.gtag('event', name, role ? { audience_type: role } : {});
  }
  function setConsent(granted) {
    analyticsConsent = granted;
    safeWrite(localStorage, 'loqelo-analytics-consent', granted ? 'granted' : 'denied');
    if (validGaId) window[`ga-disable-${config.gaMeasurementId}`] = !granted;
    if (window.gtag) window.gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' });
    if (granted) initAnalytics();
    $('#cookies-dialog').close();
  }
  $('#essential-only').addEventListener('click', () => setConsent(false));
  $('#allow-analytics').addEventListener('click', () => setConsent(true));
  initAnalytics();
  const form = $('#waitlist-form');
  let startedAt = Date.now();
  function showForm() {
    $('.signup-content').hidden = false;
    $('.signup-success').hidden = true;
    $('.form-error').hidden = true;
    startedAt = Date.now();
  }
  $('#another-signup').addEventListener('click', () => { form.reset(); showForm(); $('#email').focus(); });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const error = $('.form-error');
    error.hidden = true;
    if (!form.reportValidity() || $('#website').value) return;
    if (Date.now() - startedAt < 1200) { error.textContent = text('waitMoment'); error.hidden = false; return; }
    const record = {
      audience: signupRole,
      email: $('#email').value.trim().toLowerCase(),
      country: $('#country').value,
      accountType: $('#account-type').value || 'unspecified',
      consent: $('#consent').checked,
      consentedAt: new Date().toISOString(),
      language,
      source: 'loqelo-prelaunch'
    };
    const button = $('.form-submit');
    button.disabled = true;
    button.querySelector('[data-i18n]').textContent = text('saving');
    try {
      if (config.waitlistEndpoint) {
        const endpoint = new URL(config.waitlistEndpoint);
        if (endpoint.protocol !== 'https:') throw new Error('HTTPS required');
        const response = await fetch(endpoint.href, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(record), credentials: 'omit' });
        if (!response.ok) throw new Error('Submission failed');
      } else {
        const existingIndex = demoEntries.findIndex(item => item.email === record.email && item.audience === record.audience);
        if (existingIndex >= 0) demoEntries[existingIndex] = record; else demoEntries.push(record);
        safeWrite(sessionStorage, 'loqelo-demo-signups', JSON.stringify(demoEntries));
      }
      $('.signup-content').hidden = true;
      $('.signup-success').hidden = false;
      if (config.waitlistEndpoint) {
        $('.signup-success h3').textContent = text('realSuccessTitle');
        $('.signup-success>p').textContent = text('realSuccessDescription');
        $('#export-signups').hidden = true;
      }
      $('.signup-success').focus({ preventScroll: true });
      analyticsEvent(config.waitlistEndpoint ? 'waitlist_signup' : 'demo_signup', signupRole);
    } catch {
      error.textContent = text('formFailed');
      error.hidden = false;
    } finally {
      button.disabled = false;
      button.querySelector('[data-i18n]').textContent = text('formSubmit');
    }
  });
  $('#export-signups').addEventListener('click', () => {
    const fields = ['audience', 'email', 'country', 'accountType', 'consent', 'consentedAt', 'language'];
    const escape = value => {
      let cell = String(value ?? '');
      if (/^[=+@\-\t\r]/.test(cell)) cell = "'" + cell;
      return '"' + cell.replaceAll('"', '""') + '"';
    };
    const csv = '\uFEFF' + [fields.join(','), ...demoEntries.map(entry => fields.map(field => escape(entry[field])).join(','))].join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = 'loqelo-demo-signups.csv'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  $('#delete-signups').addEventListener('click', () => {
    demoEntries = [];
    try { sessionStorage.removeItem('loqelo-demo-signups'); } catch { /* memory-only mode */ }
    form.reset();
    showForm();
    $('#delete-status').textContent = text('deleted');
  });
  renderLanguage();
  const region = (navigator.language || '').split('-')[1];
  if (countries.includes(region)) $('#country').value = region;
  if (config.waitlistEndpoint) {
    $$('.demo-note').forEach(el => el.hidden = true);
  }
})();
