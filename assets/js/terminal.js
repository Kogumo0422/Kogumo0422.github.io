(() => {
  const form = document.querySelector('.terminal-form');
  if (!form) return;
  const input = form.querySelector('.terminal-input');
  const output = document.querySelector('.terminal-output');
  const history = output.querySelector('.terminal-history');
  const index = document.querySelector('#terminal-posts');
  const normalizeTitle = (value) => value.normalize('NFC').trim().replace(/\s+/g, ' ');
  const posts = [...(index?.content.querySelectorAll('a[data-title]') || [])].map((link) => ({
    title: normalizeTitle(link.dataset.title),
    url: link.getAttribute('href'),
  }));
  let outputTimer;
  const clearOutput = () => {
    history.replaceChildren();
    output.hidden = true;
  };
  const showOutput = (command, response) => {
    clearTimeout(outputTimer);
    const entry = document.createElement('li');
    const prompt = document.createElement('div');
    prompt.className = 'terminal-command';
    prompt.textContent = `$ ${command}`;
    const result = document.createElement('pre');
    result.textContent = response;
    entry.append(prompt, result);
    history.append(entry);
    while (history.children.length > 12) history.firstElementChild.remove();
    output.hidden = false;
    output.scrollTop = output.scrollHeight;
    outputTimer = setTimeout(clearOutput, 15000);
  };
  input.addEventListener('input', () => {
    input.style.width = `${Math.max(1, Math.min(input.value.length + 1, 30))}ch`;
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const command = input.value.trim();
    if (!command) return;
    input.value = '';
    input.style.width = '1ch';
    input.focus();
    if (command === 'clear') {
      clearTimeout(outputTimer);
      clearOutput();
      return;
    }
    if (command === 'ls') {
      showOutput(command, [...posts.map((post) => post.title), 'flag.txt'].join('\n'));
      return;
    }
    const cat = command.match(/^cat\s+([\s\S]+)$/);
    if (!cat) return;
    let requested = normalizeTitle(cat[1]);
    if ((requested.startsWith('"') && requested.endsWith('"')) || (requested.startsWith("'") && requested.endsWith("'"))) {
      requested = normalizeTitle(requested.slice(1, -1));
    }
    if (requested === 'flag.txt') {
      showOutput(command, '축하합니다 flag를 얻으셨어요!');
      return;
    }
    const post = posts.find((entry) => entry.title === requested);
    if (!post) return;
    const destination = new URL(post.url, window.location.href);
    if (destination.origin !== window.location.origin || !['http:', 'https:'].includes(destination.protocol)) return;
    window.location.assign(destination.href);
  });
})();
