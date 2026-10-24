(() => {
  'use strict';
  const stage = document.querySelector('.world-stage');
  if (!stage) return;
  const poster = stage.querySelector('.world-poster');
  const toggle = stage.querySelector('.world-toggle');
  const status = stage.querySelector('.world-status');
  const hint = stage.querySelector('.world-hint');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const strings = {
    en:{home:'Home',garden:'Garden',office:'Office',explore:'Explore in 3D',still:'Still view',loading:'Opening your little world…',error:'The interactive view couldn’t open. You can still explore the rendered views.',drag:'Drag to explore · Home, garden, office',tagline:'A little help, wherever life happens.',preview:'Illustrative 3D scene',alt:'A handcrafted 3D miniature of a home, garden and workspace',views:'Choose a view of the miniature'},
    pl:{home:'Dom',garden:'Ogród',office:'Biuro',explore:'Odkryj w 3D',still:'Widok statyczny',loading:'Otwieramy Twój mały świat…',error:'Nie udało się otworzyć widoku interaktywnego. Nadal możesz oglądać przygotowane widoki.',drag:'Przeciągnij, by odkrywać · Dom, ogród, biuro',tagline:'Odrobina pomocy tam, gdzie toczy się życie.',preview:'Przykładowa scena 3D',alt:'Autorska miniatura 3D domu, ogrodu i miejsca pracy',views:'Wybierz widok miniatury'},
    de:{home:'Zuhause',garden:'Garten',office:'Büro',explore:'In 3D entdecken',still:'Standbild',loading:'Deine kleine Welt wird geöffnet…',error:'Die interaktive Ansicht konnte nicht geladen werden. Die gerenderten Ansichten sind weiterhin verfügbar.',drag:'Ziehen zum Entdecken · Haus, Garten, Büro',tagline:'Ein bisschen Hilfe, wo das Leben stattfindet.',preview:'Beispielhafte 3D-Szene',alt:'Eine eigens gestaltete 3D-Miniatur von Haus, Garten und Arbeitsplatz',views:'Ansicht der Miniatur wählen'}
  };
  const copy = key => (strings[document.documentElement.lang] || strings.en)[key];
  const orbits = {home:'35deg 62deg 115%',garden:'-35deg 62deg 115%',office:'60deg 64deg 115%'};
  let view = 'home';
  let live = false;
  let loading = false;
  let viewer = null;
  let inView = true;
  let modulePromise = null;
  let imageVersion = 0;
  let pointerFrame = 0;
  function applyLabels() {
    document.querySelectorAll('[data-world-copy]').forEach(el => el.textContent = copy(el.dataset.worldCopy));
    toggle.querySelector('span').textContent = copy(loading ? 'loading' : live ? 'still' : 'explore');
    toggle.setAttribute('aria-pressed', String(live));
    stage.querySelector('.world-views').setAttribute('aria-label', copy('views'));
    poster.alt = copy('alt');
    if (viewer) viewer.alt = copy('alt');
    if (!status.hidden) status.textContent = copy(status.dataset.state === 'loading' ? 'loading' : 'error');
  }
  function resetTilt() {
    cancelAnimationFrame(pointerFrame);
    stage.style.setProperty('--world-rx','0deg');
    stage.style.setProperty('--world-ry','0deg');
  }
  function syncRotation() {
    const paused = document.body.classList.contains('motion-paused') || reduced.matches || document.hidden;
    if (paused) resetTilt();
    if (viewer) { viewer.autoRotate = live && inView && !paused; viewer.inert = !live; }
  }
  function selectView(next) {
    if (!orbits[next]) return;
    view = next;
    stage.dataset.view = view;
    stage.querySelectorAll('[data-world-view]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.worldView === view)));
    const version = ++imageVersion;
    const image = new Image();
    image.onload = () => {
      if (version !== imageVersion) return;
      poster.src = image.src;
      if (!live && !reduced.matches && !document.body.classList.contains('motion-paused')) poster.animate([{opacity:.55},{opacity:1}],{duration:350,easing:'ease-out'});
    };
    image.src = `assets/world-${view}.webp`;
    if (viewer) {
      viewer.resetTurntableRotation();
      viewer.cameraOrbit = orbits[view];
      if (reduced.matches || document.body.classList.contains('motion-paused')) viewer.jumpCameraToGoal();
    }
    resetTilt();
  }
  function openViewer() {
    if (viewer?.loaded) return Promise.resolve(viewer);
    if (!modulePromise) modulePromise = import('./vendor/model-viewer.min.js');
    return modulePromise.then(() => customElements.whenDefined('model-viewer')).then(() => new Promise((resolve,reject) => {
      if (!viewer) {
        viewer = document.createElement('model-viewer');
        viewer.className = 'world-viewer';
        viewer.inert = true;
        viewer.setAttribute('camera-controls','');
        viewer.setAttribute('disable-zoom','');
        viewer.setAttribute('disable-pan','');
        viewer.setAttribute('touch-action','pan-y');
        viewer.setAttribute('interaction-prompt','none');
        viewer.setAttribute('environment-image','neutral');
        viewer.setAttribute('shadow-intensity','.65');
        viewer.setAttribute('shadow-softness','1');
        viewer.setAttribute('exposure','1');
        viewer.setAttribute('camera-target','0m 1.35m 0.1m');
        viewer.setAttribute('camera-orbit',orbits[view]);
        viewer.setAttribute('field-of-view','30deg');
        viewer.setAttribute('rotation-per-second','4deg');
        viewer.setAttribute('auto-rotate-delay','1500');
        viewer.setAttribute('loading','eager');
        viewer.alt = copy('alt');
        stage.insertBefore(viewer,stage.querySelector('.world-top-controls'));
      }
      const timeout = setTimeout(() => finish(new Error('3D load timeout')),25000);
      const loaded = () => finish(null);
      const failed = () => finish(new Error('3D unavailable'));
      function finish(error) {
        clearTimeout(timeout);
        viewer.removeEventListener('load',loaded);
        viewer.removeEventListener('error',failed);
        error ? reject(error) : resolve(viewer);
      }
      viewer.addEventListener('load',loaded,{once:true});
      viewer.addEventListener('error',failed,{once:true});
      if (!viewer.src) viewer.src = 'assets/loqelo-world.glb';
      if (viewer.loaded) finish(null);
    }));
  }
  toggle.addEventListener('click',async () => {
    if (loading) return;
    if (live) {
      live = false;
      stage.classList.remove('is-live');
      hint.hidden = true;
      status.hidden = true;
      applyLabels();
      syncRotation();
      return;
    }
    loading = true;
    toggle.disabled = true;
    stage.setAttribute('aria-busy','true');
    status.dataset.state = 'loading';
    status.hidden = false;
    applyLabels();
    try {
      await openViewer();
      live = true;
      stage.classList.add('is-live');
      status.hidden = true;
      hint.hidden = false;
      resetTilt();
    } catch {
      status.dataset.state = 'error';
      status.textContent = copy('error');
      modulePromise = null;
    } finally {
      loading = false;
      toggle.disabled = false;
      stage.removeAttribute('aria-busy');
      applyLabels();
      syncRotation();
    }
  });
  stage.querySelectorAll('[data-world-view]').forEach(button => button.addEventListener('click',() => selectView(button.dataset.worldView)));
  stage.addEventListener('pointermove',event => {
    if (live || reduced.matches || event.pointerType === 'touch' || document.body.classList.contains('motion-paused')) return;
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX-rect.left)/rect.width-.5;
      const y = (event.clientY-rect.top)/rect.height-.5;
      stage.style.setProperty('--world-rx',`${-y*3}deg`);
      stage.style.setProperty('--world-ry',`${x*4}deg`);
    });
  });
  stage.addEventListener('pointerleave',resetTilt);
  document.querySelector('#language').addEventListener('change',applyLabels);
  document.addEventListener('visibilitychange',syncRotation);
  reduced.addEventListener('change',syncRotation);
  new MutationObserver(syncRotation).observe(document.body,{attributes:true,attributeFilter:['class']});
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {inView=entries[0].isIntersecting;syncRotation();},{threshold:.05}).observe(stage);
  applyLabels();
})();
