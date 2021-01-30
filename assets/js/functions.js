// Ip location and geographic
const getLocation = async(data) => {
	let req = await fetch(`http://ip-api.com/json/${data}`)
	let res = await req.json()

	return res
}

const LookUp = async(data, success, err) => {
	const req = await fetch(`https://api.ipify.org/?format=${data}`)
	const res = await req.json()

	const ip = res.ip

	getLocation(ip).then(res => {
		
		console.log('Response success : ', res)

		Cookies.set('code', res.countryCode, {expires: 30})
		Cookies.set('country', res.country, {expires: 30})
		Cookies.set('lat', res.lat, {expires: 30})
		Cookies.set('lng', res.lon, {expires: 30})

		const newEl = document.createElement('div')
		newEl.className = 'card mt-5 mb-2'
		newEl.setAttribute('style', 'width: 18rem;')
		newEl.innerHTML = `
			  <ul class="list-group list-group-flush">
			    <li class="list-group-item">Your ip address = <b> ${res.query} </b></li>
			    <li class="list-group-item">Country = <b>${res.country}</b> <img src="https://www.countryflags.io/${res.countryCode}/shiny/64.png" class="img-responsive circle"> </li>
			    <li class="list-group-item">Region Name = <b>${res.regionName}</b></li>
			    <li class="list-group-item">City = <b>${res.city}</b></li>
			  </ul>
		`
		document.querySelector('#result').appendChild(newEl)

	}).catch(err => {
		console.log(`Error results : ${err}`)
	})

}


// Reading Updates
const Code = Cookies.get('code');
const param = {
	url: 'https://newsapi.org/v2/top-headlines/?',
	country: `country=${Code}`,
	apiKey: 'apiKey=5effd68f01ce47589b435b22ebdb06b9'
}


const NewsMedia = (url, param, apiKey, success, err) => {
	const req = new XMLHttpRequest()

	req.open('GET', `${url}${param}&${apiKey}`, true)

	req.onload = () => {
		if(req.readyState === 4){
			if(req.status === 200){
				success(req.response)
			}else if(req.status === 404) {
				err()
			}
		}
	}

	req.onerror = (err) => {
		console.log(err)
	}

	req.send()
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

// Modal News

const ReadNews = (e) => {

	document.querySelector('.modal-title').innerHTML=''
	document.querySelector('.modal-body').innerHTML=''

	NewsMedia(param.url, param.country, param.apiKey, res => {
		const Start = JSON.parse(res)
		const Reads = Start.articles[e]

		console.log(Reads)

		const ModalHeader = document.createElement('span')
		ModalHeader.innerHTML = `
			${Reads.source.name} <br/>
			<small class="text-info">${Reads.publishedAt} | ${Reads.author} </small>
		`
		document.querySelector('.modal-title').appendChild(ModalHeader)

		const ModalBody = document.createElement('div')
		ModalBody.className = 'col-md-12 col-xs-12 mt-2'
		ModalBody.innerHTML = `
			<img src="${Reads.urlToImage}" class="img-fluid"/>
			<h6>${Reads.title}</h6>
			<p class="text-justify">
				${Reads.content} ... <a href="${Reads.url}" class="btn btn-success">Baca dimari</a>
			</p>
		`
		document.querySelector('.modal-body').appendChild(ModalBody)

	}, (err) => {
		console.log("Res Errors : ", err)
	})
}

