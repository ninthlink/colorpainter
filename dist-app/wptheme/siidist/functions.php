<?php
/**
 * siidist functions and definitions
 *
 * @package siidist
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) ) {
	$content_width = 992; /* pixels, but why? */
}

if ( ! function_exists( 'siidist_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function siidist_setup() {
	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'siidist' ),
	) );
	
	// Remove the version number of WP + some other meta tags
	$unactions = array( 'rel_canonical', 'rsd_link', 'wlwmanifest_link', 'wp_generator', 'wp_shortlink_wp_head' );
	$unacts = count( $unactions );
	while ( $unacts-- ) {
		remove_action( 'wp_head', $unactions[$unacts] );
	}
	remove_action( 'wp_head', 'feed_links_extra', 3 );
	
	add_action( 'wp_footer', 'siidist_wp_footer_cleanup' );
	
	add_filter( 'login_errors', 'siidist_wpfme_login_obscure' );
	add_filter( 'previous_post_rel_link', 'siidist_noprevnext' );
	add_filter( 'next_post_rel_link', 'siidist_noprevnext' );
	add_filter( 'nav_menu_css_class', 'siidist_nav_class' );
	add_filter( 'nav_menu_item_id', 'siidist_nav_id' );
	add_filter( 'body_class', 'siidist_body_class', 99 );
}
endif; // siidist_setup
add_action( 'after_setup_theme', 'siidist_setup' );

/**
 * Enqueue scripts and styles.
 */
function siidist_scripts() {
	wp_enqueue_style( 'siidist-style', get_stylesheet_uri(), array(), '20140709' );
	
	wp_deregister_style( 'js_composer_front' );
	wp_deregister_style( 'ultimate-animate' );
	wp_deregister_style( 'ultimate-style' );
	wp_dequeue_style( 'bsf-Defaults' );
	
	wp_deregister_script( 'jquery' );
	wp_deregister_script( 'jquery-migrate' );
	wp_enqueue_script( 'jquery', get_template_directory_uri() . '/js/jquery.js', array(), '1.11.0', true );
	wp_enqueue_script( 'siidist', get_template_directory_uri() . '/js/dist.js', array('jquery'), '20140709', true );
	/*
	wp_enqueue_script( 'siidist-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20130115', true );
	
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
	*/
}
add_action( 'wp_enqueue_scripts', 'siidist_scripts' );

/**
 * Hook to wp_footer action
 * because there are some scripts that just won't go away otherwise
 */
function siidist_wp_footer_cleanup() {
	$ults = array( 'appear', 'custom', 'row-bg' );
	$ultcount = count( $ults);
	while ( $ultcount-- ) {
		wp_dequeue_script( 'ultimate-'. $ults[$ultcount] );
	}
}

/**
 * Obscure login screen error messages, via http://www.wpfunction.me/
 */
function siidist_wpfme_login_obscure() {
	return '<strong>Sorry!</strong> Think you have gone wrong somewhere?';
}

/**
 * Clean up rel meta prev/next link
 */
function siidist_noprevnext() {
	return '';
}

/**
 * hook to nav_menu_css_class to wipe it out
 */
function siidist_nav_class( $classes ) {
	return array();
}

/**
 * hook to nav_menu_item_id to wipe that out
 */
function siidist_nav_id( $id ) {
	return '';
}

/**
 * hook to body_class to clean that up a smidge
 */
function siidist_body_class( $classes ) {
	$whitelist = array( 'home', 'admin-bar', 'vc_responsive' );
	$c = count( $classes );
	while( $c-- ) {
		if ( in_array( $classes[$c], $whitelist ) == false ) {
			unset( $classes[$c] );
		}
	}
	return $classes;
}
