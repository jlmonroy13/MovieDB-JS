// function getMovies(url) {
//   return new Promise(function(resolve) {
//     $.ajax({ type: 'GET',
//       url: url,
//       // async: false,
//       success: function(data) {
//         resolve(data);
//       }
//     });
//   })
// }




function getMovies(url, api_key, index) {
  var url_moreInfo = 'http://api.themoviedb.org/3/movie/';
  var data;
  //GET THE MOVIE LIST
  return $.get(url).then(function(movies) {
    data = movies;
    return $.get(url_moreInfo+movies.results[index].id+'/videos?api_key='+api_key);
  }).then(function(videos) {
    data.results[index].trailer = videos.results[0].key;
    return $.get(url_moreInfo+data.results[index].id+'/similar?api_key='+api_key);
  }).then(function(similars) {
    data.results[index].similars = similars.results;
    return data;
  });
}


// function getMovies(url) {
//   var info;
//   $.ajax({ type: 'GET',
//     url: url,
//     async: false,
//     success: function(data) {
//       info = data;
//     }
//   });
//   return info;
// }

  // getMovies(now_playing+api_key).then(function(data) {
  //   console.log(data);
  //   //Insert movies on left Menu
  //   $('.js-movie-container').html(template_movieleft(data));
    
  //   //Change the main background image
  //   $('.main').css('background', 'url("http://image.tmdb.org/t/p/w1920'+data.results[0].backdrop_path+'") no-repeat');
    
  //   //Get the first movie trailer
  //   var id_firstMovie = data.results[0].id;
  //   var url_videos = 'http://api.themoviedb.org/3/movie/'+id_firstMovie+'/videos?api_key='+api_key;
  //   getMovies(url_videos).then(function(videos) {
  //     data.results[0].trailer = videos.results[1].key;
  //   });
    
  //   //Get similar movies of the first movie
  //   var url_similars = 'http://api.themoviedb.org/3/movie/'+id_firstMovie+'/similar?api_key='+api_key;
  //   getMovies(url_similars).then(function(similars) {
  //     data.results[0].similars = similars.results;
  //   });

  //   //Insert trailer, overview and similars movies into infomovie section
  //   $('.js-movie-info').html(template_movieinfo(data.results[0]));
  // });

