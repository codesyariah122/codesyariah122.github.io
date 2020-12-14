const today = 'today.json';
const city = Cookies.get('city');

document.querySelector('#kota').innerHTML=`Waktu Shalat : <b>${city}</b>`;

jadwalShalat(today, city);
