class AlQuran {
	constructor(proxy, url, param, data, id){
		this.proxy = proxy
		this.url = url
		this.param = param
		this.data = data
		this.id = id 
	}

	async getSelectSurah() {
		try {
			let response = await fetch(`${this.proxy}${this.url}${this.param}`)
			let results = await response.json()
			return results
		} catch(err) {
			return err
		}
	}

	async getSelectAyat() {
		try {
			let response = await fetch(`${this.proxy}${this.url}${this.param}${this.data}`)
			let results = await response.json()
			return results
		} catch(err) {
			return err
		}	
	}

	async getSurahAyat() {
		try {
			let response = await fetch(`${this.proxy}${this.url}${this.param}${this.data}/${this.id}`)
			let results = await response.json()
			return results
		} catch(err) {
			return err
		}
	}

	getReadAyat(proxy, url, param, data, id, success, error) {
		let req = new XMLHttpRequest()
		req.open('GET', `${proxy}${url}${param}${data}/${id}`)
		req.onload = () => {
			if(req.readyState === 4) {
				if(req.status === 200) {
					success(req.response)
				}else if(req.status === 404) {
					return error()
				}
			}
		}

		req.onerror = (err) => {
			console.log(err)
		}

		req.send()
	}

}

