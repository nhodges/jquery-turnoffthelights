(function($) {

  $.fn.extend({

    turnoffthelights: function(options) {

      var
        settings = $.extend({
          darkness   : 0.9,
          scrollLock : false,
          top        : 200
        }, options),
        previous = {};

      if ( $('#totl-overlay').length > 0 ) {

        $('body').append($('<div id="totl-overlay"></div>'));

      }

      return this.each(function() {

        var
          target        = $(this),
          target_height = target.outerHeight(),
          target_width  = target.outerWidth();
      
        $('#totl-overlay').on('click', function() {

          turnonthelights(target);

        });

        if ( settings.scrollLock ) {

          previous.htmlOverflowY = $('html').css('overflow-y');
          previous.bodyOverflowY = $('body').css('overflow-y');
          $('html, body').css('overflow-y', 'hidden');

        }

        $('#totl-overlay').css({
          'display' : 'block',
          opacity   : 0
        }).fadeTo(200, settings.darkness);

        $(this).css({ 
          'display'     : 'block',
          'left'        : 50 + '%',
          'margin-left' : -(target_width/2) + "px",
          'opacity'     : 0,
          'position'    : 'fixed',
          'top'         : settings.top + "px",
          'z-index'     : 11000
        });

        $(this).fadeTo(200,1);

      });

      function turnonthelights(target){

        $('#totl-overlay').fadeOut(200);
        target.css({ 'display' : 'none' });

        if ( settings.scrollLock ) {

          $('html').css('overflow-y', previous.htmlOverflowY);
          $('body').css('overflow-y', previous.bodyOverflowY);

        }

      }

    }

  });

})(jQuery);