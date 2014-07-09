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
});