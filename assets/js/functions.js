const Realip = (url, success, err) => {
    let req = new XMLHttpRequest()
    req.open('GET', url, true);

    req.onload = () => {
        if(req.readyState === 4) {
            if(req.status === 200){
                success(req.response);
            }else if(req.status === 404){
                err();
            }
        }
    }

    req.send();
}


const getLocation = async (proxy, url, req) => {
    let resp = await fetch(`${proxy}${url}${req}`)
    let result = await resp.json()
    return result
}


// Google map
let map;
function initMap() {
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



const NewsMedia = async(proxy, url, req, key) => {
    let resp = await fetch (`${proxy}${url}?country=${req}&apiKey=${key}`)
    let result = await resp.json()
    return result
}

const GetNews = async(proxy, url, req, key) => {
    let resp = await fetch(`${proxy}${url}?country=${req}&apiKey=${key}`)
    let result = await resp.json()
    return result
}
