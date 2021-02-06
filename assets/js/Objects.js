let code = getCookie('code')
let ip = getCookie('ip_addr')
// location
const apiLocation = {
  ip: 'https://api.ipify.org/?format=json',
  geo: 'http://ip-api.com/json/',
  button: document.querySelector('#lookup'),
  geo: {
  	result: document.querySelector('#your-location')
  }
}
// news
const apiNews = {
	ip: 'https://api.ipify.org/?format=json',
	geo: 'http://ip-api.com/json/',
	button: document.querySelector('#lookup'),
	loader: document.querySelector('#loader'),
	error: document.querySelector('#error'),
	news: {
		url: 'https://newsapi.org/v2/top-headlines/?',
		code: `country=${code}&`,
		key: 'apiKey=5effd68f01ce47589b435b22ebdb06b9',
		select: document.querySelector('#select-news'),
		button: document.querySelector('#enter-news'),
		card: document.querySelector('#news-list'),
		modal: document.querySelector('.modal-body')
	}
}
