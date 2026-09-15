(() => {
  const key = 'codesyariah-reader-theme';
  const root = document.body;
  const toggle = document.querySelector('[data-reader-theme]');
  const applyTheme = (dark) => {
    root.classList.toggle('reader-dark', dark);
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
    toggle.querySelector('i').className = dark ? 'far fa-sun' : 'far fa-moon';
    toggle.querySelector('span').textContent = dark ? 'Mode terang' : 'Mode gelap';
  };
  const saved = localStorage.getItem(key);
  if (saved) applyTheme(saved === 'dark');
  toggle?.addEventListener('click', () => {
    const dark = !root.classList.contains('reader-dark');
    localStorage.setItem(key, dark ? 'dark' : 'light');
    applyTheme(dark);
  });

  const article = document.querySelector('[data-reader-article]');
  const toc = document.querySelector('[data-reader-toc]');
  const opening = article?.querySelector('p:first-child');
  if (opening && /[\u0600-\u06FF]/.test(opening.textContent)) {
    article.classList.add('has-arabic-opening');
    opening.classList.add('reader-arabic-opening');
    opening.setAttribute('dir', 'rtl');
    opening.setAttribute('lang', 'ar');
  }
  if (article && toc) {
    const headings = [...article.querySelectorAll('h2, h3')];
    if (headings.length) {
      const list = toc.querySelector('ol');
      headings.forEach((heading, index) => {
        const id = heading.id || `section-${index + 1}`;
        heading.id = id;
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = heading.textContent;
        if (heading.tagName === 'H3') link.style.paddingLeft = '.65rem';
        item.appendChild(link); list.appendChild(item);
      });
      toc.hidden = false;
    }
  }
  const progress = document.querySelector('[data-reader-progress]');
  const updateProgress = () => {
    if (!progress || !article) return;
    const total = Math.max(article.offsetHeight - window.innerHeight * .45, 1);
    const passed = Math.max(0, window.scrollY - article.offsetTop + window.innerHeight * .15);
    progress.style.width = `${Math.min(100, (passed / total) * 100)}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();
