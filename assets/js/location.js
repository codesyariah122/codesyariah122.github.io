LookUp("json", res => {
	console.log("Success fetch ", res)
}, (err) => {
	console.log("Error fetch, ", err)
})

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
