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
				$(this).addClass('c').children().click(function() {
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
				$(this).addClass('j').children().click(function() {
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
	
	/* section quicklinks? */
	var sitemain = $('.site-main');
	//sitemain.find('.wpb_row:first').addClass('section').prepend('<a id="top"></a>');
	var wpul = $('<ul />').addClass('w');
	wpul.appendTo(sitemain);
	//wpul.prepend('<li class="active"><a href="#top" class="vc_btn vc_btn_blue vc_btn_xs vc_btn_round">Overview</a></li>');
	var sections = [];
	$('.section').each(function(i) {
		console.log('section '+ i);
		var thismarker = false;
		var thisid = '';
		$(this).find('h2').each(function() {
			var ht = $(this).text(), hta = ht;
			var lastspace = ht.lastIndexOf(' ');
			if ( lastspace > 0 ) {
				hta = ht.substr(lastspace + 1);
			}
			thisid = hta.replace(/\s+/g, '-').toLowerCase();
			hta = 's-' + thisid;
			//console.log(i + ' : ' + ht + ' == ' + hta);
			$(this).prepend('<a id="'+ hta +'"></a>');
			// also floating nav waypoints?
			thismarker = $('<li />');
			thismarker.append('<a href="#'+ hta +'" class="vc_btn vc_btn_blue vc_btn_xs vc_btn_round">'+ ht +'</a>');
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
				offset: 50
			});
			sections.push($(this));
			
			thismarker.children().click(function(event) {
				event.preventDefault();
				console.log('dot click : '+ thisid);
				if ( i==0 ) {
					thisid = 'top';
				}
				window.location.hash = thisid;
			});
		}
	});
	// smoothe scroll #needswork
	if ( sections.length > 0 ) {
		$(window).bind('hashchange', function() {
			var whash = '' + window.location.hash, totop = false, tid = '.site-main', tar = false;
			if ( whash == '#top' ) {
				totop = true;
			} else {
				tid = '#s-'+ whash.substr(1);
			}
			tar = $(tid);
			if ( tar.size() > 0 ) {
				var scrollto = 0;
				if ( totop == false ) {
					scrollto = tar.offset();
					scrollto = scrollto.top - 60;
				}
				//console.log('hashchange : scroll to ' + scrollto + ' ' + tid);
				$('html,body').animate({ 'scrollTop': scrollto }, 300);
			}
		}).trigger('hashchange');
	}
});