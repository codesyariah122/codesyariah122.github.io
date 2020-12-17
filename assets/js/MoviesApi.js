$(document).ready(function(){
    config();

    data.showSearch.on('click', function(){
        data.movieList.html('');
        data.movieSearch.show();
        data.movieReview.hide();
    });

    data.showReview.on('click', function(){
        data.movieList.html('');
        data.movieReview.show();
        data.movieSearch.hide();
    })

    data.closeSearch.on('click', function(){
        data.movieSearch.hide();
        data.movieList.html('');
    });

    data.closeReview.on('click', function(){
        data.movieReview.hide();
        data.movieList.html('');
    })

    data.searchButton.on('click', function(){
        const input = data.searchMovie.val();
        searchMovie(baseAPI.keySearchMovie, input);
        input.val('');
    });
    data.searchMovie.on('keyup', function(e){
        const input = $(this).val();
        if(e.which === 13){
            searchMovie(baseAPI.keySearchMovie, input);
        }
    });

    data.movieList.on('click', '.see-detail-search-movie', function(){
        const detail =  $(this).data('id');

        // alert(input);

        detailMovie(baseAPI.keySearchMovie, detail);
    });

    data.reviewButton.on('click', function(){
        const input = data.searchReview.val();
        reviewMovie(input, baseAPI.keyReviewMovie);
    });

    data.searchReview.on('keyup', function(e){
        const input = $(this).val();
        if(e.which === 13){
            reviewMovie(input, baseAPI.keyReviewMovie);
        }
    });


    // data.reviewList.on('click', '.see-detail-review-movie', function(){
    //     const detail = $(this).data('id');
    //     alert(detail);
    // })

});
