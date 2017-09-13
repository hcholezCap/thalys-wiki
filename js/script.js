(function ($) {

  $(document).ready(function () {
    
    //Liste déroulante
    $('.list-select button').click(function() {
      $('.list-select').toggleClass('open');
    });
    
    //input
    $('.input.ok, .input.base').click(function() {
      $(this).addClass('active');
    });
  });

})(jQuery);
