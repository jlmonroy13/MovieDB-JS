$(function() {
  var $button_menu        =     $('.js-btn-menu'),
      $left_menu          =     $('.js-left-menu'),
      $categories         =     $('.js-categories'),
      api_key             =     'c0b2e256491361d28c75bbe8f9e59a85',
      now_playing         =     'https://api.themoviedb.org/3/movie/now_playing?api_key=',
      popular             =     'https://api.themoviedb.org/3/movie/popular?api_key=',
      top_rated           =     'https://api.themoviedb.org/3/movie/top_rated?api_key=',
      upcoming            =     'https://api.themoviedb.org/3/movie/upcoming?api_key=',
      movies              =     [],
      completeurl         =     now_playing+api_key;

  //To open the left Menu
  $button_menu.click(function() {
    $left_menu.toggleClass('left-menu--display');
  });
  
  getMovies(completeurl, api_key);

  //GET MOVIES
  $categories.change(function(){
    var selectedOption = $('.js-categories option:selected');
    /*NOW PLAYING SELECTION---------------------------------------------------------------------*/  
    if( selectedOption.val() == 'now_playing') {
      completeurl = now_playing+api_key;
      getMovies(completeurl, api_key);
    /*POPULAR SELECTION---------------------------------------------------------------------*/  
    }else if(selectedOption.val() == 'popular') {
      completeurl = popular+api_key;
      getMovies(completeurl, api_key);
    /*UPCOMING SELECTION---------------------------------------------------------------------*/     
    }else if(selectedOption.val() == 'upcoming') {
      completeurl = upcoming+api_key;
      getMovies(completeurl, api_key);
    /*TOP RELATED SELECTION---------------------------------------------------------------------*/      
    }else if(selectedOption.val() == 'top_rated') {
      completeurl = top_rated+api_key;
      getMovies(completeurl, api_key);
    }
  });
});//End Document Ready

