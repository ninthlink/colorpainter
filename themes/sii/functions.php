<?php
/**
 * sii functions and definitions
 *
 * @package sii
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) ) {
	$content_width = 992; /* pixels, but why? */
}

if ( ! function_exists( 'sii_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function sii_setup() {
	if ( ! defined( 'WP_SITEURL' ) ) {
		define('WP_SITEURL', site_url() );
	}
	if ( ! defined( 'WP_HOME' ) ) {
		define('WP_HOME', home_url() );
	}
	
	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'sii' ),
	) );
	
	if ( function_exists( 'add_image_size' ) ) { 
		add_image_size( 'galleryhalf', 720, 580, true ); //cropped
	}
	// Remove the version number of WP + some other meta tags?
	$unactions = array( 'rel_canonical', 'rsd_link', 'wlwmanifest_link', 'wp_generator', 'wp_shortlink_wp_head' );
	$unacts = count( $unactions );
	while ( $unacts-- ) {
		remove_action( 'wp_head', $unactions[$unacts] );
	}
	remove_action( 'wp_head', 'feed_links_extra', 3 );
	
	add_action( 'wp_footer', 'sii_wp_footer_cleanup' );
	
	add_filter( 'login_errors', 'sii_wpfme_login_obscure' );
	add_filter( 'previous_post_rel_link', 'sii_noprevnext' );
	add_filter( 'next_post_rel_link', 'sii_noprevnext' );
	add_filter( 'nav_menu_css_class', 'sii_nav_class' );
	add_filter( 'nav_menu_item_id', 'sii_nav_id' );
	add_filter( 'body_class', 'sii_body_class', 99 );
}
endif; // sii_setup
add_action( 'after_setup_theme', 'sii_setup' );

function sii_postvcinit() {
	global $wp_filter;
	if ( isset( $wp_filter['wp_head'] ) ) {
		foreach ( $wp_filter['wp_head'] as $i => $a ) {
			foreach ( $a as $n => $v ) {
				if ( is_array( $v['function'] ) ) {
					if ( isset( $v['function'][1] ) ) {
						if ( $v['function'][1] == 'addMetaData' ) {
							unset( $wp_filter['wp_head'][$i][$n] );
						}
					}
				}
			}
		}
	}
	//wp_die('<pre>'. print_r($wp_filter,true) .'</pre>');
}
add_action( 'vc_after_init_base', 'sii_postvcinit' );

/**
 * Enqueue a couple scripts and styles,
 * but mostly deregister / dequeue other scripts & styles from plugins...
 */
function sii_scripts() {
	wp_enqueue_style( 'sii', get_stylesheet_uri(), array(), '20141013' );
	/*
	$d = array( 'ultimate-style', 'ultimate-animate' );
	$c = count( $d );
	while ( $c-- ) {
		wp_deregister_style( $d[$c] );
	}
	*/
	$d = array( 'image-mapper-css', 'swatchbook-css', 'font-awesome-css', 'prettyPhoto-css-imapper', 'customScroll-css-imapper', 'bsf-Defaults' );
	$c = count( $d );
	while ( $c-- ) {
		wp_dequeue_style( $d[$c] );
	}
	
	$d = array( 'swatchbook-js', 'modernizr-79639-js', 'jquery-prettyPhoto-imapper', 'rollover-imapper', 'jQuery-ui' );
	$c = count( $d );
	while ( $c-- ) {
		wp_dequeue_script( $d[$c] );
	}
	
	//wp_enqueue_script( 'jquery', get_template_directory_uri() . '/js/jquery.js', array(), '1.11.0', true );
	wp_enqueue_script( 'jquery.waypoints', get_template_directory_uri() . '/js/waypoints.min.js', array('jquery'), '2.0.5', true );
	wp_enqueue_script( 'sii', get_template_directory_uri() . '/js/sii.js', array('jquery', 'jquery.waypoints'), '20141013', true );
}
add_action( 'wp_enqueue_scripts', 'sii_scripts', 40 );

/**
 * Hook to wp_footer action
 * because there are some scripts that just won't go away otherwise
 */
function sii_wp_footer_cleanup() {
	/*
	$d = array( 'ultimate-appear', 'ultimate-custom', 'ultimate-row-bg', 'jquery.shake', 'jquery.vhparallax' );
	$c = count( $d);
	while ( $c-- ) {
		wp_dequeue_script( $d[$c] );
	}
	
	wp_dequeue_style( 'background-style' );
	*/
}

/**
 * Obscure login screen error messages, via http://www.wpfunction.me/
 */
function sii_wpfme_login_obscure() {
	return '<strong>Sorry!</strong> Think you have gone wrong somewhere?';
}

/**
 * Clean up rel meta prev/next link
 */
function sii_noprevnext() {
	return '';
}

/**
 * hook to nav_menu_css_class to wipe it out
 */
function sii_nav_class( $classes ) {
	//return array();
	return $classes;
}

/**
 * hook to nav_menu_item_id to wipe that out
 */
function sii_nav_id( $id ) {
	return $id; //'';
}

/**
 * hook to body_class to clean that up a smidge
 */
function sii_body_class( $classes ) {
	$whitelist = array( 'home', 'admin-bar', 'vc_responsive' );
	$c = count( $classes );
	while( $c-- ) {
		if ( in_array( $classes[$c], $whitelist ) == false ) {
			unset( $classes[$c] );
		}
	}
	return $classes;
}

add_action('generate_rewrite_rules', 'sii_ht_rewrites');
function sii_ht_rewrites($content) {
  $theme_name = next(explode('/themes/', get_stylesheet_directory()));
  global $wp_rewrite;
  $sii_rules = array(
    'favicon.ico' => 'wp-content/themes/'. $theme_name . '/favicon.ico',
    'favicon.png' => 'wp-content/themes/'. $theme_name . '/favicon.png',
	/*
    'cache.manifest' => 'wp-content/themes/'. $theme_name . '/cache.manifest',
    'style.css' => 'wp-content/themes/'. $theme_name . '/style.css',
    'fonts/(.*)' => 'wp-content/themes/'. $theme_name . '/fonts/$1',
    'js/(.*)' => 'wp-content/themes/'. $theme_name . '/js/$1',
    'images/(.*)' => 'wp-content/themes/'. $theme_name . '/images/$1',
	*/
  );
  $wp_rewrite->non_wp_rules += $sii_rules;
}
