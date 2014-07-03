<?php
/**
 * @package siidist
 */

get_header(); ?>

			<?php while ( have_posts() ) : the_post(); ?>
	
				<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<div class="entry-content">
						<?php the_content(); ?>
					</div>
				</div>
				
			<?php endwhile; // end of the loop. ?>
	
<?php get_footer(); ?>
