<?php
/**
 * Theme header
 *
 * Displays all of the <head> section and everything up to the .site-main loop
 *
 * @package siidist
 */
?><!doctype html>
<html>
<head>
<title><?php if ( wp_title( '', false ) ) { wp_title( '' ); } else { echo get_bloginfo( 'name' ); } ?></title>

<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="HandheldFriendly" content="True">
<meta name="MobileOptimized" content="768">
<meta name="apple-mobile-web-app-title" content="Seiko Dist">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-touch-fullscreen" content="yes">

<link rel="apple-touch-icon" href="<?php bloginfo('template_url'); ?>/images/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="76x76" href="<?php bloginfo('template_url'); ?>/images/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="120x120" href="<?php bloginfo('template_url'); ?>/images/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="152x152" href="<?php bloginfo('template_url'); ?>/images/apple-touch-icon-152x152.png">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div class="rap">
	<div class="site-content">
		<div class="site-header">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="logo"><img src="<?php bloginfo('template_url'); ?>/images/sii.png" alt="<?php esc_attr_e( get_bloginfo( 'name' ) ); ?>" /></a>
			<div class="nav">
				<button class="toggler"><?php _e( 'Primary Menu', 'siidist' ); ?></button>
				<?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'items_wrap' => '<ul>%3$s</ul>' ) ); ?>
			</div>
			<?php get_sidebar('printermenus'); ?>
			<div class="left-end">
				<div class="hello">Hello, Distributor</div>
				<h6><a href="#">LOGOUT</a></h6>
				<ul class="soc">
					<li class="fb"><a href="#">Facebook</a></li>
					<li class="tw"><a href="#">Twitter</a></li>
					<li class="yt"><a href="#">YouTube</a></li>
				</ul>
				<div class="shg">Seiko Holdings Group</div>
			</div>
		</div>

		<div class="content-area">
			<div class="site-main">