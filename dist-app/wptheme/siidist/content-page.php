<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package siidist
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php /*
	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
	</header><!-- .entry-header -->
	*/
	?>

	<div class="entry-content">
		<?php
		the_content();
		/*
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'siidist' ),
				'after'  => '</div>',
			) );
		*/
		?>
	</div><!-- .entry-content -->
	<?php
	/*
	<footer class="entry-footer">
		<?php edit_post_link( __( 'Edit', 'siidist' ), '<span class="edit-link">', '</span>' ); ?>
	</footer><!-- .entry-footer -->
	*/
	?>
</article><!-- #post-## -->
