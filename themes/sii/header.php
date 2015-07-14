<?php
/**
 * Theme header
 *
 * Displays all of the <head> section and everything up to the .site-main loop
 *
 * @package sii
 */
?><!doctype html>
<html>
<head>
<title><?php if ( wp_title( '', false ) ) { wp_title( '' ); } else { echo get_bloginfo( 'name' ); } ?></title>

<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="HandheldFriendly" content="True">
<meta name="MobileOptimized" content="768">
<meta name="apple-mobile-web-app-title" content="Distributor">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-touch-fullscreen" content="yes">

<link rel="icon" type="image/png" href="<?php echo WP_SITEURL; ?>/favicon.png">
<link rel="shortcut icon" type="image/x-icon" href="<?php echo WP_SITEURL; ?>/favicon.ico">
<link rel="apple-touch-icon" href="<?php bloginfo( 'template_url' ); ?>/images/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="76x76" href="<?php bloginfo( 'template_url' ); ?>/images/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="120x120" href="<?php bloginfo( 'template_url' ); ?>/images/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="152x152" href="<?php bloginfo( 'template_url' ); ?>/images/apple-touch-icon-152x152.png">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div class="rap">
	<div class="site-content">
		<div class="site-header">
			<a href="<?php echo WP_SITEURL .'/'; ?>" rel="home" class="logo"><img src="<?php bloginfo('template_url'); ?>/images/sii.png" alt="<?php esc_attr_e( get_bloginfo( 'name' ) ); ?>" /></a>
			<div class="nav">
				<button class="toggler"><?php _e( 'Primary Menu', 'sii' ); ?></button>
				<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
			</div>
			<?php get_sidebar('printermenus'); ?>
			<div class="left-end">
				<?php /*
				<div class="hello">Hello, Distributor</div>
				<h6><a href="#">LOGOUT</a></h6>
				*/ ?>
				<ul class="soc">
					<li class="fb"><a href="https://www.facebook.com/SeikoInstrumentsUSA" target="_blank">Facebook</a></li>
					<li class="tw"><a href="https://twitter.com/SEIKO_I_JP" target="_blank">Twitter</a></li>
					<li class="yt"><a href="https://www.youtube.com/channel/UCipI9rHoGpgXtcx_cGhMK0g" target="_blank">YouTube</a></li>
				</ul>
				<div class="lcp">ColorPainter</div>
			</div>
		</div>

		<div class="content-area">
			<div class="site-main">