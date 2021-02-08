const setSurah = async(url) => {
	const reqSurah = await fetch(`${url}`)
	return reqSurah
}

const setAyat = async(url, param) => {
	const reqAyat = await fetch(`${url}${param}`)
	return reqAyat
}

const getQuran = async(url, param, data) => {
	const reqQuran = await fetch(`${url}${param}/${data}`)
	return reqQuran
}

const Literation = async(url, param) => {
	const reqLiteration = await fetch(`${url}${param}`)
	return reqLiteration	
}