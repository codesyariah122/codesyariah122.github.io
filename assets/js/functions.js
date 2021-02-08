// geo location
const setIP = async(url) => {
	const req = await fetch(url)
	return req
}


const geoLocation = async(url, data, param) => {
	const req = await fetch(`${url}${data}${param}`)
	return req
}

const getResult = (Data) => {
	// console.log(Data)
	const resEl = document.createElement('div')
	resEl.className='card mt-2 mb-2'
	resEl.setAttribute('style', 'width: 18rem;')
	resEl.innerHTML = `
		<ul class="list-group list-group-flush">
			<li class="list-group-item">Your ip address = <b> ${Data.ip} </b></li>
			<li class="list-group-item">Country = <b>${Data.country_name}</b> 
				<img src="https://www.countryflags.io/${Data.country_code}/shiny/64.png" class="img-responsive circle">
			</li>
			<li class="list-group-item">Region Name = <b>${Data.region}</b></li>
			<li class="list-group-item">City = <b>${Data.city}</b></li>
		</ul>
	`
	document.querySelector('#result').appendChild(resEl)
}

// news
const NewsMedia = async(url, param, key) => {
	const req = await fetch(`${url}${param}${key}`)
	return req
}

const SelectList = (Data) => {
	let opt = ''
	Data.map((key, index) => {
		opt += selectForNews(key, index)
	})
}

const NewsCard = (Data) => {
	const idNews = dataObj.news.select.value
	let card=''
	card += cardForNews(Data, idNews)
	dataObj.news.card.innerHTML=card
}

const NewsCardDetail = (Data) => {
	let card = ''
	card += DetailForNews(Data)
	dataObj.news.modal.innerHTML=card
}

function selectForNews(key, index){
	const optNews = document.createElement('option')
	optNews.setAttribute('value', index)
	optNews.textContent=key.source.name
	const newsOptions = document.querySelector('#select-news')
	newsOptions.appendChild(optNews)
}

function cardForNews(N, i){
	return `
		<div class="card mb-3" style="max-width: 100%;">
		  <div class="row no-gutters">
		    <div class="col-md-4">
		      <img src="${N.urlToImage}" class="card-img" alt="${N.source.name}">
		    </div>
		    <div class="col-md-8">
		      <div class="card-body">
		        <h5 class="card-title">${N.title}</h5>
		        <p class="card-text">${N.description}.</p>
		        <p class="card-text">
		       	 	<small class="text-info">${N.source.name} | ${N.author}</small><br/>
		       	 	<small class="text-muted">${N.publishedAt}</small>
		        </p>
		        <a class="btn btn-primary news-detail" data-toggle="modal" data-target="#staticBackdrop" data-newsid="${i}">Read More</a>
		      </div>
		    </div>
		  </div>
		</div>

	`
}

function DetailForNews(n) {
	// console.log(n)
	return`
		<div class="card mb-3">
		  <img src="${n.urlToImage}" class="card-img-top" alt="${n.source.name}">
		  <div class="card-body">
		    <h5 class="card-title">${n.title}</h5>
		    <p class="card-text">${n.content}... panjang teing gan <br/> 
		    	<a href="${n.url}" class="btn btn-danger"> Baca Di Mari</a> gan ...
		    </p>

		    <p class="card-text">
		    	<small class="text-muted">${n.publishedAt} | ${n.source.name}</small>
		    </p>
		  </div>
		</div>
	`
}

// jadwal shalat
const jadwalShalat = async(url, data) => {
	const req = await fetch(`${url}${data}`)
	return req
}

function showJadwalShalat(Key) {
	// console.log(Key)
	const city = Key[0].city
	const data = Key[1].data.date
	const adzan = Object.entries(Key[1].data.times)

	dataObj.shalat.kota.innerHTML=city
	dataObj.shalat.tgl.innerHTML=`${data.gregorian} | ${data.hijri}`

	adzan.forEach(([key, index]) => {
		const liEl = document.createElement('li')
		liEl.className='text-dark ml-3'
		liEl.textContent=`${key} : ${index}`
		document.querySelector('#waktu-adzan').appendChild(liEl)
		console.log(`${key} : ${index}`) })
}

// cookie browser
function setCookie(cname, cvalue, exdays){
	let date = new Date()
	date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000))
	let expires = `Expires=${date.toGMTString()}`

	document.cookie=`${cname}=${cvalue};${expires};`
}

function getCookie(cname) {
	let name =`${cname}=`;
	let ca = document.cookie.split(';');
	for(let i=0; i<ca.length; i++) {
		let c = ca[i].trim();
		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
}


function Map(data){
	return `

		<div class="mapouter">
			<div class="gmap_canvas">
				<iframe width="800" height="300" id="gmap_canvas" src="https://maps.google.com/maps?q=${data}&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
				</iframe>

				<a href="https://yt2.org">vidtomp3</a>

				<br>

				<style>
					.mapouter{
						position:relative;
						text-align:right;
						height:300px;
						width:800px;
					}
				</style>

				<style>
					.gmap_canvas {
						overflow:hidden;
						background:none!important;
						height:300px;width:800px;
					}
				</style>
			</div>
		</div>

	`
}
