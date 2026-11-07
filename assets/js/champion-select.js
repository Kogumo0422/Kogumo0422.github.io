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

  const shareButton = document.querySelector('.share-trigger');
  const shareStatus = document.querySelector('.share-status');
  let shareTimer;
  const copyPageLink = async () => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        return;
      } catch { /* Try the selection-based fallback. */ }
    }
    const field = document.createElement('textarea');
    field.value = window.location.href;
    field.readOnly = true;
    field.style.cssText = 'position:fixed;left:-9999px;top:0;';
    document.body.append(field);
    try {
      field.select();
      field.setSelectionRange(0, field.value.length);
      if (!document.execCommand('copy')) throw new Error('Copy unavailable');
    } finally {
      field.remove();
      shareButton.focus({ preventScroll: true });
    }
  };
  shareButton?.addEventListener('click', async () => {
    clearTimeout(shareTimer);
    try {
      await copyPageLink();
      shareStatus.textContent = '링크를 복사했습니다.';
    } catch {
      shareStatus.textContent = '주소창의 링크를 복사해 주세요.';
    }
    shareTimer = setTimeout(() => { shareStatus.textContent = ''; }, 3000);
  });

  const cards = [...document.querySelectorAll('.champion-card')];
  if (!cards.length) return;
  const posts = [...document.querySelectorAll('[data-post-categories]')];
  const stage = document.querySelector('#stage-image');
  const avatar = document.querySelector('#summoner-avatar');
  const title = document.querySelector('#selected-title');
  const subtitle = document.querySelector('#selected-subtitle');
  const description = document.querySelector('#selected-description');
  const archiveTitle = document.querySelector('#archive-title');
  const showAll = document.querySelector('#show-all');
  const archiveJump = document.querySelector('#lock-in');
  const archiveJumpLabel = archiveJump.querySelector('span');
  const empty = document.querySelector('#archive-empty');
  const english = document.querySelector('#stage-category');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pagination = document.querySelector('.archive-pagination');
  const previousPage = document.querySelector('#archive-prev');
  const nextPage = document.querySelector('#archive-next');
  const pageStatus = document.querySelector('#archive-page-status');
  const pageSize = 10;
  let selectedCategory = '';
  let currentPage = 1;

  const select = (category, page = 1, updateUrl = true) => {
    const card = cards.find((item) => item.dataset.pick === category);
    if (category && !card) return;
    selectedCategory = category;
    showAll.hidden = !card;
    archiveJump.hidden = !card;
    if (card) archiveJumpLabel.textContent = `${category} 글 목록으로`;
    cards.forEach((choice) => {
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
        if (!reduceMotion.matches) stage.animate([{ opacity: 0.6 }, { opacity: 1 }], { duration: 220 });
      }
      title.textContent = category;
      subtitle.textContent = card.dataset.subtitle;
      description.textContent = card.dataset.description;
      english.textContent = card.dataset.english;
    } else {
      title.textContent = '전체 기록';
      subtitle.textContent = '분야별 학습 기록';
      description.textContent = '모든 분야의 실습과 학습 기록을 확인할 수 있습니다.';
      english.textContent = 'ALL FIELDS';
    }
    const matchingPosts = posts.filter((post) => {
      let categories = [];
      try { categories = JSON.parse(post.dataset.postCategories); } catch { /* Empty category list. */ }
      return !category || categories.includes(category);
    });
    const pageCount = Math.max(1, Math.ceil(matchingPosts.length / pageSize));
    currentPage = Math.min(pageCount, Math.max(1, Number.isSafeInteger(page) ? page : 1));
    const offset = (currentPage - 1) * pageSize;
    const visiblePosts = new Set(matchingPosts.slice(offset, offset + pageSize));
    posts.forEach((post) => { post.hidden = !visiblePosts.has(post); });
    pagination.hidden = matchingPosts.length <= pageSize;
    previousPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage === pageCount;
    pageStatus.textContent = `총 ${matchingPosts.length}개 · ${currentPage} / ${pageCount} 페이지`;
    archiveTitle.textContent = category ? `${category} 기록` : '전체 기록';
    empty.hidden = matchingPosts.length > 0;
    document.querySelector('#archive-empty-text').textContent = category
      ? '아직 이 분야에 작성된 글이 없습니다.'
      : '아직 작성된 글이 없습니다.';
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (category) url.searchParams.set('category', category);
      else url.searchParams.delete('category');
      if (currentPage > 1) url.searchParams.set('page', String(currentPage));
      else url.searchParams.delete('page');
      window.history.replaceState(null, '', url);
    }
  };

  cards.forEach((choice) => choice.addEventListener('click', () => select(choice.dataset.pick)));
  showAll.addEventListener('click', () => {
    select('');
    archiveTitle.focus({ preventScroll: true });
  });
  const changePage = (offset) => {
    select(selectedCategory, currentPage + offset);
    archiveTitle.focus();
  };
  previousPage.addEventListener('click', () => changePage(-1));
  nextPage.addEventListener('click', () => changePage(1));
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('category');
  const requestedPage = Number(params.get('page') || 1);
  select(cards.some((card) => card.dataset.pick === requested) ? requested : '', requestedPage, false);
})();
