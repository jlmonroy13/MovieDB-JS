$(function() {
  var $button_menu        =     $('.js-btn-menu'),
      $left_menu          =     $('.js-left-menu'),
      api_key             =     'c0b2e256491361d28c75bbe8f9e59a85',
      template_movieleft  =     Handlebars.compile($('#movie-left-template').html()),
      template_movieinfo  =     Handlebars.compile($('#movie-info-template').html()),
      now_playing         =     'https://api.themoviedb.org/3/movie/now_playing?api_key=',
      popular             =     'https://api.themoviedb.org/3/movie/popular?api_key=',
      top_rated           =     'https://api.themoviedb.org/3/movie/top_rated?api_key=',
      upcoming            =     'https://api.themoviedb.org/3/movie/upcoming?api_key=',
      movies              =     [];

      var completeurl = top_rated+api_key;
  //To open the left Menu
  $button_menu.click(function() {
    $left_menu.toggleClass('left-menu--display');
  });


   
    getMovies(completeurl, api_key, 0).then(function(data) {
      movies = data;
      //Insert movies on left Menu
      $('.js-movie-container').html(template_movieleft(movies));
      //Change the main background image
      $('.main').css('background', 'url("http://image.tmdb.org/t/p/w1920'+movies.results[0].backdrop_path+'") no-repeat');
      //Insert trailer, overview and similars movies into infomovie section
      $('.js-movie-info').html(template_movieinfo(movies.results[0]));
    });


 
  // //Insert movies on left Menu
  // movies = getMovies(now_playing+api_key);
  // console.log(movies);
  // $('.js-movie-container').html(template_movieleft(movies));

  // //Change the main background image
  // $('.main').css('background', 'url("http://image.tmdb.org/t/p/w1920'+movies.results[0].backdrop_path+'") no-repeat');
  
  // //Get the first movie trailer
  // var id_firstMovie = movies.results[0].id;
  // var url_videos = 'http://api.themoviedb.org/3/movie/'+id_firstMovie+'/videos?api_key='+api_key;
  // var videos = getMovies(url_videos);
  // console.log(videos);
  // movies.results[0].trailer = videos.results[0].key;

  // //Get similar movies of the first movie
  // var url_similars = 'http://api.themoviedb.org/3/movie/'+id_firstMovie+'/similar?api_key='+api_key;
  // var similars = getMovies(url_similars);
  // movies.results[0].similars = similars.results;
  // console.log(similars);

  // //Insert trailer, overview and similars movies into infomovie section
  // $('.js-movie-info').html(template_movieinfo(movies.results[0]));





  // var condicion = true;

  //CREATING A PROMISE
  // var promise = new Promise(function (resolve, reject) {
  //   if(condicion) {
  //     resolve('Sí, todo funcionó');
  //   }
  //   else {
  //     reject(new Error('Algo anda mal'));
  //   }
  // });
  // promise.then(function (result) {
  //   console.log('¿Funcionó?', result);
  // }).catch(function(err) {
  //   console.error('ERR', err);
  // })


  // function wait(ms) {
  //   return new Promise(function(resolve) {
  //     console.log(this);
  //     window.setTimeout(function() {
  //       resolve();
  //     }, ms);
  //   });
  // };

  // var milliseconds = 2000;
  // wait(milliseconds).then(alert(milliseconds));
  
  

});//End Document Ready

