<?php
/**
 * Theme header
 *
 * Displays all of the <head> section and everything up to the .site-main loop
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
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="logo"><img src="<?php bloginfo('template_url'); ?>/images/sii.png" alt="<?php esc_attr_e( get_bloginfo( 'name' ) ); ?>" /></a>
			<div class="site-navigation" id="site-navigation">
			<div class="main-navigation" role="navigation">
				<button class="menu-toggle"><?php _e( 'Primary Menu', 'siidist' ); ?></button>
				<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
			</div>
				
			<ul class="cpmenu">
				<?php
				// reverse order
				$printers = array(
					array(
						'n' => false,
						'c' => 0,
						's' => false,
						'i' => 23,
					),
					array(
						'n' => 'M-64s',
						'c' => 7,
						's' => array(
							'ink' => 'Low-Odor Eco-Solvent Ink',
							'size' => '64&quot;',
							'speed' => '66.5 smph',
						),
						'i' => 23,
					),
					array(
						'n' => 'H2P-104s /<br />H2P-74s',
						'c' => 8,
						's' => array(
							'size' => '104&quot;, 64&quot;',
							'speed' => '79.5 smph',
						),
						'i' => 23,
					),
				);
				$printermenu = '';
				$pcount = count( $printers );
				while ( $pcount-- ) {
					$pitem = '<li class="cp'. $pcount .'">';
					
					$h4 = $printers[$pcount]['n'];
					if ( $h4 ) $pitem .= '<h4>'. $h4 .'</h4>';
					
					$pitem .= '<span class="img"></span>';
					
					$inks = $printers[$pcount]['c'];
					if ( $inks > 0 ) {
						$pitem .= '<ul class="inks i'. $inks .'">';
						$inkhtml = '';
						while ( $inks-- ) {
							$inkhtml = '<li class="i'. $inks .'"></li>' . $inkhtml; 
						}
						$pitem .= $inkhtml .'</ul>';
					}
					$l = 'OVERVIEW';
					$ps = $printers[$pcount]['s'];
					if ( $ps ) {
						$l = 'LEARN MORE';
						if ( is_array( $ps ) ) {
							$pitem .= '<p>';
							if ( isset( $ps['ink'] ) ) {
								$pitem .= '<em class="ibox">'. $ps['ink'] .'</em><br />';
							}
							if ( isset( $ps['size'] ) ) {
								$pitem .= 'Size: <strong>'. $ps['size'] .'</strong><br />';
							}
							if ( isset( $ps['speed'] ) ) {
								$pitem .= 'Max Speed: <strong>'. $ps['speed'] .'</strong>';
							}
							$pitem .= '</p>';
						}
					}
					$pitem .= '<a href="'. get_permalink($printers[$pcount]['i']) .'" class="vc_btn vc_btn_blue vc_btn_xs vc_btn_rounded">'. $l .'</a></li>';
					$printermenu = $pitem . $printermenu;
				}
				echo $printermenu;
				?>
			</ul>
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
		</div>

		<div class="content-area">
			<div class="site-main">