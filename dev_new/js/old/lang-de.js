<!--
var arr_messages = new Array();
arr_messages[0] = 'Wird geladen ...';
arr_messages[1] = 'de-DE';
arr_messages[2] = 'verwendet %charsTyped% der %charsTotal% zeichen.';
arr_messages[3] = 'Alle';
arr_messages[4] = 'Keine passenden Kategorien';
arr_messages[5] = 'Blättern Sie, um weitere oder klicken Sie hier';
arr_messages[6] = 'Mehr laden ...';
arr_messages[7] = 'Anwenden';
arr_messages[8] = 'Abbrechen';
arr_messages[9] = 'Von';
arr_messages[10] = 'Zu';
arr_messages[11] = 'Zeitraum wählen';
arr_messages[12] = 'Keine Auswahl';
arr_messages[13] = 'Kein Ergebnis';
arr_messages[14] = '{0} von {1} ausgewählt';
arr_messages[15] = 'Geben Sie bitte Ihre PLZ ein.';
arr_messages[16] = 'Bitte wählen Sie mindestens ein Feld aus';
arr_messages[17] = 'Alle auswählen';
arr_messages[18] = 'Alle abwählen';

var str_day_names = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
var str_day_short = ["So","Mo","Di","Mi","Do","Fr","Sa"];
var str_month_names = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
var str_month_short = ["Jan","Feb","Mar","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];


$(document).ready(function()
{
	jQuery.extend(jQuery.validator.messages,
	{
		required: 'Dieses Feld ist erforderlich!',
		email: 'Geben Sie eine gültige E-Mail.',
		url: "Geben Sie eine gültige URL-Adresse.",
		date: "Geben gültiges Datum!",
		dateISO: "Geben gültiges Datum im ISO-Format!",
		dateDE: "Bitte geben Sie ein gültiges Datum ein.",
		number: "Geben Sie eine gültige Nummer!",
		numberDE: "Bitte geben Sie eine Nummer ein.",
		digits: 'Bitte geben Sie nur Ziffern.',
		creditcard: "Bitte geben Sie eine gültige Kreditkartennummer.",
		equalTo: 'Geben Sie das Passwort erneut ein.',
		accept: "Bitte geben Sie einen Wert mit einer gültigen Erweiterung.",
		maxlength: $.format("Geben Sie bis zu {0} Zeichen."),
		minlength: $.format('Geben Sie mindestens {0} Zeichen.'),
		rangelength: $.format("Geben Sie zwischen {0} und {1} Symbole."),
		range: $.format("Geben Sie den Wert zwischen {0} und {1}."),
		max: $.format("Geben Sie den Wert kleiner oder gleich {0}."),
		min: $.format("Geben Sie Wert größer als oder gleich {0}."),
		lettersonly: $.format("Bitte geben Sie nur Buchstaben."),
		minbudget: $.format("Das Budget-Wert sollte kleiner oder gleich der maximalen sein."),
		maxbudget: $.format("Das Budgetwert größer als oder gleich der minimalen sein."),
		sc: $.format("Bitte geben Sie eine korrekte Code.")
	});
});

/**
 * German translation for bootstrap-wysihtml5
 */
(function($)
{
	if($.fn.wysihtml5)
	{
		$.fn.wysihtml5.locale["de-DE"] = {
			font_styles: {
				normal: "Normaler Text",
				h1: "Überschrift 1",
				h2: "Überschrift 2",
				h3: "Überschrift 3",
				h4: "Überschrift 4",
				h5: "Überschrift 5",
				h6: "Überschrift 6"
			},
			emphasis: {
				bold: "B",
				italic: "I",
				underline: "U",
				small: 's'
			},
			lists: {
				unordered: "Ungeordnete Liste",
				ordered: "Geordnete Liste",
				outdent: "Einzug verkleinern",
				indent: "Einzug vergrößern"
			},
			link: {
				insert: "Link einfügen",
				cancel: "Abbrechen",
				target: "Link in neuen Fenster öffnen"
			},
			image: {
				insert: "Bild einfügen",
				cancel: "Abbrechen"
			},
			html: {
				edit: "HTML bearbeiten"
			},
			colours: {
				black: "Schwarz",
				silver: "Silber",
				gray: "Grau",
				maroon: "Kastanienbraun",
				red: "Rot",
				purple: "Violett",
				green: "Grün",
				olive: "Olivgrün",
				navy: "Marineblau",
				blue: "Blau",
				orange: "Orange"
			}
		};
	}
}(jQuery));

/**
 * Select2 German translation
 */
(function($)
{
	"use strict";

	if($.fn.select2)
	{
		$.extend($.fn.select2.defaults, {
			formatNoMatches: function () { return "Keine Übereinstimmungen gefunden"; },
			formatInputTooShort: function (input, min) { var n = min - input.length; return "Bitte " + n + " Zeichen mehr eingeben"; },
			formatInputTooLong: function (input, max) { var n = input.length - max; return "Bitte " + n + " Zeichen weniger eingeben"; },
			formatSelectionTooBig: function (limit) { return "Sie können nur " + limit + " Eintr" + (limit === 1 ? "ag" : "äge") + " auswählen"; },
			formatLoadMore: function (pageNumber) { return "Lade mehr Ergebnisse..."; },
			formatSearching: function () { return "Suche..."; }
		});
	}
})(jQuery);

/**
 * German translation for bootstrap-datetimepicker
 * Sam Zurcher <sam@orelias.ch>
 */
;(function($){
	$.fn.datetimepicker.dates['de'] = {
		days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
		daysShort: ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam", "Son"],
		daysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
		months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
		monthsShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
		today: "Heute",
		suffix: [],
		meridiem: [],
		weekStart: 1,
		format: "dd.mm.yyyy hh:ii"
	};
}(jQuery));

;(function($){
	$.fn.datepicker.dates['de'] = {
		days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
		daysShort: ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam", "Son"],
		daysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
		months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
		monthsShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
		today: "Heute"
	};
}(jQuery));

/**
 * German translation
 *  @name German
 *  @anchor German
 *  @author Joerg Holz
 */
var dt_language = {
	"sEmptyTable":   	"Keine Daten in der Tabelle vorhanden",
	"sInfo":         	"_START_ bis _END_ von _TOTAL_ Einträgen",
	"sInfoEmpty":    	"0 bis 0 von 0 Einträgen",
	"sInfoFiltered": 	"(gefiltert von _MAX_ Einträgen)",
	"sInfoPostFix":  	"",
	"sInfoThousands":  	".",
	"sLengthMenu":   	"_MENU_ Einträge anzeigen",
	"sLoadingRecords": 	"Wird geladen...",
	"sProcessing":   	"Bitte warten...",
	"sSearch":       	"Suchen",
	"sZeroRecords":  	"Keine Einträge vorhanden.",
	"oPaginate": {
		"sFirst":    	"Erste",
		"sPrevious": 	"Zurück",
		"sNext":     	"Nächste",
		"sLast":     	"Letzte"
	},
	"oAria": {
		"sSortAscending":  ": aktivieren, um Spalte aufsteigend zu sortieren",
		"sSortDescending": ": aktivieren, um Spalte absteigend zu sortieren"
	}
}

var drp_range = {
	'Letzte 7 Tage': [moment().subtract(6, 'days'), moment()],
	'Letzte 30 Tage': [moment().subtract(29, 'days'), moment()],
	'Dieser Monat': [moment().startOf('month'), moment().endOf('month')],
	'Letzter Monat': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
}
//-->