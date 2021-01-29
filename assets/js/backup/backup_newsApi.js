{/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15843.02469076354!2d${result.lng}!3d${result.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1605683044978!5m2!1sid!2sid" width="900" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> */}

// function ipAddr(url, success, error){
//     $.getJSON(`${baseAPI.ip}`, function(e) {
//         // $('#show-ip').text(e.ip);
//         const dataIp = {
//             'host' : e.ip
//         };
//         $.ajax({
//             url: `${baseAPI.proxy}${url}`,
//             type: 'get',
//             data: dataIp,
//             success: function(res){
//                 const result = {
//                     'ip': res.data.geo.host,
//                     'isp': res.data.geo.isp,
//                     'country': res.data.geo.country_name,
//                     'country_code':res.data.geo.country_code,
//                     'region': res.data.geo.region_name,
//                     'city': res.data.geo.city,
//                     'lat' : res.data.geo.latitude,
//                     'lng' : res.data.geo.longitude
//                 };

//                 Cookies.set('lat', result.lat, {expires: 1});
//                 Cookies.set('lng', result.lng, {expires: 1});
//                 Cookies.set('city', result.city, {expires: 30});

//                 Cookies.set('country_code', result.country_code, {expires: 1});

//                 $('#your-location').append(`
//                     <h5 class="text-primary">Your Location : <img src="https://newsapi.org/images/flags/${result.country_code}.svg" width="20" height="50" style="backgound:rgba(0, 0, 0, 0.8);"/> | ${result.city} - ${result.region}</h5>
//                     <h6 class="text-danger">Your Ip Address : ${result.ip}</h6>
//                `);
//             } 
//         });

//     });
// }

// ipAddr(baseAPI.geo, results =>{
//     console.log("results success")
// }, ()=>{
//     console.log("results errror")
// });



// function initialize() {
//     const lat = parseFloat(Cookies.get('lat'));
//     const lng = parseFloat(Cookies.get('lng'));
//     var propertiPeta = {
//       center:new google.maps.LatLng(lat, lng),
//       zoom:9,
//       mapTypeId:google.maps.MapTypeId.ROADMAP
//     };
    
//     var peta = new google.maps.Map(document.getElementById("map"), propertiPeta);
    
//     // membuat Marker
//     var marker=new google.maps.Marker({
//         position: new google.maps.LatLng(lat, lng),
//         map: peta
//     });
  
//   }
  
//   google.maps.event.addDomListener(window, 'load', initialize);



// const getNewsMedia = (url, success, error) => {
//     let xhr = new XMLHttpRequest()

//     xhr.onreadystatechange = () => {
//         if(xhr.readySate === 4){
//             if(xhr.status === 200){
//                 success(xhr.response)
//             }else if(xhr.status === 404) {
//                 error()
//             }
//         }
//     }

//     xhr.open('get', url)
//     xhr.send()
// }