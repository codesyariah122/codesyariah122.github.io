
let code = getCookie('code')
let ip = getCookie('ip_addr')

const api = {
	ip: 'https://api.ipify.org/?format=json',
	geo: 'https://ipapi.co/',
	// geo: 'http://ip-api.com/json/',
	button: document.querySelector('#lookup'),
	loader: document.querySelector('#loader'),
	error: document.querySelector('#error'),
	news: {
		url: 'https://newsapi.org/v2/top-headlines/?',
		code: `country=${code}&`,
		key: 'apiKey=5effd68f01ce47589b435b22ebdb06b9',
		select: document.querySelector('#select-news'),
		button: document.querySelector('#enter-news'),
		card: document.querySelector('#news-list'),
		modal: document.querySelector('.modal-body')
	}
}


// geo location ip address
setIP(api.ip)
.then( res => res.json())
.then(res => {
	setCookie('ip_addr', res.ip, 1)
})

if(code !== ''){
	geoLocation(api.geo, ip, '/json')
	.finally(()=>{
		api.button.style.display="none"
	})
	.then(res => res.json())
	.then(res => {
		getResult(res)
	})

}else{
	api.button.addEventListener('click', function(){
		console.log(ip)
		geoLocation(api.geo, ip, '/json')
		.finally(() => {
			setTimeout(function(){
				api.button.style.visibility="hidden"
				location.reload()
			}, 1500)
		})
		.then(res => res.json())
		.then( res => {
			getResult(res)
			setCookie('code', res.country_code, 1)
			setCookie('country', res.country_name, 1)
			setCookie('lat', res.latitude, 1)
			setCookie('lng', res.longitude, 1)
		})
	})
}

// news
const NullOptionEl = document.createElement('option')
NullOptionEl.setAttribute('value', '')
NullOptionEl.textContent='Pilih Media'
api.news.select.appendChild(NullOptionEl)

api.loader.style.visibility="visible"
NewsMedia(api.news.url, api.news.code, api.news.key)
.finally(() => {
	setTimeout(function(){
		api.loader.style.visibility="hidden"
	}, 1500)
})
.then( res => res.json())
.then( res => {
	SelectList(res.articles)
})

api.news.button.addEventListener('click', function(){
	api.error.innerHTML=''
	const mediaValue = api.news.select.value
	if(mediaValue === '' || mediaValue === undefined){
		const errEl = document.createElement('div')
		errEl.className='alert alert-danger'
		errEl.setAttribute('role', 'alert')
		errEl.textContent='Pilih media digital news terlebih dahulu'

		api.loader.style.visibility="visible"
		setTimeout(function(){
			api.loader.style.visibility="hidden"
			api.error.appendChild(errEl)
		}, 1000)
	}else{
		api.loader.style.visibility="visible"
		NewsMedia(api.news.url, api.news.code, api.news.key)
		.finally(() => {
			api.loader.style.visibility="hidden"
			api.error.style.visibility="hidden"
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
		NewsMedia(api.news.url, api.news.code, api.news.key)
		.then( res => res.json())
		.then(res => {
			const NewsDetail = res.articles[newsId]
			NewsCardDetail(NewsDetail)
		})
	}
})