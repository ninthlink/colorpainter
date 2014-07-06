/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens.
 */
( function() {
	var body, container, button, menu, openmenu;

	body = document.getElementsByTagName( 'body' )[0];
	container = document.getElementById( 'site-navigation' );
	if ( ! container )
		return;

	button = container.getElementsByTagName( 'button' )[0];
	if ( 'undefined' === typeof button )
		return;

	menu = container.getElementsByTagName( 'ul' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	if ( -1 === menu.className.indexOf( 'nav-menu' ) )
		menu.className += ' nav-menu';
	
	openmenu = false;
	
	button.onclick = function() {
		if ( openmenu )
			body.className = body.className.replace( ' toggled', '' );
		else
			body.className += ' toggled';
		
		openmenu = !openmenu;
	};
} )();

/**
 * and then?
 */
jQuery(function($) {
	$('p:empty').remove();
});