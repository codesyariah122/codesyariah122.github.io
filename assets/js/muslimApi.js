const Data = {
    ip: getCookie('ip_addr'),
    kota: document.querySelector('#kota'),
    tgl: document.querySelector('#tanggal'),
    adzan: document.querySelector('#waktu-adzan'),
    api: {
        shalat: 'https://api.pray.zone/v2/times/today.json?',
        geo: 'https://ipapi.co/'
    }
}


const city = getCookie('city')

jadwalShalat(Data.api.shalat, `city=${city}`)
.then( res => res.json())
.then( res => {
    const dataShalat = [
        {city: city},
        {data: res.results.datetime[0]}
    ]
    showJadwalShalat(dataShalat)
})