jQuery(function($) {
	$('p:empty').remove();
	
	var body = $('body'), container = $('#site-navigation'), button = container.find('button'), menu = container.find('ul'), cplink = menu.find('li.cp > a');
	button.click(function() {
		body.toggleClass('toggled');
	});
	var cpopen = false;
	// #needswork
	cplink.click(function() {
		if ( cpopen ) {
			body.removeClass('toggled cp');
		} else {
			body.addClass('toggled cp');
		}
		cpopen = !cpopen;
		return false;
	});
	
	$('.cpmenu > .back > a').click(function() {
		cpopen = false;
		body.removeClass('cp');
		return false;
	});
});