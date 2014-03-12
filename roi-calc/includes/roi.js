var printers = [
	{ name: 'Please Select' },
	{
		name: 'ColorPainter W-64s - 6 color',
		ink: 0.22,
		msrp: 17000,
		speed: 128,
		img: 'w64',
		desc: '<ul><li>64" flexible, reliable high-performance low-solvent printer</li><li>Prints vinyl, banner, backlit films, textiles and other media designed for solvent printers</li><li>Industrial piezo print heads offer high resolution, high speeds and reliability</li><li>Available with two neon florescent inks that glow under black light</li><li>ONYX RIP Center included</li><li>3M&trade; MCS&trade; Warranty</li></ul>',
		url: '#'
	},
	{
		name: 'ColorPainter M-64s - 7 color',
		ink: 0.16,
		msrp: 42600,
		speed: 356,
		img: 'm64',
		desc: '<ul><li>64" high-speed eco-solvent printer with low odor inks</li><li>Very low cost per square foot to operate</li><li>Superior durability of outdoor and indoor graphics</li><li>SX inks offer a wide color gamut, high vividness and high density great for backlit applications</li><li>Unmatched productivity and quality </li><li>Automatic Print Adjustment</li><li>ONYX RIP Center included</li><li>3M&trade; MCS&trade; Warranty (pending March 2014)</li></ul>',
		url: '#'
	},
	{
		name: 'ColorPainter H2-74s - 8 color',
		ink: 0.18,
		msrp: 50000,
		speed: 284,
		img: 'h274',
		desc: '<ul><li>74" high-performance outdoor and indoor graphics printer</li><li>Good fit for vinyl, banner, backlit films, textiles, fleet, fine art canvas, banners, flexface</li><li>Higher density inks with higher pigment loading means rich glossy colors for backlit or frontlit films.</li><li>Industrial piezo print heads offer high resolution, high speeds and reliability</li><li>Resolution up to 900x900 dpi</li><li>Low running costs</li><li>3M&trade; MCS&trade; Warranty</li></ul>',
		url: '#'
	},
	{
		name: 'ColorPainter H2-74s - 4 color',
		ink: 0.14,
		msrp: 50000,
		speed: 567,
		img: 'h274',
		desc: '<ul><li>74" High-performance outdoor and indoor graphics printer</li><li>Industrial piezo print heads offer high resolution, high speeds and reliability for high-volume print environments</li><li>Low running costs</li><li>3M&trade; MCS&trade; Warranty</li></ul>',
		url: '#'
	},
	{
		name: 'ColorPainter H2-104s - 8 color',
		ink: 0.18,
		msrp: 69000,
		speed: 308,
		img: 'h2104',
		desc: '<ul><li>104" High-performance outdoor and indoor graphics printer</li><li>Perfect for vinyl, banner, backlit films, textiles, fleet, fine art canvas, banners, flexface</li><li>Higher density inks with higher pigment loading means rich glossy colors for backlit or frontlit films.</li><li>Industrial piezo print heads offer high resolution, high speeds and reliability for high-volume print environments</li><li>Resolution up to 900x900 dpi</li><li>Low running costs</li><li>3M&trade; MCS&trade; Warranty</li></ul>',
		url: '#'
	},
	{
		name: 'ColorPainter H2-104s - 4 color',
		ink: 0.14,
		msrp: 69000,
		speed: 856,
		img: 'h2104',
		desc: '<ul><li>74" High-performance outdoor and indoor graphics printer</li><li>Industrial piezo print heads offer high resolution, high speeds and reliability for high-volume print environments</li><li>Low running costs</li><li>3M&trade; MCS&trade; Warranty</li></ul>',
		url: '#'
	},
	{
		name: 'ColorPainter H2P-74s',
		ink: 0.08,
		msrp: 53000,
		speed: 763,
		img: 'h2p74',
		desc: '<ul><li>74" high-speed 4 color printer with large-capacity ink system</li><li>Contains eight large-capacity ink reservoirs with six liters of ink per color</li><li>Designed for high-production shops where low running costs are important</li><li>Industrial piezo print heads offer high resolution, high speeds and reliability </li><li>Good fit for fleet graphics, banners, signs, fine art canvas and flex faces</li></ul>',
		url: '#'
	},
	{
		name: 'ColorPainter H2P-104s',
		ink: 0.08,
		msrp: 72000,
		speed: 856,
		img: 'h2p104',
		desc: '<ul><li>104" high-speed 4 color printer with large-capacity ink system</li><li>Contains eight large-capacity ink reservoirs with six liters of ink per color</li><li>Designed for high-production shops where low running costs are important</li><li>Industrial piezo print heads offer high resolution, high speeds and reliability </li><li>Good fit for fleet graphics, banners, signs, fine art canvas and flex faces</li></ul>',
		url: '#'
	}
];
/*
Jetrix KX5
<ul><li>4\' x 8\' UV flatbed printer with roll-feed option and white, primer/varnish options</li><li>High-performance, reliable and easy operations under high-volume conditions</li><li>Quality components engineered for long-term reliability</li><li>InkTec UMS UV inks are half the price of comparable UV inks without sacrificing quality or reliability. That means lower operational and running costs, lower inventory costs and more profit for your business.</li><li>Indoor, outdoor and industrial applications including 1, 2, or 3 layer printing on signs, trophies, awards, packaging, control panels and more</li></ul>
*/
var defaultPrinter = 0; // index to choose
var roiURL = 'http://ninthlink.me/seiko/calc/';
var roiDebug = false; // true = console.log debug msgs ?
var roiOpts = {
	aSign: '$'
};
var roiUpdater;
var roiSave = '';

function roi_update() {
	roi_dbg('## ROI Update :: printer change');
	
	// undisable things?
	var sibs = $('#printer').parents('fieldset').siblings().removeClass('disabled');
	/*
	sibs.find('.ui-input-text input').prop('disabled',false).textinput('enable').textinput('refresh');
	sibs.find('.ui-select select').prop('disabled',false).selectmenu('enable').selectmenu('refresh');
	sibs.find('.ui-radio input').prop('disabled',false).checkboxradio('enable').checkboxradio('refresh');
	*/
	
	sibs.find('.ui-input-text input').textinput('enable');
	sibs.find('.ui-select select').selectmenu('enable');
	sibs.find('.ui-radio input').checkboxradio('enable');
	
	var C14 = $('#printer').val();
	roi_dbg('printer #'+ C14);
	roi_dbg(printers[C14]);
	
	var C15 = printers[C14]['msrp'];
	roi_dbg('psellprice = '+ C15);
	$('#psellprice').val(C15).autoNumeric('update');
	$('#spsellprice').val(C15).autoNumeric('update');
	
	var C16 = printers[C14]['speed'];
	roi_dbg('pspeed = '+ C16);
	$('#pspeed').val(C16).autoNumeric('update');
	$('#spspeed').val(C16).autoNumeric('update');
	
	var C17 = printers[C14]['ink'];
	roi_dbg('pinkpersqft = '+ C17);
	$('#pinkpersqft').val(C17).autoNumeric('update');
	$('#spinkpersqft').val(C17).autoNumeric('update');
	
	// also printer name
	$('.pname').html( printers[C14]['name'] );
	$('#sprinter').val( printers[C14]['name'] );
	// also printer infos
	$('.printerimg, .printerinfos').empty();
	$('<img />').attr( 'src', 'includes/images/printers/'+ printers[C14]['img'] +'.jpg' ).appendTo('.printerimg');
	var bettername = (printers[C14]['name']).replace(' - ', '<span class="printonly"> - </span><br />').replace(' color',' Color Printer');
	var descp = printers[C14]['desc'];
	descp = descp.replace(/<li>/g, '').replace(/<\/li>/g, '. ').replace(/ul>/g,'p>');
	$('.printerinfos').html( '<h3>'+ bettername +'</h3>'+ descp );
	
	// and then
	roi_recalc();
}

function roi_recalc(e) {
	roi_dbg('## ROI Update :: recalc');
	
	var C4 = $('#price').autoNumeric('get');
	var C5 = $('#speed').autoNumeric('get');
	var C600 = Math.round( $('#inkpersqft').autoNumeric('get') * 100, 2 );
	var C6 = C600 / 100;
	var C7 = $('#rollsperwk').val();
	$('#prollsperwk').val(C7);
	$('#sprollsperwk').val(C7);
	$('#srollsperwk').val(C7);
	
	var C8 = 600 * C7;
	roi_dbg('C8 "sqftperwk" = '+ C8);
	$('#sqftperwk').val(C8).autoNumeric('update');
	$('#ssqftperwk').val(C8).autoNumeric('update');
	
	var C9 = roiRound((C6*C8)*(52/12));
	roi_dbg('C9 "inkpermonth" = '+ C9);
	$('#inkpermonth').val(C9).autoNumeric('update');
	$('#sinkpermonth').val(C9).autoNumeric('update');
	
	var C10 = $('#amortper-5').prop('checked') ? 5 : 3;
	
	var C11 = roiRound(C4/(C10*12));
	roi_dbg('C11 "monthlyamort" = '+ C11);
	$('#monthlyamort').val(C11).autoNumeric('update');
	$('#smonthlyamort').val(C11).autoNumeric('update');
	
	var C14 = $('#printer').val();
	var C15 = $('#psellprice').autoNumeric('get');
	var C16 = $('#pspeed').autoNumeric('get');
	var C17 = $('#pinkpersqft').autoNumeric('get');
	
	var C19 = C8;
	roi_dbg('C17 "psqftperwk" = '+ C19);
	$('#psqftperwk').val(C19);
	$('#spsqftperwk').val(C19);
	
	var C20 = roiRound((C17*C19)*(52/12));
	roi_dbg('C20 "pinkpermonth: = '+ C20);
	$('#pinkpermonth').val(C20).autoNumeric('update');
	$('#spinkpermonth').val(C20).autoNumeric('update');
	
	var C21 = C10;
	roi_dbg('C21 "pamortper" = '+ C21);
	$('#pamortper, #samortper, #spamortper').val(C21);
	
	var C22 = roiRound(C15/(C21*12));
	roi_dbg('C22 "pmonthlyamort" = '+ C22);
	$('#pmonthlyamort').val(C22).autoNumeric('update');
	$('#spmonthlyamort').val(C22).autoNumeric('update');
	
	var C25 = C11+C9;
	roi_dbg('C25 "cmonthlytotal" = '+ C25);
	$('#cmonthlytotal').val(C25).autoNumeric('update');
	
	var C26 = C22+C20;
	roi_dbg('C26 "monthlytotal" = '+ C26);
	$('#monthlytotal').val(C26).autoNumeric('update');
	
	var C27 = roiRound((C9+C11)-(C20+C22));
	roi_dbg('C27 "costpermonth" = '+ C27);
	var cpmzs = '' + ( C27 >= 1000 ? 0 : 2 );
	$('#costpermonth').val(C27).autoNumeric('update', { mDec: cpmzs });
	// & check for "Savings" vs "Loss"
	$('#costpermonth').parent().siblings('label').find('.save').html( C27 >= 0 ? 'Savings' : 'Loss');
	
	var C28 = C27*(C21*12);
	roi_dbg('C28 "additional" = '+ C28);
	$('#additional').val(C28).autoNumeric('update');
	// & check for "Savings" vs "Loss"
	$('#additional').parent().siblings('label').find('.save').html( C28 >= 0 ? 'Profit' : 'Loss');
	
	var C29 = roiRound(((C8/C5)-(C19/C16))*52/12);
	roi_dbg('C29 "esthrs" = '+ C29);
	$('#esthrs').val(C29).autoNumeric('update');
	// & check for "Savings" vs "Loss"
	$('#esthrs').parent().siblings('label').find('.save').html( C29 >= 0 ? 'Savings' : 'Loss');
	
	roi_save(C10, C14, C4, C5, C600, C7);
}

function roi_save(C10, C14, C4, C5, C600, C7) {
	/*
	 * update SAVE idea : as long as we have <= 18 printer dropdown options, we can roiBase36 = toString(36) base36
	 * and combine the value of C10 amort per year too ...
	 */
	// C10 = Amort per...
	var C14a = roiBase36( parseInt(C14) + ( C10==3 ? 18 : 0 ) );// printer choice
	var C4a = roiBase36(C4); // msrp of competitor
	var C5a = roiBase36(C5); // comp speed
	var C6a = roiBase36(C600);
	C7 = parseInt(C7) - 1;
	if ( ( C7 < 0 ) || ( C7 > 9 ) ) C7 = 2;
	C7 = '' + C7;
	// C6 = comp ink per sqft cost
	roiSave = C14a + C7 + C4a.length + C4a + C5a.length + C5a + C6a;
	roi_dbg('C10 ' + C10 + ' C14 ' + C14 + ' : C14a ' + C14a + ' C7 ' + C7 + ' C4L ' + C4a.length + ' C4a ' + C4a + ' C5L ' + C5a.length + ' C5a ' + C5a + ' C6a ' + C6a + ' :: ' + roiSave);
	$('#saver').val( roiURL + '?s=' + roiSave.toUpperCase());
}

function roi_load(save) {
	// reverse roi_save, so
	save = save.toLowerCase();
	roi_dbg('LOADING "'+ save + ' ...');
	var C14 = roiBase36toInt(save[0]);
	var C10 = 5;
	if ( C14 > 18 ) {
		C14 = C14 - 18;
		C10 = 3;
	}
	roi_dbg('... AMORT PER = ' + C10 + ', printer selected #' + C14 + ' ...');
	// to change the printer select, we are loading this before the printer dropdown list populates, so just need to..
	defaultPrinter = ( C14 < printers.length ? C14 : 0 );
	// update radios
	roi_amortper(C10);
	// update Num Rolls per Wk
	var C7 = parseInt(save[1]) + 1;
	$('#rollsperwk').val(C7);
	try{
		$('#rollsperwk').selectmenu('refresh');
	} catch(e) {
		roi_dbg('xxxx selectmenu refresh fail xxxx');
	}
	var d = parseInt(save[2]);
	var C4a = save.substr(3,d);
	var C4 = roiBase36toInt(C4a);
	roi_dbg('C4a = ' + C4a + ' so = ' + C4);
	$('#price').val(C4).autoNumeric('update');
	
	save = save.substr(3+d);
	roi_dbg('rest of save becomes : ' + save);
	d = parseInt(save[0]);
	var C5a = save.substr(1,d);
	var C5 = roiBase36toInt(C5a);
	roi_dbg('C5a = ' + C5a + ' so = ' + C5);
	$('#speed').val(C5).autoNumeric('update');
	
	save = save.substr(1+d);
	roi_dbg('rest of save becomes : ' + save);
	var C6 = roiBase36toInt(save) / 100;
	roi_dbg('C6 = ' + C6);
	$('#inkpersqft').val(C6).autoNumeric('update');
}

function roi_throttle(e) {
	clearTimeout(roiUpdater);
	roiUpdater = setTimeout(roi_recalc, 100);
}

function roi_dbg(m) {
	if ( roiDebug ) {
		console.log(m);
	}
}

function roi_amortper(n) {
	roi_dbg('roi_amortper : '+ n);
	if ( n != 3 ) {
		n = 5;
	}
	$( '#amortper-'+ n ).trigger('roiCheck');
}

jQuery(document).one('pagechange', function() {
	var numopts = {
		aSign: roiOpts['aSign']
	};
	$('.money').each(function() {
		$(this).autoNumeric('init', numopts);
	});
	$('input.number').attr('type','text').autoNumeric('init');
	
	// bind the update
	$('#price, #inkpersqft, #rollsperwk, #speed').bind('change', roi_recalc);
	$('input[type="radio"]').bind({
		'change': function() {
			if ( $(this).prop('checked') ) $(this).trigger('roiChecked');
			roi_recalc();
		},
		'roiCheck': function() {
			roi_dbg('vv roiCheck : '+ $(this).attr('id'));
			$(this).prop('checked',true).trigger('roiChecked');
		},
		'roiChecked': function() {
			$(this).parent().siblings().children('input[type="radio"]').prop('checked', false);
			try {
				$('input[type="radio"]').checkboxradio('refresh');
			} catch(e) {
				roi_dbg('xxxx checkboxradio refresh fail xxxx');
			}
		}
	});
	// check if saved?
	var sget = '' + window.location.search;
	if ( sget != '' ) {
		sget = sget.replace('?', '').split('=');
		sget = sget[1];
		roi_load(sget);
	} else {
		roi_amortper(5);
		roi_dbg('NO SAVE FOUND present');
		// just default amortper-5 on
	}
	
	$('#printer').each(function() {
		$(this).html(function() {
			var h = '';
			for( i in printers ) {
				h += '<option value="'+ i + (i == defaultPrinter ? '" selected="selected' : '') +'">'+ printers[i]['name'] +'</option>';
			}
			return h;
		}).bind('change', function() {
			if ( $(this).val() > 0 ) {
				roi_update();
			}
		});
		if ( defaultPrinter > 0 ) {
			try{
				$(this).selectmenu('refresh');
			} catch(e) {
				roi_dbg('xxxx selectmenu refresh fail xxxx');
			}
			roi_update();
		}
	});
	
	// but throttle the slider ones
	//$('#psellprice, #pinkpersqft').bind('change', roi_throttle);
	
	roi_throttle();
	
	$('a.next').bind('click',function() {
		if ( $(this).hasClass('disabled') ) return false;
	});
	
	$('.plaintext.stripe').each(function() {
		$(this).children('.ui-field-contain:even').addClass('even');
	});
	
	// bind for subsequent updates
	$(document).bind('pagechange', function() {
		roi_dbg('PPPPPPPP PAGELOAD PPPPPPP');
		roi_update();
	});
});
var roi_unalph = {'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'a':10,'b':11,'c':12,'d':13,'e':14,'f':15,'g':16,'h':17,'i':18,'j':19,'k':20,'l':21,'m':22,'n':23,'o':24,'p':25,'q':26,'r':27,'s':28,'t':29,'u':30,'v':31,'w':32,'x':33,'y':34,'z':35};
function roiBase36(num) {
	return Math.round(parseInt(num)).toString(36);
}
function roiHex(num) {
	return parseInt(num).toString(16);
}
function roiRound(num) {
	return Math.round(num*100, 2) / 100;
}
function roiBase36toInt(alph) {
	var i = 0;
	for ( var a = 0; a < alph.length; a++ ) {
		i += Math.pow(36,a) * roi_unalph[alph[alph.length - a - 1]];
	}
	return i;
}