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
	$content_width = 640; /* pixels */
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

}
endif; // siidist_setup
add_action( 'after_setup_theme', 'siidist_setup' );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function siidist_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'siidist' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
}
add_action( 'widgets_init', 'siidist_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function siidist_scripts() {
	wp_enqueue_style( 'siidist-style', get_stylesheet_uri() );
	
	wp_deregister_style( 'js_composer_front' );
	wp_deregister_style( 'ultimate-animate' );
	wp_deregister_style( 'ultimate-style' );
	wp_dequeue_style( 'bsf-Defaults' );
	
	wp_enqueue_script( 'siidist-navigation', get_template_directory_uri() . '/js/navigation.js', array('jquery'), '20140705', true );
	/*
	wp_enqueue_script( 'siidist-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20130115', true );
	
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
	*/
}
add_action( 'wp_enqueue_scripts', 'siidist_scripts' );

/**
 * Remove the version number of WP + some other meta tags
 */
$unactions = array( 'rel_canonical', 'rsd_link', 'wlwmanifest_link', 'wp_generator', 'wp_shortlink_wp_head' );
$unacts = count( $unactions );
while ( $unacts-- ) {
	remove_action( 'wp_head', $unactions[$unacts] );
}
remove_action( 'wp_head', 'feed_links_extra', 3 );

/**
 * Obscure login screen error messages, via http://www.wpfunction.me/
 */
function siidist_wpfme_login_obscure() {
	return '<strong>Sorry!</strong> Think you have gone wrong somewhere?';
}
add_filter( 'login_errors', 'siidist_wpfme_login_obscure' );