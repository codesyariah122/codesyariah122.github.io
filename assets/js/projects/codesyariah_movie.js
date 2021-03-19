let movie = new Vue({
	el: '#movie',
	data: {
		title: {
			header: 'Mau Nonton Film Apa ? '
		},
		form: {
			keyword: ''
		},
		movie: {
			lists: [],
			details:''
		}
	},

	create(){
		// this.getMovie(this.form.keyword)
	},

	methods: {
		getMovie(event){
			this.form.keyword = event.target.value
			fetch(`http://omdbapi.com/?apiKey=43c80ec7&s=${this.form.keyword}`)
			.then(res => res.json())
			.then(res => {
				console.log(res)
				this.movie.lists = res.Search
			})
		},

		getDetail(id){
			fetch(`http://www.omdbapi.com/?apiKey=43c80ec7&i=${id}`)
			.then(res => res.json())
			.then(res => {
				this.movie.details = res
			})
		}
	}


})