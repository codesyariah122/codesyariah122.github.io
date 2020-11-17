

function newsApi(){
    const data = {
        'country' : 'id',
        'apiKey' : '5effd68f01ce47589b435b22ebdb06b9'
    };

    $.ajax({
        url: 'https://newsapi.org/v2/top-headlines',
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
$('#err').hide();
$(document).ready(function(){
    const data = {
        'country' : 'id',
        'apiKey' : '5effd68f01ce47589b435b22ebdb06b9'
    };

    $('#select-news').append(`
        <option value="choose" selected>Choose...</option>
    `);
    newsApi();
    $('#enter').on('click', function(){
        const newsSelect = $('#select-news').val();
        if(newsSelect === 'choose'){
            $('#err').show('slow').fadeIn(1000);
        }else{
            $('#err').hide('slow').slideUp(1000);
            $.ajax({
                url: 'https://newsapi.org/v2/top-headlines',
                type: 'get',
                dataType: 'json',
                data:data,
                success: function(res){
                    if(res){
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
                                            <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${getNews.url}">See Detail</a>
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