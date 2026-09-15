(() => {
  const source = '/assets/data/quran.json';
  const select = document.querySelector('#select-surah');
  const search = document.querySelector('#quran-search');
  const open = document.querySelector('#enter-quran');
  const state = document.querySelector('#quran-state');
  const output = document.querySelector('#quran-list');
  if (!select || !search || !open || !state || !output) return;

  let surahs = [];
  const esc = value => String(value || '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const getSurah = number => surahs.find(item => item.number === Number(number));
  const progressKey = 'codesyariah-quran-reading-v1';
  let progress = (() => { try { return JSON.parse(localStorage.getItem(progressKey)) || {}; } catch (_) { return {}; } })();
  const entryFor = number => progress[number] || (progress[number] = { pages: [], verses: [] });
  const persist = () => { try { localStorage.setItem(progressKey, JSON.stringify(progress)); } catch (_) {} };
  const markPageRead = (surah, page) => { const entry = entryFor(surah); if (!entry.pages.includes(page)) { entry.pages.push(page); persist(); } return entry.pages.includes(page); };
  const toggleVerseBookmark = (surah, verse) => { const entry = entryFor(surah); const index = entry.verses.indexOf(verse); index === -1 ? entry.verses.push(verse) : entry.verses.splice(index, 1); persist(); return entry.verses.includes(verse); };

  function populate(query = '') {
    const term = query.trim().toLocaleLowerCase('id');
    const items = surahs.filter(surah => !term || [surah.number, surah.name.transliteration.id, surah.name.translation.id, surah.name.short].join(' ').toLocaleLowerCase('id').includes(term));
    select.innerHTML = '<option value="">Pilih surah dari 114 surah</option>' + items.map(surah => `<option value="${surah.number}">${surah.number}. ${esc(surah.name.transliteration.id)} — ${esc(surah.name.translation.id)}</option>`).join('');
  }

  const versesPerPage = 10;
  function render(surah, requestedPage = 1) {
    if (!surah) return;
    const totalPages = Math.ceil(surah.verses.length / versesPerPage);
    const page = Math.min(Math.max(Number(requestedPage), 1), totalPages);
    const start = (page - 1) * versesPerPage;
    const verses = surah.verses.slice(start, start + versesPerPage);
    const pageRead = markPageRead(surah.number, page);
    const bookmarkCount = entryFor(surah.number).verses.length;
    const pager = `<nav class="quran-pager" aria-label="Navigasi ayat"><button class="quran-reader-page" data-surah="${surah.number}" data-page="${page - 1}" ${page === 1 ? 'disabled' : ''}><i class="fas fa-arrow-left"></i> Sebelumnya</button><span>Ayat ${start + 1}–${Math.min(start + versesPerPage, surah.numberOfVerses)} dari ${surah.numberOfVerses}<small>Halaman ${page} / ${totalPages} · ${pageRead ? '✓ sudah dibaca' : ''}</small></span><button class="quran-reader-page" data-surah="${surah.number}" data-page="${page + 1}" ${page === totalPages ? 'disabled' : ''}>Selanjutnya <i class="fas fa-arrow-right"></i></button></nav>`;
    const bismillah = surah.preBismillah && surah.preBismillah.text ? `<p class="quran-bismillah" lang="ar">${esc(surah.preBismillah.text.arab)}</p>` : '';
    const complete = page === totalPages ? `<aside class="quran-complete"><i class="fas fa-book-reader"></i><div><span>Alhamdulillah</span><h3>Anda telah menyelesaikan Surah ${esc(surah.name.transliteration.id)}.</h3><p>Semoga bacaan ini membawa ketenangan dan kebaikan.</p></div><button type="button" class="quran-clear"><i class="fas fa-check"></i> Selesai & rapikan view</button></aside>` : '';
    output.innerHTML = `<article class="quran-surah quran-page-turn"><header><div><span>Surah ${surah.number} · ${surah.numberOfVerses} ayat · ${bookmarkCount} bookmark</span><h2 lang="ar">${esc(surah.name.long)}</h2><h3>${esc(surah.name.transliteration.id)} <small>— ${esc(surah.name.translation.id)}</small></h3></div><button class="quran-tafsir" data-tafsir="${surah.number}" type="button">Tentang surah <i class="fas fa-book-open"></i></button></header>${bismillah}${pager}<div class="quran-verses">${verses.map(verse => { const saved = entryFor(surah.number).verses.includes(verse.number.inSurah); return `<article class="quran-verse" id="ayat-${verse.number.inSurah}"><div class="quran-verse-meta"><span>${verse.number.inSurah}</span><button type="button" class="quran-play" data-audio="${esc(verse.audio.primary)}" aria-label="Putar ayat ${verse.number.inSurah}"><i class="fas fa-play"></i></button><button type="button" class="quran-bookmark ${saved ? 'is-saved' : ''}" data-surah="${surah.number}" data-ayat="${verse.number.inSurah}" data-page="${page}" aria-label="${saved ? 'Hapus bookmark' : 'Simpan bookmark'} ayat ${verse.number.inSurah}"><i class="${saved ? 'fas' : 'far'} fa-bookmark"></i></button></div><p class="quran-arabic" lang="ar" dir="rtl">${esc(verse.text.arab)}</p><p class="quran-latin">${esc(verse.text.transliteration.en)}</p><p class="quran-translation">${esc(verse.translation.id)}</p><details><summary>Tafsir ringkas</summary><p>${esc(verse.tafsir && verse.tafsir.id ? verse.tafsir.id.short : 'Tafsir belum tersedia.')}</p></details></article>`; }).join('')}</div>${pager}${complete}</article>`;
    state.textContent = `${surah.name.transliteration.id}: ayat ${start + 1}–${Math.min(start + versesPerPage, surah.numberOfVerses)} dari ${surah.numberOfVerses}.`;
    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function showTafsir(surah) {
    output.insertAdjacentHTML('afterbegin', `<aside class="quran-tafsir-panel"><button type="button" class="quran-close" aria-label="Tutup">×</button><span>Pengantar surah</span><h3>${esc(surah.name.transliteration.id)} — ${esc(surah.name.translation.id)}</h3><p>${esc(surah.tafsir.id)}</p><small>${esc(surah.revelation.id)} · ${surah.numberOfVerses} ayat</small></aside>`);
  }

  fetch(source).then(response => { if (!response.ok) throw new Error('File Quran tidak dapat dimuat'); return response.json(); }).then(payload => { surahs = payload.data || []; populate(); state.textContent = '114 surah siap dibaca dari data lokal.'; }).catch(error => { state.classList.add('is-error'); state.textContent = `${error.message}. Coba muat ulang halaman.`; });
  search.addEventListener('input', () => populate(search.value));
  open.addEventListener('click', () => render(getSurah(select.value)));
  select.addEventListener('change', () => { if (select.value) render(getSurah(select.value)); });
  output.addEventListener('click', event => { const pageButton = event.target.closest('.quran-reader-page'); if (pageButton && !pageButton.disabled) render(getSurah(pageButton.dataset.surah), pageButton.dataset.page); const bookmark = event.target.closest('.quran-bookmark'); if (bookmark) { toggleVerseBookmark(Number(bookmark.dataset.surah), Number(bookmark.dataset.ayat)); render(getSurah(bookmark.dataset.surah), bookmark.dataset.page); } const play = event.target.closest('.quran-play'); if (play) { document.querySelectorAll('.quran-audio').forEach(audio => audio.remove()); const audio = document.createElement('audio'); audio.className = 'quran-audio'; audio.src = play.dataset.audio; audio.controls = true; audio.autoplay = true; play.closest('.quran-verse').appendChild(audio); } const tafsir = event.target.closest('.quran-tafsir'); if (tafsir) showTafsir(getSurah(tafsir.dataset.tafsir)); if (event.target.closest('.quran-close')) event.target.closest('.quran-tafsir-panel').remove(); if (event.target.closest('.quran-clear')) { output.innerHTML = ''; select.value = ''; search.value = ''; populate(); state.textContent = 'Reader telah dirapikan. Pilih surah lain untuk melanjutkan.'; document.querySelector('.quran-reader-shell').scrollIntoView({ behavior: 'smooth', block: 'start' }); } });
})();
