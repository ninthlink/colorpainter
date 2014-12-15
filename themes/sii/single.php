<?php
/**
 * Clean and simple
 *
 * @package sii
 */

get_header(); ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<div class="entry-content">
            <div class="vc_row wpb_row vc_row-fluid">
              <div class="vc_col-sm-12 wpb_column vc_column_container">
                <div class="wpb_wrapper">
                  <div class="ult-spacer" style="height:30px;clear:both;display:block;"></div>
                  <div class="wpb_text_column wpb_content_element ">
                    <div class="wpb_wrapper">
                      <p><em><a title="Seiko Nation" href="<?php bloginfo('url'); ?>/blog/">Back to the SII Blog</a></em></p>
                    </div> 
                  </div> 
                  <div class="wpb_text_column wpb_content_element ">
                    <div class="wpb_wrapper">
                      <h2><?php the_title(); ?></h2>
                      <h6 class="byline"><?php the_time('F j, Y'); ?></h6>
                    </div> 
                  </div>
                  <div class="ult-spacer" style="height:30px;clear:both;display:block;"></div>
                  <?php if ( has_post_thumbnail() ) { ?>
                  <div class="wpb_single_image wpb_content_element vc_align_left">
                    <div class="wpb_wrapper">
                      <span class="vc_box_shadow_3d_wrap"><?php the_post_thumbnail( 'full' ); ?></span>
                    </div> 
                  </div>
                  <div class="ult-spacer" style="height:50px;clear:both;display:block;"></div>
                  <?php } ?>
                  <div class="wpb_text_column wpb_content_element ">
                    <div class="wpb_wrapper">
                      <?php the_content(); ?>
                    </div> 
                  </div>
                  <div class="ult-spacer" style="height:70px;clear:both;display:block;"></div>
                  <div class="wpb_content_element">
                    <div class="wpb_wrapper">
                      <hr />
                    </div>
                  </div>
                  <div class="ult-spacer" style="height:20px;clear:both;display:block;"></div>
                  <div class="vc_row wpb_row vc_inner vc_row-fluid">
                    <div class="vc_col-sm-2 wpb_column vc_column_container">
                      <div class="wpb_wrapper">
                        <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>
                      </div> 
                    </div>
                    <div class="vc_col-sm-2 wpb_column vc_column_container">
                      <div class="wpb_wrapper">
                        <div class="fb_like wpb_content_element fb_type_standard"><iframe src="http://www.facebook.com/plugins/like.php?href=<?php echo esc_attr( get_permalink() ); ?>&amp;layout=standard&amp;show_faces=false&amp;action=like&amp;colorscheme=light" scrolling="no" frameborder="0" allowTransparency="true"></iframe></div>
                      </div> 
                    </div> 
                    <div class="vc_col-sm-8 wpb_column vc_column_container">
                      <div class="wpb_wrapper">
                        
                      </div> 
                    </div> 
                  </div>
                  <div class="ult-spacer" style="height:80px;clear:both;display:block;"></div>
                </div> 
              </div> 
            </div><!-- Row Backgrounds -->
            <?php get_sidebar( 'blogbottom3' ); ?>
					</div>
				</div>
			<?php endwhile; // end of the loop. ?>
<?php get_footer(); ?>