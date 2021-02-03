const SelectSurah = async(proxy, url, req) => {
	let resp = await fetch(`${url}${req}`)
	let result = await resp.json()
	return result
}

const ViewSurah = async(proxy, url, req) => {
	let resp = await fetch(`${proxy}${url}surah/${req}`)
	let data = await resp.json()
	return data
}


const ReadAyat = (proxy, url, key, data, id, success, error) => {
	
	let req = new XMLHttpRequest()

	req.open('GET', `${proxy}${url}${key}/${data}/${id}`, true)
	
	req.onload = () => {
		if(req.readyState === 4) {
			if(req.status === 200) {
				success(req.response)
			}else if(req.status === 404) {
				error()
			}
		}
	}

	req.onerror = (err) => {
		console.log(err)
	}

	req.send()
	
}