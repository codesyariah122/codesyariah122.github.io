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
		document.querySelector('#your-location').appendChild(newEl)

	}).catch(err => {
		console.log(`Error results : ${err}`)
	})

}


// Google map
let map;
function initMap() {
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

const NewsMedia = async(proxy, url, req, key) => {
    let resp = await fetch (`${proxy}${url}?country=${req}&apiKey=${key}`)
    let result = await resp.json()
    return result
}

const GetNews = async(proxy, url, req, key) => {
    let resp = await fetch(`${proxy}${url}?country=${req}&apiKey=${key}`)
    let result = await resp.json()
    return result
}
