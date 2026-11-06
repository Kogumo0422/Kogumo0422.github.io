(() => {
  const calendar = document.querySelector('.news-calendar');
  const monthLabel = document.querySelector('#calendar-month-label');
  const days = document.querySelector('#calendar-days');
  const news = [...document.querySelectorAll('[data-news-date]')];
  const title = document.querySelector('#news-archive-title');
  const count = document.querySelector('#news-count');
  const empty = document.querySelector('#news-empty');
  const emptyText = document.querySelector('#news-empty-text');
  const showAll = document.querySelector('#news-show-all');
  const dayCounts = new Map();

  for (const item of news) {
    const date = item.dataset.newsDate;
    dayCounts.set(date, (dayCounts.get(date) ?? 0) + 1);
  }

  const seoulMonth = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul', year: 'numeric', month: 'numeric',
  }).formatToParts(new Date());
  const [year, month] = news.length
    ? news[0].dataset.newsDate.split('-').map(Number)
    : [seoulMonth.find((part) => part.type === 'year').value,
       seoulMonth.find((part) => part.type === 'month').value];
  const viewMonth = new Date(Date.UTC(year, month - 1, 1));

  const dayLabel = (date) => {
    const [year, month, day] = date.split('-').map(Number);
    return `${year}년 ${month}월 ${day}일`;
  };

  const filterNews = (date = '') => {
    const visibleCount = date ? (dayCounts.get(date) ?? 0) : news.length;
    for (const item of news) item.hidden = Boolean(date) && item.dataset.newsDate !== date;
    for (const button of days.querySelectorAll('button')) {
      button.setAttribute('aria-pressed', String(button.dataset.date === date));
    }
    title.textContent = date ? `${dayLabel(date)} 뉴스` : '전체 뉴스';
    count.textContent = `${visibleCount}개`;
    showAll.setAttribute('aria-pressed', String(!date));
    empty.hidden = visibleCount > 0;
    emptyText.textContent = date
      ? '선택한 날짜에 올라온 뉴스가 없습니다.'
      : '첫 글이 올라오면 이곳에서 확인하실 수 있습니다.';
  };

  const renderMonth = () => {
    const year = viewMonth.getUTCFullYear();
    const month = viewMonth.getUTCMonth();
    const prefix = viewMonth.toISOString().slice(0, 7);
    const firstWeekday = viewMonth.getUTCDay();
    const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    const fragment = document.createDocumentFragment();

    monthLabel.textContent = `${year}년 ${month + 1}월`;
    for (let offset = 0; offset < firstWeekday + lastDay; offset += 7) {
      const week = document.createElement('tr');
      for (let weekday = 0; weekday < 7; weekday++) {
        const cell = week.insertCell();
        const day = offset + weekday - firstWeekday + 1;
        if (day < 1 || day > lastDay) continue;
        const date = `${prefix}-${String(day).padStart(2, '0')}`;
        const newsCount = dayCounts.get(date) ?? 0;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'calendar-day';
        button.dataset.date = date;
        button.textContent = day;
        button.classList.toggle('has-news', newsCount > 0);
        button.setAttribute('aria-label', `${dayLabel(date)}, 뉴스 ${newsCount}개`);
        button.setAttribute('aria-pressed', 'false');
        cell.append(button);
      }
      fragment.append(week);
    }
    days.replaceChildren(fragment);
  };

  const changeMonth = (offset) => {
    viewMonth.setUTCMonth(viewMonth.getUTCMonth() + offset);
    renderMonth();
    filterNews();
  };

  document.querySelector('#calendar-prev').addEventListener('click', () => changeMonth(-1));
  document.querySelector('#calendar-next').addEventListener('click', () => changeMonth(1));
  showAll.addEventListener('click', () => filterNews());
  days.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-date]');
    if (button) filterNews(button.dataset.date);
  });

  renderMonth();
  calendar.hidden = false;
  showAll.hidden = false;
})();
