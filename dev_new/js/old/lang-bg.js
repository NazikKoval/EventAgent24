<!--
var arr_messages = new Array();
arr_messages[0] = 'Зареждане...';
arr_messages[1] = 'bg-BG';
arr_messages[2] = 'използвани %charsTyped% от %charsTotal% символа';
arr_messages[3] = 'Всички';
arr_messages[4] = 'Няма открити категории';
arr_messages[5] = 'Превъртете за повече или натиснете тук';
arr_messages[6] = 'Натиснете за повече';
arr_messages[7] = 'Приложи';
arr_messages[8] = 'Отказ';
arr_messages[9] = 'От';
arr_messages[10] = 'До';
arr_messages[11] = 'Избор';
arr_messages[12] = 'Няма избрани';
arr_messages[13] = 'Няма открити резултати';
arr_messages[14] = 'избрани {0} от {1}';
arr_messages[15] = 'Въведете правилен пощенски код';
arr_messages[16] = 'Моля изберете поне един чекбокс.';
arr_messages[17] = 'Избери всички';
arr_messages[18] = 'Премахни всички';
var str_day_names = ["Неделя","Понеделник","Вторник","Сряда","Четвъртък","Петък","Събота"];
var str_day_short = ["Нд","Пн","Вт","Ср","Чт","Пт","Сб"];
var str_month_names = ["Януари","Февруари","Март","Април","Май","Юни","Юли","Август","Септември","Октомври","Ноември","Декември"];
var str_month_short = ["Яну","Фев","Мар","Апр","Май","Юни","Юли","Авг","Сеп","Окт","Ное","Дек"];


$(document).ready(function()
{
	jQuery.extend(jQuery.validator.messages,
	{
		required: 'Това поле е задължително!',
		email: 'Въведете валиден email.',
		url: "Въведете валиден URL линк.",
		date: "Въведете валидна дата!",
		dateISO: "Въведете дата в ISO формат!",
		dateDE: "Bitte geben Sie ein gültiges Datum ein.",
		number: "Въведете валидно число!",
		numberDE: "Bitte geben Sie eine Nummer ein.",
		digits: 'Моля, въведете само цифри.',
		creditcard: "Моля, въведете валиден номер на кредитна карта.",
		equalTo: 'Въведете паролата отново.',
		accept: "Моля, въведете стойност с валидно разширение.",
		maxlength: $.format("Въведете до {0} символа."),
		minlength: $.format('Въведете най-малко {0} символа.'),
		rangelength: $.format("Въведете от {0} до {1} символа."),
		range: $.format("Въведете стойност между {0} и {1}."),
		max: $.format("Въведете стойност по-малка или равна на {0}."),
		min: $.format("Въведете стойност по-голяма или равна на {0}."),
		lettersonly: $.format("Моля, въведете само букви."),
		minbudget: $.format("Стойността за бюджета трябва да е по-малка или равна на максималната."),
		maxbudget: $.format("Стойността за бюджета трябва да е по-голяма или равна на минималната."),
		sc: $.format("Моля, въведете валиден код.")
	});
});

/**
 * English translation for bootstrap-wysihtml5
 */
(function($)
{
	if($.fn.wysihtml5)
	{
		$.fn.wysihtml5.locale['bg-BG'] = {
			font_styles: {
				normal: 'Нормален текст',
				h1: 'Заглавие 1',
				h2: 'Заглавие 2',
				h3: 'Заглавие 3',
				h4: 'Заглавие 4',
				h5: 'Заглавие 5',
				h6: 'Заглавие 6'
			},
			emphasis: {
				bold: 'B',
				italic: 'I',
				underline: 'U',
				small: 's'
			},
			lists: {
				unordered: 'Неподреден списък',
				ordered: 'Подреден списък',
				outdent: 'Намали отстояние',
				indent: 'Увеличи отстояние'
			},
			link: {
				insert: 'Вмъкни линк',
				cancel: 'Отмени',
				target: 'Отвори линка в нов прозорец'
			},
			image: {
				insert: 'Вмъкни изображение',
				cancel: 'Отмени'
			},
			html: {
				edit: 'Редакртирай HTML'
			},
			colours: {
				black: 'Черен',
				silver: 'Сребрист',
				gray: 'Сив',
				maroon: 'Кестеняв',
				red: 'Червен',
				purple: 'Виолетов',
				green: 'Зелен',
				olive: 'Маслинен',
				navy: 'Морско син',
				blue: 'Син',
				orange: 'Оранжев'
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
			formatNoMatches: function () { return "Няма намерени съвпадения"; },
			formatInputTooShort: function (input, min) { var n = min - input.length; return "Моля въведете още " + n + " символ" + (n == 1 ? "" : "а"); },
			formatInputTooLong: function (input, max) { var n = input.length - max; return "Моля въведете с " + n + " по-малко символ" + (n == 1? "а" : "а"); },
			formatSelectionTooBig: function (limit) { return "Можете да направите до " + limit + (limit == 1 ? " избор" : " избора"); },
			formatLoadMore: function (pageNumber) { return "Зареждат се още..."; },
			formatSearching: function () { return "Търсене..."; }
		});
	}
})(jQuery);

/**
 * Bulgarian translation for bootstrap-datetimepicker
 * Apostol Apostolov <apostol.s.apostolov@gmail.com>
 */
;(function($){
	$.fn.datetimepicker.dates['bg'] = {
		days: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота", "Неделя"],
		daysShort: ["Нед", "Пон", "Вто", "Сря", "Чет", "Пет", "Съб", "Нед"],
		daysMin: ["Н", "П", "В", "С", "Ч", "П", "С", "Н"],
		months: ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"],
		monthsShort: ["Яну", "Фев", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Ное", "Дек"],
		today: "днес",
		suffix: [],
		meridiem: [],
		weekStart: 1,
		format: "dd.mm.yyyy hh:ii"
	};
}(jQuery));

;(function($){
	$.fn.datepicker.dates['bg'] = {
		days: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота", "Неделя"],
		daysShort: ["Нед", "Пон", "Вто", "Сря", "Чет", "Пет", "Съб", "Нед"],
		daysMin: ["Н", "П", "В", "С", "Ч", "П", "С", "Н"],
		months: ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"],
		monthsShort: ["Ян", "Фев", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Ное", "Дек"],
		today: "днес"
	};
}(jQuery));

/**
 * Bulgarian translation
 *  @name Bulgarian
 *  @anchor Bulgarian
 *  @author Rostislav Stoyanov
 */
var dt_language = {
	"sProcessing":   "Обработка на резултатите...",
	"sLengthMenu":   "Показване на _MENU_ резултата",
	"sZeroRecords":  "Няма намерени резултати",
	"sInfo":         "Показване на резултати от _START_ до _END_ от общо _TOTAL_",
	"sInfoEmpty":    "Показване на резултати от 0 до 0 от общо 0",
	"sInfoFiltered": "(филтрирани от общо _MAX_ резултата)",
	"sInfoPostFix":  "",
	"sSearch":       "Търсене във всички колони:",
	"sUrl":          "",
	"oPaginate": {
		"sFirst":    "Първа",
		"sPrevious": "Предишна",
		"sNext":     "Следваща",
		"sLast":     "Последна"
	}
}

var drp_range = {
	'Последните 7 дни': [moment().subtract(6, 'days'), moment()],
	'Последните 30 дни': [moment().subtract(29, 'days'), moment()],
	'Текущ месец': [moment().startOf('month'), moment().endOf('month')],
	'Предходен месец': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
}
//-->