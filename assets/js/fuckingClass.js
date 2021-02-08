let code = getCookie('code')
let ip = getCookie('ip_addr')
let city = getCookie('city')

const dataObj = {
	// geo: 'http://ip-api.com/json/',
	lookup: {
		button: document.querySelector('#lookup'),
		loader: document.querySelector('#loader'),
		error: document.querySelector('#error'),
		alertLocation: document.querySelector('.alert-location'),
		map: document.querySelector('#map')
	},
	shalat: {
		kota: document.querySelector('#kota'),
	    tgl: document.querySelector('#tanggal'),
	    adzan: document.querySelector('#waktu-adzan')
	},
	news: {
		select: document.querySelector('#select-news'),
		button: document.querySelector('#enter-news'),
		card: document.querySelector('#news-list'),
		modal: document.querySelector('.modal-body')
	},
	api: {
		news: {
			url: 'https://newsapi.org/v2/top-headlines/?',
			code: `country=${code}&`,
			key: 'apiKey=5effd68f01ce47589b435b22ebdb06b9',
		},
		geo: {
			ip: 'https://api.ipify.org/?format=json',
			geo: 'https://ipapi.co/',
		},
		shalat: {
			url: 'https://api.pray.zone/v2/times/today.json?',
		}
	}
}


// geo location ip address
setIP(dataObj.api.geo.ip)
.then( res => res.json())
.then(res => {
	setCookie('ip_addr', res.ip, 1)
})

if(code !== ''){
	dataObj.lookup.alertLocation.style.visibility="hidden"
	geoLocation(dataObj.api.geo.geo, ip, '/json')
	.finally(()=>{
		dataObj.lookup.button.style.display="none"
	})
	.then(res => res.json())
	.then(res => {
		getResult(res)
	})

}else{
	dataObj.lookup.alertLocation.style.visibility="visible"
	dataObj.lookup.button.addEventListener('click', function(){
		// console.log(ip)
		geoLocation(dataObj.api.geo.geo, ip, '/json')
		.finally(() => {
			setTimeout(function(){
				dataObj.lookup.button.style.visibility="hidden"
				dataObj.lookup.alertLocation.style.visibility="hidden"
				location.reload()
			}, 1500)
		})
		.then(res => res.json())
		.then( res => {
			getResult(res)
			setCookie('code', res.country_code, 1)
			setCookie('country', res.country_name, 1)
			setCookie('city', res.city, 1)
			setCookie('lat', res.latitude, 1)
			setCookie('lng', res.longitude, 1)
		})
	})
}

// google maps
dataObj.lookup.map.innerHTML=Map(city)

// news
const NullOptionEl = document.createElement('option')
NullOptionEl.setAttribute('value', '')
NullOptionEl.textContent='Pilih Media'
dataObj.news.select.appendChild(NullOptionEl)

dataObj.lookup.loader.style.visibility="visible"
NewsMedia(dataObj.api.news.url, dataObj.api.news.code, dataObj.api.news.key)
.finally(() => {
	setTimeout(function(){
		dataObj.lookup.loader.style.visibility="hidden"
	}, 1500)
})
.then( res => res.json())
.then( res => {
	console.log(res)
	SelectList(res.articles)
})

dataObj.news.button.addEventListener('click', function(){
	dataObj.lookup.error.innerHTML=''
	const mediaValue = dataObj.news.select.value
	if(mediaValue === '' || mediaValue === undefined){
		const errEl = document.createElement('div')
		errEl.className='alert alert-danger'
		errEl.setAttribute('role', 'alert')
		errEl.textContent='Pilih media digital news terlebih dahulu'

		dataObj.lookup.loader.style.visibility="visible"
		setTimeout(function(){
			dataObj.lookup.loader.style.visibility="hidden"
			dataObj.lookup.error.appendChild(errEl)
		}, 1000)
	}else{
		dataObj.lookup.loader.style.visibility="visible"
		NewsMedia(dataObj.api.news.url, dataObj.api.news.code, dataObj.api.news.key)
		.finally(() => {
			dataObj.lookup.loader.style.visibility="hidden"
			dataObj.lookup.error.style.visibility="hidden"
		}, 1500)
		.then( res => res.json())
		.then( res => {
			const DataMedia = res.articles[mediaValue]
			NewsCard(DataMedia)
		})
	}
})

document.addEventListener('click', function(e){
	const Detail = e.target.classList.contains('news-detail')
	if(Detail){
		const newsId = e.target.dataset.newsid
		NewsMedia(dataObj.api.news.url, dataObj.api.news.code, dataObj.api.news.key)
		.then( res => res.json())
		.then(res => {
			const NewsDetail = res.articles[newsId]
			NewsCardDetail(NewsDetail)
		})
	}
})




// jadwalShalat
jadwalShalat(dataObj.api.shalat.url, `city=${city}`)
.then( res => res.json())
.then( res => {const dataShalat = [
        {city: city},
        {data: res.results.datetime[0]}
    ]
    showJadwalShalat(dataShalat)
})