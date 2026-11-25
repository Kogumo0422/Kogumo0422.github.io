(() => {
  const heading = document.getElementById('fuzzing-glossary');
  if (!heading) return;

  const link = document.createElement('button');
  link.type = 'button';
  link.className = 'glossary-jump';
  link.textContent = '용어 정리 ↓';
  document.body.append(link);
  heading.tabIndex = -1;
  let readingPosition = null;

  link.addEventListener('click', () => {
    if (readingPosition !== null) {
      const position = readingPosition;
      readingPosition = null;
      link.textContent = '용어 정리 ↓';
      window.scrollTo({ top: position, behavior: 'instant' });
      return;
    }

    readingPosition = window.scrollY;
    link.textContent = '읽던 곳으로 ↑';
    heading.focus({ preventScroll: true });
    heading.scrollIntoView({ block: 'center', behavior: 'instant' });
  });
})();
