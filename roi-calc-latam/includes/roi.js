var siip = [
	{ name: 'Selecciones Modelo Por Favor' },
	{
		name: 'ColorPainter W-64s - 4 color GX ink',
		ink: 1.46,
		msrp: 17999,
		spd: 11.9,
		img: 'w64s',
		iht: 212,
		desc: '64" flexible, reliable high-performance low-solvent printer. Prints vinyl, banner, backlit films, textiles and other media designed for solvent printers. Industrial piezo print heads offer high resolution, high speeds and reliability. Available with two neon florescent inks that glow under black light. ONYX RIP Center included. 3M&trade; MCS&trade; Warranty.'
	},
	{
		name: 'ColorPainter M-64s LCIS - 6 color Wx ink',
		ink: 1.8,
		msrp: 45040,
		spd: 33.1,
		img: 'm64',
		iht: 225,
		desc: '64" high-speed eco-solvent printer with low odor inks. Very low cost per square foot to operate. Superior durability of outdoor and indoor graphics. SX inks offer a wide color gamut, high vividness and high density great for backlit applications. Unmatched productivity and quality. Automatic Print Adjustment. ONYX RIP Center included. 3M&trade; MCS&trade; Warranty.'
	},
	{
		name: 'ColorPainter H2-74s - 8 color',
		ink: 3.15,
		msrp: 59999.95,
		spd: 26.4,
		img: 'h274',
		iht: 216,
		desc: '74" high-performance outdoor and indoor graphics printer. Good fit for vinyl, banner, backlit films, textiles, fleet, fine art canvas, banners, flexface. Higher density inks with higher pigment loading means rich glossy colors for backlit or frontlit films. Industrial piezo print heads offer high resolution, high speeds and reliability. Resolution up to 900x900 dpi. Low running costs. 3M&trade; MCS&trade; Warranty.'
	},
	{
		name: 'ColorPainter H2-74s - 4 color',
		ink: 1.85,
		msrp: 59999.95,
		spd: 52.7,
		img: 'h274',
		iht: 216,
		desc: '74" High-performance outdoor and indoor graphics printer. Industrial piezo print heads offer high resolution, high speeds and reliability for high-volume print environments. Low running costs. 3M&trade; MCS&trade; Warranty.'
	},
	{
		name: 'ColorPainter H2-104s - 8 color',
		ink: 3.15,
		msrp: 79999.95,
		spd: 28.6,
		img: 'h2104',
		iht: 254,
		desc: '104" High-performance outdoor and indoor graphics printer. Perfect for vinyl, banner, backlit films, textiles, fleet, fine art canvas, banners, flexface. Higher density inks with higher pigment loading means rich glossy colors for backlit or frontlit films. Industrial piezo print heads offer high resolution, high speeds and reliability for high-volume print environments. Resolution up to 900x900 dpi. Low running costs. 3M&trade; MCS&trade; Warranty.'
	},
	{
		name: 'ColorPainter H2-104s - 4 color',
		ink: 1.85,
		msrp: 79999.95,
		spd: 79.5,
		img: 'h2104',
		iht: 254,
		desc: '74" High-performance outdoor and indoor graphics printer. Industrial piezo print heads offer high resolution, high speeds and reliability for high-volume print environments. Low running costs. 3M&trade; MCS&trade; Warranty.'
	},
	{
		name: 'ColorPainter H2P-74s',
		ink: 1.12,
		msrp: 66999.95,
		spd: 70.9,
		img: 'h2p74',
		iht: 172,
		desc: '74" high-speed 4 color printer with large-capacity ink system. Contains eight large-capacity ink reservoirs with six liters of ink per color. Designed for high-production shops where low running costs are important. Industrial piezo print heads offer high resolution, high speeds and reliability. Good fit for fleet graphics, banners, signs, fine art canvas and flex faces.'
	},
	{
		name: 'ColorPainter H2P-104s',
		ink: 1.12,
		msrp: 86999.95,
		spd: 79.5,
		img: 'h2p104',
		iht: 152,
		desc: '104" high-speed 4 color printer with large-capacity ink system. Contains eight large-capacity ink reservoirs with six liters of ink per color. Designed for high-production shops where low running costs are important. Industrial piezo print heads offer high resolution, high speeds and reliability. Good fit for fleet graphics, banners, signs, fine art canvas and flex faces.'
	}
];
var siid = 0; // index to choose
var siib = 'http://ninthlink.me/seiko/lacalc/';
//var roiDebug = true; // = console.log debug msgs ?
var siio = {
	aSign: '$'
};
var siit;
var siis = '';

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
		$('.pname').html( pname );
		$('#sprinter').val( pname );
		// also printer infos
		$('.printerimg, .printerinfos').empty();
		$('<img />').attr({ alt: pname, src: 'includes/images/printers/'+ siip[C14]['img'] +'.jpg', width: 400, height: siip[C14]['iht'] }).appendTo('.printerimg');
		var bname = (siip[C14]['name']).replace(' - ', '<span class="printonly"> - </span><br />').replace(' color',' Color Printer');
		//var pd = siip[C14]['desc'];
		//pd = pd.replace(/<li>/g, '').replace(/<\/li>/g, '. ').replace(/ul>/g,'p>');
		$('.printerinfos').html( '<h3>'+ bname +'</h3><p>'+ siip[C14]['desc'] +'</p>' );
		
		// and then
		siiC();
	} else {
		var sibs = $('#printer').parents('fieldset').siblings(':not(.progress)').addClass('disabled');
		sibs.find('.ui-input-text input').textinput('disable');
		sibs.find('.ui-select select').selectmenu('disable');
		sibs.find('.ui-radio input').checkboxradio('disable');
		// + some default values
		$('#price').val('');
		$('#speed').val(10);
		$('#inkpersqft').val(1.28).autoNumeric('update');
		$('.pname').html('');
	}
}
/*
 * recalculate all values based on those provided
 */
function siiC(e) {
	//roiDbg('## ROI Update :: recalc');
	var years, c_price, c_speed, c_ink00;
	
	var s_printer = $('#printer').val();	
	//roiDbg('printer # '+ s_printer);
	var s_price = $('#psellprice').autoNumeric('get');
	$('#spsellprice').val(s_price).autoNumeric('update');
	
	var s_speed = $('#pspeed').autoNumeric('get');
	var s_ink = siiR( $('#pinkpersqft').autoNumeric('get') ); //hax
	$('#spinkpersqft').val(s_ink).autoNumeric('update');
	
	var	rollsperwk = $('#rollsperwk').val();
	$('#prollsperwk,#sprollsperwk,#srollsperwk').val(rollsperwk);
	
	var sqftperwk = 76 * rollsperwk;
	//roiDbg('C8 "sqftperwk" = '+ sqftperwk);
	$('#sqftperwk,#ssqftperwk,#psqftperwk,#spsqftperwk').val(sqftperwk).autoNumeric('update');
	
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
	
	years = $('#amortper-5').prop('checked') ? 5 : 3;
	//roiDbg('C21 years "pamortper" = '+ years);
	$('#pamortper, #samortper, #spamortper').val(years);
	
	var c_monthly = siiR(c_price/(years*12));
	//roiDbg('C11 "monthlyamort" = '+ C11);
	$('#monthlyamort,#smonthlyamort').val(c_monthly).autoNumeric('update');
	
	var s_inkpermonth = siiR((s_ink*sqftperwk)*(52/12));
	//roiDbg('C20 "pinkpermonth: = '+ s_inkpermonth);
	$('#pinkpermonth,#spinkpermonth').val(s_inkpermonth).autoNumeric('update');
	
	var s_monthly = siiR(s_price/(years*12));
	//roiDbg('C22 "pmonthlyamort" = '+ s_monthly);
	$('#pmonthlyamort,#spmonthlyamort').val(s_monthly).autoNumeric('update');
	
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
	//$('#costpermonth').parent().siblings('label').find('.save').html( costpermonth >= 0 ? 'Savings' : 'Loss');
	
	var inkpermonth = siiR( c_inkpermonth - s_inkpermonth );
	//roiDbg('C27 "costpermonth" = '+ costpermonth);
	var ipmzs = '' + ( inkpermonth >= 1000 ? 0 : 2 );
	$('#inkcostpermonth').val(inkpermonth).autoNumeric('update', { mDec: ipmzs });
	// & check for "Savings" vs "Loss"
	//$('#inkcostpermonth').parent().siblings('label').find('.save').html( inkpermonth >= 0 ? 'Savings' : 'Loss');
	$('#vinkcost').html($('#inkcostpermonth').val());
	
	var inktot = inkpermonth * years * 12;
	$('#inkcost').val(inktot).autoNumeric('update');
	// & check for "Savings" vs "Loss"
	//$('#inkcost').parent().siblings('label').find('.save').html( inktot >= 0 ? 'Savings' : 'Loss');
	
	var profit = costpermonth*(years*12);
	//roiDbg('C28 "additional" = '+ profit);
	$('#profit').val(profit).autoNumeric('update');
	// & check for "Savings" vs "Loss"
	//$('#profit').parent().siblings('label').find('.save').html( profit >= 0 ? 'Profit' : 'Loss');
	
	var C29 = siiR((( sqftperwk / c_speed ) - ( sqftperwk / s_speed ))*52/12);
	//roiDbg('C29 "esthrs" = '+ C29);
	$('#esthrs').val(C29).autoNumeric('update');
	// & check for "Savings" vs "Loss"
	//$('#esthrs').parent().siblings('label').find('.save').html( C29 >= 0 ? 'Savings' : 'Loss');
	$('#vesthrs').html($('#esthrs').val());
	
	siiS(years, s_printer, c_price, c_speed, c_ink00, rollsperwk);
}
/*
 * function to combine option values & choices in to a compact string
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
function siiP(n) {
	//roiDbg('roiAmortper : '+ n);
	$( '#amortper-'+ ( n == 3 ? 3 : 5 ) ).trigger('roiCheck');
}

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
		// just default amortper-5 on
		siiP(5);
	}
	
	$('#printer').each(function() {
		$(this).html(function() {
			var h = '';
			for( i in siip ) {
				h += '<option value="'+ i + (i == siid ? '" selected="selected' : '') +'">'+ siip[i]['name'] +'</option>';
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
var roiAlph = {'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'a':10,'b':11,'c':12,'d':13,'e':14,'f':15,'g':16,'h':17,'i':18,'j':19,'k':20,'l':21,'m':22,'n':23,'o':24,'p':25,'q':26,'r':27,'s':28,'t':29,'u':30,'v':31,'w':32,'x':33,'y':34,'z':35};
function siiB(e) {
	return Math.round(parseInt(e)).toString(36);
}
function siiR(e) {
	return Math.round(e*100, 2) / 100;
}
function siiB2I(e) {
	var i = 0, l = e.length;
	for ( var a = 0; a < l; a++ ) {
		i += Math.pow(36,a) * roiAlph[e[l - a - 1]];
	}
	return i;
}

function siiT(t){var a=t[0],b,c;"INPUT"===a.tagName?a.select():document.body.createTextRange?(b=document.body.createTextRange(),b.moveToElementText(a),b.select()):window.getSelection&&(c=window.getSelection(),b=document.createRange(),
b.selectNodeContents(a),c.removeAllRanges(),c.addRange(b))}