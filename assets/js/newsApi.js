function ipAddr(){
    $.getJSON("https://api.ipify.org/?format=json", function(e) {
        // $('#show-ip').text(e.ip);
        const urlProxy = "https://cors-anywhere.herokuapp.com/";
        const data = {
            'host' : e.ip
        };
        $.ajax({
            url: `${urlProxy}https://tools.keycdn.com/geo.json`,
            type: 'get',
            data: data,
            success: function(res){
                const result = {
                    'ip': res.data.geo.host,
                    'isp': res.data.geo.isp,
                    'country': res.data.geo.country_name,
                    'country_code':res.data.geo.country_code,
                    'city': res.data.geo.city,
                    'lat' : res.data.geo.latitude,
                    'lng' : res.data.geo.longitude
                };

                Cookies.set('lat', result.lat, {expires: 1});
                Cookies.set('lng', result.lng, {expires: 1});

               Cookies.set('country_code', result.country_code, {expires: 1});
            } 
        });

    });
}

ipAddr();

let map;
function initMap() {
    const lat = Cookies.get('lat');
    const lng = Cookies.get('lng');
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: lng },
    zoom: 8,
  });
}

function newsApi(){
    // const country_code = Cookies.get('country_code');
    // console.log(country_code);
    const data = {
        'country' : Cookies.get('country_code'),
        'apiKey' : '0cd9904ea4d44b4385e69e554073be4b'
    };
    const urlProxy = "https://cors-anywhere.herokuapp.com/";
    $.ajax({
        url: `${urlProxy}https://newsapi.org/v2/top-headlines`,
        type: 'get',
        dataType: 'json',
        data: data,
        success: function(res){
            let news = res['articles'];
            // console.log(news);
            for(let i = 0; i <= news.length-1; i++){
                let id = i;
                let media = news[i]['source']['name'];
                // console.log(media);
                $('#select-news').append(`
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
    const data = {
        'country' : Cookies.get('country_code'),
        'apiKey' : '0cd9904ea4d44b4385e69e554073be4b'
    };

    console.log(`Your Country : ${data.country}`);
    
    $('#err').hide();
    $('#select-news').append(`
        <option value="choose" selected>Choose...</option>
    `);
    
    newsApi();

    $('#enter').on('click', function(){
        $('#news-list').html('');
        const newsSelect = $('#select-news').val();
        const urlProxy = "https://cors-anywhere.herokuapp.com/";

        if(newsSelect === 'choose' || newsSelect === ''){
            $('#err').show('slow').fadeIn(1000);
        }else{
            $('#err').hide('slow').slideUp(1000);
            $.ajax({
                url: `${urlProxy}https://newsapi.org/v2/top-headlines`,
                type: 'get',
                dataType: 'json',
                data:data,
                success: function(res){
                    if(res){
                        $('#select-news').val('choose');
                        let getNews = res['articles'][newsSelect];
                        // console.log(getNews);
                        $('#news-list').append(`
                                <div class="col-md-4">
                                    <div class="card mb-5 mt-2">
                                        <img src="${getNews.urlToImage}" class="card-img-top float-left img-responsive" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)!important; color: rgb(255,228,181);border-radius:0%;" alt="...">
                                            <div class="card-body">
                                            <h5 class="card-title">${getNews.title}</h5>
                                            <h6 class="card-subtitle mb-2 text-muted">${getNews.publishedAt}</h6>
                                            <p>
                                                ${getNews.content}
                                            </p>
                                            <a href="${getNews.url}" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${getNews}">See Detail</a>
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