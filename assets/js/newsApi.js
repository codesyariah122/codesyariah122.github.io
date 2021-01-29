Realip(data.baseAPI.ip, results=>{
    let data = {
        ip: JSON.parse(results),
        url: {
            proxy: 'https://cors-anywhere.herokuapp.com/',
            geo: 'https://tools.keycdn.com/geo.json?host='
        }
    }

    console.log(data.ip.ip)

    Cookies.set('ip', data.ip.ip, {expires: 30})
    // getLocation(data.url.proxy, data.url.geo, data.ip);

} , () => {
    console.log("Error results")
})


getLocation(data.baseAPI.proxy, data.baseAPI.geo, objdata)
.then(res => {
    const start = res.data.geo

    const result = {
        'ip': start.host,
        'isp': start.isp,
        'country': start.country_name,
        'country_code': start.country_code,
        'region': start.region_name,
        'city': start.city,
        'lat' : start.latitude,
        'lng' : start.longitude
    };
    Cookies.set('lat', result.lat, {expires: 1})
    Cookies.set('lng', result.lng, {expires: 1})
    Cookies.set('city', result.city, {expires: 30})
    Cookies.set('country_code', result.country_code, {expires: 30})

    $('#your-location').append(`
        <h5 class="text-primary">Your Location : 
            <img src="https://newsapi.org/images/flags/${result.country_code}.svg" width="20" height="50" style="background: rgba(0, 0, 0, 0.8);"/>
            | ${result.city} - ${result.region}
        </h5>
        <h6 class="text-danger">Your Ip Address : ${result.ip}</h6>
    `)
})



const getNewsMedia = (data, success, error) => {

    $.ajax({
        url: `${baseAPI.proxy}${baseAPI.news}`,
        type: 'get',
        dataType: 'json',
        data: data,
        success: (res)=>{
            let news = res['articles'];
            news.map((key, index) => {
                $('#select-news').append(`
                    <option id="pilih" value="${index}">${key['source']['name']}</option>
                `)
            })  
        }, complete: () => {
            console.log("Complete Success")
        }
    });
}





$(document).ready(function(){
    // apiKey list
    // 5effd68f01ce47589b435b22ebdb06b9
    // 0cd9904ea4d44b4385e69e554073be4b
    const dataApiNews = {
        'country' : Cookies.get('country_code'),
        'apiKey' : '5effd68f01ce47589b435b22ebdb06b9'
    };

    $('#err').hide();

    $('#select-news').append(`
        <option value="choose" selected>Choose...</option>
    `);
                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    getNewsMedia(dataApiNews, results => {
        console.log(results)
    }, () => {
        $('#select-news').append(`
            <option value="choose" selected>Loading...</option>
        `);
    });


    $('#enter').on('click', function(){
        $('#news-list').html('');

        const newsSelect = $('#select-news').val();

        if(newsSelect === 'choose' || newsSelect === ''){
            $('#err').show('slow').fadeIn(1000);
        }else{
            $('#err').hide('slow').slideUp(1000);
            $.ajax({
                url: `${baseAPI.proxy}${baseAPI.news}`,
                type: 'get',
                dataType: 'json',
                data:dataApiNews,
                success: function(res){
                    if(res){
                        $('#select-news').val('choose');
                        let getNews = res['articles'][newsSelect];
                        // console.log(getNews);
                        $('#news-list').append(`
                            <div class="row mt-2 mb-2">
                                <div class="col-md-6">
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
                            </div>
                        `);
                    }
                }
            });
        }
    });

});