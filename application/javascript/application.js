$(function() {
  var $button_menu    =     $('.js-btn-menu'),
      $left_menu      =     $('.js-left-menu'),
      api_key         =     'c0b2e256491361d28c75bbe8f9e59a85'; 

  //To open the left Menu
  $button_menu.click(function() {
    $left_menu.toggleClass('left-menu--display');
  });

});//End Document Ready