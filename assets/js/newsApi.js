
LookUp("json", res => {
	console.log("Success fetch ", res)
}, (err) => {
	console.log("Error fetch, ", err)
})

// start read news
$(document).ready(function(){
    // apiKey list
    // 5effd68f01ce47589b435b22ebdb06b9
    // 0cd9904ea4d44b4385e69e554073be4b
    const dataApiNews = {
        'country' : Cookies.get('country_code'),
        'apiKey' : '5effd68f01ce47589b435b22ebdb06b9'
    };

    $('#err').hide();
                                                                                                                                                                                                                                                                                                                                                                                                                             
    NewsMedia(baseAPI.proxy, baseAPI.news, dataApiNews.country, dataApiNews.apiKey)
    .then(res => {
        // console.log(res)
        const resNews = res.articles
        $('#select-news').append(`
            <option value="choose">Choose ... </option>
        `)

        resNews.map((key, index) => {
            $('#select-news').append(`
                <option id="pilih" value="${index}">${key.source.name}</option>
            `)
        })
    }).catch(err=>{
        console.log('Something when wrong', err)
    })



    $('#enter').on('click', function(){
        $('#news-list').html('');

        const newsSelect = $('#select-news').val();

        if(newsSelect === 'choose' || newsSelect === ''){
            $('#err').show('slow').fadeIn(1000);
        }else{
            $('#err').hide('slow').slideUp(1000);

            GetNews(baseAPI.proxy, baseAPI.news, dataApiNews.country, dataApiNews.apiKey)
            .then(res => {
                $('#select-news').val('choose')
                const getNews = res.articles[newsSelect]
                $('#news-list').append(`
                    <div class="mt-2 mb-2">
                        <div class="card mb-5 mt-2">

                            <img src="${getNews.urlToImage}" class="card-img-top float-left img-responsive" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important; color: rgba(255, 228, 181); border-radius: 0%;" alt="${getNews.title}">
                            <div class="card-body">
                                <h5 class="card-title">${getNews.title}</h5>

                                <h6 class="card-subtitle mb-2 text-muted">${getNews.publishAt}</h6>

                                <p>${getNews.content}</p>
                                <a href="${getNews.url}" class="card-link see-detail" data-id="${newsSelect}" target="_blank">See Detail</a>
                            </div> 
                    </div>
                `)
            }).catch(err=>{
                 console.log('Something when wrong', err)
            })
        }
    });

});
