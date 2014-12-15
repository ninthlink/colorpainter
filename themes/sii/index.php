<?php
/**
 * main loop for /blog landing?
 *
 * @package sii
 */

get_header(); ?>
<div class="vc_row wpb_row vc_row-fluid bloghdr">
  <div class="vc_col-sm-12 wpb_column vc_column_container">
    <div class="wpb_wrapper">
      <div class="ult-spacer" style="height:60px;clear:both;display:block;"></div>
      <div class="wpb_text_column wpb_content_element ">
        <div class="wpb_wrapper">
          <h1>SII Blog</h1>
        </div> 
      </div>
      <div class="ult-spacer" style="height:25px;clear:both;display:block;"></div>
    </div> 
  </div> 
</div>
<div class="vc_row wpb_row vc_row-fluid vc_custom_1418678698057 blogpostscontainer">
	<div class="vc_col-sm-12 wpb_column vc_column_container">
		<div class="wpb_wrapper">
			<div class="vc_row wpb_row vc_inner vc_row-fluid">
			<?php
			$blogcount = 0;
			while ( have_posts() ) : the_post(); ?>
        <div class="vc_col-sm-4 wpb_column vc_column_container blogpost col<?php echo ''. ( $blogcount % 3 ) ;?>">
          <div class="wpb_wrapper">
            <a href="<?php the_permalink(); ?>">
              <div class="wpb_single_image wpb_content_element vc_align_left">
                <div class="wpb_wrapper">
                  <?php if ( has_post_thumbnail() ) {
                    the_post_thumbnail( 'blogthird' );
                  } else {
                    echo '<img src="'. get_bloginfo('template_url') .'/images/blog-default.jpg" alt="Seiko Instruments" />';
                  } ?>
                </div> 
              </div> 
              <div class="wpb_text_column wpb_content_element ">
                <div class="wpb_wrapper">
                  <h3><?php the_title(); ?></h3>
                </div> 
              </div> 
              <div class="wpb_text_column wpb_content_element ">
                <div class="wpb_wrapper">
                  <h6 class="byline"><?php the_time('F j, Y'); ?></h6>
                </div> 
              </div>
            </a>
          </div>
        </div> 
			<?php
			$blogcount++;
			endwhile; // end of the loop. ?>
      </div>
		</div> 
	</div> 
</div>
<?php get_footer(); ?>