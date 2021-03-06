var siib = 'http://www.okidata.com/ColorPainterROI/';
var siip = [
	{ name: 'Please Select' },
	{
		name: 'ColorPainter E-64s - 6 Color SX Ink',
		ink: 0.15,
		msrp: 14999,
		spd: 161,
		img: 'e64s',
		iht: 222,
		desc: 'ColorPainter E-64s shatters expectations within the lower-volume print environments. Engineered with innovative technology that produces rich, vibrant graphics with exceptional color saturation and outdoor durability; combined with ease of use and excellent ROI, the E-64s is an incredible value for professionals of all levels. It has attained the 3M MCS Warranty & GREENGUARD Gold Certification.'
	},
	{
		name: 'ColorPainter M-64s - 7 Color SX Ink',
		ink: 0.18,
		msrp: 29999,
		spd: 356,
		img: 'm64',
		iht: 201,
		desc: '64" industrial eco-solvent printer for high-volume environments provides distinct competitive advantages that equate to higher productivity and profits. Its low cost per square foot, advanced technologies and quality at fast speeds make this the best value on the market. The SX inks offer a wide color gamut, high vividness and high density great for a variety of applications. 3M&trade; MCS&trade; Warranty.'
	},
	{
		name: 'ColorPainter H3-104s - 8 Color SX Ink',
		ink: 0.22,
		msrp: 75995,
		spd: 609,
		img: 'h3104',
		iht: 165,
		desc: '104" high-performance printer engineered for fast print speed, rugged durability and standout performance in mid-range, high-volume environments. It\'s designed with a host of innovative features that streamline operation, boost productivity and simplify operator input for exceptional ROI. 3M&trade; MCS&trade; Warranty.'
	}
];
var siilrfs = [0,0,0,0.03195,0.02495,0.02068];
var siid = 0; // index to choose
//var roiDebug = true; // = console.log debug msgs ?
var siio = {
	aSign: '$'
};
var siit;
var siis = '';
var siij = false;
/**
 * Updates printer info and values when Printer select dropdown changes
 */
function siiU() {
	//roiDbg('## ROI Update :: printer change');

	var C14 = $('#printer').val();
	//roiDbg('printer #'+ C14);
	//roiDbg(siip[C14]);

	if ( C14 > 0 ) {
		// enable things?
		var sibs = $('#printer').parents('fieldset').siblings().removeClass('disabled');
		sibs.find('.ui-input-text input').textinput('enable');
		sibs.find('.ui-select select').selectmenu('enable');
		sibs.find('.ui-radio input').checkboxradio('enable');

		var C15 = siip[C14]['msrp'];
		//roiDbg('psellprice = '+ C15);
		$('#psellprice').val(C15).autoNumeric('update');

		var C16 = siip[C14]['spd'];
		//roiDbg('pspeed = '+ C16);
		$('#pspeed,#spspeed').val(C16).autoNumeric('update');

		var C17 = siip[C14]['ink'];
		//roiDbg('pinkpersqft = '+ C17);
		$('#pinkpersqft').val(C17).autoNumeric('update');

		// also printer name
		var pname = siip[C14]['name'];
    $('.pname').html( function(i, h) {
			var o = pname;
			if ( $(this).hasClass('dashd') ) o += ' - ';
			if ( $(this).parent().is('h1') && ( pname == 'Jetrix KX5' ) ) o += ' Flatbed';
			return o;
		} );
		$('#sprinter').val( pname );
		// also printer infos
		$('.printerimg, .printerinfos').empty();
		$('<img />').attr({ alt: pname, src: 'includes/images/printers/'+ siip[C14]['img'] +'.jpg', width: 400, height: siip[C14]['iht'] }).appendTo('.printerimg');
		var bname = (siip[C14]['name']).replace(' - ', '<span class="printonly"> - </span><br />').replace(' color',' Color Printer');
		//var pd = siip[C14]['desc'];
		//pd = pd.replace(/<li>/g, '').replace(/<\/li>/g, '. ').replace(/ul>/g,'p>');
		$('.printerinfos').html( '<h3>'+ bname +'</h3><p>'+ siip[C14]['desc'] + '</p>' );

		// and then : check jetrix?
		siij = ( pname == 'Jetrix KX5' );
		siiJ();
		siiC();
	} else {
		var sibs = $('#printer').parents('fieldset').siblings(':not(.progress)').addClass('disabled');
		sibs.find('.ui-input-text input').textinput('disable');
		sibs.find('.ui-select select').selectmenu('disable');
		sibs.find('.ui-radio input').checkboxradio('disable');
		// + some default values
		$('#price').val('');
		$('#speed').val(100);
		$('#inkpersqft').val(0.28).autoNumeric('update');
		$('.pname').html('');
		siij = false;
		siiJ();
	}
}
/**
 * show/hide some fields for Jetrix or not-Jetrix...
 */
function siiJ() {
	$('#cpp a.ui-btn:last').attr('href', ( siij ? '#results' : '#competitor' ) );
	if ( siij ) {
    //console.log('siiJ = true');
		// show Jetrix stuff, and hide some others
		$('#cpp').addClass('j').find('.ui-controlgroup, .plaintext').hide();
		$('#results').addClass('j').find('h1.printonly + div').hide();
		$('#results .bigger.col2').removeClass('col2').addClass('jetrix');
		//$('#vinkcost').hide().parent().removeClass('bigger col2').addClass('mainline');
		//$('#results .ui-field-contain.hd').insertAfter('#results .ui-field-contain:eq(0)').parent().children(':gt(5)').hide();
	} else {
    //console.log('siiJ = false');
		// hide Jetrix stuff
		$('#cpp').removeClass('j').find('.ui-controlgroup, .plaintext').show();
		$('#results').removeClass('j').find('h1.printonly + div').show();
		$('#results .bigger.jetrix').removeClass('jetrix').addClass('col2');
		//$('#vinkcost').show().parent().addClass('bigger col2').removeClass('mainline');
		//$('#results .ui-field-contain.hd').insertAfter('#results .ui-field-contain:eq(5)').nextAll().show();
	}
	$("#results .stripe.cp h5").html((siij ? 'JETRIX' : 'COLORPAINTER') + ' PRINTER');
	//$('#spsellprice').parents('.ui-field-contain').children('label').html( siij ? 'Cost of '+ n : 'MSRP Price of ColorPainter Printer' );
}
/**
 * recalculate all values based on those provided
 */
function siiC(e) {
	var years, c_price, c_speed, c_ink00;

  // the ColorPainter printer (info from the array at the top of this file)
	var s_printer = $('#printer').val();

  // Retail Price of ColorPainter Printer
	var s_price = $('#psellprice').autoNumeric('get');
	$('#spsellprice').val(s_price).autoNumeric('update');

	// "Advertised Production Mode Speed SQFT per Hour" aka 'spd' value
	var s_speed = $('#pspeed').autoNumeric('get');

  // ColorPainter Ink cost per SQFT, defaults to 'ink' value but overridable
	var s_ink = siiR( $('#pinkpersqft').autoNumeric('get') ); //hax
	$('#spinkpersqft').val(s_ink).autoNumeric('update');

  // Number of Rolls per Week
	var	rollsperwk = $('#rollsperwk').val();
	$('#prollsperwk,#sprollsperwk,#srollsperwk').val(rollsperwk);

  // Printed SQFT per Week = 600 * rollsperwk
	var sqftperwk = 600 * rollsperwk;
	//roiDbg('C8 "sqftperwk" = '+ sqftperwk);
	// Printed SQFT per Month = sqftperwk * (52/12)
	var sqftpermo = siiR( sqftperwk * (52/12) );
	//roiDbg('C8 "sqftperwk" = '+ sqftperwk);
	$('#psqftpermo,#sqftpermo,#ssqftpermo,#spsqftpermo').val(sqftpermo).autoNumeric('update');

  c_price = $('#price').autoNumeric('get');
  $('#sprice').val(c_price).autoNumeric('update');
  c_speed = $('#speed').autoNumeric('get');
  $('#sspeed').val(c_speed).autoNumeric('update');
  c_ink00 = Math.round( $('#inkpersqft').autoNumeric('get') * 100, 2 );
  var c_ink = c_ink00 / 100;
  $('#sinkpersqft').val(c_ink).autoNumeric('update');

  var c_inkpermonth = siiR((c_ink*sqftperwk)*(52/12));
  //roiDbg('C9 c_inkpermonth "inkpermonth" = '+ c_inkpermonth);
  $('#inkpermonth,#sinkpermonth').val(c_inkpermonth).autoNumeric('update');

  // Lease Period in Years
  years = $('#amortper-5').prop('checked') ? 5 : ( $('#amortper-4').prop('checked') ? 4 : 3 );
  //roiDbg('C21 years "pamortper" = '+ years);
  $('#pamortper, #samortper, #spamortper').val(years);

  // Lease Rate Factor
  var lrf = $('#lrf').autoNumeric('get');
  $('#clrf, #slrf').val(lrf);

  //var c_monthly = siiR(c_price/(years*12));
  var c_monthly = siiR( c_price * lrf );
  //roiDbg('C11 "monthlyamort" = '+ C11);
  $('#smonthlyamort').val(c_monthly).autoNumeric('update');

  var s_inkpermonth = siiR((s_ink*sqftperwk)*(52/12));
  //roiDbg('C20 "pinkpermonth: = '+ s_inkpermonth);
  $('#pinkpermonth,#spinkpermonth').val(s_inkpermonth).autoNumeric('update');

  // Printer Lease Payment per Month
  var s_monthly = siiR( s_price * lrf );
  //var s_monthly = siiR(s_price/(years*12));
  //roiDbg('C22 "pmonthlyamort" = '+ s_monthly);
  $('#spmonthlyamort').val(s_monthly).autoNumeric('update');

  var c_total = c_monthly+c_inkpermonth;
  //roiDbg('C25 "cmonthlytotal" = '+ c_total);
  $('#cmonthlytotal').val(c_total).autoNumeric('update');

  var s_total = s_monthly+s_inkpermonth;
  //roiDbg('C26 "monthlytotal" = '+ s_monthly);
  $('#monthlytotal').val(s_total).autoNumeric('update');

  var costpermonth = siiR( c_total - s_total );
  //roiDbg('C27 "costpermonth" = '+ costpermonth);
  var cpmzs = '' + ( costpermonth >= 1000 ? 0 : 2 );
  $('#costpermonth').val(costpermonth).autoNumeric('update', { mDec: cpmzs });
  // & check for "Savings" vs "Loss"
  $('#costpermonth').parent().siblings('label').find('.save').html( costpermonth >= 0 ? 'Savings' : 'Loss');

  var inkpermonth = siiR( c_inkpermonth - s_inkpermonth );
  //roiDbg('C27 "costpermonth" = '+ costpermonth);
  var ipmzs = '' + ( inkpermonth >= 1000 ? 0 : 2 );
  $('#inkcostpermonth').val(inkpermonth).autoNumeric('update', { mDec: ipmzs });
  // & check for "Savings" vs "Loss"
  $('#inkcostpermonth').parent().siblings('label').find('.save').html( inkpermonth >= 0 ? 'Savings' : 'Loss');
  $('#vinkcost').html($('#inkcostpermonth').val());

  var inktot = inkpermonth * years * 12;
  $('#inkcost').val(inktot).autoNumeric('update');
  // & check for "Savings" vs "Loss"
  $('#inkcost').parent().siblings('label').find('.save').html( inktot >= 0 ? 'Savings' : 'Loss');

  var profit = costpermonth*(years*12);
  //roiDbg('C28 "additional" = '+ profit);
  $('#profit').val(profit).autoNumeric('update');
  // & check for "Savings" vs "Loss"
  $('#profit').parent().siblings('label').find('.save').html( profit >= 0 ? 'Profit' : 'Loss');

  var timesavings = (( sqftperwk / c_speed ) - ( sqftperwk / s_speed ))*52/12;
  var C29 = siiR( timesavings );
  //roiDbg('C29 "esthrs" = '+ C29);
  $('#esthrs').val(C29).autoNumeric('update');
  // & check for "Savings" vs "Loss"
  $('#esthrs').parent().siblings('label').find('.save').html( C29 >= 0 ? 'Savings' : 'Loss');
  // update the TIME SAVINGS
  $('#vesthrs').html($('#esthrs').val());

  // Price Charged per SQFT
  var ppersqft = $('#ppersqft').autoNumeric('get');

  // Additional Revenue Potential
  // Hrs time savings x ColorPainter printer speed per SQFT x Price per SQFT
  var arp_mo = timesavings * s_speed * ppersqft;
  $('#arp').val(arp_mo).autoNumeric('update');
  // update the ARP/mo
  //console.log('ARP/mo = '+ arp_mo +' = '+ $('#arp').val());
  $('#arpm').html($('#arp').val());

  // ARP per Term
  var arp_tm = arp_mo * years * 12;
  $('#arptt').val(arp_tm).autoNumeric('update');
  // update the ARP/tm
  //console.log('ARP/tm = '+ arp_tm +' = '+ $('#arptt').val());
  $('#arpt').html($('#arptt').val());

  // and then save the output
	siiS(years, s_printer, c_price, c_speed, c_ink00, rollsperwk);
}
/**
 * Combine option values & choices in to a compact string
 *
 * update SAVE idea : as long as we have <= 18 printer dropdown options, we can roiBase36 = toString(36) base36
 * and combine & compact values further
 */
function siiS(C10, C14, C4, C5, C6, C7) {
	// C10 = Amort per...
	// C14 = printer choice, combined with Amort per...
	var C14a = siiB( parseInt(C14) + ( C10==3 ? 18 : 0 ) );
	// C4 = competitor : price
	var C4a = siiB(C4);
	// C5 = competitor : speed
	var C5a = siiB(C5);
	// C6 = competitor : ink per sqft
	var C6a = siiB(C6);
	// C7 = rolls per wk ( 1-10, but -1 so its 0-9 single digits )
	C7 = parseInt(C7) - 1;
	if ( ( C7 < 0 ) || ( C7 > 9 ) ) C7 = 2;
	C7 = '' + C7;
	// combine them all into 1 compact string? here be dragons...
	siis = C14a + C7 + C4a.length + C4a + C5a.length + C5a + C6a;

	//roiDbg('C10 ' + C10 + ' C14 ' + C14 + ' : C14a ' + C14a + ' C7 ' + C7 + ' C4L ' + C4a.length + ' C4a ' + C4a + ' C5L ' + C5a.length + ' C5a ' + C5a + ' C6a ' + C6a + ' :: ' + siis);
	$('#saver').val( siib + '?s=' + siis.toUpperCase());
}
/**
 * load saved values reversing the siiS "roiSave" idea
 */
function siiL() {
	// reverse roiSave, so
	save = siis.toLowerCase();
	//roiDbg('LOADING "'+ save + ' ...');
	var C14 = siiB2I(save[0]);
	var C10 = 5;
	if ( C14 > 18 ) {
		C14 = C14 - 18;
		C10 = 3;
	}
	//roiDbg('... AMORT PER = ' + C10 + ', printer selected #' + C14 + ' ...');
	// to change the printer select, we are loading this before the printer dropdown list populates, so just need to..
	siid = ( C14 < siip.length ? C14 : 0 );
	// update radios
	siiP(C10);
	// update Num Rolls per Wk
	var C7 = parseInt(save[1]) + 1;
	$('#rollsperwk').val(C7);
	try{
		$('#rollsperwk').selectmenu('refresh');
	} catch(e) {
		//roiDbg('xxxx selectmenu refresh fail xxxx');
	}
	var d = parseInt(save[2]);
	var C4a = save.substr(3,d);
	var C4 = siiB2I(C4a);
	//roiDbg('C4a = ' + C4a + ' so = ' + C4);
	save = save.substr(3+d);
	//roiDbg('rest of save becomes : ' + save);
	d = parseInt(save[0]);
	var C5a = save.substr(1,d);
	var C5 = siiB2I(C5a);
	//roiDbg('C5a = ' + C5a + ' so = ' + C5);
	save = save.substr(1+d);
	//roiDbg('rest of save becomes : ' + save);
	var C6 = siiB2I(save) / 100;
	//roiDbg('C6 = ' + C6);
  $('#price').val(C4).autoNumeric('update');
  $('#speed').val(C5).autoNumeric('update');
  $('#inkpersqft').val(C6).autoNumeric('update');
	// go to results?
	$('#competitor a.next').click();
}
/*
function roiThrottle(e) {
	//roiDbg('roi throttle ...');
	clearTimeout(siit);
	siit = setTimeout(siiC, 100);
}
function roiDbg(m) {
	if ( roiDebug ) {
		console.log(m);
	}
}
*/
/**
 * no idea on this one really
 */
function siiP(n) {
	//roiDbg('roiAmortper : '+ n);
	$( '#amortper-'+ n ).trigger('roiCheck');
}
/**
 * instead of jQuery(function() {...}) bind to jquery ui 'pagechange'
 */
jQuery(document).one('pagechange', function() {
	var numopts = {
		aSign: siio['aSign']
	};
	$('.money').each(function() {
		$(this).autoNumeric('init', numopts);
	});
	$('input.number').attr('type','text').autoNumeric('init');

	// bind the update
	$('#price, #inkpersqft, #rollsperwk, #speed, #psellprice, #pinkpersqft').bind('change', siiC);
	$('input[type="radio"]').bind({
		'change': function() {
			if ( $(this).prop('checked') ) $(this).trigger('roiChecked');
			siiC();
		},
		'roiCheck': function() {
			//roiDbg('vv roiCheck : '+ $(this).attr('id'));
			$(this).prop('checked',true).trigger('roiChecked');
		},
		'roiChecked': function() {
			$(this).parent().siblings().children('input[type="radio"]').prop('checked', false);
			try {
				$('input[type="radio"]').checkboxradio('refresh');
			} catch(e) {
				//roiDbg('xxxx checkboxradio refresh fail xxxx');
			}

      // also update lrf based on amortper
      if ( $(this).attr('name') == 'amortper' ) {
        $('#lrf').val( siilrfs[ $(this).val() ] ).autoNumeric('update');
      }
		}
	});
	// check if saved?
	var sget = '' + window.location.search;
	if ( sget != '' ) {
		sget = sget.replace('?', '').split('=');
		siis = sget[1];
		siiL();
	} else {
		//roiDbg('NO SAVE FOUND present');
		// just default amortper-3 on
		siiP(3);
	}

	$('#printer').each(function() {
		$(this).html(function() {
			var h = '', n = '';
			for( i in siip ) {
				n = siip[i]['name'];
				if ( n == 'Jetrix KX5' ) {
					n += ' Flatbed';
				}
				h += '<option value="'+ i + (i == siid ? '" selected="selected' : '') +'">'+ n +'</option>';
			}
			return h;
		}).bind('change', function() {
			siiU();
		});
		if ( siid > 0 ) {
			try{
				$(this).selectmenu('refresh');
			} catch(e) {
				//roiDbg('xxxx selectmenu refresh fail xxxx');
			}
			siiU();
		}
	});

	$('a.next').bind('click',function() {
		if ( $(this).hasClass('disabled') ) return false;
	});

	$('.plaintext.stripe').each(function() {
		$(this).children('.ui-field-contain:even').addClass('even');
	});

	$("#saver").focus(function(e){e.preventDefault();siiT($(this));}).mouseup(function(e) { e.preventDefault(); }).on('tap', function() {
		siiT($(this));
	}).on('vmouseup', function(e) { e.preventDefault(); });

	// bind for subsequent updates
	$(document).bind('pagechange', function() {
		//roiDbg('PPPPPPPP PAGELOAD PPPPPPP');
		clearTimeout(siit);
		siit = setTimeout(siiC, 100);
	});

	$('.mailto').click(function() {
		var emto = prompt("Please enter your email address","you@domain.com");
		if ( emto!= null ) {
			var res = $('#saver').val();
			var lo = "mailto:"+ emto +"?subject=Seiko ROI Calculator&body=Check out these results: "+ res;
			$(this).attr('href',lo);
		}
	});
	// reload
	$('.again a').click(function() {
		var psel = $('#printer');
		psel.val(0).trigger('change');
		try {
			psel.selectmenu('refresh');
		} catch(e) {
			//
		}
	});
});
// obj array for converting
var roiAlph = {'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'a':10,'b':11,'c':12,'d':13,'e':14,'f':15,'g':16,'h':17,'i':18,'j':19,'k':20,'l':21,'m':22,'n':23,'o':24,'p':25,'q':26,'r':27,'s':28,'t':29,'u':30,'v':31,'w':32,'x':33,'y':34,'z':35};
/**
 * round and convert a given int e to a string base 36
 */
function siiB(e) {
	return Math.round(parseInt(e)).toString(36);
}
/**
 * round and convert given int to 2 decimal places
 */
function siiR(e) {
	return Math.round(e*100, 2) / 100;
}
/**
 * convert an alphanumeric 0-9a-z to "base 36"
 */
function siiB2I(e) {
	var i = 0, l = e.length;
	for ( var a = 0; a < l; a++ ) {
		i += Math.pow(36,a) * roiAlph[e[l - a - 1]];
	}
	return i;
}
/**
 * select text on focus?
 */
function siiT(t){var a=t[0],b,c;"INPUT"===a.tagName?a.select():document.body.createTextRange?(b=document.body.createTextRange(),b.moveToElementText(a),b.select()):window.getSelection&&(c=window.getSelection(),b=document.createRange(),
b.selectNodeContents(a),c.removeAllRanges(),c.addRange(b))}
