$(function(){
  var api_key                  =     'c0b2e256491361d28c75bbe8f9e59a85',
      now_playing              =     'https://api.themoviedb.org/3/movie/now_playing?api_key=',
      completeurl              =     now_playing+api_key,
      $leftMenu                =     $('.js-left-menu'),
      $infoMovie               =     $('.js-movie-info'),
      $main                    =     $('.main'), 
      templateMovieleftSrc     =     $('#movie-left-template').html(),
      templateMovieLeft        =     Handlebars.compile(templateMovieleftSrc),
      templateMovieInfoSrc     =     $('#movie-info-template').html(),
      templateMovieInfo        =     Handlebars.compile(templateMovieInfoSrc),
      url_moreInfo             =     'http://api.themoviedb.org/3/movie/',
      classFavoriteBtn         =     '.js-btn-add',
      $favoriteButton,
      similarsMovies,
      movieTrailer;
 
  function getMoviesList(url) {
    return new Promise(function(resolve, reject) {
      resolve($.get(completeurl));
      reject('There was a problem with the API');
    });
  }

  getMoviesList().then(showAllMovies);

  function showAllMovies(data) {
    getSimilarsMoviesAndTrialer(data.results[0].id).then(function(movieinfo) {
      $main.css('background', 'url("http://image.tmdb.org/t/p/w1920'+data.results[0].backdrop_path+'") no-repeat');
      data.results[0].similarsMovies = movieinfo.similarsMovies;
      data.results[0].trailer = movieinfo. movieTrailer;
      data.results[0].$infoMovieView = $(templateMovieInfo(data.results[0]));
      $infoMovie.html(data.results[0].$infoMovieView);
    });
    $.each(data.results, function(i, movie) {
      extendMovieObject(movie);
    });
    console.log(data);
  }

  function extendMovieObject(movie) {
    movie.assignLeftMovieView = function() {
      movie.$leftMovieView = $(templateMovieLeft(movie));
    };
    movie.assignFavorite = function() {
      movie.favorite = false;
    }
    movie.assignSimilarsMoviesAndTrailer = function(data){
      movie.similarsMovies = data.similarsMovies;
      movie.trailer = data. movieTrailer;
    }
    movie.assignInfoMovieView = function() {
      movie.$infoMovieView = $(templateMovieInfo(movie));
    };
    movie.events = function() {
      movie.$leftMovieView.click(function(){
        getSimilarsMoviesAndTrialer(movie.id).then(function(data) {
          movie.assignSimilarsMoviesAndTrailer(data);
          movie.assignInfoMovieView();
          $favoriteButton = movie.$infoMovieView.find(classFavoriteBtn);
          $favoriteButton.click(function(){
            alert("hola");
          });
          showMovieInfo(movie);
        });
      });
    }

    movie.assignLeftMovieView();
    movie.assignFavorite();
    movie.$leftMovieView.appendTo($leftMenu);
    movie.events();
  }

  function getSimilarsMoviesAndTrialer(id) {
    return $.get(url_moreInfo+id+'/videos?api_key='+api_key).then(function(dataTrailer) {
      if(dataTrailer.results == 0) {
        alert("No trailer found");
      }else {
        movieTrailer = dataTrailer.results[0]; 
      }
      return $.get(url_moreInfo+id+'/similar?api_key='+api_key);
    }).then(function(dataSimilars) {
      similarsMovies = dataSimilars;
      return {
        movieTrailer: movieTrailer.key,
        similarsMovies: similarsMovies.results
      }
    });
  }

  function showMovieInfo(movie) {
    $main.css('background', 'url("http://image.tmdb.org/t/p/w1920'+movie.backdrop_path+'") no-repeat');
    $infoMovie.html(movie.$infoMovieView);
  }
}); 














 




















//////////////////////////////////////////////////////

// function getMovies(completeurl, api_key) {
//   var url_moreInfo        =     'http://api.themoviedb.org/3/movie/',
//       template_movieleft  =     Handlebars.compile($('#movie-left-template').html()),
//       template_movieinfo  =     Handlebars.compile($('#movie-info-template').html());
//   $.get(completeurl).then(function(movies) {
//     favoriteSelector(movies);
//     //Get info of the first movie and render into Movie Info Section
//     renderMovieInfo(0, api_key, movies);
//     //Empty Left Menu
//     $('.js-movie-container').empty();
//     //add trailer, similars movies and functions to each object
//     $.each(movies.results, function(i, data) {
//       //Add node into the Object
//       data.$leftMovie = $(template_movieleft(data));
//       data.favorite = false;
//       $('.js-movie-container').append(data.$leftMovie);
//       //Display movie info when you click a movie on the left menu
//       (function getTrailerAndSimilars() {
//         data.$leftMovie.click(function() {
//           $.get(url_moreInfo+data.id+'/videos?api_key='+api_key).then(function(videos){
//             if(videos.results == 0) {
//               alert("No trailer found");
//             }else {
//               data.trailer = videos.results[0].key;
//             }
//             return $.get(url_moreInfo+data.id+'/similar?api_key='+api_key);
//           }).then(function(similars){
//             data.similars = similars.results;
//             //Change the main background image
//             $('.main').css('background', 'url("http://image.tmdb.org/t/p/w1920'+data.backdrop_path+'") no-repeat');
//             //Insert trailer, overview and similars movies into infomovie section
//             data.$infoMovie = $(template_movieinfo(data));
//             //Add to favorite
//             (function addFavorite() {
//               var $btn_favorite = data.$infoMovie.find('.js-btn-add');
//               $btn_favorite.click(function(){
//                 changeFavoriteButton(this, data, movies);
//               });
//             })();//END addFavorite function
//             $('.js-movie-info').html(data.$infoMovie);
//           });
//         });
//       })();//END getTrailerAndSimilars function
//     });//END Each function
//   });
// }
// function favoriteSelector(movies) {
//   $('.js-categories').change(function(){
//     hideAndShowElements(movies);
//   });  
// }
// function renderMovieInfo(index, api_key, data) {
//   var url_moreInfo        =     'http://api.themoviedb.org/3/movie/',
//       template_movieinfo  =     Handlebars.compile($('#movie-info-template').html());
//   //Get info of the first movie on the left menu
//   $.get(url_moreInfo+data.results[index].id+'/videos?api_key='+api_key).then(function(videos){
//     if(videos.results == 0) {
//       alert("No trailer found")
//     }else {
//       data.results[index].trailer = videos.results[index].key;
//     }
//     return $.get(url_moreInfo+data.results[index].id+'/similar?api_key='+api_key);
//   }).then(function(similars){
//     data.results[index].similars = similars.results;
//     //Change the main background image
//     $('.main').css('background', 'url("http://image.tmdb.org/t/p/w1920'+data.results[index].backdrop_path+'") no-repeat');
//     data.results[index].$infoMovie = $(template_movieinfo(data.results[index]));
//     //Add to favorite
//     (function addFavorite() {
//       var $btn_favorite = data.results[index].$infoMovie.find('.js-btn-add');
//       $btn_favorite.click(function(){
//         changeFavoriteButton(this, data.results[index], data.results);
//       });
//     })();//END addFavorite function
//     //Insert trailer, overview and similars movies into info movie section
//     $('.js-movie-info').html(data.results[index].$infoMovie);
//   });
// }
// function hideAndShowElements(movies) {
//   var selectedOption = $('.js-categories option:selected');
//   if (selectedOption.val() == 'favorites') {
//     $.each(movies.results, function(i, data) {
//       if(data.favorite) {
//         data.$leftMovie.show();
//       }
//       else {
//         data.$leftMovie.hide();
//       }
//     });
//   }
// } 
// function changeFavoriteButton(button, data, movies) {
//   if(data.favorite) {
//     data.favorite = false; 
//     $(button).html('<span class="icon icon-star icon-star--position"></span> ADD TO FAVORITES');
//   }else {
//     data.favorite = true;
//     $(button).html('<span class="icon icon-star icon-star--position"></span> REMOVE FROM FAVORITES');
//   }
//   $(button).toggleClass('button-add--color');
//   hideAndShowElements(movies);
// }




