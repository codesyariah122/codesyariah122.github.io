const api = {
  ip: 'https://api.ipify.org/?format=json',
  geo: 'http://ip-api.com/json/',
  button: document.querySelector('#lookup'),
}

setIP(api.ip)
.then( res => res.json())
.then(res => {
  setCookie('ip_addr', res.ip, 1)
})

const code = getCookie('code')
let ip = getCookie('ip_addr')
if(code !== ''){
  const DataLocation = {
    ip: getCookie('ip_addr'),
    code: getCookie('code'),
    country: getCookie('country'),
    lat: getCookie('lat'),
    lng: getCookie('lng')
  }

  geoLocation(api.geo, ip)
  .finally(()=>{
    api.button.style.display="none"
  })
  .then(res => res.json())
  .then(res => {
    getResult(res)
  })

}else{
  api.button.addEventListener('click', function(){
    console.log(ip)
    geoLocation(api.geo, ip)
    .finally(() => {
      setTimeout(function(){
        api.button.style.visibility="hidden"
      }, 1000)
    })
    .then(res => res.json())
    .then( res => {
      getResult(res)
      setCookie('code', res.countryCode, 1)
      setCookie('country', res.country, 1)
      setCookie('lat', res.lat, 1)
      setCookie('lng', res.lon, 1)
    })
  })
}

// geoLocation(api.geo, document.cookie('ip_addr'))

// Google map
let map=''
function initMap(map) {
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

