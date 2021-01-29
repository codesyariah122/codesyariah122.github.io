const SelectSurah = async(url, req) => {
	let resp = await fetch(`${url}${req}`)
	let result = await resp.json()
	return result
}

const ViewSurah = async(proxy, url, req) => {
	let resp = await fetch(`${proxy}${url}/surah/${req}`)
	let data = await resp.json()
	return data
}

const ViewAyat = async(proxy, url, req) => {
	let resp = await fetch(`${proxy}${url}/surah/${req}`)
	let data = await resp.json()
	return data
}

const ReadAyat = (url,  data, id, success, error) => {
	
	let xhr = new XMLHttpRequest()

	xhr.open('GET', `${url}${data}/${id}`, true)
	
	xhr.onload = () => {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
				success(xhr.response)
			}else if(xhr.status === 404) {
				error()
			}
		}
	}

	xhr.send()
}
