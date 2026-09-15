(() => {
  const box = document.querySelector('#prayer-times');
  const place = document.querySelector('#prayer-location');
  const reminder = document.querySelector('#prayer-reminder');
  const enable = document.querySelector('#prayer-notification-enable');
  const test = document.querySelector('#prayer-notification-test');
  const reminderStatus = document.querySelector('#prayer-reminder-status');
  if (!box || !place || !reminder || !enable || !test || !reminderStatus) return;

  const prayerNames = { Fajr: 'Subuh', Dhuhr: 'Zuhur', Asr: 'Asar', Maghrib: 'Magrib', Isha: 'Isya' };
  const selectedKey = 'codesyariah-prayer-reminders-v1';
  const firedKey = 'codesyariah-prayer-reminder-fired-v1';
  let timings = {};
  let selected = new Set((() => { try { return JSON.parse(localStorage.getItem(selectedKey)) || []; } catch (_) { return []; } })());
  let audioContext;
  let monitor;

  const saveSelected = () => { try { localStorage.setItem(selectedKey, JSON.stringify([...selected])); } catch (_) {} };
  const notificationSupported = () => 'Notification' in window;
  const permission = () => notificationSupported() ? Notification.permission : 'unsupported';
  const selectedText = () => selected.size ? `${selected.size} waktu salat dipilih.` : 'Belum ada waktu salat yang dipilih.';

  function updateReminderUi(message = '') {
    const currentPermission = permission();
    enable.disabled = currentPermission === 'denied' || currentPermission === 'unsupported';
    enable.innerHTML = currentPermission === 'granted' ? '<i class="fas fa-check"></i> Notifikasi aktif' : '<i class="far fa-bell"></i> Aktifkan notifikasi';
    test.disabled = currentPermission !== 'granted';
    reminder.classList.toggle('is-enabled', currentPermission === 'granted');
    reminderStatus.textContent = message || (currentPermission === 'granted' ? `${selectedText()} Alarm berjalan selama halaman terbuka.` : currentPermission === 'denied' ? 'Notifikasi diblokir browser. Aktifkan kembali dari pengaturan situs.' : currentPermission === 'unsupported' ? 'Browser ini belum mendukung notifikasi.' : `${selectedText()} Aktifkan notifikasi untuk menjalankan alarm.`);
    box.querySelectorAll('.prayer-alarm').forEach(button => {
      const isSelected = selected.has(button.dataset.prayer);
      button.classList.toggle('is-selected', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
      button.innerHTML = isSelected ? '<i class="fas fa-bell"></i> Alarm aktif' : '<i class="far fa-bell"></i> Ingatkan';
    });
  }

  function unlockSound() {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return;
    audioContext = audioContext || new Context();
    audioContext.resume?.();
  }

  function playChime() {
    if (!audioContext) return;
    const start = audioContext.currentTime;
    [0, .23].forEach((offset, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = index ? 784 : 659;
      gain.gain.setValueAtTime(.0001, start + offset);
      gain.gain.exponentialRampToValueAtTime(.11, start + offset + .02);
      gain.gain.exponentialRampToValueAtTime(.0001, start + offset + .2);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start(start + offset);
      oscillator.stop(start + offset + .22);
    });
  }

  function notify(prayer, isTest = false) {
    const name = prayerNames[prayer] || prayer;
    playChime();
    if (permission() === 'granted') {
      const notification = new Notification(isTest ? 'Tes pengingat shalat' : `Waktu ${name}`, { body: isTest ? 'Suara dan notifikasi CodeSyariah siap digunakan.' : `Sudah masuk waktu ${name}. Semoga dimudahkan untuk menunaikan shalat.`, tag: isTest ? 'codesyariah-prayer-test' : `codesyariah-prayer-${prayer}`, renotify: true });
      notification.onclick = () => { window.focus(); notification.close(); };
    }
  }

  function todayKey() { return new Date().toLocaleDateString('sv-SE'); }
  function checkReminders() {
    if (permission() !== 'granted' || !selected.size || !Object.keys(timings).length) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    let fired = (() => { try { return JSON.parse(localStorage.getItem(firedKey)) || {}; } catch (_) { return {}; } })();
    Object.entries(timings).forEach(([prayer, value]) => {
      const id = `${todayKey()}-${prayer}`;
      if (selected.has(prayer) && value.slice(0, 5) === time && !fired[id]) { fired[id] = true; notify(prayer); }
    });
    try { localStorage.setItem(firedKey, JSON.stringify(fired)); } catch (_) {}
  }

  function startMonitoring() {
    clearInterval(monitor);
    checkReminders();
    monitor = setInterval(checkReminders, 15000);
  }

  function togglePrayer(prayer) {
    selected.has(prayer) ? selected.delete(prayer) : selected.add(prayer);
    saveSelected();
    updateReminderUi();
  }

  function render(t) {
    timings = t;
    box.innerHTML = Object.entries(prayerNames).map(([key, label]) => `<article><span>${label}</span><strong>${t[key]}</strong><button type="button" class="prayer-alarm" data-prayer="${key}" aria-pressed="false"><i class="far fa-bell"></i> Ingatkan</button></article>`).join('');
    updateReminderUi();
    startMonitoring();
  }

  function show(lat, lon, label) {
    fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=20`).then(response => { if (!response.ok) throw new Error('API jadwal belum tersedia'); return response.json(); }).then(result => { place.textContent = label; render(result.data.timings); }).catch(() => { place.textContent = 'Jadwal belum tersedia'; box.innerHTML = '<div class="prayer-loading">Tidak dapat memuat jadwal saat ini.</div>'; });
  }

  box.addEventListener('click', event => { const button = event.target.closest('.prayer-alarm'); if (button) togglePrayer(button.dataset.prayer); });
  enable.addEventListener('click', async () => {
    if (!notificationSupported()) { updateReminderUi(); return; }
    unlockSound();
    const result = permission() === 'granted' ? 'granted' : await Notification.requestPermission();
    updateReminderUi(result === 'granted' ? 'Notifikasi aktif. Gunakan Tes alarm untuk memastikan suara terdengar.' : 'Izin notifikasi belum diberikan.');
    if (result === 'granted') startMonitoring();
  });
  test.addEventListener('click', () => { unlockSound(); notify('Fajr', true); updateReminderUi('Tes alarm dikirim. Pastikan volume perangkat tidak dalam mode senyap.'); });
  updateReminderUi();
  navigator.geolocation ? navigator.geolocation.getCurrentPosition(position => show(position.coords.latitude, position.coords.longitude, 'Jadwal berdasarkan lokasi Anda'), () => show(-6.2088, 106.8456, 'Jakarta · aktifkan lokasi untuk jadwal presisi')) : show(-6.2088, 106.8456, 'Jakarta · browser tidak mendukung lokasi');
})();
