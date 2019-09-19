var arr_messages = new Array();
arr_messages[0] = 'Loading...';
arr_messages[1] = 'en-US';
arr_messages[2] = 'used %charsTyped% of %charsTotal% chars.';
arr_messages[3] = 'All';
arr_messages[4] = 'No matching categories';
arr_messages[5] = 'Scroll for more or click here';
arr_messages[6] = 'Click for more';
arr_messages[7] = 'Apply';
arr_messages[8] = 'Cancel';
arr_messages[9] = 'From';
arr_messages[10] = 'To';
arr_messages[11] = 'Custom';
arr_messages[12] = 'Nothing selected';
arr_messages[13] = 'No results match';
arr_messages[14] = '{0} of {1} selected';
arr_messages[15] = 'You must enter vailed zip code';
arr_messages[16] = 'Please select at least one checkbox.';
arr_messages[17] = 'Select all';
arr_messages[18] = 'Deselect all';

var str_day_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var str_day_short = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
var str_month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var str_month_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


(function ($) {

    "use strict";

  if ($.validator) {
    $.extend($.validator.messages,
            {
                required: 'This field is required!',
                email: 'Enter a valid email.',
                url: "Enter valid URL address.",
                date: "Enter valid date!",
                dateISO: "Enter valid date in ISO format!",
                dateDE: "Bitte geben Sie ein gültiges Datum ein.",
                number: "Enter valid number!",
                numberDE: "Bitte geben Sie eine Nummer ein.",
                digits: 'Please enter only digits.',
                creditcard: "Please enter a valid credit card number.",
                equalTo: 'Type the password again.',
                accept: "Please enter a value with a valid extension.",
                maxlength: $.format("Enter up to {0} symbols."),
                minlength: $.format('Enter at least {0} symbols.'),
                rangelength: $.format("Enter between {0} and {1} symbols."),
                range: $.format("Enter value between {0} and {1}."),
                max: $.format("Enter value less than or equal to {0}."),
                min: $.format("Enter value greater than or equal to {0}."),
                lettersonly: $.format("Please enter only letters."),
                minbudget: $.format("The budget value should be less than or equal to the maximum one."),
                maxbudget: $.format("The budget value should be greater than or equal to the minimum one."),
                sc: $.format("Please enter a correct code.")
            });
  }

    if ($.fn.wysihtml5) {
        $.fn.wysihtml5.locale.en = $.fn.wysihtml5.locale['en-US'] = {
            font_styles: {
                normal: 'Normal text',
                h1: 'Heading 1',
                h2: 'Heading 2',
                h3: 'Heading 3',
                h4: 'Heading 4',
                h5: 'Heading 5',
                h6: 'Heading 6'
            },
            emphasis: {
                bold: 'B',
                italic: 'I',
                underline: 'U',
                small: 's'
            },
            lists: {
                unordered: 'Unordered list',
                ordered: 'Ordered list',
                outdent: 'Outdent',
                indent: 'Indent'
            },
            link: {
                insert: 'Insert link',
                cancel: 'Cancel',
                target: 'Open link in new window'
            },
            image: {
                insert: 'Insert image',
                cancel: 'Cancel'
            },
            html: {
                edit: 'Edit HTML'
            },
            colours: {
                black: 'Black',
                silver: 'Silver',
                gray: 'Grey',
                maroon: 'Maroon',
                red: 'Red',
                purple: 'Purple',
                green: 'Green',
                olive: 'Olive',
                navy: 'Navy',
                blue: 'Blue',
                orange: 'Orange'
            }
        };
    }

    if ($.fn.select2) {
        $.extend($.fn.select2.defaults, {
            formatNoMatches: function () {
                return "No matches found";
            },
            formatInputTooShort: function (input, min) {
                var n = min - input.length;
                return "Please enter " + n + " more character" + (n === 1 ? "" : "s");
            },
            formatInputTooLong: function (input, max) {
                var n = input.length - max;
                return "Please delete " + n + " character" + (n === 1 ? "" : "s");
            },
            formatSelectionTooBig: function (limit) {
                return "You can only select " + limit + " item" + (limit === 1 ? "" : "s");
            },
            formatLoadMore: function (pageNumber) {
                return "Loading more results...";
            },
            formatSearching: function () {
                return "Searching...";
            }
        });
    }

    if ($.fn.datetimepicker && $.fn.datetimepicker.dates) {
        $.fn.datetimepicker.dates['en'] = {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            meridiem: ["am", "pm"],
            suffix: ["st", "nd", "rd", "th"],
            today: "Today",
            format: "yyyy-mm-dd hh:ii"
        };
    }

    if ($.fn.datepicker && $.fn.datepicker.dates) {
        $.fn.datepicker.dates['en'] = {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Today"
        };
    }

}(jQuery));

var dt_language = {
    "sEmptyTable": "No data available in table",
    "sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
    "sInfoEmpty": "Showing 0 to 0 of 0 entries",
    "sInfoFiltered": "(filtered from _MAX_ total entries)",
    "sInfoPostFix": "",
    "sInfoThousands": ",",
    "sLengthMenu": "Show _MENU_ entries",
    "sLoadingRecords": "Loading...",
    "sProcessing": "Processing...",
    "sSearch": "Search:",
    "sZeroRecords": "No matching records found",
    "oPaginate": {
        "sFirst": "First",
        "sLast": "Last",
        "sNext": "Next",
        "sPrevious": "Previous"
    },
    "oAria": {
        "sSortAscending": ": activate to sort column ascending",
        "sSortDescending": ": activate to sort column descending"
    }
};

if (window.moment) {
    var drp_range = {
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    };
}

var audioplayer_values = {
    'play': 'Play',
    'pause': 'Pause',
    'volume': 'Volume'
};