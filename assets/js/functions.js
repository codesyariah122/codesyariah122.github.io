const setIP = async(url) => {
	const req = await fetch(url)
	return req
}


const geoLocation = async(url, data) => {
	const req = await fetch(`${url}${data}`)
	return req
}

const getResult = (Data) => {
	const resEl = document.createElement('div')
	resEl.className='card mt-2 mb-2'
	resEl.setAttribute('style', 'width: 18rem;')
	resEl.innerHTML = `
		<ul class="list-group list-group-flush">
			<li class="list-group-item">Your ip address = <b> ${Data.query} </b></li>
			<li class="list-group-item">Country = <b>${Data.country}</b> 
				<img src="https://www.countryflags.io/${Data.countryCode}/shiny/64.png" class="img-responsive circle">
			</li>
			<li class="list-group-item">Region Name = <b>${Data.regionName}</b></li>
			<li class="list-group-item">City = <b>${Data.city}</b></li>
		</ul>
	`
	document.querySelector('#result').appendChild(resEl)
}


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