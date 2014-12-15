jQuery(function($) {
	$('p:empty').remove();
	
	var body = $('body'), container = $('.nav'), button = container.children(':first'), menu = button.next(), mopen = false, cdopen = false, jdopen = false;
	// main Menu button
	button.click(function() {
		if ( mopen ) {
			// close
			body.removeClass('tog cd jd');
			// also reset menu trackers
			cdopen = false;
			jdopen = false;
		} else {
			body.addClass('tog');
		}
		mopen = !mopen;
	});
	menu.find('li').each(function(i) {
		switch ( i ) {
			case 1:
				$(this).click(function() {
					if ( cdopen ) {
						body.removeClass('cd');
					} else {
						body.addClass('tog cd');
						if ( jdopen ) {
							jdopen = false;
							body.removeClass('jd');
						}
					}
					cdopen = !cdopen;
					return false;
				});
				break
			case 2:
				$(this).children().click(function() {
					if ( jdopen ) {
						body.removeClass('jd');
					} else {
						body.addClass('tog jd');
						if ( cdopen ) {
							cdopen = false;
							body.removeClass('cd');
						}
					}
					jdopen = !jdopen;
					return false;
				});
				break;
		}
	});
	
	$('.c > .back > a').click(function() {
		cdopen = false;
		body.removeClass('cd');
		return false;
	});
	$('.j > .back > a').click(function() {
		jdopen = false;
		body.removeClass('jd');
		return false;
	});
	
	/* tooltip height fixes */
	$('.imapper-content-wrapper').each(function(i) {
		var th = 65 + $(this).find('p.imapper-content-header').height() + $(this).find('.imapper-content-text').height();
		$(this).add($(this).children('.imapper-content')).height(th);
	});
	
  if ( body.hasClass('single-post') == false ) {
    // section quicklinks
    var sitemain = $('.site-main');
    //sitemain.find('.wpb_row:first').addClass('section').prepend('<a id="top"></a>');
    var wpul = $('<ul />').addClass('w');
    wpul.appendTo(sitemain);
    //wpul.prepend('<li class="active"><a href="#top" class="vc_btn vc_btn_blue vc_btn_xs vc_btn_round">Overview</a></li>');
    var sections = [];
    // first
    $('.site-main .wpb_row:first').each(function() {
      if ( $(this).hasClass('section') == false ) {
        $(this).addClass('section hh').prepend('<h2 class="hh">Overview</h2>');
      }
    });
    $('.section').each(function(i) {
      var thismarker = false;
      var thisid = '';
      var thissection = $(this);
      $(this).find('h2:first').each(function() {
        var ht = $(this).text();
        if ( i > 0 ) {
          thisid = ht;
          var lastspace = ht.lastIndexOf(' ');
          if ( lastspace > 0 ) {
            thisid = ht.substr(lastspace + 1);
          }
          thisid = thisid.replace(/\s+/g, '-').toLowerCase();
          thissection.attr('id', thisid);
        }
        // also floating nav waypoints
        thismarker = $('<li />');
        if ( i == 0 ) {
          thismarker.addClass('active');
        }
        thismarker.append('<a href="#'+ thisid +'" class="vc_btn vc_btn_blue vc_btn_xs vc_btn_round">'+ ht +'</a>');
        thismarker.appendTo(wpul);
      });
      if ( thismarker != false ) {
        $(this).waypoint(function(direction) {
          if ( direction === 'down' ) {
            thismarker.addClass('active').siblings().removeClass('active');
          } else {
            thismarker.removeClass('active').prev().addClass('active');
          }
        }, {
          offset: 70
        });
        sections.push(thissection);
        thismarker.children('a').click(function(event) {
          event.preventDefault();
          var scrollto = 0;
          if ( i > 0 ) {
            scrollto = thissection.offset();
            scrollto = Math.floor(scrollto.top);
          }
          //alert('hello? '+ cht + ' ' + bht + ' > ' + scrollto);
          var thisa = $(this);
          $('html,body').animate({'scrollTop': scrollto}, 300, function() {
            window.location.hash = thisid;
          });
        });
      }
    });
  }
});