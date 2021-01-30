// Reading Updates
const Code = Cookies.get('code');
const param = {
	url: 'https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines/?',
	country: `country=${Code}`,
	apiKey: 'apiKey=5effd68f01ce47589b435b22ebdb06b9'
}

// console.log("Start")
const newEl = document.createElement('option')
newEl.setAttribute('value', 'choose')
newEl.textContent = 'Choose ... '
document.querySelector('#select-news').appendChild(newEl)



NewsMedia(param.url, param.country, param.apiKey, res => {
	const ResultsData = JSON.parse(res)
	// console.log("Results success : ", ResultsData)
	const Medias = ResultsData.articles

	Medias.map((key, index) => {
		const name = Medias[index].source.name
		const newEl = document.createElement('option')
		newEl.setAttribute('value', index)
		newEl.textContent = name
		document.querySelector('#select-news').appendChild(newEl)
	})
}, (err) => {
	console.log("Results Error : ", err)
})
// console.log("Finish")

document.querySelector('#loader').style.visibility="hidden"
document.querySelector('#enter').addEventListener('click', (e) => {
	e.preventDefault()

	document.querySelector('#error').innerHTML=''
	document.querySelector('#news-list').innerHTML=''

	const NewsValue = document.querySelector('#select-news').value

	if(NewsValue == 'choose' || NewsValue == null) {
		const errEl = document.createElement('div')
		errEl.className = "alert alert-warning"
		errEl.setAttribute('role', 'alert')
		errEl.textContent = 'Pilih Media Online Terlebih dahulu'
		document.querySelector('#loader').style.visibility="visible"
		setTimeout(()=>{
			document.querySelector('#error').appendChild(errEl)
			document.querySelector('#loader').style.visibility="hidden"
		}, 1500)

	}else {
		document.querySelector('#select-news').value='choose'
		document.querySelector('#loader').style.visibility="visible"

		NewsMedia(param.url, param.country, param.apiKey, res => {
			const start = JSON.parse(res)
			const GetNews = start.articles[NewsValue]

			const newEl = document.createElement('div')
			newEl.className = 'card mt-5 mb-2'
			newEl.setAttribute('style', 'width: 80%;')
			newEl.innerHTML = `
				<img src="${GetNews.urlToImage}" class="card-img-top" alt="${GetNews.source.name}">
				<div class="card-body">
					<h5 class="card-title">${GetNews.title}</h5>
					<small class="text-info">
						${GetNews.publishedAt} | ${GetNews.author}
					</small>
					
					<p class="card-text">${GetNews.description}.</p>
						    
					<a id="read-news" onClick="ReadNews(${NewsValue})" data-news="${NewsValue}" class="btn btn-primary read-news" data-toggle="modal" data-target="#newsModal">Lanjut Baca</a>
				</div>
			`


			setTimeout(()=>{
				document.querySelector('#news-list').appendChild(newEl)

				document.querySelector('#loader').style.visibility="hidden"
			}, 2500)

		}, (err) => {
			console.log("Results Error : ", err)
		})
	}
})
