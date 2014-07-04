<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package siidist
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php wp_title( '' ); ?></title>

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div class="rap">
	<div class="site-content">
		<div class="site-header">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="logo"><img src="<?php bloginfo('template_url'); ?>/images/logo-sii.png" alt="<?php esc_attr_e( get_bloginfo( 'name' ) ); ?>" /></a>
			<div class="main-navigation" role="navigation">
				<button class="menu-toggle"><?php _e( 'Primary Menu', 'siidist' ); ?></button>
				<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
			</div>
			<?php //get_sidebar(); ?>
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