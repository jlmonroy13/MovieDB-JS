function getMovies() {
  var info;
  $.ajax({ type: 'GET',
    url: 'https://api.themoviedb.org/3/movie/550?api_key=c0b2e256491361d28c75bbe8f9e59a85',
    async: false,
    success: function(data) {
      info = data;
    }
  });
  return info;
}