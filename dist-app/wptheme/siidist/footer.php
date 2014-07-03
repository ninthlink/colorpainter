<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package siidist
 */
?>


			<div class="site-footer">
				<div class="site-info">
					<a href="<?php echo esc_url( __( 'http://wordpress.org/', 'siidist' ) ); ?>"><?php printf( __( 'Proudly powered by %s', 'siidist' ), 'WordPress' ); ?></a>
					<span class="sep"> | </span>
					<?php printf( __( 'Theme: %1$s by %2$s.', 'siidist' ), 'siidist', '<a href="http://www.ninthlink.com" rel="designer">Ninthlink, Inc.</a>' ); ?>
				</div>
			</div>
	
	

			</div>
		</div>
	</div>
</div>

<?php wp_footer(); ?>

</body>
</html>
