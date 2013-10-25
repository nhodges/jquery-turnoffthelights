/**
 * jQuery Turn Off The Lights v0.0.1
 *
 * Terms of Use - jQuery Turn Off The Lights
 * under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 *
 * Copyright 2013 Nuri Hodges (irunbackwards). All rights reserved.
 * (http://github.com/nhodges/jquery-turnoffthelights/)
 *
 */

 (function($) {

  $.fn.extend({

    turnoffthelights: function(options) {

      var
        settings = $.extend({
          callback         : null,
          closeButton      : '.modal-close',
          closeDestination : null,
          darkness         : 0.9,
          scrollLock       : false,
          top              : 200
        }, options),
        previous = {};

      if ( $('#totl-overlay').length == 0 ) {

        $('body').append($('<div id="totl-overlay"></div>'));

      }

      return this.each(function() {

        var
          target        = $(this),
          target_height = target.outerHeight(),
          target_width  = target.outerWidth();
      
        $('#totl-overlay').on('click', function(e) {
          target.trigger('turnonthelights');
        });

        $(settings.closeButton, target).on('click', function(e) {
          target.trigger('turnonthelights');
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

        target.css({ 
          'display'     : 'block',
          'left'        : 50 + '%',
          'margin-left' : -(target_width/2) + "px",
          'opacity'     : 0,
          'position'    : 'fixed',
          'top'         : settings.top + "px",
          'z-index'     : 11000
        });

        target.fadeTo(200,1);

        // callback

          if (settings.callback) {
            settings.callback();
          }

        // binds

          target.bind('turnonthelights', function() { turnonthelights($(this)) });

          $('body').on('keyup', function(e) {
            if ( e.which === 27 ) {
              target.trigger('turnonthelights');
            }
          });

      });

      function turnonthelights(target){

        if ( settings.closeDestination ) {

          window.location.href = settings.closeDestination;

        } else {

          $('#totl-overlay').fadeOut(200);
          target.css({ 'display' : 'none' });

          if ( settings.scrollLock ) {

            $('html').css('overflow-y', previous.htmlOverflowY);
            $('body').css('overflow-y', previous.bodyOverflowY);

          }

        }

      }

    }

  });

})(jQuery);