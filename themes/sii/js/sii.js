jQuery(function($) {
	$('p:empty').remove();
	
	var body = $('body'), container = $('.nav'), button = container.children(':first'), menu = button.next(), mopen = false, cdopen = false, jdopen = false;
	// main Menu buttons functionality
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
	menu.find('li').eq(1).click(function() {
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
	// make the main nav flopouts "Back" links work correctly?
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
    // add section quicklinks
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
	// /community teaser fix
	if ( $('.wpb_teaser_grid').size() > 0 ) {
		$('.wpb_thumbnails-fluid li').each(function(i) {
			// theres only 2, so add classes for better css'ing
			$(this).addClass( i == 0 ? 'first' : 'last' );
		});
		$('.wpb_teaser_grid h2').each(function() {
			// change h2 to h5
			$(this).wrapInner('<h5 />').children().insertAfter($(this));
			// add shadow to imgs
			$(this).prev().find('img').wrap('<span class="vc_box_shadow_3d_wrap" />');
			// remove old h2
			$(this).remove();
		});
	}
  
  // add some extra column classes for spacing fine tuning?
  $('.vc_row.wpb_row').each(function() {
    var childrens = $(this).children();
    switch( childrens.size() )  {
      case 2:
        childrens.eq(0).addClass('lcol2').next().addClass('rcol2');
        break;
      case 3:
        childrens.eq(0).addClass('lcol3').next().addClass('mcol3').next().addClass('rcol3');
        break;
    }
  });
  
  // stripe some doc tables?
  $('.docs table').each(function() {
    $(this).find('tr:even').addClass('stripe');
  });

  // show/hide forms on request info page
  $('.requestsample_form').hide();
  $('.newsletter_form').hide();
  $('.other_form').hide();
  $('.register_form').hide();
  $(window).load(function() {
    $('.requestsample_btn button').click(function(){
        $('.requestsample_form').show();
    });
    $('.requestsample_btn_close button').click(function(){
        $('.requestsample_form').hide();
    });
    $('.newsletter_btn button').click(function(){
        $('.newsletter_form').show();
    });
    $('.newsletter_btn_close button').click(function(){
        $('.newsletter_form').hide();
    });
    $('.other_btn button').click(function(){
        $('.other_form').show();
    });
    $('.other_btn_close button').click(function(){
        $('.other_form').hide();
    });
    $('.register_btn button').click(function(){
        $('.register_form').show();
    });
    $('.register_btn_close button').click(function(){
        $('.register_form').hide();
    });
  });
});