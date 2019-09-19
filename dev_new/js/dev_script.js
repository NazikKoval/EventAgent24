function print_some_class() {
  $("body").append('<div class="for_print"></div>'), $(".for_print").html($("body>.modal .modal-body").html()), window.print(), $(".for_print").remove()
}

function yii_delete_error(a) {
  $(a).parents(".has-error").removeClass("has-error")
}
function hide_depends_from_title() {
  3 == $(".title_select_from select").val() ? ($(".company_input_input").show(), $(".vat_input_input").show()) : ($(".company_input_input").hide(), $(".vat_input_input").hide()), 3 == $("#artist-title_id1").val() ? ($(".field-artist-company1").parent().parent().parent().show(), $(".field-artist-vat_number1").parent().parent().parent().show()) : ($(".field-artist-company1").parent().parent().parent().hide(), $(".field-artist-vat_number1").parent().parent().parent().hide())
}
function add_archive() {
    $(".event_check_all").click(function () {
        var a = "";
        $.each($("." + $(this).attr("for_archive") + " .add_to_archive:checked"), function (b, c) {
            a = a + $(c).val() + ","
        }), "" != a && ($(".ids_archived").val(a), $(".archive_add").submit());

        var a = "";
        $.each($("." + $(this).attr("for_unarchive") + " .back_from_archive:checked"), function (b, c) {
            a = a + $(c).val() + ","
        }), "" != a && ($(".ids_unarchived").val(a), $(".archive_back").submit())
    })
}
function addMyEventToAjax() {
  $(".zip_autocomplete").unbind(), $(".zip_autocomplete").keyup(function () {
    zip_autocomplete()
  }), $("select.country_id_autocomplete").change(function () {
    zip_autocomplete()
  })
}
function event_date_input() {
  var a = $(".event_date_input").val(), b = $(".event_date2_input").val();
  $.ajax({
    url: "/" + lang_url + "/other-ax/date-event",
    data: "date=" + a + "&cur_date=" + b,
    type: "POST",
    success: function (a, b, c) {
      "small_date" == a ? $(".event_date_input").parents(".form-group").addClass("has-error").find(".help-block-error").text(c.getResponseHeader("text_error")) : ($(".event_date2_input").parents(".form_start").removeClass("has-error").find(".help-block-error").text(""), $(".event_date_input").parents(".form-group").removeClass("has-error").find(".help-block-error").text(""), $(".event_date2_input").val(a))
    }
  })
}
function zip_autocomplete() {
  var a = $(".zip_autocomplete").val(), b = $("select.country_id_autocomplete").val(), c = $("select.region_id_autocomplete").val();
  a.length >= 4 && $.ajax({
    url: "/" + lang_url + "/other-ax/zip-autocomplete",
    data: "val=" + a + "&county_id=" + b + "&region_id=" + c,
    type: "POST",
    success: function (a, b, c) {
      var d = c.getResponseHeader("region_id"), e = c.getResponseHeader("error");
      "error" == e || (0 != d && $("select.region_id_autocomplete").selectpicker("val", d),(a.length>0 && $(".city_autocomplete").val(a)))
    }
  })
}
function printDiv(a) {
  window.frames.print_frame.document.body.innerHTML = printDivCSS + document.getElementById(a).innerHTML, window.frames.print_frame.window.focus(), window.frames.print_frame.window.print()
}
function printout() {
  var a = window.open();
  a.document.write(document.getElementById("print1").innerHTML), a.print()
}
$(document).ready(function () {
  hide_depends_from_title();
  $("#organizer-title_id").change(function () {
    hide_depends_from_title();
  });
  $(".title_select_from select").change(function () {
    hide_depends_from_title();
  });
  $(function () {
    var a = location.pathname;
    $(".add_active a").each(function () {
      $(this).removeClass("active"), $(this).attr("href") == a && ($(this).parents(".dropdown-menu").length ? $(this).parents(".dropdown-menu").parent().addClass("active") : ($(this).parent().addClass("active"), $(this).addClass("active")))
    });
  });
  $(".event_date_input").change(function () {
    event_date_input();
  });
  addMyEventToAjax();
}), printDivCSS = new String('<link href="myprintstyle.css" rel="stylesheet" type="text/css">');

