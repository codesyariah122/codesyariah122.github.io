{/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15843.02469076354!2d${result.lng}!3d${result.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1605683044978!5m2!1sid!2sid" width="900" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> */}

function ipAddr(){
    $.getJSON(`${baseAPI.ip}`, function(e) {
        // $('#show-ip').text(e.ip);
        const dataIp = {
            'host' : e.ip
        };
        $.ajax({
            url: `${baseAPI.proxy}${baseAPI.geo}`,
            type: 'get',
            data: dataIp,
            success: function(res){
                const result = {
                    'ip': res.data.geo.host,
                    'isp': res.data.geo.isp,
                    'country': res.data.geo.country_name,
                    'country_code':res.data.geo.country_code,
                    'region': res.data.geo.region_name,
                    'city': res.data.geo.city,
                    'lat' : res.data.geo.latitude,
                    'lng' : res.data.geo.longitude
                };

                Cookies.set('lat', result.lat, {expires: 1});
                Cookies.set('lng', result.lng, {expires: 1});
                Cookies.set('city', result.city, {expires: 30});

                Cookies.set('country_code', result.country_code, {expires: 1});

                data.yourLocation.append(`
                    <h5 class="text-primary">Your Location : <img src="https://newsapi.org/images/flags/${result.country_code}.svg" width="20" height="50" style="backgound:rgba(0, 0, 0, 0.8);"/> | ${result.city} - ${result.region}</h5>
                    <h6 class="text-danger">Your Ip Address : ${result.ip}</h6>
               `);
            } 
        });

    });
}

ipAddr();

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

function newsApi(){
    // const country_code = Cookies.get('country_code');
    // console.log(country_code);
    const dataApi = {
        'country' : Cookies.get('country_code'),
        'apiKey' : '0cd9904ea4d44b4385e69e554073be4b'
    };
    $.ajax({
        url: `${baseAPI.proxy}${baseAPI.news}`,
        type: 'get',
        dataType: 'json',
        data: dataApi,
        success: function(res){
            let news = res['articles'];
            // console.log(news);
            for(let i = 0; i <= news.length-1; i++){
                let id = i;
                let media = news[i]['source']['name'];
                // console.log(media);
                data.selectNews.append(`
                    <option id="pilih" value="${id}">${media}</option>
                `);
            }
            // console.log(news);
        }
    })
}

$(document).ready(function(){
   // const country_code = Cookies.get('country_code');
    // console.log(country_code);
    const dataApi = {
        'country' : Cookies.get('country_code'),
        'apiKey' : '0cd9904ea4d44b4385e69e554073be4b'
    };

    // console.log(`Your Country : ${data.country}`);
    
    data.Err.hide();
    data.selectNews.append(`
        <option value="choose" selected>Choose...</option>
    `);
    
    newsApi();

    data.enter.on('click', function(){
        data.newsList.html('');
        const newsSelect = $('#select-news').val();

        if(newsSelect === 'choose' || newsSelect === ''){
            data.Err.show('slow').fadeIn(1000);
        }else{
            data.Err.hide('slow').slideUp(1000);
            $.ajax({
                url: `${baseAPI.proxy}${baseAPI.news}`,
                type: 'get',
                dataType: 'json',
                data:dataApi,
                success: function(res){
                    if(res){
                        data.selectNews.val('choose');
                        let getNews = res['articles'][newsSelect];
                        // console.log(getNews);
                        data.newsList.append(`
                                <div class="col-md-4">
                                    <div class="card mb-5 mt-2">
                                        <img src="${getNews.urlToImage}" class="card-img-top float-left img-responsive" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)!important; color: rgb(255,228,181);border-radius:0%;" alt="...">
                                            <div class="card-body">
                                            <h5 class="card-title">${getNews.title}</h5>
                                            <h6 class="card-subtitle mb-2 text-muted">${getNews.publishedAt}</h6>
                                            <p>
                                                ${getNews.content}
                                            </p>
                                            <a href="${getNews.url}" class="card-link see-detail" data-id="${getNews}" target="_blank">See Detail</a>
                                            </div>
                                    </div>
                                </div>
                            `);
                    }
                }
            });
        }
    });

});