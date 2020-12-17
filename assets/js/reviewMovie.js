const reviewMovie = (method, key) => {
    data.movieList.html('');
    const dataReview = {
        'query' : method,
        'api-key' : key
    };
    $.ajax({
        url: `${baseAPI.proxy}${baseAPI.movieReview}`,
        type: 'get',
        dataType: 'json',
        data: dataReview,
        success: function(res){
           if(res){
               data.searchReview.val('');
                const movieReview = res.results;
                console.log(movieReview);
                    for(let i = 0; i <= movieReview.length; i++){
                            $('#review-list').append(`
                                <div class="col-md-4">
                                    <div class="card mb-5 mt-2">
                                        <img src="${movieReview[i].multimedia.src}" class="card-img-top float-left img-responsive" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)!important; color: rgb(255,228,181);border-radius:0%;" alt="...">
                                            <div class="card-body">
                                            <h5 class="card-title" data-query="${movieReview[i].display_title}">${movieReview[i].display_title}</h5>
                                            <h5 class="card-title">${movieReview[i].byline  }</h5>
                                            <h6 class="card-subtitle mb-2 text-muted">${movieReview[i].publication_date}</h6>
                                            <a href="#" class="card-link see-detail-review-movie" data-id="${i}" data-toggle="modal" data-target="#nytimesModal" >See Detail</a>
                                            </div>
                                    </div>
                                </div>
                            `);
                }

           }else{
            data.searchReview.html(`
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
    })
}
