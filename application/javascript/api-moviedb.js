function getMovies(completeurl, api_key) {
  var url_moreInfo        =     'http://api.themoviedb.org/3/movie/',
      template_movieleft  =     Handlebars.compile($('#movie-left-template').html()),
      template_movieinfo  =     Handlebars.compile($('#movie-info-template').html());


  $.get(completeurl).then(function(movies) {

    $.get(url_moreInfo+movies.results[0].id+'/videos?api_key='+api_key).then(function(videos){
      movies.results[0].trailer = videos.results[0].key;
      return $.get(url_moreInfo+movies.results[0].id+'/similar?api_key='+api_key);
    }).then(function(similars){
      movies.results[0].similars = similars.results;
      // //Change the main background image
      $('.main').css('background', 'url("http://image.tmdb.org/t/p/w1920'+movies.results[0].backdrop_path+'") no-repeat');
      //Insert trailer, overview and similars movies into infomovie sectionº
      $('.js-movie-info').html(template_movieinfo(movies.results[0]));
    });

    //add trailer, similars movies and functions to each object
    $('.js-movie-container').empty();
    $.each(movies.results, function(i, data) {
      //Add node into the Object
      data.$leftMovie = $(template_movieleft(data));
      $('.js-movie-container').append(data.$leftMovie);
      //Display movie info when you click a movie on the left menu
      (function getTrailerAndSimilars() {
        data.$leftMovie.click(function() {
          $.get(url_moreInfo+data.id+'/videos?api_key='+api_key).then(function(videos){
            data.trailer = videos.results[0].key;
            return $.get(url_moreInfo+data.id+'/similar?api_key='+api_key);
          }).then(function(similars){
            data.similars = similars.results;
            // //Change the main background image
            $('.main').css('background', 'url("http://image.tmdb.org/t/p/w1920'+data.backdrop_path+'") no-repeat');
            //Insert trailer, overview and similars movies into infomovie section
            data.$infoMovie = $(template_movieinfo(data));
            //Add to favorite
            (function addFavorite() {
              var $btn_favorite = data.$infoMovie.find('.js-btn-add');
              $btn_favorite.click(function(){
                data.favorite = true;
              });
            })();
            $('.js-movie-info').html(data.$infoMovie);
          });
        });
      })();
    });
    console.log(movies);
  });
}
