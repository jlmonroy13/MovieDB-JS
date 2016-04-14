$(function(){
  var api_key                  =     'c0b2e256491361d28c75bbe8f9e59a85',
      $buttonMenu              =     $('.js-btn-menu'),
      $menu                    =     $('.js-left-menu'),
      $leftMenu                =     $('.js-movie-container'),
      $infoMovie               =     $('.js-movie-info'),
      $categories              =     $('.js-categories'),
      $main                    =     $('.main'),
      $favoriteSelector        =     $('.js-favorite-selector'), 
      templateMovieleftSrc     =     $('#movie-left-template').html(),
      templateMovieLeft        =     Handlebars.compile(templateMovieleftSrc),
      templateMovieInfoSrc     =     $('#movie-info-template').html(),
      templateMovieInfo        =     Handlebars.compile(templateMovieInfoSrc),
      url_moreInfo             =     'http://api.themoviedb.org/3/movie/',
      classFavoriteBtn         =     '.js-btn-add',
      now_playing              =     'https://api.themoviedb.org/3/movie/now_playing?api_key=',
      popular                  =     'https://api.themoviedb.org/3/movie/popular?api_key=',
      top_rated                =     'https://api.themoviedb.org/3/movie/top_rated?api_key=',
      upcoming                 =     'https://api.themoviedb.org/3/movie/upcoming?api_key=',
      completeurl              =     now_playing+api_key,
      $favoriteButton, similarsMovies, movieTrailer;

  function getMoviesList(url) {
    return new Promise(function(resolve, reject) {
      resolve($.get(url));
      reject('There was a problem with the API');
    });
  }

  function showAllMovies(data) {
    $leftMenu.empty();
    $favoriteSelector.hide(); 
    $categories.change(function(){
      hideAndShowElements(data);
    });
    getSimilarsMoviesAndTrialer(data.results[0].id).then(function(movieinfo) {
      $main.css('background', 'url("http://image.tmdb.org/t/p/w1920'+data.results[0].backdrop_path+'") no-repeat');
      data.results[0].similarsMovies = movieinfo.similarsMovies;
      data.results[0].trailer = movieinfo. movieTrailer;
      data.results[0].$infoMovieView = $(templateMovieInfo(data.results[0]));
      $favoriteButton = data.results[0].$infoMovieView.find(classFavoriteBtn);
      $favoriteButton.click(function(){
        addRemoveFavorites(data.results[0], this);
        $favoriteSelector.show(); 
      });
      $infoMovie.html(data.results[0].$infoMovieView);
    });
    $.each(data.results, function(i, movie) {
      extendMovieObject(movie, data);
    });
    console.log(data);
  }

  function extendMovieObject(movie, movies) {
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
            addRemoveFavorites(movie, this, movies);
            $favoriteSelector.show(); 
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
        movieTrailer = ''; 
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

  function addRemoveFavorites(movie, button, movies) {
    if(movie.favorite) {
      movie.favorite = false;
      $(button).html('<span class="icon icon-star icon-star--position"></span> ADD TO FAVORITES');
    }else {
      movie.favorite = true;
      $(button).html('<span class="icon icon-star icon-star--position"></span> REMOVE FROM FAVORITES');
    }
    $(button).toggleClass('button-add--color');
    hideAndShowElements(movies);
  }

  function hideAndShowElements(movies) {
    var $selectedOption = $('.js-categories option:selected');
    if ($selectedOption.val() == 'favorites') {
      $.each(movies.results, function(i, data) {
        if(data.favorite) {
          data.$leftMovieView.show();
        }
        else {
          data.$leftMovieView.hide();
        }
      });
    }
  }

  //To open the left Menu
  $buttonMenu.click(function() {
    $menu.toggleClass('left-menu--display');
  });

  //GET MOVIES AT THE FIRST TIME
  getMoviesList(completeurl).then(showAllMovies).catch(function(err) {
    alert(err);
  });

  //GET MOVIES DEPENDING URL 
  $categories.change(function(){
    var $selectedOption = $('.js-categories option:selected');
    /*NOW PLAYING SELECTION---------------------------------------------------------------------*/  
    if( $selectedOption.val() == 'now_playing') {
      completeurl = now_playing+api_key;
      getMoviesList(completeurl).then(showAllMovies);
    /*POPULAR SELECTION---------------------------------------------------------------------*/  
    }else if($selectedOption.val() == 'popular') {
      completeurl = popular+api_key;
      getMoviesList(completeurl).then(showAllMovies);
    /*UPCOMING SELECTION---------------------------------------------------------------------*/     
    }else if($selectedOption.val() == 'upcoming') {
      completeurl = upcoming+api_key;
      getMoviesList(completeurl).then(showAllMovies);
    /*TOP RELATED SELECTION---------------------------------------------------------------------*/      
    }else if($selectedOption.val() == 'top_rated') {
      completeurl = top_rated+api_key;
      getMoviesList(completeurl).then(showAllMovies);
    }
  });
}); 




