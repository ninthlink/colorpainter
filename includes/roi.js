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
var roiDebug = true; // true = console.log debug msgs ?
var roiOpts = {
	aSign: '$'
};
var roiUpdater;

function roi_update() {
	roi_dbg('## ROI Update :: printer change');
	
	// undisable things?
	var sibs = $('#printer').parents('fieldset').siblings().removeClass('disabled');
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
	var bettername = (printers[C14]['name']).replace(' - ', '<br />').replace(' color',' Color Printer');
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
	var C6 = $('#inkpersqft').autoNumeric('get');
	var C7 = $('#rollsperwk').val();
	
	var C8 = 600 * C7;
	roi_dbg('sqftperwk = '+ C8);
	$('#sqftperwk').val(C8).autoNumeric('update');
	$('#ssqftperwk').val(C8).autoNumeric('update');
	
	var C9 = (C6*C8)*(52/12);
	roi_dbg('inkpermonth = '+ C9);
	$('#inkpermonth').val(C9).autoNumeric('update');
	$('#sinkpermonth').val(C9).autoNumeric('update');
	
	var C10 = $('input[name="amortper"]:checked').val();
	
	var C11 = C4/(C10*12);
	roi_dbg('monthlyamort = '+ C11);
	$('#monthlyamort').val(C11).autoNumeric('update');
	$('#smonthlyamort').val(C11).autoNumeric('update');
	
	var C14 = $('#printer').val();
	var C15 = $('#psellprice').autoNumeric('get');
	var C16 = $('#pspeed').autoNumeric('get');
	var C17 = $('#pinkpersqft').autoNumeric('get');
	
	var C18 = C7;
	roi_dbg('prollsperwk = '+ C18);
	$('#prollsperwk').val(C18);
	$('#sprollsperwk').val(C18);
	
	var C19 = C8;
	roi_dbg('psqftperwk = '+ C19);
	$('#psqftperwk').val(C19);
	$('#spsqftperwk').val(C19);
	
	var C20 = (C17*C19)*(52/12);
	roi_dbg('pinkpermonth = '+ C20);
	$('#pinkpermonth').val(C20).autoNumeric('update');
	$('#spinkpermonth').val(C20).autoNumeric('update');
	
	var C21 = C10;
	roi_dbg('pamortper = '+ C21);
	$('#pamortper').val(C21);
	
	var C22 = C15/(C21*12);
	roi_dbg('pmonthlyamort = '+ C22);
	$('#pmonthlyamort').val(C22).autoNumeric('update');
	$('#spmonthlyamort').val(C22).autoNumeric('update');
	
	var C25 = C11+C9;
	roi_dbg('cmonthlytotal = '+ C25);
	$('#cmonthlytotal').val(C25).autoNumeric('update');
	
	var C26 = C22+C20;
	roi_dbg('monthlytotal = '+ C26);
	$('#monthlytotal').val(C26).autoNumeric('update');
	
	var C27 = (C9+C11)-(C20+C22);
	roi_dbg('costpermonth = '+ C27);
	$('#costpermonth').val(C27).autoNumeric('update');
	// & check for "Savings" vs "Loss"
	$('#costpermonth').parent().siblings('label').find('.save').html( C27 >= 0 ? 'Savings' : 'Loss');
	
	var C28 = C27*(C21*12);
	roi_dbg('additional = '+ C28);
	$('#additional').val(C28).autoNumeric('update');
	// & check for "Savings" vs "Loss"
	$('#additional').parent().siblings('label').find('.save').html( C28 >= 0 ? 'Profit' : 'Loss');
	
	var C29 = ((C8/C5)-(C19/C16))*52/12;
	roi_dbg('esthrs = '+ C29);
	$('#esthrs').val(C29).autoNumeric('update');
	// & check for "Savings" vs "Loss"
	$('#esthrs').parent().siblings('label').find('.save').html( C29 >= 0 ? 'Savings' : 'Loss');
	
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

jQuery(document).bind('pageinit', function() {
	var numopts = {
		aSign: roiOpts['aSign']
	};
	$('.money').each(function() {
		$(this).autoNumeric('init', numopts);
	});
	$('input.number').attr('type','text').autoNumeric('init');
	
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
	});
	
	// bind the update
	$('#price, #inkpersqft, #rollsperwk, #speed, input[name="amortper"]').bind('change', roi_recalc);
	// but throttle the slider ones
	$('#psellprice, #pinkpersqft').bind('change', roi_throttle);
	
	//roi_throttle();
	
	$('a.next').bind('click',function() {
		if ( $(this).hasClass('disabled') ) return false;
	});
	
	$('.plaintext.stripe').each(function() {
		$(this).children('.ui-field-contain:even').addClass('even');
	});
});