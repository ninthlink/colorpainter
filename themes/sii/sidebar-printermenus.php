<?php
/**
 * sidebar : ColorPainter printers menu flopout
 *
 * TODO : make more dynamic now for full site?! but how?!
 */
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
      'size' => '64&rdquo;',
      'speed' => '66.5 smph',
    ),
    'i' => 80,
  ),
  array(
    'n' => 'H2P-104s /<br />H2P-74s',
    'c' => 4,
    's' => array(
      'size' => '104&rdquo;, 74&rdquo;',
      'speed' => '79.5 smph',
    ),
    'i' => 1000,
  ),
  array(
    'n' => 'H2-104s /<br />H2-74s',
    'c' => 4,
    's' => array(
      'size' => '104&rdquo;, 74&rdquo;',
      'speed' => '70.6 smph',
    ),
    'i' => 140,
  ),
  array(
    'n' => 'W-64s / W-54s',
    'c' => 8,
    's' => array(
      'ink' => 'Neon Ink Available',
      'size' => '64&rdquo;',
      'speed' => '17.8 smph',
    ),
    'i' => 144,
  ),
);

$printermenu = '';
$pcount = count( $printers );
while ( $pcount-- ) {
  $pitem = '<li class="p'. $pcount .'">'. "\n";
  $ps = $printers[$pcount]['s'];
  if ( $ps ) {
    // wrap the whole thing
    $pitem .= '<a href="'. get_permalink($printers[$pcount]['i']) .'" class="p">' ."\n";
  }
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
  if ( $ps ) {
    if ( is_array( $ps ) ) {
      $pitem .= '<p>';
      /*
      if ( isset( $ps['ink'] ) ) {
        $pitem .= '<em class="ibox">'. $ps['ink'] .'</em><br />'. "\n";
      }
      */
      if ( isset( $ps['size'] ) ) {
        $pitem .= 'Size: <strong>'. $ps['size'] .'</strong><br />'. "\n";
      }
      if ( isset( $ps['speed'] ) ) {
        $pitem .= 'Max Speed: <strong>'. $ps['speed'] .'</strong>'. "\n";
      }
      $pitem .= '</p>'. "\n";
    }
    $pitem .= '</a></li>' ."\n";
  } else {
    // its the first one?
    $pitem .= '<a href="'. get_permalink($printers[$pcount]['i']) .'" class="vc_btn vc_btn_blue vc_btn-blue vc_btn-xs vc_btn_round">OVERVIEW</a>' ."\n";
    // ColorPainter : add Ink Tech btn too
    //$pitem .= '<br /><br /><a href="#" class="vc_btn vc_btn_blue vc_btn-blue vc_btn-xs vc_btn_outlined vc_btn_round">INK TECHNOLOGY</a></li>' ."\n";
  }
  $printermenu = $pitem . $printermenu;
}
// add ColorPainter Legacy CTA
//$printermenu .= '<li class="pl"><h5>COLORPAINTER LEGACY</h5><a href="#" class="vc_btn vc_btn-white vc_btn-xs vc_btn_outlined vc_btn_round">LEARN MORE</a></li>' ."\n";
// and finally, output
echo '<ul class="m c">'. "\n" .'<li class="back"><a href="#">Back</a></li>'. "\n" . $printermenu .'</ul>'. "\n";
