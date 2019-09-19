jQuery.uaMatch = function (ua) {
  ua = ua.toLowerCase();
  var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
  return {browser: match[1] || "", version: match[2] || "0"};
};
if (!jQuery.browser) {
  var
          matched = jQuery.uaMatch(navigator.userAgent), browser = {};
  if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version;
  }
  if (browser.chrome) {
    browser.webkit = true;
  } else if (browser.webkit) {
    browser.safari = true;
  }
  jQuery.browser = browser;
}
;
function hidePopover(el) {
  $(el).parents(".popover").popover("hide");
}
function days_between(date1, date2) {
  var ONE_DAY = 1000 * 60 * 60 * 24;
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();
  var difference_ms = Math.abs(date1_ms - date2_ms)
  return Math.round(difference_ms / ONE_DAY)
}
function contentInit() {

  $("input:checkbox, input:radio").each(function () {
    var t = $(this);
    if (!t.hasClass("inited") && t.parents(".radio-switcher").length == 0 && t.parents(".balance-steps").length == 0) {
      if (t.is(":visible") || t.parents(".status").length > 0) {
        t.iCheck("destroy");
        t.iCheck();
        t.on("ifClicked", function () {
          if (t.attr("onchange")) {
            var f = new Function(t.attr("onchange"));
            f();
          }
        });
        t.addClass("inited");
      }
    }
  });

  $('.calendar-info').each(function () {
    var t = $(this).find(".cal"), title = t.attr("data-calendar-title"),
            description = t.attr("data-calendar-description"), location = t.attr("data-calendar-location"),
            startDate = t.attr("data-calendar-start-date"), endDate = t.attr("data-calendar-end-date");
    if (t.length > 0) {
      var sd = (startDate && startDate.length > 0) ? new Date(startDate) : new Date(Date.now()),
              ed = (endDate && endDate.length > 0) ? new Date(endDate) : new Date(Date.now());
      t.icalendar({
        sites: ["google"],
        start: sd,
        end: ed,
        title: (title) ? title : "",
        description: (description) ? description : "",
        location: (location) ? location : ""
      });
    }
  });
  $('.self_submit').each(function () {
    var t = $(this);
    if (!t.hasClass("inited")) {
      t.on("change", function () {
        t.parents("form").trigger("submit");
      });
      if (t.is(":checkbox") || t.is(":radio")) {
        t.on('ifChanged', function () {
          t.parents("form").trigger("submit");
        })
      }
      t.addClass("inited")
    }
  });
  $('textarea.editor').each(function () {
    var t = $(this);
    if (!t.parents().hasClass('modal-body')) {
      if (!t.hasClass("inited")) {
        t.wysihtml5({
          locale: arr_messages[1],
          "html": false,
          "link": false,
          "lists": true,
          "image": false,
          "stylesheets": []
        });
        t.addClass("inited")
      }
    }
  });
  $('[rel=popover]').each(function () {
    var t = $(this);
    if (!t.hasClass("inited")) {
      t.addClass("inited")
    }
  });
  $('input[type=file]').each(function () {
    var t = $(this), cont = t.parents(".files-container"), listCont = cont.find(".files"),
            list = listCont.find(".loaded-files");
    if (!t.hasClass("initedF")) {
      t.addClass("initedF");
      t.fileinput('destroy');
      t.fileinput({
        uploadUrl: t.attr("data-upload-url"),
        showPreview: false,
        showUpload: false,
        showCancel: false,
        showRemove: false,
        uploadAsync: true,
        elErrorContainer: t.parents('.file-cont').find('.help-block'),
        uploadExtraData: function () {
          var extraData = {};
          list = listCont.find(".loaded-files");
          if (list.length > 0) {
            list.each(function () {
              var inp = $(this).find("input");
              inp.each(function () {
                extraData[$(this).attr("name")] = $(this).val();
              });
            });
          }
          return extraData;
        }
      }).on("filebatchselected", function () {
        t.fileinput("upload");
      }).on('fileuploaded', function (event, data) {
        if (data["response"]["file"]) {
          var el = $(data["response"]["file"]);
          listCont.empty();
          listCont.append(el);
          contentInit();
          cont.find(".kv-upload-progress").addClass("hide");
        }
      }).on('filebatchuploadsuccess', function (event, data) {
        if (data["file"]) {
          var el = $(data["file"]);
          listCont.empty();
          listCont.append(el);
          contentInit();
        }
      });
    }
  });
  $('[data-toggle="tooltip"], [rel=tooltip]').each(function () {
    $(this).tooltip({container: 'body'});
  });

  $('.anchor-link').each(function () {
    var t = $(this), href = t.attr("href");
    t.on("click", function (e) {
      e.preventDefault();
      $('html, body').stop().animate({scrollTop: (t.hasClass("anchor-top")) ? 0 : $(href).offset().top}, 500);
    });
  });
  $('.check-all').each(function () {
    var t = $(this), arch = t.parent().parent().find(".event_check_all"), inp = t.attr("data-check-name");
    var inp_group = $("input[name='" + inp + "']");
    arch.hide();
    function checkIt() {
      var ch;
      if (t.is(":checked")) {
        ch = true;
        arch.show();
      } else {
        ch = false;
        arch.hide();
      }
      inp_group.each(function () {
        (ch) ? $(this).iCheck('check') : $(this).iCheck('uncheck');
      });
    }

    inp_group.each(function () {
      $(this).on("ifChanged", function () {
        if (inp_group.length == $("input[name='" + inp + "']:checked").length) {
          t.iCheck("check");
        }
        if ($("input[name='" + inp + "']:checked").length > 0) {
          arch.show();
        } else {
          arch.hide();
          t.iCheck("uncheck");
        }
      });
    });
    checkIt();
    t.on("ifChanged", function () {
      checkIt();
    });
  });
  $(".date-range-cont").each(function () {
    var t = $(this), inp = t.find('.daterange'), format = "DD.MM.YYYY", startDate = inp.attr('data-start-date'),
            endDate = inp.attr('data-end-date'), to = t.find('.to'), from = t.find('.from');
    if (!t.hasClass("inited")) {
      inp.daterangepicker({
        format: format,
        autoUpdateInput: false,
        ranges: drp_range,
        locale: {
          format: format,
          applyLabel: arr_messages[7],
          cancelLabel: arr_messages[8],
          fromLabel: arr_messages[9],
          toLabel: arr_messages[10],
          customRangeLabel: arr_messages[11]
        },
        startDate: startDate,
        endDate: endDate,
        showDropdowns: true,
        timePicker: false,
        buttonClasses: ['btn btn-sm'],
        applyClass: 'btn-dark',
        cancelClass: 'btn-default',
        opens: (inp.hasClass('opens-right')) ? 'right' : 'left'
      });
      var fromV = startDate.split("."), toV = endDate.split("."),
              _from = new Date(fromV[2], fromV[1] - 1, fromV[0]), _to = new Date(toV[2], toV[1] - 1, toV[0]);
      inp.val(moment(_from).format(format) + ' - ' + moment(_to).format(format));
      inp.on('apply.daterangepicker', function (ev, picker) {
        inp.val(picker.startDate.format(format) + ' - ' + picker.endDate.format(format));
        from.val(picker.startDate.format(format));
        to.val(picker.endDate.format(format));
        if (t.parents('form').length > 0) {
          t.parents('form').submit();
        }
      });
      t.addClass("inited");
    }
  });
  $('[data-toggle="popover"]').each(function () {
    var t = $(this);
    t.popover({
      container: 'body',
      html: true,
      template: '<div class="popover search-tip"><div class="arrow"></div><div class="popover-inner"><div class="popover-title search-tip"></div><div class="popover-content description"><p></p></div><span class="fa fa-times-circle fa-lg pointer close" onclick="hidePopover(this)"></span></div></div>'
    });
  });

  function validateVoucher(value) {
    var re = /^.{3}\-?.{4}\-?.{4}$/;
    return re.test(value);
  }

  $('[data-form-target]').each(function () {
    var t = $(this), er = t.find('.help-block-error'), inp = t.find("input"), sub = t.find("button"), target = $("." + t.attr("data-form-target")), inp2 = target.find(".hidden_voucher_code");
    inp.off("keyup");
    inp.on("keyup", function () {
      inp2.val($(this).val());
    });
    sub.off("click");
    sub.on("click", function (e) {
      e.preventDefault();
      t.removeClass('has-error');
      er.text("");
      var v = inp.val();
      if (v == "") {
        if (inp.attr('data-empty-message'))
          er.text(inp.attr('data-empty-message'));
        t.addClass('has-error');
        return;
      } else if (!validateVoucher(v)) {
        if (inp.attr('data-wrong-message'))
          er.text(inp.attr('data-wrong-message'));
        t.addClass('has-error');
        return;
      }
      target.trigger("submit");
    })
  });
  $('.balance-form').off('submit');
  $('.balance-form').on('submit', function () {
    if ($('.voucher-code-input').val().length > 0) {
      $('.voucher-submit-form .with_payment').val(1);
      $('.voucher-submit-form').submit();
      return false;
    } else {
      $('.voucher-submit-form .with_payment').val(0);
    }
    return true;
  });
  $('[data-toggle="toggle"]').each(function () {
    var toggleCont = $(this).parents('[data-toggle-cont]').first(),
            toggleParent = $(this).parents('[data-toggle-parent]'),
            toggleTargets = toggleCont.find('[data-toggle-target]');
    $(this).on("click", function (e) {
      e.preventDefault();
      if (toggleParent.length > 0) {
        toggleParent.find('[data-toggle-target]').stop().slideUp("slow");
      }
      toggleTargets.stop().slideToggle("slow");
    });
    if (toggleParent.length > 0) {
      $(toggleParent.find('[data-toggle-target]')[0]).stop().show();
    }
  });
  $('.header [data-toggle="dropdown"]').each(function () {
    $(this).dropdown();
  });
  function stringToBoolean(string) {
    if (string && typeof string == "string") {
      switch (string.toLowerCase().trim()) {
        case"true":
        case"yes":
        case"1":
          return true;
        case"false":
        case"no":
        case"0":
        case null:
          return false;
        default:
          return Boolean(string);
      }
    }
  }

  $('[data-show]').each(function () {
    var t = $(this), target = t.attr("data-show"), shown = stringToBoolean(t.attr("aria-expanded")),
            els = $("[data-show-additional=" + target + "]");
    var toggled = shown;
    if (toggled == "true") {
      els.each(function () {
        $(this).show()
      });
    } else {
      els.each(function () {
        $(this).hide()
      });
    }
    t.off("click");
    t.on("click", function (e) {
      e.preventDefault();
      toggled = !toggled;
      t.attr("aria-expanded", toggled);
      els.each(function () {
        if ($(this).is(":visible")) {
          $(this).hide();
        } else {
          $(this).show();
        }
      });
    });
  });
  $(".active-rating").each(function () {
    var t = $(this), stars = t.find(".star"), inp = t.find("input[type=hidden]"),
            count = t.find(".star-count > span");
    stars.each(function (i) {
      var _t = $(this), val = parseFloat(_t.attr("data-value"));
      count.html(inp.val());
      if (inp.val() >= val)
        _t.addClass("star_full").removeClass("star_none");
      _t.on("click", function () {
        count.html(val);
        inp.val(val);
        if (inp.attr("onchange")) {
          var tmpFunc = new Function(inp.attr("onchange"));
          tmpFunc();
        }
      });
      _t.on("mouseover", function () {
        stars.each(function (j) {
          if (j <= i)
            $(this).removeClass("star_none").addClass("star_full");
        });
      }).on("mouseout", function () {
        stars.each(function () {
          if (parseFloat($(this).attr("data-value")) > inp.val())
            $(this).removeClass("star_full").addClass("star_none");
        });
      });
    });
  });
  $(".default-rating").each(function () {
    var t = $(this), stars = t.find(".star"), count = parseFloat(t.find(".star-count > span").html());
    stars.each(function (i) {
      var _t = $(this), val = parseFloat(_t.attr("data-value"));
      if (val <= count) {
        _t.addClass("star_full").removeClass("star_none");
      } else if (val <= count + 0.5)
        _t.addClass("star_half").removeClass("star_none");
    });
  });
  $('[data-val="select"]').each(function () {
    var t = $(this), target = $("#" + t.attr("data-select")), inp = target.find(":input");
    if (!t.hasClass("inited")) {
      if (t.hasClass("inp-checked"))
        inp.attr("checked", "checked");
      t.on("click", function (e) {
        e.preventDefault();
        if (t.hasClass("inp-checked")) {
          inp.iCheck('uncheck');
          t.toggleClass("inp-checked inp-unchecked");
        } else {
          inp.iCheck('check');
          t.toggleClass("inp-unchecked inp-checked");
        }
      });
      t.addClass("inited");
    }
  });
  if ($(".datepicker.reply").length > 0) {
    var the_form = $(".datepicker.reply").parents('form');
    App.controlReplyDate(".datepicker.reply", the_form);
  }
  if ($(".datepicker.start").length > 0) {
    var the_form = $(".datepicker.start").parents('form');
    App.controlStartDate(".datepicker.start", the_form);
  }
  if ($("div.timepicker > input").length > 0) {
    App.controlTime("div.timepicker > input");
  }
  if ($(".dtpicker").length > 0) {
    App.controlDateTime(".dtpicker");
  }
  add_archive();
  addMyEventToAjax();
}
function fixFooterToBottom() {
  var f = $(".footer"), h = f.height() + parseFloat(f.css("padding-top")) + parseFloat(f.css("padding-bottom"));
  $("body").css("padding-bottom", h);
}
;

$(document).ready(function () {
  fixFooterToBottom();
  contentInit();
  $('audio').each(function () {
    var t = $(this);
    if (!t.hasClass("inited") && t.parents('.audioplayer').length == 0) {
      t.audioPlayer({
        strPlay: (audioplayer_values['play']) ? audioplayer_values['play'] : 'Play',
        strPause: (audioplayer_values['play']) ? audioplayer_values['pause'] : 'Pause',
        strVolume: (audioplayer_values['play']) ? audioplayer_values['volume'] : 'Volume',
      });
      t.addClass("inited");
    }
  });
  if (window.location.hash == "#comments-block") {
    setTimeout(function () {
      $("#comments-block").find(".btn[data-toggle]").trigger("click");
    }, 500);
  }
  $(".iconEvent i").each(function() {
    var icon = $(this);
    icon.on('click', function() {
      var th = $(this);
      if (th.hasClass('icon_down')) {
        th.addClass('hidden');
        $('.icon_up').removeClass('hidden');
	       $('.block-events .div-table').not('.show-two').fadeIn({
	           duration: 400,
	           start: function() {
	             if ($(document).width() > 767) {
		             if ($(this).css('display') === 'block') {
			             $(this).css('display', 'table');
		             }
                 }
	           }
	       });
      } else {
        th.addClass('hidden');
        $('.icon_down').removeClass('hidden');
	      $('.block-events .div-table').not('.show-two').fadeOut(400);
      }
    });
  });
  $('.go-to-register').on('click', function() {
    var self = $(this);
    setTimeout(function() {
	    var id  = $(self).attr('href'),
		    top = $(id).offset().top;
	    $('body,html').animate({scrollTop: top}, 1000);
    }, 500)
  })
});
$(window).resize(function () {
  fixFooterToBottom();
});
$(window).scroll(function () {
    var scT = $('a.go-top'),
        hideIfFotter = $('a.arrow-down-ico');
    if (scT.length > 0) {
        if ($(this).scrollTop() > 300) {
            scT.stop().fadeIn();
        } else {
            scT.stop().fadeOut();
        }
    }
    if (hideIfFotter.length > 0) {
        if ($(this).scrollTop() > 100) {
            hideIfFotter.stop().fadeOut();
        } else {
            hideIfFotter.stop().fadeIn();
        }
    }
});
if ($.delegate) {
  $(document).delegate('*[data-toggle="lightbox"]', 'click', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox();
  });
}

/*lazy load youtube*/
( function() {

    var youtube = document.querySelectorAll( ".youtube" );

    for (var i = 0; i < youtube.length; i++) {

        var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/sddefault.jpg";

        var image = new Image();
        image.src = source;
        image.addEventListener( "load", function() {
            youtube[ i ].appendChild( image );
        }( i ) );

        youtube[i].addEventListener( "click", function() {

            var iframe = document.createElement( "iframe" );

            iframe.setAttribute( "frameborder", "0" );
            iframe.setAttribute( "allowfullscreen", "" );
            iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1" );

            this.innerHTML = "";
            this.appendChild( iframe );
        } );
    };

} )();