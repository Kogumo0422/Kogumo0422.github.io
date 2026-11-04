(() => {
  const toggle = document.querySelector('.console-toggle');
  const drawer = document.querySelector('.terminal-drawer');
  const close = document.querySelector('.console-close');
  const setConsole = (open) => {
    if (!drawer || !toggle) return;
    drawer.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    if (open) drawer.querySelector('input').focus();
    else toggle.focus();
  };
  toggle?.addEventListener('click', () => setConsole(drawer.hidden));
  close?.addEventListener('click', () => setConsole(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && drawer && !drawer.hidden) setConsole(false);
  });

  const cards = [...document.querySelectorAll('.champion-card')];
  if (!cards.length) return;
  const choices = [...document.querySelectorAll('[data-pick]')];
  const posts = [...document.querySelectorAll('[data-post-categories]')];
  const stage = document.querySelector('#stage-image');
  const avatar = document.querySelector('#summoner-avatar');
  const title = document.querySelector('#selected-title');
  const subtitle = document.querySelector('#selected-subtitle');
  const description = document.querySelector('#selected-description');
  const archiveTitle = document.querySelector('#archive-title');
  const empty = document.querySelector('#archive-empty');
  const english = document.querySelector('#stage-category');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const select = (category, updateUrl = true) => {
    const card = cards.find((item) => item.dataset.pick === category);
    if (category && !card) return;
    choices.forEach((choice) => {
      const selected = choice.dataset.pick === category;
      choice.classList.toggle('is-selected', selected);
      choice.setAttribute('aria-pressed', String(selected));
    });
    if (card) {
      if (avatar) {
        avatar.src = card.querySelector('img').getAttribute('src');
        avatar.alt = `${card.dataset.skin} 프로필`;
      }
      if (stage.getAttribute('src') !== card.dataset.splash) {
        stage.src = card.dataset.splash;
        stage.alt = `${card.dataset.skin} 스플래시 아트`;
        if (!reduceMotion.matches) stage.animate([{ opacity: 0.35 }, { opacity: 1 }], { duration: 400 });
      }
      title.textContent = category;
      subtitle.textContent = card.dataset.subtitle;
      description.textContent = card.dataset.description;
      english.textContent = card.dataset.english;
    } else {
      title.textContent = '모든 탐험 기록';
      subtitle.textContent = '호기심이 남긴 발자취';
      description.textContent = '각 분야에서 배우고 시도한 내용을 한곳에서 살펴보세요.';
      english.textContent = 'ALL EXPLORATIONS';
    }
    let visible = 0;
    posts.forEach((post) => {
      let categories = [];
      try { categories = JSON.parse(post.dataset.postCategories); } catch { /* Empty category list. */ }
      post.hidden = Boolean(category) && !categories.includes(category);
      if (!post.hidden) visible++;
    });
    archiveTitle.textContent = category ? `${category} 기록` : '모든 탐험 기록';
    empty.hidden = visible > 0;
    document.querySelector('#archive-empty-text').textContent = category
      ? '아직 이 분야에 작성된 글이 없습니다. 첫 번째 발견을 기다려 주세요.'
      : '아직 작성된 글이 없습니다. 첫 번째 발견을 기다려 주세요.';
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (category) url.searchParams.set('category', category);
      else url.searchParams.delete('category');
      window.history.replaceState(null, '', url);
    }
  };

  choices.forEach((choice) => choice.addEventListener('click', () => select(choice.dataset.pick)));
  document.querySelector('#show-all').addEventListener('click', () => select(''));
  const requested = new URLSearchParams(window.location.search).get('category');
  select(cards.some((card) => card.dataset.pick === requested) ? requested : 'CTF/Wargame', false);
})();
