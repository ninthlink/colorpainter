var printers = [
	{
		name: 'W-64 6 Color',
		ink: 0.22,
		msrp: 17000,
		speed: 128
	},
	{
		name: 'M-64 7 Color',
		ink: 0.16,
		msrp: 42600,
		speed: 356
	},
	{
		name: 'H2-74 8 Color',
		ink: 0.18,
		msrp: 50000,
		speed: 284
	},
	{
		name: 'H2-74 4 Color',
		ink: 0.14,
		msrp: 50000,
		speed: 567
	},
	{
		name: 'H2-104 8 Color',
		ink: 0.18,
		msrp: 69000,
		speed: 308
	},
	{
		name: 'H2-104 4 Color',
		ink: 0.14,
		msrp: 69000,
		speed: 856
	},
	{
		name: 'H2P-74',
		ink: 0.08,
		msrp: 53000,
		speed: 763
	},
	{
		name: 'H2P-104',
		ink: 0.08,
		msrp: 72000,
		speed: 856
	}
];
var defaultPrinter = 1; // index to choose
var roiOpts = {
	aSign: '$'
};
var roiUpdater;

function roi_update(e) {
	roi_dbg('## ROI Update ::');
	
	var C4 = $('#price').autoNumeric('get');
	var C5 = $('#speed').autoNumeric('get');
	var C6 = $('#inkpersqft').autoNumeric('get');
	var C7 = $('#rollsperwk').val();
	
	var C8 = 600 * C7;
	roi_dbg('sqftperwk = '+ C8);
	$('#sqftperwk').val(C8).autoNumeric('update');
	
	var C9 = (C6*C8)*(52/12);
	roi_dbg('inkpermonth = '+ C9);
	$('#inkpermonth').val(C9).autoNumeric('update');
	
	var C10 = $('input[name="amortper"]:checked').val();
	
	var C11 = C4/(C10*12);
	roi_dbg('monthlyamort = '+ C11);
	$('#monthlyamort').val(C11).autoNumeric('update');
	
	var C14 = $('#printer').val();
	roi_dbg('printer #'+ C14);
	roi_dbg(printers[C14]);
	
	var C15 = printers[C14]['msrp'];
	roi_dbg('psellprice = '+ C15);
	$('#psellprice').val(C15).autoNumeric('update');
	
	var C16 = printers[C14]['speed'];
	roi_dbg('pspeed = '+ C16);
	$('#pspeed').val(C16).autoNumeric('update');
	
	var C17 = printers[C14]['ink'];
	roi_dbg('pinkpersqft = '+ C17);
	$('#pinkpersqft').val(C17).autoNumeric('update');
	
	var C18 = C7;
	roi_dbg('prollsperwk = '+ C18);
	$('#prollsperwk').val(C18);
	
	var C19 = C8;
	roi_dbg('psqftperwk = '+ C19);
	$('#psqftperwk').val(C19);
	
	var C20 = (C17*C19)*(52/12);
	roi_dbg('pinkpermonth = '+ C20);
	$('#pinkpermonth').val(C20).autoNumeric('update');
	
	var C21 = C10;
	roi_dbg('pamortper = '+ C21);
	$('#pamortper').val(C21);
	
	var C22 = C15/(C21*12);
	roi_dbg('pmonthlyamort = '+ C22);
	$('#pmonthlyamort').val(C22).autoNumeric('update');
	
	var C25 = C11+C9;
	roi_dbg('cmonthlytotal = '+ C25);
	$('#cmonthlytotal').val(C25).autoNumeric('update');
	
	var C26 = C22+C20;
	roi_dbg('monthlytotal = '+ C26);
	$('#monthlytotal').val(C26).autoNumeric('update');
	// also printer name
	$('#monthlytotal').parent().siblings('label').children('.pname').html( printers[C14]['name'] );
	
	var C27 = (C9+C11)-(C20+C22);
	roi_dbg('costpermonth = '+ C27);
	$('#costpermonth').val(C27).autoNumeric('update');
	// & check for "Savings" vs "Loss"
	$('#costpermonth').parent().siblings('label').children('.save').html( C27 >= 0 ? 'Savings' : 'Loss');
	
	var C28 = C27*(C21*12);
	roi_dbg('additional = '+ C28);
	$('#additional').val(C28).autoNumeric('update');
	// & check for "Savings" vs "Loss"
	$('#additional').parent().siblings('label').children('.save').html( C28 >= 0 ? 'Profit' : 'Loss');
	
	var C29 = ((C8/C5)-(C19/C16))*52/12;
	roi_dbg('esthrs = '+ C29);
	$('#esthrs').val(C29).autoNumeric('update');
	// & check for "Savings" vs "Loss"
	$('#esthrs').parent().siblings('label').children('.save').html( C29 >= 0 ? 'Savings' : 'Loss');
	
}

function roi_throttle(e) {
	clearTimeout(roiUpdater);
	roiUpdater = setTimeout(roi_update, 100);
}

function roi_dbg(m) {
	if ( false ) { // true = console.log debug msgs ?
		console.log(m);
	}
}

jQuery(document).bind('pageinit', function() {
	$('.money').each(function() {
		var numopts = {
			aSign: roiOpts['aSign']
		};
		
		if ( $(this).hasClass('ui-slider-input') ) {
			// make jquerymobile slider + autoNumeric money formatting play nice together?
			var smin = $(this).attr('min');
			if ( typeof smin !== 'undefined' && smin !== false ) {
				numopts['vMin'] = smin;
			}
			var smax = $(this).attr('max');
			if ( typeof smax !== 'undefined' && smax !== false ) {
				numopts['vMax'] = smax;
			}
			
			$(this).attr('type','text').bind('change', function(e) {
				var tv = $(this).val();
				var ts = '' + tv;
				var nv = $(this).autoNumeric('get');
				var sv = $(this).next().children('a.ui-slider-handle').attr('aria-valuenow');
				if ( ts.substr(0,1) != roiOpts['aSign'] ) {
					$(this).autoNumeric('update');
				} else {
					if ( nv != sv ) {
						$(this).val(nv).slider('refresh');
						$(this).autoNumeric('update');
					}
				}
				roi_dbg('sup '+ $(this).attr('id') + ' ' + e.timeStamp);
			}).autoNumeric('init', numopts );
		} else {
			$(this).autoNumeric('init', numopts );
		}
	});
	
	$('input.number').attr('type','text').autoNumeric('init');
	
	$('#printer').html(function() {
		var h = '';
		for( i in printers ) {
			h += '<option value="'+ i + (i == defaultPrinter ? '" selected="selected' : '') +'">'+ printers[i]['name'] +'</option>';
		}
		return h;
	}).selectmenu('refresh');
	
	// bind the update
	$('#price, #speed, #printer, input[name="amortper"]').bind('change', roi_update);
	// but throttle the slider ones
	$('#inkpersqft, #rollsperwk').bind('change', roi_throttle);
	
	roi_throttle();
});