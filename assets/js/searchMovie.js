const config = () => {
    data.movieSearch.hide();
    data.movieReview.hide();
    data.closeSearch.css({
        'cursor': 'pointer'
    });
    data.closeReview.css({
        'cursor': 'pointer'
    });
};

const searchMovie = (key, method) => {
    const dataMovieApi = {
        'apiKey' : key,
        's' : method
    }
    $.ajax({
        url: `${baseAPI.proxy}${baseAPI.movieSearch}`,
        type: 'get',
        dataType: 'json',
        data: dataMovieApi,
        success: function(res){
            if(res.Response == 'True'){
                data.searchMovie.val('');
                let movies = res.Search;
                $.each(movies, function(i, data){
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-5 mt-2">
                                <img src="${data.Poster}" class="card-img-top float-left img-responsive" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)!important; color: rgb(255,228,181);border-radius:0%;" alt="...">
                                    <div class="card-body">
                                    <h5 class="card-title">${data.Title}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                                    <a href="#" class="card-link see-detail-search-movie" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
                                    </div>
                            </div>
                        </div>
                    `);
                })
            }else{
               data.movieList.html(`
                <div class="col-12">
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Wooopssshhh!!!</strong> <span class="text-center">${res.Error}</span>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                </div>
                `);
            }
        }
    });
}
const detailMovie = (key, method) => {
    const dataMovieApi = {
        'apiKey': key,
        'i': method
    };

    $.ajax({
        url: `${baseAPI.proxy}${baseAPI.movieSearch}`,
        type: 'get',
        dataType: 'json',
        data: dataMovieApi,
        success: function(res){
            if(res.Response === 'True'){
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${res.Poster}" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>${res.Title}</h3></li>
                                    <li class="list-group-item">Released : ${res.Released}</li>
                                    <li class="list-group-item">Genre : ${res.Genre}</li>
                                    <li class="list-group-item">Director : ${res.Director}</li>
                                    <li class="list-group-item">Actor : ${res.Actors}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });

}