// Ip location and geographic
const getLocation = async(data) => {
	let req = await fetch(`https://cors-anywhere.herokuapp.com/http://ip-api.com/${data}`)
	let res = await req.json()

	return res
}

const LookUp = async(data, success, err) => {
	const req = await fetch(`https://cors-anywhere.herokuapp.com/https://api.ipify.org/?format=${data}`)
	const res = await req.json()

	const ip = res.ip

	getLocation(ip).then(res => {
		
		console.log('Response success : ', res)

		Cookies.set('code', res.countryCode, {expires: 30})
		Cookies.set('country', res.country, {expires: 30})
		Cookies.set('city', res.city, {expires: 30})
		Cookies.set('lat', res.lat, {expires: 30})
		Cookies.set('lng', res.lon, {expires: 30})

		const newEl = document.createElement('div')
		newEl.className = 'card mt-5 mb-2'
		newEl.setAttribute('style', 'width: 25rem;')
		newEl.innerHTML = `
			  <ul class="list-group list-group-flush">
			    <li class="list-group-item">Your ip address = <b> ${res.query} </b></li>
			    <li class="list-group-item">Country = <b>${res.country}</b> <img src="https://www.countryflags.io/${res.countryCode}/shiny/64.png" class="img-responsive circle"> </li>
			    <li class="list-group-item">Region Name = <b>${res.regionName}</b></li>
			    <li class="list-group-item">City = <b>${res.city}</b></li>
			  </ul>
		`
		document.querySelector('#your-location').appendChild(newEl)

	}).catch(err => {
		console.log(`Error results : ${err}`)
	})

}

function initMap(map) {
    const lat = parseFloat(Cookies.get('lat'));
    const lng = parseFloat(Cookies.get('lng'));
    // alert(typeof lat);
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: lng },
    zoom: 7,
  });

  marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: map
  });

}


// Reading news
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

