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

if ( ! defined( 'SII_MOD_DATE' ) ) {
	define('SII_MOD_DATE', '20150106' );
}

if ( ! function_exists( 'sii_setup' ) ) :
/**
 * Set up theme defaults and hook to some actions and filters
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
		'ftrtop' => __( 'Footer Top Menu', 'sii' ),
	) );
	
	if ( function_exists( 'add_image_size' ) ) { 
		add_image_size( 'galleryhalf', 720, 580, true );
		add_image_size( 'blogthird', 296, 197, true );
	}
	// Remove the version number of WP + some other meta tags?
	$unactions = array( 'rel_canonical', 'rsd_link', 'wlwmanifest_link', 'wp_generator', 'wp_shortlink_wp_head' );
	$unacts = count( $unactions );
	while ( $unacts-- ) {
		remove_action( 'wp_head', $unactions[$unacts] );
	}
	remove_action( 'wp_head', 'feed_links_extra', 3 );
	
	add_filter( 'login_errors', 'sii_wpfme_login_obscure' );
	add_filter( 'previous_post_rel_link', 'sii_noprevnext' );
	add_filter( 'next_post_rel_link', 'sii_noprevnext' );
	add_filter( 'nav_menu_css_class', 'sii_nav_class' );
	add_filter( 'nav_menu_item_id', 'sii_nav_id' );
}
endif; // sii_setup
add_action( 'after_setup_theme', 'sii_setup' );

/**
 * Register some sidebar(s) or widgetized areas?
 */
function sii_widgets_init() {
  // example register_sidebar, not actually used anywhere on Front End (yet?)
	register_sidebar( array(
		'name'          => 'Sidebar',
		'id'            => 'sidebar_1',
		'before_widget' => '<div>',
		'after_widget'  => '</div>',
		'before_title'  => '<h3>',
		'after_title'   => '</h3>',
	) );

}
add_action( 'widgets_init', 'sii_widgets_init' );

/**
 * Enqueue a few scripts & styles,
 * and deregister / dequeue other scripts & styles from plugins...
 */
function sii_scripts() {
  add_thickbox();
  
	wp_enqueue_style( 'sii', get_stylesheet_uri(), array(), SII_MOD_DATE );
	
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
	
	wp_enqueue_script( 'jquery.waypoints', get_template_directory_uri() . '/js/waypoints.min.js', array('jquery'), '2.0.5', true );
	wp_enqueue_script( 'sii', get_template_directory_uri() . '/js/sii.js', array('jquery', 'jquery.waypoints'), SII_MOD_DATE, true );
  
  // check if we are on a single blog page or on /blog, and if so, wp_enqueue_style('js_composer_front');
  if ( is_home() || is_archive() || is_single() ) {
    wp_enqueue_style( 'js_composer_front' );
		// overwrite to add dependency so order is ok?!
		$upload_dir = wp_upload_dir();
		if ( is_file( $upload_dir['basedir'] . '/' . vc_upload_dir() . '/custom.css' ) ) {
			wp_deregister_style( 'js_composer_custom_css' );
			wp_enqueue_style( 'js_composer_custom_css', $upload_dir['baseurl'] . '/' .  vc_upload_dir() . '/custom.css', array( 'js_composer_front' ), SII_MOD_DATE, 'screen' ); //WPB_VC_VERSION, 'screen' );
		}
  }
}
add_action( 'wp_enqueue_scripts', 'sii_scripts', 40 );

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
 * Hook to nav_menu_css_class to wipe out all but a few
 */
function sii_nav_class( $classes ) {
	$nc = array();
	$allowed = array( 'd', 'j', 'c' );
	$count = count( $allowed );
	while( $count-- ) {
		$chk = $allowed[$count];
		if ( in_array( $chk, $classes ) ) {
			$nc[] = $chk;
		}
	}
	return $nc;
}

/**
 * Hook to nav_menu_item_id to wipe that out too
 */
function sii_nav_id( $id ) {
	return '';
}

/**
 * Hook to generate_rewrite_rules to add our favicon that way
 */
function sii_ht_rewrites($content) {
  $theme_name = next(explode('/themes/', get_stylesheet_directory()));
  global $wp_rewrite;
  $sii_rules = array(
    'favicon.ico' => 'wp-content/themes/'. $theme_name . '/favicon.ico',
    'favicon.png' => 'wp-content/themes/'. $theme_name . '/favicon.png',
  );
  $wp_rewrite->non_wp_rules += $sii_rules;
}
add_action('generate_rewrite_rules', 'sii_ht_rewrites');

/**
 * Hook to vc_after_init_base to remove that meta tag with latest JS Visual Composer
 */
function sii_vc_afterinitbase() {
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
}
add_action( 'vc_after_init_base', 'sii_vc_afterinitbase' );

/**
 * Hook to vc_after_init to tweak some params?
 * based off http://kb.wpbakery.com/index.php?title=Update_single_param_values
 *
function sii_vc_tweaks() {
	//Get current values stored in the color param in "Call to Action" element
  $param = WPBMap::getParam('vc_button2', 'style');
  //Append new value to the 'value' array
  $param['value'][__('Super color', 'js_composer')] = 'btn-super-color';
  //Finally "mutate" param with new values
  WPBMap::mutateParam('vc_cta_button', $param);
}
add_action( 'vc_after_init', 'sii_vc_tweaks' );
*/

/**
 * Hook to admin_bar_menu to clean up remove Customize link
 */
function sii_clean_admin_bar( $wp_admin_bar ) {
  $bye = array( 'customize', 'themes', 'widgets', 'wp-logo' );
  foreach ( $bye as $b ) {
    $wp_admin_bar->remove_node( $b );
  }
}
add_action( 'admin_bar_menu', 'sii_clean_admin_bar', 999 );