<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package sii
 */
?>
				<div class="site-footer">
          <?php wp_nav_menu( array( 'theme_location' => 'ftrtop', 'container' => false ) ); ?>
					<div class="site-info">
            <hr />
						<div class="fcp">ColorPainter</div><a href="http://www.sii.co.jp/en/siteinfo/privacy/" target="_blank">Privacy Policy</a><span class="sep"> | </span><a href="http://www.sii.co.jp/en/siteinfo/terms/" target="_blank">Terms of Use</a><br />
						Seiko Instruments U.S.A., Inc. - All Rights Reserved.
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php wp_footer(); ?>
</body>
</html>