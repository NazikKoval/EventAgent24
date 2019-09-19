<!--
var arr_messages = new Array();
arr_messages[0] = 'Bezig met laden...';
arr_messages[1] = 'nl-NL';
arr_messages[2] = 'gebruikte %charsTyped% van %charsTotal% chars.';
arr_messages[3] = 'Alle';
arr_messages[4] = 'Geen overeenkomende categorieën';
arr_messages[5] = 'Scroll voor meer of klik hier';
arr_messages[6] = 'Klik voor meer';
arr_messages[7] = 'Solliciteer';
arr_messages[8] = 'Annuleren';
arr_messages[9] = 'Van';
arr_messages[10] = 'Tot';
arr_messages[11] = 'Custom';
arr_messages[12] = 'Niets is geselecteerd';
arr_messages[13] = 'Geen resultaten match';
arr_messages[14] = '{0} van {1} geselecteerd';
arr_messages[15] = 'You must enter vailed zip code';
arr_messages[16] = 'Please select at least one checkbox.';
arr_messages[17] = 'Alle auswählen';
arr_messages[18] = 'Alle abwählen';

var str_day_names = ["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"];
var str_day_short = ["Zo","Ma","Di","Wo","Do","Vr","Za"];
var str_month_names = ["Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December"];
var str_month_short = ["Jan","Feb","Mrt","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Dec"];


$(document).ready(function()
{
	jQuery.extend(jQuery.validator.messages,
	{
		required: 'Dit is een verplicht veld!',
		email: 'Vul hier een geldig e-mailadres in.',
		url: "Vul hier een geldige URL in.",
		date: "Vul hier een geldige datum in!",
		dateISO: "Vul hier een geldige datum in (ISO-formaat)!",
		dateDE: "Bitte geben Sie ein gültiges Datum ein.",
		number: "Vul hier een geldig getal in!",
		numberDE: "Bitte geben Sie eine Nummer ein.",
		digits: 'Vul hier alleen getallen in.',
		creditcard: "Vul hier een geldig creditcardnummer in.",
		equalTo: 'Vul hier dezelfde waarde in.',
		accept: "Vul hier een waarde in met een geldige extensie.",
		maxlength: $.format("Vul hier maximaal {0} tekens in."),
		minlength: $.format('Vul hier minimaal {0} tekens in.'),
		rangelength: $.format("Vul hier een waarde in van minimaal {0} en maximaal {1} tekens."),
		range: $.format("Vul hier een waarde in van minimaal {0} en maximaal {1}."),
		max: $.format("Vul hier een waarde in kleiner dan of gelijk aan {0}."),
		min: $.format("Vul hier een waarde in groter dan of gelijk aan {0}."),
		lettersonly: $.format("Voer alleen letters."),
		minbudget: $.format("De budget waarde moet kleiner dan of gelijk aan het maximum een."),
		maxbudget: $.format("De budget waarde moet groter zijn dan of gelijk zijn aan de een."),
		sc: $.format("Vul een juiste code.")
	});
});

/**
 * Dutch translation for bootstrap-wysihtml5
 */
(function($)
{
	if($.fn.wysihtml5)
	{
	    $.fn.wysihtml5.locale["nl-NL"] = {
    	    font_styles: {
        	    normal: "Normale Tekst",
            	h1: "Kop 1",
	            h2: "Kop 2",
    	        h3: "Kop 3",
        	    h4: "Kop 4",
            	h5: "Kop 5",
	            h6: "Kop 6"
    	    },
        	emphasis: {
            	bold: "B",
	            italic: "I",
    	        underline: "U",
				small: "s"
        	},
	        lists: {
    	        unordered: "Ongeordende lijst",
        	    ordered: "Geordende lijst",
            	outdent: "Inspringen verkleinen",
	            indent: "Inspringen vergroten"
    	    },
	        link: {
    	        insert: "Link invoegen",
        	    cancel: "Annuleren",
				target: "Link openen in een nieuw venster"
	        },
	        image: {
    	        insert: "Afbeelding invoegen",
        	    cancel: "Annuleren"
	        },
    	    html: {
        	    edit: "HTML bewerken"
	        },
    	    colours: {
        	    black: "Zwart",
            	silver: "Zilver",
	            gray: "Grijs",
    	        maroon: "Kastanjebruin",
        	    red: "Rood",
	            purple: "Paars",
    	        green: "Groen",
        	    olive: "Olijfgroen",
            	navy: "Donkerblauw",
	            blue: "Blauw",
    	        orange: "Oranje"
        	}
	    };
	}
}(jQuery));

/**
 * Select2 English translation.
 */
(function($)
{
	"use strict";

	if($.fn.select2)
	{
		$.extend($.fn.select2.defaults, {
			formatNoMatches: function () { return "Geen resultaten gevonden"; },
			formatInputTooShort: function (input, min) { var n = min - input.length; return "Vul " + n + " karakter" + (n == 1? "" : "s") + " meer in"; },
			formatInputTooLong: function (input, max) { var n = input.length - max; return "Vul " + n + " karakter" + (n == 1? "" : "s") + " minder in"; },
			formatSelectionTooBig: function (limit) { return "Maximaal " + limit + " item" + (limit == 1 ? "" : "s") + " toegestaan"; },
			formatLoadMore: function (pageNumber) { return "Meer resultaten laden..."; },
			formatSearching: function () { return "Zoeken..."; }
		});
	}
})(jQuery);

/**
 * Dutch translation for bootstrap-datetimepicker
 * Reinier Goltstein <mrgoltstein@gmail.com>
 */
;(function($){
	$.fn.datetimepicker.dates['nl'] = {
		days: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
		daysShort: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
		daysMin: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
		months: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
		today: "Vandaag",
		suffix: [],
		meridiem: [],
		weekStart: 1,
		format: "dd-mm-yyyy hh:ii"
	};
}(jQuery));

;(function($){
	$.fn.datepicker.dates['nl'] = {
		days: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
		daysShort: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
		daysMin: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
		months: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
		today: "Vandaag"
	};
}(jQuery));

/**
 * Dutch translation
 *  @name Dutch
 *  @anchor Dutch
 *  @author <a href="http://www.blikgooien.nl/">Erwin Kerk</a> and <i>ashwin</i>
 */
var dt_language = {
    "sProcessing": "Bezig...",
    "sLengthMenu": "_MENU_ resultaten weergeven",
    "sZeroRecords": "Geen resultaten gevonden",
    "sInfo": "_START_ tot _END_ van _TOTAL_ resultaten",
    "sInfoEmpty": "Geen resultaten om weer te geven",
    "sInfoFiltered": " (gefilterd uit _MAX_ resultaten)",
    "sInfoPostFix": "",
    "sSearch": "Zoeken:",
    "sEmptyTable": "Geen resultaten aanwezig in de tabel",
    "sInfoThousands": ".",
    "sLoadingRecords": "Een moment geduld aub - bezig met laden...",
    "oPaginate": {
        "sFirst": "Eerste",
        "sLast": "Laatste",
        "sNext": "Volgende",
        "sPrevious": "Vorige"
    }
}

var drp_range = {
	'Laatste 7 dagen': [moment().subtract(6, 'days'), moment()],
	'Laatste 30 dagen': [moment().subtract(29, 'days'), moment()],
	'Deze maand': [moment().startOf('month'), moment().endOf('month')],
	'Afgelopen maand': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
}
//-->