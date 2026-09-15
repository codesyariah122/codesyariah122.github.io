(() => {
  const source = '/assets/data/quran.json';
  const select = document.querySelector('#select-surah');
  const ayatSelect = document.querySelector('#select-ayat');
  const search = document.querySelector('#quran-search');
  const suggestions = document.querySelector('#quran-suggestions');
  const open = document.querySelector('#enter-quran');
  const state = document.querySelector('#quran-state');
  const output = document.querySelector('#quran-list');
  if (!select || !ayatSelect || !search || !suggestions || !open || !state || !output) return;

  const versesPerPage = 10;
  const progressKey = 'codesyariah-quran-reading-v1';
  let surahs = [];
  let activeSurah = null;
  let activeSuggestion = -1;
  let visibleVerses = [];
  let audioState = null;
  let progress = (() => { try { return JSON.parse(localStorage.getItem(progressKey)) || {}; } catch (_) { return {}; } })();
  const esc = value => String(value || '').replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
  const normalize = value => String(value || '').toLocaleLowerCase('id').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\p{L}\p{N}]+/gu, '');
  const getSurah = number => surahs.find(item => item.number === Number(number));
  const entryFor = number => progress[number] || (progress[number] = { pages: [], verses: [] });
  const persist = () => { try { localStorage.setItem(progressKey, JSON.stringify(progress)); } catch (_) {} };
  const markPageRead = (surah, page) => { const entry = entryFor(surah); if (!entry.pages.includes(page)) { entry.pages.push(page); persist(); } return entry.pages.includes(page); };
  const toggleBookmark = (surah, verse) => { const entry = entryFor(surah); const index = entry.verses.indexOf(verse); index === -1 ? entry.verses.push(verse) : entry.verses.splice(index, 1); persist(); return entry.verses.includes(verse); };
  const aliases = { 94: 'Al-Insyirah Al Insyirah' };
  const displayName = surah => surah.number === 94 ? 'Asy-Syarh / Al-Insyirah' : surah.name.transliteration.id;
  const searchableName = surah => `${surah.number} ${surah.name.transliteration.id} ${surah.name.translation.id} ${surah.name.long} ${aliases[surah.number] || ''}`;
  const labelFor = surah => `${surah.number}. ${displayName(surah)} — ${surah.name.translation.id}`;
  const matchesFor = query => {
    const term = normalize(query);
    if (!term) return [];
    return surahs.filter(surah => normalize(searchableName(surah)).includes(term)).slice(0, 7);
  };

  function populateSurahs(query = '') {
    const current = select.value;
    const term = normalize(query);
    const choices = surahs.filter(surah => !term || normalize(searchableName(surah)).includes(term));
    select.innerHTML = `<option value="">Pilih surah dari 114 surah</option>${choices.map(surah => `<option value="${surah.number}">${esc(labelFor(surah))}</option>`).join('')}`;
    if (current && getSurah(current)) select.value = current;
  }

  function populateAyat(surah, selected = '') {
    if (!surah) { ayatSelect.innerHTML = ''; ayatSelect.hidden = true; ayatSelect.disabled = true; return; }
    ayatSelect.hidden = false;
    ayatSelect.disabled = false;
    ayatSelect.innerHTML = `<option value="">Semua ayat (${surah.numberOfVerses})</option>${surah.verses.map(verse => `<option value="${verse.number.inSurah}">Ayat ${verse.number.inSurah}</option>`).join('')}`;
    if (selected) ayatSelect.value = selected;
  }

  function showSuggestions(query) {
    const matches = matchesFor(query);
    activeSuggestion = -1;
    if (!matches.length) { suggestions.hidden = true; suggestions.innerHTML = ''; return; }
    suggestions.innerHTML = matches.map((surah, index) => `<button type="button" role="option" aria-selected="false" data-surah="${surah.number}" data-index="${index}"><strong>${esc(surah.number)}. ${esc(displayName(surah))}</strong><span>${esc(surah.name.translation.id)} · ${surah.numberOfVerses} ayat</span></button>`).join('');
    suggestions.hidden = false;
  }

  function highlightSuggestion(index) {
    const items = [...suggestions.querySelectorAll('button')];
    if (!items.length) return;
    activeSuggestion = (index + items.length) % items.length;
    items.forEach((item, itemIndex) => item.setAttribute('aria-selected', itemIndex === activeSuggestion ? 'true' : 'false'));
    items[activeSuggestion].scrollIntoView({ block: 'nearest' });
  }

  const audioSourcesFor = verse => [...(verse.audio && verse.audio.secondary ? verse.audio.secondary : []), verse.audio && verse.audio.primary].filter(Boolean);
  const formatTime = value => { if (!Number.isFinite(value)) return '0:00'; const minutes = Math.floor(value / 60); const seconds = Math.floor(value % 60); return `${minutes}:${String(seconds).padStart(2, '0')}`; };

  function stopAudio() {
    if (!audioState) return;
    audioState.audio.pause();
    audioState.player.remove();
    audioState = null;
  }

  function startAudio(ayat) {
    const index = visibleVerses.findIndex(verse => verse.number.inSurah === Number(ayat));
    if (index === -1) return;
    stopAudio();
    const player = document.createElement('section');
    player.className = 'quran-audio-player';
    player.innerHTML = `<div class="quran-audio-now"><span><i class="fas fa-wave-square"></i> Quran playlist</span><strong></strong><small>Memuat audio qari…</small></div><div class="quran-audio-controls"><button type="button" data-quran-audio-action="previous" aria-label="Ayat sebelumnya"><i class="fas fa-step-backward"></i></button><button type="button" class="quran-audio-toggle" data-quran-audio-action="toggle" aria-label="Putar audio"><i class="fas fa-play"></i></button><button type="button" data-quran-audio-action="next" aria-label="Ayat berikutnya"><i class="fas fa-step-forward"></i></button></div><div class="quran-audio-timeline"><span class="quran-audio-current">0:00</span><input type="range" min="0" max="100" value="0" aria-label="Posisi audio"><span class="quran-audio-duration">0:00</span></div><audio preload="metadata"></audio>`;
    output.querySelector('.quran-surah header')?.insertAdjacentElement('afterend', player);
    const audio = player.querySelector('audio');
    const title = player.querySelector('strong');
    const status = player.querySelector('small');
    const toggle = player.querySelector('.quran-audio-toggle');
    const range = player.querySelector('input');
    const current = player.querySelector('.quran-audio-current');
    const duration = player.querySelector('.quran-audio-duration');
    audioState = { player, audio, index, sourceIndex: 0, title, status, toggle, range, current, duration };

    const setTrack = (nextIndex, autoplay = true) => {
      if (!audioState) return;
      audioState.index = (nextIndex + visibleVerses.length) % visibleVerses.length;
      audioState.sourceIndex = 0;
      const verse = visibleVerses[audioState.index];
      const sources = audioSourcesFor(verse);
      title.textContent = `${activeSurah.name.transliteration.id} · Ayat ${verse.number.inSurah}`;
      status.textContent = 'Menyiapkan lantunan Mishary Alafasy…';
      if (!sources.length) { status.textContent = 'Audio untuk ayat ini belum tersedia.'; return; }
      audio.src = sources[0];
      audio.load();
      if (autoplay) audio.play().catch(() => { status.textContent = 'Tekan tombol putar untuk memulai audio.'; });
    };

    audio.addEventListener('loadedmetadata', () => { range.max = Math.floor(audio.duration || 0); duration.textContent = formatTime(audio.duration); status.textContent = 'Mishary Alafasy · kualitas 128 kbps'; });
    audio.addEventListener('timeupdate', () => { range.value = Math.floor(audio.currentTime || 0); current.textContent = formatTime(audio.currentTime); });
    audio.addEventListener('play', () => { toggle.innerHTML = '<i class="fas fa-pause"></i>'; toggle.setAttribute('aria-label', 'Jeda audio'); });
    audio.addEventListener('pause', () => { toggle.innerHTML = '<i class="fas fa-play"></i>'; toggle.setAttribute('aria-label', 'Putar audio'); });
    audio.addEventListener('ended', () => setTrack(audioState.index + 1));
    audio.addEventListener('error', () => {
      if (!audioState) return;
      const sources = audioSourcesFor(visibleVerses[audioState.index]);
      audioState.sourceIndex += 1;
      if (audioState.sourceIndex < sources.length) { status.textContent = 'Mencoba sumber audio cadangan…'; audio.src = sources[audioState.sourceIndex]; audio.load(); audio.play().catch(() => {}); }
      else status.textContent = 'Audio belum dapat diputar. Coba kembali beberapa saat lagi.';
    });
    player.addEventListener('click', event => {
      const action = event.target.closest('[data-quran-audio-action]')?.dataset.quranAudioAction;
      if (!action || !audioState) return;
      if (action === 'toggle') audio.paused ? audio.play().catch(() => { status.textContent = 'Browser memerlukan interaksi untuk memulai audio.'; }) : audio.pause();
      if (action === 'previous') setTrack(audioState.index - 1);
      if (action === 'next') setTrack(audioState.index + 1);
    });
    range.addEventListener('input', () => { audio.currentTime = Number(range.value); });
    setTrack(index);
  }

  function render(surah, requestedPage = 1, focusVerse = '') {
    if (!surah) { state.textContent = 'Pilih atau cari surah terlebih dahulu.'; return; }
    stopAudio();
    activeSurah = surah;
    select.value = surah.number;
    const requestedVerse = Number(focusVerse || 0);
    const totalPages = Math.ceil(surah.verses.length / versesPerPage);
    const page = Math.min(Math.max(Number(requestedVerse ? Math.ceil(requestedVerse / versesPerPage) : requestedPage), 1), totalPages);
    const start = (page - 1) * versesPerPage;
    const verses = requestedVerse ? surah.verses.filter(verse => verse.number.inSurah === requestedVerse) : surah.verses.slice(start, start + versesPerPage);
    visibleVerses = verses;
    const pageRead = markPageRead(surah.number, page);
    const bookmarks = entryFor(surah.number).verses.length;
    populateAyat(surah, requestedVerse || '');
    const pager = requestedVerse ? `<div class="quran-selected-ayat"><span>Menampilkan Ayat ${requestedVerse} dari ${surah.numberOfVerses}</span><button type="button" class="quran-show-all">Tampilkan semua ayat</button></div>` : `<nav class="quran-pager" aria-label="Navigasi ayat"><button class="quran-reader-page" data-surah="${surah.number}" data-page="${page - 1}" ${page === 1 ? 'disabled' : ''}><i class="fas fa-arrow-left"></i> Sebelumnya</button><span>Ayat ${start + 1}–${Math.min(start + versesPerPage, surah.numberOfVerses)} dari ${surah.numberOfVerses}<small>Halaman ${page} / ${totalPages} · ${pageRead ? '✓ sudah dibaca' : ''}</small></span><button class="quran-reader-page" data-surah="${surah.number}" data-page="${page + 1}" ${page === totalPages ? 'disabled' : ''}>Selanjutnya <i class="fas fa-arrow-right"></i></button></nav>`;
    const bismillah = surah.preBismillah && surah.preBismillah.text ? `<p class="quran-bismillah" lang="ar">${esc(surah.preBismillah.text.arab)}</p>` : '';
    const completed = !requestedVerse && page === totalPages ? `<aside class="quran-complete"><i class="fas fa-book-reader"></i><div><span>Alhamdulillah</span><h3>Anda telah menyelesaikan Surah ${esc(displayName(surah))}.</h3><p>Semoga bacaan ini membawa ketenangan dan kebaikan.</p></div><button type="button" class="quran-clear"><i class="fas fa-check"></i> Selesai & rapikan view</button></aside>` : '';
    output.innerHTML = `<article class="quran-surah quran-page-turn"><header><div><span>Surah ${surah.number} · ${surah.numberOfVerses} ayat · ${bookmarks} bookmark</span><h2 lang="ar">${esc(surah.name.long)}</h2><h3>${esc(displayName(surah))} <small>— ${esc(surah.name.translation.id)}</small></h3></div><button class="quran-tafsir" data-tafsir="${surah.number}" type="button">Tentang surah <i class="fas fa-book-open"></i></button></header>${bismillah}${pager}<div class="quran-verses">${verses.map(verse => { const saved = entryFor(surah.number).verses.includes(verse.number.inSurah); return `<article class="quran-verse" id="ayat-${verse.number.inSurah}"><div class="quran-verse-meta"><span>${verse.number.inSurah}</span><button type="button" class="quran-play" data-ayat="${verse.number.inSurah}" aria-label="Putar ayat ${verse.number.inSurah}"><i class="fas fa-play"></i></button><button type="button" class="quran-bookmark ${saved ? 'is-saved' : ''}" data-surah="${surah.number}" data-ayat="${verse.number.inSurah}" data-page="${page}" aria-label="${saved ? 'Hapus bookmark' : 'Simpan bookmark'} ayat ${verse.number.inSurah}"><i class="${saved ? 'fas' : 'far'} fa-bookmark"></i></button></div><p class="quran-arabic" lang="ar" dir="rtl">${esc(verse.text.arab)}</p><p class="quran-latin">${esc(verse.text.transliteration.en)}</p><p class="quran-translation">${esc(verse.translation.id)}</p><details><summary>Tafsir ringkas</summary><p>${esc(verse.tafsir && verse.tafsir.id ? verse.tafsir.id.short : 'Tafsir belum tersedia.')}</p></details></article>`; }).join('')}</div>${pager}${completed}</article>`;
    state.textContent = requestedVerse ? `${displayName(surah)}: menampilkan Ayat ${requestedVerse}.` : `${displayName(surah)}: ayat ${start + 1}–${Math.min(start + versesPerPage, surah.numberOfVerses)} dari ${surah.numberOfVerses}.`;
    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (requestedVerse) requestAnimationFrame(() => document.querySelector(`#ayat-${requestedVerse}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  }

  function chooseSurah(surah, verse = '') {
    if (!surah) return;
    search.value = displayName(surah);
    populateSurahs(search.value);
    suggestions.hidden = true;
    render(surah, 1, verse);
  }

  function showTafsir(surah) {
    output.insertAdjacentHTML('afterbegin', `<aside class="quran-tafsir-panel"><button type="button" class="quran-close" aria-label="Tutup">×</button><span>Pengantar surah</span><h3>${esc(surah.name.transliteration.id)} — ${esc(surah.name.translation.id)}</h3><p>${esc(surah.tafsir.id)}</p><small>${esc(surah.revelation.id)} · ${surah.numberOfVerses} ayat</small></aside>`);
  }

  fetch(source).then(response => { if (!response.ok) throw new Error('File Quran tidak dapat dimuat'); return response.json(); }).then(payload => { surahs = payload.data || []; populateSurahs(); state.textContent = '114 surah siap dibaca dari data lokal.'; }).catch(error => { state.classList.add('is-error'); state.textContent = `${error.message}. Coba muat ulang halaman.`; });
  search.addEventListener('input', () => { populateSurahs(search.value); showSuggestions(search.value); });
  search.addEventListener('keydown', event => {
    const items = suggestions.querySelectorAll('button');
    if (event.key === 'ArrowDown' && items.length) { event.preventDefault(); highlightSuggestion(activeSuggestion + 1); }
    if (event.key === 'ArrowUp' && items.length) { event.preventDefault(); highlightSuggestion(activeSuggestion - 1); }
    if (event.key === 'Escape') suggestions.hidden = true;
    if (event.key === 'Enter') { event.preventDefault(); const match = activeSuggestion >= 0 ? getSurah(items[activeSuggestion].dataset.surah) : matchesFor(search.value)[0]; if (match) chooseSurah(match); else state.textContent = 'Surah tidak ditemukan. Coba nama atau nomor surah lain.'; }
  });
  suggestions.addEventListener('click', event => { const item = event.target.closest('[data-surah]'); if (item) chooseSurah(getSurah(item.dataset.surah)); });
  select.addEventListener('change', () => { const surah = getSurah(select.value); if (surah) chooseSurah(surah); else populateAyat(null); });
  ayatSelect.addEventListener('change', () => { if (activeSurah) render(activeSurah, 1, ayatSelect.value); });
  open.addEventListener('click', () => { const selected = getSurah(select.value); const match = matchesFor(search.value)[0]; if (selected) render(selected, 1, ayatSelect.value); else if (match) chooseSurah(match); else { output.innerHTML = ''; populateAyat(null); state.textContent = 'Surah tidak ditemukan. Gunakan nama, alias, atau nomor surah.'; } });
  document.addEventListener('click', event => { if (!event.target.closest('.quran-search')) suggestions.hidden = true; });
  output.addEventListener('click', event => { const pageButton = event.target.closest('.quran-reader-page'); if (pageButton && !pageButton.disabled) { ayatSelect.value = ''; render(getSurah(pageButton.dataset.surah), pageButton.dataset.page); } const bookmark = event.target.closest('.quran-bookmark'); if (bookmark) { toggleBookmark(Number(bookmark.dataset.surah), Number(bookmark.dataset.ayat)); render(getSurah(bookmark.dataset.surah), bookmark.dataset.page, ayatSelect.value); } const play = event.target.closest('.quran-play'); if (play) startAudio(play.dataset.ayat); const tafsir = event.target.closest('.quran-tafsir'); if (tafsir) showTafsir(getSurah(tafsir.dataset.tafsir)); if (event.target.closest('.quran-close')) event.target.closest('.quran-tafsir-panel').remove(); if (event.target.closest('.quran-show-all')) { ayatSelect.value = ''; render(activeSurah); } if (event.target.closest('.quran-clear')) { stopAudio(); output.innerHTML = ''; activeSurah = null; select.value = ''; search.value = ''; populateSurahs(); populateAyat(null); state.textContent = 'Reader telah dirapikan. Pilih surah lain untuk melanjutkan.'; document.querySelector('.quran-reader-shell').scrollIntoView({ behavior: 'smooth', block: 'start' }); } });
})();
