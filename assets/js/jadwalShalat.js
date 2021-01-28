const dataShalat = {
	"url": baseAPI.shalat,
    "city": Cookies.get('city'),
    "today": "today.json"
 };

document.querySelector('#kota').innerHTML=`Waktu Shalat : <b class="text-primary">${dataShalat.city}</b>`;


jadwalShalat(dataShalat.url, dataShalat.today, dataShalat.city, results => {
	console.log("Success results")
}, ()=>{
	console.log("error results")
});

