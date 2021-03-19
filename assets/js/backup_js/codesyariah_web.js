let newsBox = new Vue({
	el: '#newsBox',
	data: {
		title: "Update Berita Perduniawian",
		caption_button: 'Untuk mendapat berita terupdate click tombol Check Lokasi diatas',
		ip:'',
		location: {
			code: '',
			country: '',
			region: '',
			city: '',
			flags: '',
			map: ''
		},
		lists: [],
		mediaValue: '',
		news: '',
		source: ''
	},

	created() {
		this.setIp()
	},

	methods: {
		setIp(){
			fetch('https://api.ipify.org/?format=json')
			.then( res => res.json())
			.then( res => {
				this.ip = res.ip
			})
			.catch(err => {
				console.log(err)
			})
		},
		setLocation() {
			fetch(`https://ipapi.co/${this.ip}/json/`)
			.then( res => res.json() )
			.then( res => {
				// console.log(res)
				// location.reload()
				this.location.code=res.country
				this.location.city=res.city
				this.location.region=res.region
				this.location.country=res.country_name
				this.location.map = `https://maps.google.com/maps?q=${res.city}&t=&z=13&ie=UTF8&iwloc=&output=embed`

				fetch(`https://newsapi.org/v2/top-headlines/?country=${res.country}&apiKey=5effd68f01ce47589b435b22ebdb06b9`)
				.then(res => res.json())
				.then(res => {
					this.lists = res.articles
				})

			})
			.catch(err => {
				console.log(err)
			})
		},

		onChange(e, code){
			this.mediaValue  = e.target.value
			fetch(`https://newsapi.org/v2/top-headlines/?country=${code}&apiKey=5effd68f01ce47589b435b22ebdb06b9`)
			.then(res => res.json())
			.then(res => {
				this.news = res.articles[this.mediaValue]
				this.source = res.articles[this.mediaValue].source
				// console.log(this.source)
			})
		},

	}
})
