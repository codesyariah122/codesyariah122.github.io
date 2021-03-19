let ip = new Vue({
	el: '#ip',
	data: {
		ip:'',
		location: {
			code: '',
			country: '',
			provinsi: '',
			city: '',
			flags: '',
			map: ''
		},
	},

	created() {
		this.setIp(),
		this.getDataLocation('ip_addr', 'country_code', 'country_name', 'region', 'city')
	},

	methods: {
		setIp(){
			fetch('https://api.ipify.org/?format=json')
			.then( res => res.json())
			.then( res => {
				this.ip = res.ip
				setCookie('ip_addr', this.ip, 1)
			})
			.catch(err => {
				console.log(err)
			})
		},

		getDataLocation(ip, code, country, provinsi, city){
			this.location.ip = getCookie(ip)
			this.location.code = getCookie(code)
			this.location.country = getCookie(country)
			this.location.provinsi = getCookie(provinsi)
			this.location.city = getCookie(city)
			this.location.flags = `https://www.countryflags.io/${getCookie(code)}/shiny/64.png`,
			this.location.map = `https://maps.google.com/maps?q=${getCookie(city)}&t=&z=13&ie=UTF8&iwloc=&output=embed`
		}

	}
})

const ip_addr = getCookie('ip_addr')
const code = getCookie('country_code')

let boxNews = new Vue({
	el: '#boxNews',
	data: {
		title: "Update Berita Perduniawian",
		caption_button: 'Untuk mendapat berita terupdate click tombol Check Lokasi diatas',
		show: (!code) ? true : false,
		code: code,
		lists: [],
		mediaValue: '',
		news: '',
		source: ''
	},

	created(){
		this.getNewsLists(this.code)
	},

	methods: {
		setLocation() {
			fetch(`https://ipapi.co/${ip_addr}/json/`)
			.then( res => res.json() )
			.then( res => {
				console.log(res)
				location.reload()
				setCookie('country_code', res.country, 1)
				setCookie('city', res.city, 1)
				setCookie('region', res.region, 1)
				setCookie('country_name', res.country_name)
			})
			.catch(err => {
				console.log(err)
			})
		},

		getNewsLists(){
			fetch(`https://newsapi.org/v2/top-headlines/?country=${this.code}&apiKey=5effd68f01ce47589b435b22ebdb06b9`)
			.then(res => res.json())
			.then(res => {
				this.lists = res.articles
				console.log(this.lists)
			})
		},

		onChange(e){
			this.mediaValue  = e.target.value
			fetch(`https://newsapi.org/v2/top-headlines/?country=${this.code}&apiKey=5effd68f01ce47589b435b22ebdb06b9`)
			.then(res => res.json())
			.then(res => {
				this.news = res.articles[this.mediaValue]
				this.source = res.articles[this.mediaValue].source
				// console.log(this.source)
			})
		},

	}
})


function setCookie(cname, cvalue, exdays){
	const date = new Date()
	date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000))
	const expires = `Expires=${date.toGMTString()}`

	document.cookie=`${cname}=${cvalue};${expires}`;
}


function getCookie(cname) {
	console.log(cname)
	let name =`${cname}=`;
	let ca = document.cookie.split(';');
	for(let i = 0; i < ca.length; i++) {
	    let c = ca[i];
	    while (c.charAt(0) == ' ') {
	      c = c.substring(1);
	    }
	    if (c.indexOf(name) == 0) {
	      return c.substring(name.length, c.length);
	    }
  	}
	return "";
}