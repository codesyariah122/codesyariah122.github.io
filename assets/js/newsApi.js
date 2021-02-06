// geo location ip address
setIP(apiNews.ip)
.then( res => res.json())
.then(res => {
	setCookie('ip_addr', res.ip, 1)
})

if(code !== ''){
	geoLocation(apiNews.geo, ip)
	.finally(()=>{
		apiNews.button.style.display="none"
	})
	.then(res => res.json())
	.then(res => {
		getResult(res)
	})

}else{
	apiNews.button.addEventListener('click', function(){
		console.log(ip)
		geoLocation(apiNews.geo, ip)
		.finally(() => {
			setTimeout(function(){
				apiNews.button.style.visibility="hidden"
				location.reload()
			}, 1500)
		})
		.then(res => res.json())
		.then( res => {
			getResult(res)
			setCookie('code', res.countryCode, 1)
			setCookie('country', res.country, 1)
			setCookie('lat', res.lat, 1)
			setCookie('lng', res.lon, 1)
		})
	})
}

// news
const NullOptionEl = document.createElement('option')
NullOptionEl.setAttribute('value', '')
NullOptionEl.textContent='Pilih Media'
apiNews.news.select.appendChild(NullOptionEl)

apiNews.loader.style.visibility="visible"
NewsMedia(apiNews.news.url, apiNews.news.code, apiNews.news.key)
.finally(() => {
	setTimeout(function(){
		apiNews.loader.style.visibility="hidden"
	}, 1500)
})
.then( res => res.json())
.then( res => {
	SelectList(res.articles)
})

apiNews.news.button.addEventListener('click', function(){
	apiNews.error.innerHTML=''
	const mediaValue = apiNews.news.select.value
	if(mediaValue === '' || mediaValue === undefined){
		const errEl = document.createElement('div')
		errEl.className='alert alert-danger'
		errEl.setAttribute('role', 'alert')
		errEl.textContent='Pilih media digital news terlebih dahulu'

		apiNews.loader.style.visibility="visible"
		setTimeout(function(){
			apiNews.loader.style.visibility="hidden"
			apiNews.error.appendChild(errEl)
		}, 1000)
	}else{
		apiNews.loader.style.visibility="visible"
		NewsMedia(apiNews.news.url, apiNews.news.code, apiNews.news.key)
		.finally(() => {
			apiNews.loader.style.visibility="hidden"
			apiNews.error.style.visibility="hidden"
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
		NewsMedia(apiNews.news.url, apiNews.news.code, apiNews.news.key)
		.then( res => res.json())
		.then(res => {
			const NewsDetail = res.articles[newsId]
			NewsCardDetail(NewsDetail)
		})
	}
})