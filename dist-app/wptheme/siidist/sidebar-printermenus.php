<?php
/**
 * sidebar : printermenus
 */
	$datas = array(
		array(
			array(
				'n' => false,
				'c' => 0,
				's' => false,
				'i' => 23,
			),
			array(
				'n' => 'KX5',
				'c' => 7,
				's' => array(
					'size' => '64&rdquo;',
					'speed' => '66.5 smph',
				),
				'i' => 80,
			),
			array(
				'n' => 'KX3',
				'c' => 4,
				's' => array(
					'size' => '104&rdquo;, 64&rdquo;',
					'speed' => '79.5 smph',
				),
				'i' => 23,
			),
		),
		array(
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
					'size' => '64&rdquo;',
					'speed' => '66.5 smph',
				),
				'i' => 80,
			),
			array(
				'n' => 'H2P-104s /<br />H2P-74s',
				'c' => 4,
				's' => array(
					'size' => '104&rdquo;, 64&rdquo;',
					'speed' => '79.5 smph',
				),
				'i' => 23,
			),
			array(
				'n' => 'H2P-104s /<br />H2-74s',
				'c' => 8,
				's' => array(
					'size' => '104&rdquo;, 64&rdquo;',
					'speed' => '100 smph',
				),
				'i' => 23,
			),
			array(
				'n' => 'W-64s / W-54s',
				'c' => 8,
				's' => array(
					'ink' => 'Neon Ink Available',
					'size' => '104&rdquo;, 64&rdquo;',
					'speed' => '100 smph',
				),
				'i' => 23,
			),
		),
	);
	$i = count( $datas );
	while ( $i-- ) {
		$printers = $datas[$i];
		$printermenu = '';
		$pcount = count( $printers );
		while ( $pcount-- ) {
			$pitem = '<li class="p'. $pcount .'">'. "\n";
			
			$h4 = $printers[$pcount]['n'];
			if ( $h4 ) $pitem .= '<h4>'. $h4 .'</h4>'. "\n";
			
			$pitem .= '<span class="img"></span>'. "\n";
			
			$inks = $printers[$pcount]['c'];
			if ( $inks > 0 ) {
				$pitem .= '<ul class="inks i'. $inks .'">'. "\n";
				$inkhtml = '';
				while ( $inks-- ) {
					$inkhtml = '<li class="i'. $inks .'"></li>' ."\n". $inkhtml; 
				}
				$pitem .= $inkhtml .'</ul>'. "\n";
			}
			$l = 'OVERVIEW';
			$ps = $printers[$pcount]['s'];
			if ( $ps ) {
				$l = 'LEARN MORE';
				if ( is_array( $ps ) ) {
					$pitem .= '<p>';
					if ( isset( $ps['ink'] ) ) {
						$pitem .= '<em class="ibox">'. $ps['ink'] .'</em><br />'. "\n";
					}
					if ( isset( $ps['size'] ) ) {
						$pitem .= 'Size: <strong>'. $ps['size'] .'</strong><br />'. "\n";
					}
					if ( isset( $ps['speed'] ) ) {
						$pitem .= 'Max Speed: <strong>'. $ps['speed'] .'</strong>'. "\n";
					}
					$pitem .= '</p>'. "\n";
				}
			}
			$pitem .= '<a href="'. get_permalink($printers[$pcount]['i']) .'" class="vc_btn vc_btn_blue vc_btn_xs vc_btn_rounded">'. $l .'</a></li>' ."\n";
			$printermenu = $pitem . $printermenu;
		}
		echo '<ul class="m '. ($i ? 'c' : 'j') .'">'. "\n" .'<li class="back"><a href="#">Back</a></li>'. "\n" . $printermenu .'</ul>'. "\n";
	}
	?>