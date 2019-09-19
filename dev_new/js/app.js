App = function()
{
    return {
        scrollDown: function(elem, value)
        {
            if ($('#' + elem).length > 0)
            {
                // calculate destination place
                var dest = 0;
                var offset = ((typeof value !== "undefined") ? value : 0)
                if ($('#' + elem).offset().top > $(document).height() - $(window).height())
                {
                    dest = ($(document).height() - $(window).height()) - offset;
                }
                else
                {
                    dest = $('#' + elem).offset().top - offset;
                }
                // go to destination
                $('html,body').animate({scrollTop: dest}, 1000, 'swing');
            }
        },
        scrollUp: function()
        {
            var dest = 0;
            // go to destination
            $('html,body').animate({scrollTop: dest}, 1000, 'swing');
        },
        allowNumbers: function(elem)
        {
            $('#' + elem).keydown(function(e)
            {
                // Allow: backspace, delete, tab, escape and enter
                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
                        // Allow: Ctrl+A
                    (e.keyCode == 65 && e.ctrlKey === true) ||
                        // Allow: home, end, left, right
                    (e.keyCode >= 35 && e.keyCode <= 39))
                {
                    // let it happen, don't do anything
                    return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
                {
                    e.preventDefault();
                }
            });
        },
        load: function(act, cntnr, uid, type, lid, eid, id, sh, loader, scroll, append)
        {
            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=' + act + '&u=' + uid + '&t=' + type + '&l=' + lid + '&e=' + eid + '&id=' + id + '&sh=' + sh,
                    async: true,
                    beforeSend: function()
                    {
                        if (loader == 1)
                        {
                            $('#' + cntnr).html('<div align="center"><img src="images/ajax-loader.gif" /></div>').show();
                        }
                        else if (loader == 2)
                        {
                            $('#' + cntnr).block({message: '<strong>' + arr_messages[0] + '</strong>', css: {border: '0px none', color: '#FFF', backgroundColor: 'transparent'}});
                        }
                    },
                    success: function(data)
                    {

                        if (append == 1)
                        {
                            $('#' + cntnr).append(data);
                        }
                        else
                        {
                            $('#' + cntnr).html(data);
                        }
                    },
                    error: function(data, textStatus)
                    {
                        if (append == 1)
                        {
                            $('#' + cntnr).append('Error: ' + textStatus);
                        }
                        else
                        {
                            $('#' + cntnr).html('Error: ' + textStatus);
                        }
                    },
                    complete: function(data)
                    {
                        if (loader == 2)
                        {
                            $('#' + cntnr).unblock();
                        }
                        if (scroll == 1)
                        {
                            App.scrollDown(cntnr);
                        }
                        if (append == 1)
                        {
                            if (scroll == 2)
                            {
                                $('#' + cntnr + '_btn').html('').remove();
                            }
                            if ($('input[maxlength].counter.ajax').length > 0)
                            {
                                App.controlMaxlength('input[maxlength].counter.ajax');
                                $('input[maxlength].counter.ajax').removeClass('ajax');
                            }
                            if ($('textarea[maxlength].counter.ajax').length > 0)
                            {
                                App.controlMaxlength('textarea[maxlength].counter.ajax');
                                $('textarea[maxlength].counter.ajax').removeClass('ajax');
                            }
                            if ($('.meplayer.ajax').length > 0)
                            {
                                $('.meplayer.ajax').each(function()
                                {
                                    var id = $(this).prop('id');
                                    App.controlPlayer('#' + id);
                                });
                                $('.meplayer.ajax').removeClass('ajax');
                            }
                            if ($('.selectpicker.ajax').length > 0)
                            {
                                $('.selectpicker.ajax').selectpicker();
                                $('.selectpicker.ajax').removeClass('ajax');
                            }
                            if ($('.btn-toggle.ajax').length > 0)
                            {
                                App.controlSwitch('.btn-toggle.ajax');
                                $('.btn-toggle.ajax').removeClass('ajax');
                            }
                        }
                        else if (append == 2)
                        {
                            if ($('.selectpicker').length > 0)
                            {
                                $('.selectpicker').selectpicker();
                            }
                        }
                        else if (append == 3)
                        {
                            if ($('#evnt_att').length > 0)
                            {
                                App.uploadFile('#evnt_att');
                            }
                        }
                    }
                });
        },
        addElement: function(act, cntnr, uid, type, lid, id, mx)
        {
            var count = $("input.web_" + cntnr).length;
            var index = count;
            if ($('input.web_' + cntnr).parents('div.element-row').length > 0)
            {
                var name = $('input.web_' + cntnr).parents('div.element-row').prop('id');
                index = parseInt(name.replace('div_' + cntnr.replace('s', '') + '_', ''));
            }
            index++;
            var rem = ((parseInt(index) == parseInt(mx)) ? 2 : 1);
            //function(act,cntnr,uid,type,lid,eid,id,sh,loader,scroll,append)

            App.load(act, 'div_' + cntnr, uid, type, lid, 0, id, index, 0, 2, rem, 1);
        },
        uploadElement: function(selector)
        {
            $(selector).change(function()
            {
                var formData = new FormData();
                var total = this.files.length;
                var name = selector.replace('#', '');
                var uid = $('#uid').val();
                var lid = $('#lid').val();
                var wid = $('#wid').val();
                var mx = $('#mxe').val();

                formData.append(name, this.files[0]);
                formData.append('l', lid);
                if ($('#uid').length > 0)
                {
                    formData.append('u', uid);
                    formData.append('w', wid);
                    formData.append('t', '4');
                }

                $("#progress").loadTemplate($('#fileUploadProgressTemplate'));
                $("#fileUploadError").addClass("hide");

                $.ajax(
                    {
                        url: 'ajax_upload.php',
                        type: 'POST',
                        xhr: function()
                        {
                            var xhr = $.ajaxSettings.xhr();
                            if (xhr.upload)
                            {
                                xhr.upload.addEventListener('progress', function(evt)
                                {
                                    var percent = ((evt.loaded / evt.total) * 100).toFixed(2);
                                    $("#progress").find(".progress-bar").width(percent + "%").text(percent + "%");
                                }, false);
                            }
                            return xhr;
                        },
                        success: function(data)
                        {
                            //console.log(data);
                            $("#progress").loadTemplate($('#fileUploadDoneTemplate'));
                            if (data['error'] == '')
                            {
                                App.addElement(15, data['string'], uid, data['type'], lid, data['id'], mx);
                                /*							if($('#files .list-group-item').length>=5)
                                 {
                                 $('#files_upload').html('');
                                 }*/
                            } else {
                                $("#fileUploadError").removeClass("hide").html(data['error']);
                            }
                        },
                        error: function()
                        {
                            $("#fileUploadError").removeClass("hide").text("An error occured!");
                        },
                        data: formData,
                        dataType: 'json',
                        cache: false,
                        contentType: false,
                        processData: false
                    });
            });
        },
        removeElement: function(act, cntnr, uid, type, lid, n, id)
        {
            var e = 6;

            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=100&t=' + type + '&l=' + lid + '&e=' + e + '&id=' + id,
                    dataType: 'json',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        var buttons = {
                            cancel: {
                                label: data['buttons']['cancel'],
                                className: "btn-default col-xs-3 col-xs-offset-3",
                                callback: function()
                                {
                                }
                            },
                            ok: {
                                label: data['buttons']['ok'],
                                className: "btn-primary col-xs-3",
                                callback: function()
                                {
                                    App.load(act, 'div_' + cntnr + '_' + n, uid, type, lid, id, n, 1, 2, 0, 0);
                                }
                            }
                        }
                        bootbox.dialog(
                            {
                                message: data['content'],
                                title: data['title'],
                                buttons: buttons
                            });
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        checkZipCode: function()
        {
            var isvailed = true;
            var user_id = 0;
            var lang = 2;
            $.validator.addMethod('isvailedzip', function(value, element) {
                var country = 0;
                if ($('#evnt_country').length) {
                    country = $('#evnt_country').val();
                }
                if ($('#art_reg_country').length) {
                    country = $('#art_reg_country').val();
                }
                if ($('#usr_country').length) {
                    country = $('#usr_country').val();
                }
                $.ajax({
                    url: 'ajax_data.php',
                    type: 'POST',
                    dataType: 'json',
                    data: 'act=101&zip=' + value + "&country=" + country
                })
                    .done(function(res) {
                        console.log(res);
                        if (res.isvailed === 1) {
                            isvailed = true;
                            $('#evnt_town').val(res.town);
                            $('#art_reg_town').val(res.town);
                            $('#usr_town').val(res.town);
                            $.ajax(
                                {
                                    type: 'POST',
                                    url: 'ajax_data.php',
                                    data: 'act=108&u=&t=3 &l=&e=' + value + '&id=' + $('#art_reg_country').val(),
                                    async: true,
                                    success: function(data)
                                    {
                                        var arr = $.parseJSON(data);
                                        $.ajax(
                                            {
                                                type: 'POST',
                                                url: 'ajax_data.php',
                                                data: 'act=108&u=&t=3 &l=&e=' + value + '&id=' + country,
                                                async: true,
                                                success: function(data)
                                                {

                                                    var arr = $.parseJSON(data);
                                                    id = arr['region_id'];
                                                    $.ajax(
                                                        {
                                                            type: 'POST',
                                                            url: 'ajax_data.php',
                                                            data: 'act=9&u=&t=3&country=' + country + '&multiple=&l=&e=' + country + '&id=' + id + '&sh=evnt_region',
                                                            async: true,
                                                            success: function(res)
                                                            {
                                                                $('#art_reg_region').parent().html(res);
                                                                $('#evnt_region').selectpicker();
                                                            },
                                                        }
                                                    );

                                                },
                                            });
                                    },
                                });
                            /*if($('#div_region').length){
                             App.load(9,'div_region',''+user_id+'','4',''+lang+'',country,''+res.region+'','1',0,0,0);
                             }*/
                        } else {
                            $('#evnt_town').val("");
                            $('#art_reg_town').val("");
                            isvailed = false;
                        }
                    })
                    .fail(function() {
                        console.log("error");
                    });
                return isvailed;
            }, arr_messages[15]);
        },
        ShowCategorySubElemnts: function(category)
        {

            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=107&category=' + category,
                    async: true,
                    beforeSend: function()
                    {

                    },
                    success: function(data)
                    {
                        //alert(data);
                        $('#sub_category_elements').html(data);
                    },
                    error: function(data, textStatus)
                    {
                        //alert(textStatus);
                    }
                });
        },
        cropImage: function() {
            var croped_image_x = parseInt($('#croped_image_x').val());
            var croped_image_y = parseInt($('#croped_image_y').val());
            var croped_image_w = parseInt($('#croped_image_w').val());
            var croped_image_h = parseInt($('#croped_image_h').val());
            if (croped_image_w === 0 || croped_image_h === 0) {
                return false;
            }
            $.ajax({
                url: 'ajax_data.php',
                type: 'POST',
                dataType: 'json',
                data: 'act=102&croped_image_x=' + croped_image_x + '&croped_image_y=' + croped_image_y + '&croped_image_w=' + croped_image_w + '&croped_image_h=' + croped_image_h,
            })
                .done(function(res) {
                    console.log("success");
                    if (res === 1) {
                        window.location.reload();
                    }
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
        },
        Budget_Offer_Acepet_Deny: function(act, args, is_acc) {
            var butget_array = JSON.stringify(args);

            $.ajax({
                url: 'ajax_data.php',
                type: 'POST',
                dataType: 'json',
                data: 'act=' + act + '&butget_array=' + butget_array + '&t=' + is_acc,
            })
                .done(function(res) {
                    console.log("success");
                    window.location.reload(res);
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });

        },
        validateForm: function(type)
        {
            switch (type)
            {
                case 1: // Login
                    var rules_params = {
                        lgn_name: {
                            email: true,
                            required: true
                        },
                        lgn_pass: {
                            minlength: 6,
                            required: true
                        },
                        lgn_sc: {
                            minlength: 1,
                            maxlength: 3,
                            sc: true,
                            required: true
                        }
                    };
                    break;
                case 2: // Register
                    var rules_params = {
                        reg_email: {
                            email: true,
                            required: true
                        },
                        reg_pass: {
                            minlength: 6,
                            required: true
                        },
                        reg_again: {
                            minlength: 6,
                            required: true,
                            equalTo: '#reg_pass'
                        },
                        reg_name: {
                            minlength: 5,
                            maxlength: 50,
                            required: true
                        },
                        reg_terms: {
                            required: true
                        },
                        reg_sc: {
                            minlength: 1,
                            maxlength: 3,
                            sc: true,
                            required: true
                        }
                    };
                    break;
                case 3: // Forgot
                    var rules_params = {
                        fgt_email: {
                            email: true,
                            required: true
                        },
                        fgt_sc: {
                            minlength: 1,
                            maxlength: 3,
                            sc: true,
                            required: true
                        }
                    };
                    break;
                case 4: // Profile
                    var rules_params = {
                        usr_name: {
                            lettersonly: true
                        },
                        usr_oldpass: {
                            required: true,
                            minlength: 6
                        },
                        usr_newpass: {
                            required: true,
                            minlength: 6
                        },
                        usr_passagain: {
                            required: true,
                            minlength: 6,
                            equalTo: '#usr_newpass'
                        },
                        /*						usr_phone: {
                         required: true,
                         digits: true,
                         minlength: 9
                         },*/
                        usr_phone: {
                            minlength: function(element)
                            {
                                var selector = $(element).prop('id') + '_code';
                                var arr_tmp = $('#' + selector).val().split('_');
                                var value = arr_tmp[0];
                                if (value == 'ch')
                                {
                                    return 8;
                                }
                                else if (value == 'bg')
                                {
                                    return 9;
                                }
                                else
                                {
                                    return 11;
                                }
                            },
                            maxlength: function(element)
                            {
                                var selector = $(element).prop('id') + '_code';
                                var arr_tmp = $('#' + selector).val().split('_');
                                var value = arr_tmp[0];
                                if (value == 'ch')
                                {
                                    return 8;
                                }
                                else if (value == 'bg')
                                {
                                    return 10;
                                }
                                else
                                {
                                    return 12;
                                }
                            },
                            required: function(element)
                            {
                                var value = $('#usr_phone_type').val();
                                if (parseInt(value) == 1)
                                {
                                    return true;
                                }
                                return false;
                            }
                        },
                        usr_phone2: {
                            minlength: 4,
                            maxlength: 14,
                            required: function(element)
                            {
                                var value = $('#usr_phone_type').val();
                                if (parseInt(value) == 2)
                                {
                                    return true;
                                }
                                return false;
                            }
                        },
                        usr_fax: {
                            digits: true,
                            minlength: 6
                        }
                    };
                    break;
                case 5: // Settings
                    var rules_params = {
                        art_name: {
                            required: true
                        },
                        art_descr: {
                            minWords: 5,
                            required: true
                        },
                        art_categories: {
                            required: true
                        },
                        art_fb_link: {
                            url: true,
                            facebook: true
                        },
                        art_tw_link: {
                            url: true,
                            twitter: true
                        },
                        art_gp_link: {
                            url: true,
                            gplus: true
                        },
                        art_li_link: {
                            url: true,
                            linkedin: true
                        },
                        art_ms_link: {
                            url: true,
                            myspace: true
                        },
                        art_pp_email: {
                            email: true
                        },
                        art_contact_name: {
                            required: true,
                            lettersonly: true
                        },
                        art_contact_email: {
                            required: true,
                            email: true
                        },
                        art_phone: {
                            digits: true,
                            minlength: 9
                        },
                        art_fax: {
                            digits: true,
                            minlength: 6
                        },
                        art_town: {
                            required: true,
                            lettersonly: true
                        },
                        art_zip_code: {
                            digits: true,
                            minlength: 4,
                            maxlength: 5
                        },
                        art_address1: {
                            required: true
                        }
                    };
                    break;
                case 7: // Comments
                    var rules_params = {
                        cmt_text: {
                            minWords: 1,
                            required: true
                        },
                        cmt_sc: {
                            minlength: 1,
                            maxlength: 3,
                            sc: true,
                            required: true
                        }
                    };
                    break;
                default: // Contact us
                    var rules_params = {
                        contact_name: {
                            minlength: 5,
                            maxlength: 20,
                            required: true
                        },
                        contact_email: {
                            email: true,
                            required: true
                        },
                        contact_phone: {
                            phone: true
                        },
                        contact_subject: {
                            alphanumeric: true
                        },
                        contact_text: {
                            minWords: 5,
                            required: true
                        },
                        contact_sc: {
                            minlength: 1,
                            maxlength: 3,
                            sc: true,
                            required: true
                        }
                    };
            }

            $('form').validate(
                {
                    rules: rules_params,
                    highlight: function(element, errorClass)
                    {
                        $(element).closest('.form-group.has-feedback').removeClass('has-success').addClass('has-error');
                    },
                    unhighlight: function(element, errorClass)
                    {
                        $(element).closest('.form-group.has-feedback').removeClass('has-error').addClass('has-success');
                        if ($(element).closest('.form-group.has-feedback').find('span.help-block').length > 0)
                        {
                            $(element).closest('.form-group.has-feedback').find('span.help-block').remove();
                        }
                    },
                    errorClass: 'help-block help-style text-right',
                    errorElement: 'span',
                    errorPlacement: function(error, element)
                    {
                        if (element.parent('.input-group').length)
                        {
                            element.parent('.input-group').next('span.help-block').remove();
                            error.insertAfter(element.parent());
                        }
                        else if (element.parents('.checkbox').length)
                        {
                            element.parents('.checkbox').next('span.help-block').remove();
                            error.insertAfter(element.parents('.checkbox'));
                        }
                        else if (element.parents('.checkbox-inline').length)
                        {
                            element.parents('.checkbox-inline').next('span.help-block').remove();
                            error.insertAfter(element.parents('.checkbox-inline'));
                        }
                        else
                        {
                            element.next('span.help-block').remove();
                            error.insertAfter(element);
                        }
                    }
                });
        },
        validateCommonForm: function(type, selector)
        {
            var to_scroll = false;

            switch (type)
            {
                case 1: // Step 1
                    var rules_params = {
                        evnt_name: {
                            required: true
                        },
                        evnt_zip_code: {
                            minlength: 4,
                            maxlength: 5,
                            isvailedzip: true
                        },
                        evnt_town: {
                            minlength: 3,
                            required: true
                        },
                        evnt_address: {
                            minlength: 3
                        },
                        evnt_start: {
                            required: true,
                            date2: true
                        },
                        evnt_guests: {
                            digits: true,
                            min: 1,
                            max: 100000
                        },
                        evnt_end: {
                            required: true,
                            date2: true
                        },
                        evnt_duration: {
                            minlength: 3
                        }
                    };
                    break;
                case 2: // Step 2
                    var rules_params = {
                        evnt_min_budget: {
                            min: 10
                            // minbudget: '#evnt_max_budget'
                        },
                        evnt_max_budget: {
                            required: true,
                            min: 0
                            // maxbudget: '#evnt_min_budget'
                        }
                    };
                    break;
                case 3: // Step 3 - login
                    var rules_params = {
                        evnt_lgn_name: {
                            email: true,
                            required: true
                        },
                        evnt_lgn_pass: {
                            minlength: 6,
                            required: true
                        },
                        evnt_lgn_sc: {
                            minlength: 1,
                            maxlength: 3,
                            sc: true,
                            required: true
                        }
                    };
                    break;
                case 4: // Step 3 - register
                    var rules_params = {
                        evnt_reg_zip_code: {
                            minlength: 4,
                            maxlength: 5,
                            digits: true
                        },
                        evnt_reg_town: {
                            minlength: 3
                        },
                        evnt_reg_address: {
                            minlength: 6
                        },
                        evnt_reg_company: {
                            minlength: 3,
                            required: function(element)
                            {
                                var title = $('#evnt_reg_title').val();
                                if (title == '3')
                                {
                                    return true;
                                }
                                return false;
                            }
                        },
                        evnt_reg_phone: {
                            minlength: function(element)
                            {
                                var selector = $(element).prop('id') + '_code';
                                var arr_tmp = $('#' + selector).val().split('_');
                                var value = arr_tmp[0];
                                if (value == 'ch')
                                {
                                    return 8;
                                }
                                else if (value == 'bg')
                                {
                                    return 9;
                                }
                                else
                                {
                                    return 11;
                                }
                            },
                            maxlength: function(element)
                            {
                                var selector = $(element).prop('id') + '_code';
                                var arr_tmp = $('#' + selector).val().split('_');
                                var value = arr_tmp[0];
                                if (value == 'ch')
                                {
                                    return 8;
                                }
                                else if (value == 'bg')
                                {
                                    return 10;
                                }
                                else
                                {
                                    return 12;
                                }
                            },
                            required: function(element)
                            {
                                var value = $('#evnt_reg_phone_type').val();
                                if (parseInt(value) == 1)
                                {
                                    return true;
                                }
                                return false;
                            }
                        },
                        evnt_reg_phone2: {
                            minlength: 4,
                            maxlength: 14,
                            required: function(element)
                            {
                                var value = $('#evnt_reg_phone_type').val();
                                if (parseInt(value) == 2)
                                {
                                    return true;
                                }
                                return false;
                            }
                        },
                        evnt_reg_email: {
                            email: true,
                            required: true
                        },
                        evnt_reg_email_again: {
                            email: true,
                            required: true,
                            equalTo: '#evnt_reg_email'
                        },
                        evnt_reg_pass: {
                            minlength: 6,
                            required: true
                        },
                        evnt_reg_again: {
                            minlength: 6,
                            required: true,
                            equalTo: '#evnt_reg_pass'
                        },
                        evnt_reg_name: {
                            minlength: 5,
                            maxlength: 50,
                            required: true
                        },
                        evnt_reg_terms: {
                            required: true
                        },
                        evnt_reg_sc: {
                            minlength: 1,
                            maxlength: 3,
                            sc: true,
                            required: true
                        }
                    };
                    break;
                case 5: // New message
                    to_scroll = true;
                    var rules_params = {
                        msg_contact: {
                            minlength: 5,
                            maxlength: 50,
                            required: true
                        },
                        msg_subject: {
                            minlength: 6,
                            required: true
                        },
                        msg_content: {
                            required: false
                        }
                    };
                    break;
                case 6: // Step 1 (artist) - category
                    var rules_params = {
                        art_category: {
                            required: true
                        }
                    };
                    break;
                case 7: // Step 2 (artist) - register
                    var rules_params = {
                        art_reg_zip_code: {
                            minlength: 4,
                            maxlength: 5,
                            digits: true,
                            isvailedzip: true
                        },
                        usr_zip_code: {
                            minlength: 4,
                            maxlength: 5,
                            isvailedzip: true
                        },
                        art_reg_town: {
                            minlength: 3
                        },
                        art_reg_address: {
                            minlength: 6
                        },
                        art_reg_company: {
                            minlength: 3,
                            required: function(element)
                            {
                                var title = $('#art_reg_title').val();
                                if (title == '3')
                                {
                                    return true;
                                }
                                return false;
                            }
                        },
                        art_reg_phone: {
                            minlength: function(element)
                            {
                                var selector = $(element).prop('id') + '_code';
                                var arr_tmp = $('#' + selector).val().split('_');
                                var value = arr_tmp[0];
                                if (value == 'ch')
                                {
                                    return 8;
                                }
                                else if (value == 'bg')
                                {
                                    return 9;
                                }
                                else
                                {
                                    return 11;
                                }
                            },
                            maxlength: function(element)
                            {
                                var selector = $(element).prop('id') + '_code';
                                var arr_tmp = $('#' + selector).val().split('_');
                                var value = arr_tmp[0];
                                if (value == 'ch')
                                {
                                    return 8;
                                }
                                else if (value == 'bg')
                                {
                                    return 10;
                                }
                                else
                                {
                                    return 12;
                                }
                            },
                            required: function(element)
                            {
                                var type = $('#art_reg_phone_type').val();
                                if (parseInt(type) == 1)
                                {
                                    return true;
                                }
                                return false;
                            }
                        },
                        art_reg_phone2: {
                            minlength: 4,
                            maxlength: 14,
                            required: function(element)
                            {
                                var type = $('#art_reg_phone_type').val();
                                if (parseInt(type) == 2)
                                {
                                    return true;
                                }
                                return false;
                            }
                        },
                        art_reg_email: {
                            email: true,
                            required: true
                        },
                        art_reg_email_again: {
                            email: true,
                            required: true,
                            equalTo: '#art_reg_email'
                        },
                        art_reg_pass: {
                            minlength: 6,
                            required: true
                        },
                        art_reg_again: {
                            minlength: 6,
                            required: true,
                            equalTo: '#art_reg_pass'
                        },
                        art_reg_name: {
                            minlength: 5,
                            maxlength: 50,
                            required: true
                        },
                        art_reg_terms: {
                            required: true
                        },
                        art_reg_sc: {
                            minlength: 1,
                            maxlength: 3,
                            sc: true,
                            required: true
                        }
                    };
                    break;
            }

            $('#' + selector).validate(
                {
                    rules: rules_params,
                    ignore: "",
                    highlight: function(element, errorClass)
                    {
                        $(element).closest('.form-group.has-feedback').removeClass('has-success').addClass('has-error');
                    },
                    unhighlight: function(element, errorClass)
                    {
                        $(element).closest('.form-group.has-feedback').removeClass('has-error').addClass('has-success');
                        if ($(element).closest('.form-group.has-feedback').find('span.help-block').length > 0)
                        {
                            $(element).closest('.form-group.has-feedback').find('span.help-block').remove();
                        }
                    },
                    errorClass: 'help-block help-style text-right',
                    errorElement: 'span',
                    errorPlacement: function(error, element)
                    {
                        if (element.parent('.input-group').length)
                        {
                            element.parent('.input-group').next('span.help-block').remove();
                            error.insertAfter(element.parent());
                            if (to_scroll)
                            {
                                App.scrollDown(element.prop('id'));
                            }
                        }
                        else if (element.parents('.checkbox').length)
                        {
                            element.parents('.checkbox').next('span.help-block').remove();
                            error.insertAfter(element.parents('.checkbox'));
                            if (to_scroll)
                            {
                                App.scrollDown(element.prop('id'));
                            }
                        }
                        else if (element.parents('.checkbox-inline').length)
                        {
                            element.parents('.checkbox-inline').next('span.help-block').remove();
                            error.insertAfter(element.parents('.checkbox-inline'));
                            if (to_scroll)
                            {
                                App.scrollDown(element.prop('id'));
                            }
                        }
                        else if (element.next('.bootstrap-select').length)
                        {
                            element.next('.bootstrap-select').next('span.help-block').remove();
                            error.insertAfter(element.next('.bootstrap-select'));
                            if (to_scroll)
                            {
                                App.scrollDown(element.prop('id'));
                            }
                        }
                        else if (element.parent('div').find('iframe').length)
                        {
                            element.parent('div').find('iframe').next('span.help-block').remove();
                            error.insertAfter(element.parent('div').find('iframe'));
                            console.log(element);
                            if (to_scroll)
                            {
                                App.scrollDown(element.prop('id'));
                            }
                        }
                        else
                        {
                            element.next('span.help-block').remove();
                            error.insertAfter(element);
                            if (to_scroll)
                            {
                                App.scrollDown(element.prop('id'));
                            }
                        }
                    }
                });

            if (type == 2)
            {
                if ($('#evnt_min_budget').length > 0)
                {
                    $('#evnt_min_budget').on('change', function()
                    {
                        $('#' + selector).validate()
                    });
                }
                if ($('#evnt_max_budget').length > 0)
                {
                    /*$('#evnt_max_budget').on('focusout',function()
                     {
                     $('#'+selector).validate().element("#evnt_min_budget")
                     });*/
                }
                $('[name^="evnt_el["]').each(function()
                {
                    var $element = $(this)

                    if ($element.parents('.form-group.required').length > 0)
                    {
                        var $parent = $element.parents('.form-group.required');
                        var $group = $parent.find('[id^="evnt_group_"]');
                        $element.on('click', function(e)
                        {
                            if ($parent.find('[name^="evnt_el["]').length > 0)
                            {
                                var total = $parent.find('[name^="evnt_el["]').length;
                                var idx = 0;
                                $parent.find('[name^="evnt_el["]').each(function()
                                {
                                    if ($(this).is(':checkbox'))
                                    {
                                        if ($(this).is(':checked'))
                                        {
                                            $group.val('1');
                                            return false;
                                        }
                                        else
                                        {
                                            idx++;
                                        }
                                    }
                                    else
                                    {
                                        if ($(this).val().length > 0)
                                        {
                                            $group.val('1');
                                            return false;
                                        }
                                        else
                                        {
                                            idx++;
                                        }
                                    }
                                });
                                if (idx == total)
                                {
                                    $group.val('');
                                }
                            }
                        });
                    }
                });
                if ($('[id^="evnt_group_"]').length > 0)
                {
                    $('[id^="evnt_group_"]').each(function()
                    {
                        $(this).rules('add', {required: true});
                    });
                }
            }
        },
        dialogBox: function(type, title, message)
        {
            var result;
            var ok_label = 'OK';
            var cancel_label = 'Cancel';
            var buttons = {
                ok: {
                    label: ok_label,
                    className: "btn-primary",
                    callback: function()
                    {
                        result = true;
                    }
                },
                cancel: {
                    label: cancel_label,
                    className: "btn-default",
                    callback: function()
                    {
                        result = false;
                    }
                }
            }
            bootbox.dialog(
                {
                    message: message,
                    title: title,
                    buttons: buttons
                });

            return result;
        },
        lightbox: function(selector)
        {
            var $lightbox = $(selector);

            $('[data-target="' + selector + '"]').on('click', function(event)
            {
                var $img = $(this).find('img'),
                    src = $img.attr('src'),
                    alt = $img.attr('alt'),
                    css = {
                        'maxWidth': $(window).width() - 100,
                        'maxHeight': $(window).height() - 100
                    };

                $lightbox.find('.close').addClass('hidden');
                $lightbox.find('img').attr('src', src);
                $lightbox.find('img').attr('alt', alt);
                $lightbox.find('img').css(css);
            });

            $lightbox.on('shown.bs.modal', function(e)
            {
                var $img = $lightbox.find('img');

                $lightbox.find('.modal-dialog').css({'width': $img.width()});
                $lightbox.find('.close').removeClass('hidden');
            });
        },
        controlSwitch: function(selector)
        {
            $(selector).click(function()
            {
                $(this).find('.btn').toggleClass('active');

                if ($(this).find('.btn-primary').size() > 0)
                {
                    $(this).find('.btn').toggleClass('btn-primary');
                }
                if ($(this).find('.btn-danger').size() > 0)
                {
                    $(this).find('.btn').toggleClass('btn-danger');
                }
                if ($(this).find('.btn-success').size() > 0)
                {
                    $(this).find('.btn').toggleClass('btn-success');
                }
                if ($(this).find('.btn-info').size() > 0)
                {
                    $(this).find('.btn').toggleClass('btn-info');
                }

                $(this).find('.btn').toggleClass('btn-default');
            });
        },
        controlTime: function(selector)
        {
            var the_time = $(selector).data('time');

            $(selector).timepicker(
                {
                    defaultTime: false,
                    showMeridian: false,
                    disableFocus: true,
                    disableMousewheel: true,
                    minuteStep: 10
                });
            if (the_time && the_time.length > 0)
            {
                $(selector).timepicker('setTime', the_time);
            }
        },
        controlDate: function(selector)
        {

            var date_format = $(selector).data('format');
            var start_date = $(selector).data('start-date');
            var dest = $(selector).data('dest');
            var lang = $(selector).data('language');

            $(selector).datepicker(
                {
                    format: date_format,
                    startDate: start_date,
                    weekStart: 1,
                    todayBtn: "linked",
                    language: lang,
                    autoclose: true,
                    todayHighlight: true
                }).on('changeDate', function(event)
                {
                    var formatted = moment(event.date).format('YYYY-MM-DD');
                    $('#' + dest).val(formatted);
                });
        },
        controlDateTime: function(selector)
        {

            $(selector).datetimepicker(
                {
                    autoclose: true,
                    todayBtn: true,
                    pickerPosition: "bottom-left",
                    todayHighlight: 1,
                    weekStart: 1,
                    forceParse: 0
                })/*
         .on('changeDate',function(ev)
         {
         console.log(ev.date);
         });*/
        },
        controlDateRange: function(selector)
        {

            var date_format = $(selector).data('format');
            var start_date = moment($(selector).data('start-date'), date_format);
            var end_date = moment($(selector).data('end-date'), date_format);
            if (!start_date.isValid())
            {
                start_date = moment().subtract(1, 'week');
            }
            if (!end_date.isValid())
            {

                end_date = start_date;
            }

            $(selector + ' span').html(start_date.format(date_format) + ' - ' + end_date.format(date_format));

            $(selector).daterangepicker(
                {
                    startDate: start_date,
                    endDate: end_date,
                    minDate: moment('2014-01-01'),
                    maxDate: moment(),
//				dateLimit: { days: 60 },
                    showDropdowns: true,
//				showWeekNumbers: true,
                    timePicker: false,
                    timePickerIncrement: 1,
                    timePicker12Hour: true,
                    ranges: drp_range,
                    opens: 'left',
                    buttonClasses: ['btn btn-sm'],
                    applyClass: 'btn-primary',
                    cancelClass: 'btn-default',
                    format: date_format,
                    separator: ' - ',
                    locale: {
                        applyLabel: arr_messages[7],
                        cancelLabel: arr_messages[8],
                        fromLabel: arr_messages[9],
                        toLabel: arr_messages[10],
                        customRangeLabel: arr_messages[11],
                        daysOfWeek: str_day_short,
                        monthNames: str_month_names,
                        firstDay: 1
                    }
                },
                function(start, end, label)
                {
//				console.log(start.toISOString(), end.toISOString(), label);
                });
            $(selector).on('apply.daterangepicker', function(ev, picker)
            {
                $(selector).parent('div').find('input#from').val(picker.startDate.format('YYYY-MM-DD'));
                $(selector).parent('div').find('input#to').val(picker.endDate.format('YYYY-MM-DD'));
                if ($('#form_fltr').length > 0)
                {
                    $('#form_fltr').submit();
                }
//				$(selector+' span').html(picker.startDate.format(date_format)+' - '+picker.endDate.format(date_format));

//				console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
            });
        },
        controlStartDate: function(selector, form)
        {
            var date_format = $(selector).data('format');
            var start_date = $(selector).data('start-date');
            var the_date = $(selector).data('date');
            var dest = $(selector).data('dest');
            var rel = $(selector).data('rel');
            var lang = $(selector).data('language');
            console.log(start_date);
            $(selector).datepicker(
                {
                    format: date_format,
                    startDate: new Date(),
                    weekStart: 1,
                    language: lang,
                    autoclose: true,
                    todayHighlight: true
                }).on('changeDate', function(event)
                {
                    var formatted = moment(event.date).format('YYYY-MM-DD');
                    var now_date = moment().format('YYYY-MM-DD');
                    var now_date_c = now_date;
                    var now_date = new Date(now_date);
                    var formatted_compare = new Date(formatted);
                    var days_between_dates = (days_between(now_date, formatted_compare));
                    var start_dateaa = moment(event.date);
                    var sel_date = $('#evnt_start_datepicker').val()
                    if (days_between_dates > 30) {
                        var rel_start = moment(now_date_c).add(22, 'days');
                    } else {
                        var rel_start = moment(event.date).subtract(1, 'day');
                    }
                    var rel_end = moment(sel_date);
                    $('#evnt_end_datepicker').datepicker('setEndDate', rel_end._d);
                    $('#evnt_end_datepicker').datepicker('setStartDate', new Date());
                    $('#evnt_end_datepicker').datepicker('update');
                    //console.log(rel_start._d);
                    var rel_date = new Date(rel_start);
                    $('#' + dest).val(start_dateaa.format('YYYY-MM-DD'));
                    if (typeof form !== "undefined")
                    {
                        $(form).valid();
                    }

                    $(rel).datepicker('setEndDate', rel_date);
                    $(rel).datepicker('setDate', rel_date);
                    $(rel).datepicker('update');
                }).on('clearDate', function(event)
                {
                    $('#' + dest).val('');
                    if (typeof form !== "undefined")
                    {
                        $(form).valid();
                    }
                });
            if (the_date.length > 0)
            {
                //$(selector).datepicker('setDate',new Date(the_date));
            }
        },
        controlReplyDate: function(selector, form)
        {

            var date_format = $(selector).data('format');
            var start_date = $(selector).data('start-date');
            var end_date = $(selector).data('end-date');
            var the_date = $(selector).data('date');
            var dest = $(selector).data('dest');
            var lang = $(selector).data('language');
            $(selector).datepicker(
                {
                    format: date_format,
                    startDate: start_date,
                    endDate: end_date,
                    weekStart: 1,
                    language: lang,
                    autoclose: true,
                    todayHighlight: true
                }).on('changeDate', function(event)
                {
                    var formatted = moment(event.date).format('YYYY-MM-DD');
                    var endDate = moment(formatted).format('YYYY-MM-DD');
                    //console.log(formatted);
                    //console.log(endDate);
                    //console.log('#'+dest);
                    $('#' + dest).val(endDate);
                    if (typeof form !== "undefined")
                    {
                        $(form).valid();
                    }
                }).on('clearDate', function(event)
                {
                    $('#' + dest).val('');
                    if (typeof form !== "undefined")
                    {
                        $(form).valid();
                    }
                });
            if (the_date.length > 0)
            {
                $(selector).datepicker('setDate', new Date(the_date));
            }
        },
        controlMaxlength: function(selector)
        {
            $(selector).maxlength(
                {
                    alwaysShow: true,
                    placement: 'bottom',
                    message: arr_messages[2]
                });
        },
        controlPlayer: function(selector)
        {
            $(selector).mediaelementplayer(
                {
                    audioWidth: '100%', // width of audio player
                    audioHeight: 30, // height of audio player
                    startVolume: 0.7, // initial volume when the player starts
                    enableAutosize: true, // enables Flash and Silverlight to resize to content size
                    features: ['playpause', 'current', 'progress', 'duration', 'tracks', 'volume'], // the order of controls you want on the control bar (and other plugins below)
                    enableKeyboard: true, // turns keyboard support on and off for this instance
                    pauseOtherPlayers: true, // when this player starts, it will pause other players
                });
        },
        controlScrollBar: function(selector, type)
        {
            if (type == 2)
            {
                $(selector).perfectScrollbar('destroy');
            }
            if (type == 3)
            {
                $(selector).perfectScrollbar('update');
            }
            else
            {
                $(selector).perfectScrollbar(
                    {
                        minScrollbarLength: 30,
                        suppressScrollX: true,
                        includePadding: true
                    });
            }
        },
        controlPopover: function(selector, type)
        {
            var to_hide = $.cookie('no_tip');
            if (typeof to_hide == "undefined" || parseInt(to_hide) == 0)
            {
                if (type == 1)
                {
                    $(selector).popover(
                    {
                        html: true,
                        placement: 'top',
                        trigger: 'manual',
                        container: '#form_srch',
                        title: '<a id="search-tip" class="text-center"><img src="/images/search_icon.png" width="50" height="30" /> ' + $(selector).data('title') + '</a>',
                        template: '<div class="popover search-tip"><div class="arrow"></div><div class="popover-inner"><div class="popover-title search-tip"></div><div class="popover-content search-tip"><p></p></div><div class="close">&times;</div></div></div>'
                    })
                    .on("show.bs.popover", function()
                    {
                        $(this).data("bs.popover").tip().css("max-width", $(selector).parent('.input-group').outerWidth());
                    });
                    $(selector).popover('show');

                    if ($('#search-tip').length > 0)
                    {
                        $('#search-tip').on('click', function(e)
                        {
                            $(selector).popover('destroy');
                            App.controlPopover(selector, 2);
                        });
                    }
                    if ($('.popover.search-tip .close').length > 0)
                    {
                        $('.popover.search-tip .close').on('click', function(e)
                        {
                            if ($('#no_tip').length > 0)
                            {
                                if ($('#no_tip').prop('checked'))
                                {
                                    $.cookie('no_tip', '1', {expires: 30});
                                }
                            }
                            $(selector).popover('destroy');
                        });
                    }
                }
                else
                {
                    var lid = $('#lid').val();
                    $.ajax(
                        {
                            type: 'POST',
                            url: 'ajax_data.php',
                            data: 'act=50&t=1&l=' + lid,
                            dataType: 'json',
                            async: true,
                            success: function(data)
                            {
                                if (data['title'] && data['content'])
                                {
                                    $(selector).popover('destroy');

                                    $(selector).popover(
                                        {
                                            html: true,
                                            placement: 'top',
                                            trigger: 'manual',
                                            container: '#form_srch',
                                            title: data['title'],
                                            content: data['content'],
                                            template: '<div class="popover search-tip"><div class="arrow"></div><div class="popover-inner"><div class="popover-title search-tip"></div><div class="popover-content description"><p></p></div><div class="close">&times;</div></div></div>'
                                        });
                                    $(selector).popover('show');

                                    if ($('.popover.search-tip .close').length > 0)
                                    {
                                        $('.popover.search-tip .close').on('click', function(e)
                                        {
                                            if ($('#no_tip').length > 0)
                                            {
                                                if ($('#no_tip').prop('checked'))
                                                {
                                                    $.cookie('no_tip', '1', {expires: 30});
                                                }
                                            }
                                            $(selector).popover('destroy');
                                        });
                                    }
                                }
                            }
                        });
                }
            }
        },
        controlListNav: function(selector)
        {
            var lang = 1;
            if ($('#lid').length > 0)
            {
                lid = $('#lid').val();
            }
//			console.log(lid);
//			console.log(arr_messages[3]);
//			console.log(arr_messages[4]);
            $(selector).listnav(
                {
                    initLanguage: lid,
                    includeAll: true,
                    includeOther: false,
                    includeNums: false,
                    flagDisabled: false,
                    removeDisabled: false,
                    showCounts: false,
                    allText: arr_messages[3],
                    noMatchText: arr_messages[4],
                    onClick: function(letter)
                    {
                        if ($('#categories_list').length > 0)
                        {
                            App.controlScrollBar('#categories_list', 3);
                        }
                    }
                });
        },
        controlDataTables: function(selector)
        {
            $(selector).DataTable(
                {
                    "autoWidth": true,
                    searching: false,
                    ordering: true,
                    "pageLength": 10,
                    "lengthChange": false,
                    "info": false,
                    "orderCellsTop": true,
                    "order": [[4, "desc"]],
                    paging: true,
                    language: dt_language,
                    stateSave: false,
                    responsive: true,
                    "columns":
                        [
                            {"width": "6%", "orderable": false}, /* State */
                            {"width": "10%", "class": "details", "orderable": true}, /* Date */
                            {"width": "20%", "class": "details", "orderable": true}, /* Type */
                            {"width": "20%", "class": "details", "orderable": true}, /* Location */
                            {"width": "10%", "class": "details", "orderable": true}, /* Request */
                            {"width": "10%", "class": "details", "orderable": false}, /* Budget */
                            {"width": "10%", "class": "details", "orderable": false}, /* Status */
                            {"width": "14%", "orderable": false} /* Actions */
                        ],
                    "drawCallback": function(settings)
                    {
                        var api = this.api();
                        var info = api.page.info();
                        var id = this.prop('id');
                        var parent = this.parent('#' + id + '_wrapper');

                        if (parent.find('#' + id + '_paginate').length > 0)
                        {
                            var pages = parent.find('#' + id + '_paginate').closest('div.row');

                            if (info.pages == 1)
                            {
                                if (!pages.hasClass('hide'))
                                {
                                    pages.addClass('hide');
                                }
                            }
                            else
                            {
                                if (pages.hasClass('hide'))
                                {
                                    pages.removeClass('hide');
                                }
                            }
                        }
                        var the_height = parseInt(this.find('thead > tr > th:first-child').innerHeight());
                        $('div.' + id).css('top', (parseInt(the_height - 16)) + 'px');
                    }
                });

            $(selector + ' th').on('click', function()
            {
                var table = $(this).closest('table').DataTable();
                var the_id = $(this).closest('table').prop('id');
                var the_order = table.order();

                var pages = $(this).closest('table').next('div.row');

                if (!pages.hasClass('hide') && pages.is(':hidden'))
                {
                    var header = $(this).closest('div.wrapper').find("div[id^='section-']");
                    header.click();
                }

                $(selector).each(function(index, element)
                {
                    var current_id = $(this).prop('id');
                    var current_table = $(this).DataTable();

                    if (current_id != the_id)
                    {
                        current_table.order(the_order).draw();
                    }
                });
            });

            // Add event listener for opening and closing details
            $(selector + ' tbody').on('click', 'td.details', function()
            {
                App.loadRowDetails(this);
            });
        },
        loadRowDetails: function(element)
        {
            var table = $(element).closest('table').DataTable();
            var tr = $(element).closest('tr');
            var row = table.row(tr);

            if (row.child.isShown())
            {
                // This row is already open - close it
                row.child.remove();
                tr.removeClass('shown');
            }
            else
            {
                var uid = $('#uid').val();
                var lid = $('#lid').val();
                var type = tr.data('section');
                var id = tr.data('id');
                console.log(type);

                $.ajax(
                    {
                        type: 'POST',
                        url: 'ajax_data.php',
                        data: 'act=69&u=' + uid + '&t=' + type + '&l=' + lid + '&id=' + id + '&sh=1',
                        async: true,
                        beforeSend: function()
                        {
                        },
                        success: function(data)
                        {
                            // Open this row
                            row.child(data).show();
                            tr.addClass('shown');
                        },
                        error: function(data, textStatus)
                        {
                            // Open this row
                            row.child(data).show();
                            tr.addClass('shown');
                        },
                        complete: function(data)
                        {
                            if ($('#notes_' + id + ' textarea[maxlength].counter').length > 0)
                            {
                                App.controlMaxlength('#notes_' + id + ' textarea[maxlength].counter');
                            }

                            if ($('#messages-history-' + id).length > 0)
                            {
                                $('#messages-history-' + id).DataTable(
                                    {
                                        "autoWidth": true,
                                        searching: false,
                                        ordering: false,
                                        "pageLength": 10,
                                        "lengthChange": false,
                                        "info": false,
                                        "orderCellsTop": true,
                                        paging: true,
                                        language: dt_language,
                                        stateSave: false,
                                        responsive: true,
                                        "columns":
                                            [
                                                {"width": "1%", "class": "details2"}, /* Status */
                                                {"width": "10%", "class": "details2"}, /* Date */
                                                {"width": "30%", "class": "details2"}, /* Subject */
                                                {"width": "58%", "class": "details2"}, /* Content */
                                                {"width": "1%"} /* Actions */
                                            ],
                                        "drawCallback": function(settings)
                                        {
                                            var api = this.api();
                                            var info = api.page.info();
                                            var id = this.prop('id');
                                            var parent = this.parent('#' + id + '_wrapper');

                                            if (parent.find('#' + id + '_paginate').length > 0)
                                            {
                                                var pages = parent.find('#' + id + '_paginate').closest('div.row');

                                                if (info.pages == 1)
                                                {
                                                    if (!pages.hasClass('hide'))
                                                    {
                                                        pages.addClass('hide');
                                                    }
                                                }
                                                else
                                                {
                                                    if (pages.hasClass('hide'))
                                                    {
                                                        pages.removeClass('hide');
                                                    }
                                                }
                                            }
                                        }
                                    });

                                $('#messages-history-' + id + ' tbody').on('click', 'td.details2', function()
                                {
                                    var tr = $(this).closest('tr');

                                    if (parseInt(tr.data('type')) == 1)
                                    {
                                        App.showDetails(tr.data('type'), 15, tr.data('id'), uid, lid, tr.data('kind'));
                                    }
                                    else
                                    {
                                        window.location = tr.data('message') + '_' + tr.data('id') + '.html';
                                    }
                                });
                            }
                        }
                    });
            }
        },
        rateUser: function(selector, type)
        {
            var arr_temp = new Array();
            var length = $("span[id^='" + selector + "']").length;
            for (var i = 1; i <= length; i++)
            {
                arr_temp[i] = 0;
            }

            $("span[id^='" + selector + "']").click(function(event)
            {
                event.preventDefault();
                var cntnr = (type == 2 ? 'my' : '') + 'rating';
                var cntnr2 = (type != 2 ? 'my' : '') + 'rating';
                var value = $(this).prop('id').replace(selector, '');
                var u = $('#u').val();
                var a = $('#a').val();
                var l = $('#l').val();

                $.ajax(
                    {
                        type: 'POST',
                        url: 'ajax_data.php',
                        data: 'act=17&u=' + u + '&t=' + value + '&l=' + l + '&e=' + (type == 2 ? '1' : '0') + '&id=' + a + '&sh=1',
                        async: true,
                        beforeSend: function()
                        {
                            $('#' + cntnr).block({message: '<strong>' + arr_messages[0] + '</strong>', css: {border: '0px none', color: '#FFF', backgroundColor: 'transparent'}});
                        },
                        success: function(data)
                        {
                            $('#' + cntnr).html(data);

                            $.ajax(
                                {
                                    type: 'POST',
                                    url: 'ajax_data.php',
                                    data: 'act=17&u=' + u + '&t=' + value + '&l=' + l + '&e=' + (type != 2 ? '1' : '0') + '&id=' + a + '&sh=0',
                                    async: true,
                                    beforeSend: function()
                                    {
                                        $('#' + cntnr2).block({message: '<strong>' + arr_messages[0] + '</strong>', css: {border: '0px none', color: '#FFF', backgroundColor: 'transparent'}});
                                    },
                                    success: function(data)
                                    {
                                        $('#' + cntnr2).html(data);
                                    },
                                    error: function(data, textStatus)
                                    {
                                        $('#' + cntnr2).html('Error: ' + textStatus);
                                    },
                                    complete: function(data)
                                    {
                                        $('#' + cntnr2).unblock();
                                    }
                                });
                        },
                        error: function(data, textStatus)
                        {
                            $('#' + cntnr).html('Error: ' + textStatus);
                        },
                        complete: function(data)
                        {
                            $('#' + cntnr).unblock();
                        }
                    });
            })
                .mouseover(function()
                {
                    var value = $(this).prop('id').replace(selector, '');
//				$("span[id^='"+selector+"']").removeClass('fa-active fa-inactive');
                    for (var i = 1; i <= length; i++)
                    {
                        if ($("span[id='" + selector + i + "']").hasClass('star_full'))
                        {
                            arr_temp[i] = 1;
                        }
                        if (i <= value)
                        {
//						$("span[id='"+selector+i+"']").addClass('fa-star').removeClass('fa-star-o').addClass('fa-active');
                            $("span[id='" + selector + i + "']").addClass('star_full').removeClass('star_none');
                        }
                        else
                        {
//						$("span[id='"+selector+i+"']").addClass('fa-star-o').removeClass('fa-star').addClass('fa-inactive');
                            $("span[id='" + selector + i + "']").addClass('star_none').removeClass('star_full');
                        }
                    }
                })
                .mouseout(function()
                {
//				$("span[id^='"+selector+"']").removeClass('fa-active fa-inactive');
                    for (var i = 1; i <= length; i++)
                    {
                        if (arr_temp[i] == 1)
                        {
//						$("span[id='"+selector+i+"']").addClass('fa-star').removeClass('fa-star-o');
                            $("span[id='" + selector + i + "']").addClass('star_full').removeClass('star_none');
                        }
                        else
                        {
//						$("span[id='"+selector+i+"']").addClass('fa-star-o').removeClass('fa-star');
                            $("span[id='" + selector + i + "']").addClass('star_none').removeClass('star_full');
                        }
                    }
                });
        },
        searchSuggest: function(object)
        {
            var value = object.val();
            var length = value.length;
            var lid = $('#lid').val();

            if (length >= 2)
            {
                if (!$('#search_interests').hasClass('hidden'))
                {
                    $('#search_interests').addClass('hidden');
                }
                if ($('#search_selection ul > li').length == 0)
                {
                    $('#search_ids').val('');
                }
                App.loadSuggest(1, 'search_suggestion', 1, 0, '', 0, lid, value, 0, 0, 0, '');
            }
            else
            {
                if ($('#search_selection ul > li').length == 0)
                {
                    $('#search_suggestion').addClass('hidden');
                    $('#search_interests').addClass('hidden');
                }
            }

            App.toggleListAZ(2, 'search_list', '');
        },
        searchClear: function()
        {
            $('#search').val('').focus();
        },
        selectSuggest: function(selector, id, main, lid)
        {
            var suggest = 'search_suggestion';
            var interests = 'search_interests';
            var list = 'search_list';
            var value = $('#' + selector).val();

            if ($('#' + suggest).hasClass('hidden'))
            {
                $('#' + interests).addClass('hidden');
            }

            App.toggleListAZ(2, list, '');
            App.loadSuggest(2, suggest, 1, 2, interests, 2, lid, value, id, main, 1, 1, selector);
        },
        selectInterest: function(selector, id, main, lid)
        {
            var suggest = 'search_suggestion';
            var interests = 'search_interests';
            var list = 'search_list';
            var value = $('#' + selector).val();

            if ($('#' + suggest).hasClass('hidden'))
            {
                $('#' + interests).addClass('hidden');
            }

            App.toggleListAZ(2, list, '');
            App.loadInterest(2, interests, 2, 2, suggest, 1, lid, value, id, main, 1, 1, selector);
        },
        selectCategoryAZ: function(selector, id, main, lid)
        {
            var suggest = 'search_suggestion';
            var interests = 'search_interests';
            var list = 'search_list';
            var value = $('#' + selector).val();

            App.loadSuggest(2, suggest, 1, 2, interests, 2, lid, value, id, main, 1, 1, selector);
            App.loadAZ(3, list, '', 2, lid, value);
        },
        loadSuggest: function(act1, cntnr1, type1, act2, cntnr2, type2, lid, val, id, pid, a, request, source)
        {
            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_filter.php',
                    data: 'act=' + act1 + '&s=' + encodeURIComponent(val) + '&t=' + type1 + '&l=' + lid + '&id=' + id + '&p=' + pid + '&a=' + a,
                    dataType: "json",
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        $('#' + cntnr1).html(data['data']);
                        if (request == 1 || request == 2)
                        {
                            var value = val;
                            if (data['ids'] != '')
                            {
                                $('#' + source).val(data['ids']);
                                value = data['ids'];
                            }
                            App.loadInterest(act2, cntnr2, type2, act1, cntnr1, type1, lid, value, id, pid, 0, (request != 1 ? request : 0), source);
                            if (request == 2)
                            {

                            }
                        }
                    },
                    error: function(data, textStatus)
                    {
                        $('#' + cntnr1).html('Error: ' + textStatus);
                    },
                    complete: function(data)
                    {
                        if ($('#' + cntnr1).hasClass('hidden'))
                        {
                            $('#' + cntnr1).removeClass('hidden');
                        }
                    }
                });
        },
        loadInterest: function(act1, cntnr1, type1, act2, cntnr2, type2, lid, val, id, pid, a, request, source)
        {
            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_filter.php',
                    data: 'act=' + act1 + '&s=' + encodeURIComponent(val) + '&t=' + type1 + '&l=' + lid + '&id=' + id + '&p=' + pid + '&a=' + a,
                    dataType: "json",
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        $('#' + cntnr1).html(data['data']);
                        if (request == 1)
                        {
                            var value = val;
//						if(data['ids']!='')
//						{
                            $('#' + source).val(data['ids']);
                            value = data['ids'];
//						}
                            App.loadSuggest(act2, cntnr2, type2, act1, cntnr1, type1, lid, value, id, pid, 0, 0, source);
                        }
                    },
                    error: function(data, textStatus)
                    {
                        $('#' + cntnr1).html('Error: ' + textStatus);
                    },
                    complete: function(data)
                    {
                        if ($('#' + cntnr1).hasClass('hidden'))
                        {
                            $('#' + cntnr1).removeClass('hidden');
                        }
                        // ScrollBar
                        if ($('#interests_list').length > 0)
                        {
                            App.controlScrollBar('#interests_list', 2);
                        }
                    }
                });
        },
        loadAZ: function(act, cntnr1, cntnr2, type, lid, val)
        {
            if (type == 1)
            {
                if (lid == 0)
                {
                    lid = $('#lid').val();
                }
                if (val == 0)
                {
                    val = $('#search_ids').val();
                }

                $.ajax(
                    {
                        type: 'POST',
                        url: 'ajax_filter.php',
                        data: 'act=' + act + '&s=' + encodeURIComponent(val) + '&l=' + lid,
                        dataType: "json",
                        async: true,
                        beforeSend: function()
                        {
                        },
                        success: function(data)
                        {
                            $('#' + cntnr1).html(data['data']);
                        },
                        error: function(data, textStatus)
                        {
                            $('#' + cntnr1).html('Error: ' + textStatus);
                        },
                        complete: function(data)
                        {
                            App.toggleListAZ(1, cntnr1, cntnr2);

                            // Close button
                            if ($('#' + cntnr2 + '_x').length > 0)
                            {
                                $('#' + cntnr2 + '_x').on('click', function(e)
                                {
                                    App.toggleListAZ(2, cntnr1, cntnr2);
                                });
                            }
                            // ScrollBar
                            if ($('#categories_list').length > 0)
                            {
                                App.controlScrollBar('#categories_list', 2);
                            }
                            // ListNav
                            if ($('#list_az').length > 0)
                            {
                                App.controlListNav('#list_az');
                            }
                        }
                    });
            }
            else
            {
                App.toggleListAZ(2, cntnr1, cntnr2);
            }
        },
        toggleListAZ: function(action, list, selector)
        {
            if (action == 1) // Open
            {
                var offset = $('#' + selector).offset();
                var width = $('#' + selector).outerWidth() + offset.left;
                if (width < 300) {
                    width = 280;
                }
                $('#' + list).animate(
                    {
                        left: 0,
                        width: width
                    }, 500);
            }
            else // Close
            {
                $('#' + list).animate(
                    {
                        left: -1000,
                        width: 0
                    }, 500).html('');
            }
        },
        selectCategory: function(pid, lid, selector, id, type)
        {
            var selected = 'search_categories';
            var value = $('#' + selector).val();

            App.load(30, selected, pid, type, lid, value, id, 1, 0, 0, 0);
        },
        removeCategory: function(n, uid, type, lid, eid, id, sh)
        {
            var t = 0;

            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=100&t=' + t + '&l=' + lid + '&e=' + n + '&id=' + sh,
                    dataType: 'json',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        console.log(data);
                        var buttons = {
                            cancel: {
                                label: data['buttons']['cancel'],
                                className: "btn-default col-xs-3 col-xs-offset-3",
                                callback: function()
                                {
                                }
                            },
                            ok: {
                                label: data['buttons']['ok'],
                                className: "btn-primary col-xs-3",
                                callback: function()
                                {
                                    App.load(40, 'event_steps', uid, type, lid, eid, id, sh, 0, 0, 0);
                                }
                            }
                        }
                        bootbox.dialog(
                            {
                                message: data['content'],
                                title: data['title'],
                                buttons: buttons
                            });
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        uploadFile: function(selector)
        {
            $(selector).change(function()
            {
                var formData = new FormData();
                var total = this.files.length;
                var name = selector.replace('#', '');

                formData.append(name, this.files[0]);
                formData.append('l', $('#lid').val());
                if ($('#id').length > 0)
                {
                    formData.append('e', $('#id').val());
                    formData.append('t', '1');
                }
                else
                {
                    formData.append('e', $('#eid').val());
                    formData.append('u', $('#uid').val());
                    formData.append('t', '2');
                }

                $("#progress").loadTemplate($('#fileUploadProgressTemplate'));
                $("#fileUploadError").addClass("hide");

                $.ajax(
                    {
                        url: 'ajax_upload.php',
                        type: 'POST',
                        xhr: function()
                        {
                            var xhr = $.ajaxSettings.xhr();
                            if (xhr.upload)
                            {
                                xhr.upload.addEventListener('progress', function(evt)
                                {
                                    var percent = ((evt.loaded / evt.total) * 100).toFixed(2);
                                    $("#progress").find(".progress-bar").width(percent + "%").text(percent + "%");
                                }, false);
                            }
                            return xhr;
                        },
                        success: function(data)
                        {
                            if (data['error'] == '')
                            {
                                $("#files_tmp").loadTemplate($('#fileUploadItemTemplate'), data);
                                $("#progress").loadTemplate($('#fileUploadDoneTemplate'));
                                $("#files").append($('#files_tmp').html());
                                $('#files_tmp').html('');
                                if ($('#files .list-group-item').length >= 5)
                                {
                                    $('#files_upload').html('');
                                }
                            }
                            else
                            {
                                $("#files_tmp").loadTemplate($('#fileUploadErrorTemplate'), data);
                                $("#progress").loadTemplate($('#fileUploadDoneTemplate'));
                                $("#files").append($('#files_tmp').html());
                                $('#files_tmp').html('');

                                if ($('#files .list-group-item.error .close').length > 0)
                                {
                                    $('#files .list-group-item.error .close').on('click', function(e)
                                    {
                                        $(this).parents('.list-group-item.error').remove();
                                    });
                                }
                            }
                        },
                        error: function()
                        {
                            $("#fileUploadError").removeClass("hide").text("An error occured!");
                        },
                        data: formData,
                        dataType: 'json',
                        cache: false,
                        contentType: false,
                        processData: false
                    });
            });
        },
        removeFile: function(act, elem, lid, eid, sh)
        {
            var $parent = $(elem).parent('.list-group-item');
            var n = 1;
            var type = 1;
            var id = $parent.find('input').val();

            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=100&t=' + type + '&l=' + lid + '&e=' + n + '&id=' + id,
                    dataType: 'json',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        var buttons = {
                            cancel: {
                                label: data['buttons']['cancel'],
                                className: "btn-default col-xs-3 col-xs-offset-3",
                                callback: function()
                                {
                                }
                            },
                            ok: {
                                label: data['buttons']['ok'],
                                className: "btn-primary col-xs-3",
                                callback: function()
                                {
                                    $.ajax(
                                        {
                                            type: 'POST',
                                            url: 'ajax_data.php',
                                            data: 'act=' + act + '&l=' + lid + '&e=' + eid + '&id=' + id + '&sh=' + sh,
                                            async: true,
                                            beforeSend: function()
                                            {
                                            },
                                            success: function(data)
                                            {
                                                if (data == '1')
                                                {
                                                    $parent.remove();

                                                    if ($('#files .list-group-item').length < 5 && $('#files_upload').html() == '')
                                                    {
                                                        App.load(45, 'files_upload', 0, 0, lid, eid, id, sh, 0, 0, 3);
                                                    }
                                                }
                                            },
                                            error: function(data, textStatus)
                                            {
                                                $parent.html('<div class="alert alert-danger alert-list">Error: ' + textStatus + '</div>').addClass('error');
                                            }
                                        });
                                }
                            }
                        }
                        bootbox.dialog(
                            {
                                message: data['content'],
                                title: data['title'],
                                buttons: buttons
                            });
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        uploadPhoto: function(selector)
        {
            $(selector).change(function()
            {
                var formData = new FormData();
                var total = this.files.length;
                var name = selector.replace('#', '');
                var uid = $('#uid').val();
                var lid = $('#lid').val();

                formData.append(name, this.files[0]);
                formData.append('l', lid);
                if ($('#uid').length > 0)
                {
                    formData.append('u', uid);
                    formData.append('t', '3');
                }
                else
                {
                }

                $("#progress").loadTemplate($('#fileUploadProgressTemplate'));
                $("#fileUploadError").addClass("hide");

                $.ajax(
                    {
                        url: 'ajax_upload.php',
                        type: 'POST',
                        xhr: function()
                        {
                            var xhr = $.ajaxSettings.xhr();
                            if (xhr.upload)
                            {
                                xhr.upload.addEventListener('progress', function(evt)
                                {
                                    var percent = ((evt.loaded / evt.total) * 100).toFixed(2);
                                    $("#progress").find(".progress-bar").width(percent + "%").text(percent + "%");
                                }, false);
                            }
                            return xhr;
                        },
                        success: function(data)
                        {
                            $("#progress").loadTemplate($('#fileUploadDoneTemplate'));
                            if (data['error'] == '')
                            {
                                App.load(106, 'profile_photo', uid, 1, lid, 0, 0, 0, 2, 0, 0);
                                App.cropprofilePicture();
                                App.showCropDialog(uid);
                                $("#imageUploadError").addClass("hide").html('');
                            }
                            else
                            {
                                $("#imageUploadError").removeClass("hide").html(data['error']);
                            }
                        },
                        error: function()
                        {
                            $("#fileUploadError").removeClass("hide").text("An error occured!");
                        },
                        data: formData,
                        dataType: 'json',
                        cache: false,
                        contentType: false,
                        processData: false
                    });
            });
        },
        navigate: function(act, uid, type, lid, eid, id, sh)
        {
            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=' + act + '&u=' + uid + '&t=' + type + '&l=' + lid + '&e=' + eid + '&id=' + id + '&sh=' + sh,
                    async: true,
                    success: function(data)
                    {
                        window.location = data;
                    }
                });
        },
        showPhone: function(type, name)
        {
            if (type == 1)
            {
                $('#landline').hide('slow');
                $('#mobile').show('slow');
                $('#btn_landline').addClass('btn-' + name).removeClass('btn-primary');
                $('#btn_mobile').addClass('btn-primary').removeClass('btn-' + name);
                if ($('#evnt_reg_phone_type').length > 0)
                {
                    $('#evnt_reg_phone_type').val('1');
                }
                else if ($('#art_reg_phone_type').length > 0)
                {
                    $('#art_reg_phone_type').val('1');
                }
                else if ($('#usr_phone_type').length > 0)
                {
                    $('#usr_phone_type').val('1');
                }
            }
            else
            {
                $('#mobile').hide('slow');
                $('#landline').show('slow');
                $('#btn_mobile').addClass('btn-' + name).removeClass('btn-primary');
                $('#btn_landline').addClass('btn-primary').removeClass('btn-' + name);
                if ($('#evnt_reg_phone_type').length > 0)
                {
                    $('#evnt_reg_phone_type').val('2');
                }
                else if ($('#art_reg_phone_type').length > 0)
                {
                    $('#art_reg_phone_type').val('2');
                }
                else if ($('#usr_phone_type').length > 0)
                {
                    $('#usr_phone_type').val('2');
                }
            }
        },
        verifyPhone: function(act, uid, lid, eid, sh)
        {
            var val1 = $('#ver_phone_code').val();
            var val2 = $('#ver_phone').val();
            console.log(encodeURIComponent(val1), val2, act);
            // return false;
            if (val1.length > 0 && val2.length > 0)
            {
                App.load(act, 'phone_block', uid, encodeURIComponent(val1), lid, eid, encodeURIComponent(val2), sh, 0, 0, 2);
            }
        },
        verifyPIN: function(act, uid, lid, eid, sh)
        {
            var val = $('#ver_pin').val();

            if (val.length > 0)
            {
                App.load(act, 'pin_block', uid, 1, lid, eid, encodeURIComponent(val), sh, 0, 0, 0);
            }
        },
        changePhone: function(act, cntnr, type, uid, lid, eid, id, sh)
        {
            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=100&t=' + type + '&l=' + lid + '&e=' + eid + '&id=' + sh,
                    dataType: 'json',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        var buttons = {
                            cancel: {
                                label: data['buttons']['cancel'],
                                className: "btn-default col-xs-3 col-xs-offset-3",
                                callback: function()
                                {
                                }
                            },
                            ok: {
                                label: data['buttons']['ok'],
                                className: "btn-primary col-xs-3",
                                callback: function()
                                {
                                    App.load(act, cntnr, uid, type, lid, eid, id, sh, 2, 0, 2);
                                }
                            }
                        }
                        bootbox.dialog(
                            {
                                message: data['content'],
                                title: data['title'],
                                buttons: buttons
                            });
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        confirmEvent: function(act, uid, lid, eid, type)
        {
            var n = 2;
            var id = 0;

            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=100&t=' + type + '&l=' + lid + '&e=' + n + '&id=' + id,
                    dataType: 'json',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        $.ajax(
                            {
                                type: 'POST',
                                url: 'ajax_data.php',
                                data: 'act=' + act + '&u=' + uid + '&t=' + type + '&l=' + lid + '&e=' + eid,
                                async: true,
                                success: function(data)
                                {
                                    window.location.reload();
                                }
                            });
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        removeMessage: function(n, uid, type, lid, id, sh, up)
        {
            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=100&t=' + type + '&l=' + lid + '&e=' + n + '&id=' + id,
                    dataType: 'json',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        var buttons = {
                            cancel: {
                                label: data['buttons']['cancel'],
                                className: "btn-default col-xs-3 col-xs-offset-3",
                                callback: function()
                                {
                                }
                            },
                            ok: {
                                label: data['buttons']['ok'],
                                className: "btn-primary col-xs-3",
                                callback: function()
                                {
                                    var $parent = $('#message_' + id).parent('div');
                                    $.ajax(
                                        {
                                            type: 'POST',
                                            url: 'ajax_data.php',
                                            data: 'act=60&u=' + uid + '&t=' + sh + '&l=' + lid + '&id=' + id + '&sh=' + sh,
                                            async: true,
                                            beforeSend: function()
                                            {
                                            },
                                            success: function(data)
                                            {
                                                if (data == '1')
                                                {
                                                    if (up == 1)
                                                    {
                                                        var tr = $("tr[data-id='" + id + "']");
//												console.log(tr);
                                                        var table = tr.closest('table').DataTable();
                                                        var the_page = table.page();
//												table.row(tr).remove().draw(false);
                                                        table.row(tr).remove().draw();
                                                        table.page(the_page).draw(false);
                                                    }
                                                    else
                                                    {
                                                        $('#message_' + id).remove();
                                                    }
                                                }
                                            },
                                            error: function(data, textStatus)
                                            {
                                            }
                                        });
                                }
                            }
                        }
                        bootbox.dialog(
                            {
                                message: data['content'],
                                title: data['title'],
                                buttons: buttons
                            });
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        removeMessages: function(n, uid, type, lid, sh)
        {
            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=100&t=' + type + '&l=' + lid + '&e=' + n,
                    dataType: 'json',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        var buttons = {
                            cancel: {
                                label: data['buttons']['cancel'],
                                className: "btn-default col-xs-3 col-xs-offset-3",
                                callback: function()
                                {
                                }
                            },
                            ok: {
                                label: data['buttons']['ok'],
                                className: "btn-primary col-xs-3",
                                callback: function()
                                {
                                    var selected = '';
                                    $("div.message_check > input[type='checkbox']").each(function()
                                    {
                                        if ($(this).is(':checked'))
                                        {
                                            selected += $(this).prop('id').replace('check_', '') + ',';
                                        }
                                    });
                                    selected = selected.replace(/\,+$/, '');

                                    $.ajax(
                                        {
                                            type: 'POST',
                                            url: 'ajax_data.php',
                                            data: 'act=60&u=' + uid + '&t=' + type + '&l=' + lid + '&id=' + selected.replace(/\,+$/, '') + '&sh=' + sh,
                                            async: true,
                                            beforeSend: function()
                                            {
                                            },
                                            success: function(data)
                                            {
//										alert(data);
                                                if (data == '1')
                                                {
                                                    var arr_selected = selected.split(',');
                                                    var sel_total = arr_selected.length;
                                                    var sel_remains = sel_total;

                                                    for (var i = 0; i < sel_total; i++)
                                                    {
                                                        $('#message_' + arr_selected[i]).remove();
                                                        sel_remains--;
                                                    }
                                                    App.filterRemove('rsm', sel_remains);
                                                }
                                            },
                                            error: function(data, textStatus)
                                            {
                                            }
                                        });
                                }
                            }
                        }
                        bootbox.dialog(
                            {
                                message: data['content'],
                                title: data['title'],
                                buttons: buttons
                            });
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        switchStar: function(id, uid, lid, sh)
        {
            var type = ($('#message_' + id + ' div.message_star i.favorite').hasClass('starred') ? '0' : '1');

            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=67&u=' + uid + '&t=' + type + '&l=' + lid + '&id=' + id + '&sh=' + sh,
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        if (data > 0)
                        {
                            if (data == 1)
                            {
                                $('#message_' + id + ' div.message_star > i.favorite').addClass('fa-star active starred').removeClass('fa-star-o');
                            }
                            else
                            {
                                $('#message_' + id + ' div.message_star > i.favorite').addClass('fa-star-o').removeClass('fa-star active starred');
                            }
                        }
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        switchFavorite: function(id, eid, uid, lid, sh)
        {
            var type = ($('#favorite_' + eid).hasClass('select') ? '0' : '1');

            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=67&u=' + uid + '&t=' + type + '&l=' + lid + '&e=' + eid + '&id=' + id + '&sh=' + sh,
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        if (data > 0)
                        {
                            if (data == 1)
                            {
                                $('#favorite_' + eid).addClass('active select');
                            }
                            else
                            {
                                $('#favorite_' + eid).removeClass('active select');
                            }
                        }
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        actionOffer: function(n, type, uid, aid, lid, id)
        {
            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=100&u=' + uid + '&t=' + type + '&l=' + lid + '&e=' + n + '&id=' + id + '&sh=' + aid,
                    dataType: 'json',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        var buttons = {
                            cancel: {
                                label: data['buttons']['cancel'],
                                className: "btn-default col-xs-3 col-xs-offset-3",
                                callback: function()
                                {
                                }
                            },
                            ok: {
                                label: data['buttons']['ok'],
                                className: "btn-primary col-xs-3",
                                callback: function()
                                {
                                    $.ajax(
                                        {
                                            type: 'POST',
                                            url: 'ajax_data.php',
                                            data: $("#form_mdl").serialize(),
                                            async: true,
                                            beforeSend: function()
                                            {
                                            },
                                            success: function(data)
                                            {
                                                window.location = data;
                                            },
                                            error: function(data, textStatus)
                                            {
                                            }
                                        });
                                }
                            }
                        }
                        bootbox.dialog(
                            {
                                message: data['content'],
                                title: data['title'],
                                buttons: buttons
                            });
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        confirmBuy: function(n, type, uid, lid, id, sh)
        {
            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=100&u=' + uid + '&t=' + type + '&l=' + lid + '&e=7&id=' + id,
                    dataType: 'json',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        var buttons = {
                            cancel: {
                                label: data['buttons']['cancel'],
                                className: "btn-default col-xs-3 col-xs-offset-3",
                                callback: function()
                                {
                                }
                            },
                            ok: {
                                label: data['buttons']['ok'],
                                className: "btn-primary col-xs-3",
                                callback: function()
                                {
                                    $.ajax(
                                        {
                                            type: 'POST',
                                            url: 'ajax_data.php',
                                            data: 'act=66&u=' + uid + '&t=' + type + '&l=' + lid + '&e=' + n + '&id=' + id + '&sh=' + sh,
                                            async: true,
                                            dataType: 'json',
                                            beforeSend: function()
                                            {
                                            },
                                            success: function(data)
                                            {
                                                if (typeof data['result'] !== "undefined")
                                                {
                                                    if (n != 3 || data['result'].indexOf('.html') >= 0)
                                                    {
                                                        window.location = data['result'];
                                                    }
                                                    else
                                                    {
                                                        var cntnr = data['result'];

                                                        $.ajax(
                                                            {
                                                                type: 'POST',
                                                                url: 'ajax_data.php',
                                                                data: 'act=71&u=' + uid + '&t=' + type + '&l=' + lid + '&e=' + n + '&id=' + id + '&sh=' + sh,
                                                                async: true,
                                                                dataType: 'json',
                                                                beforeSend: function()
                                                                {
                                                                },
                                                                success: function(data)
                                                                {
                                                                    $('#' + data['selector']).html(data['content']);
                                                                    if (typeof data['selector2'] !== "undefined" && typeof data['content2'] !== "undefined")
                                                                    {
                                                                        $('#' + data['selector2']).html(data['content2']);
                                                                    }
                                                                },
                                                                error: function(data, textStatus)
                                                                {
                                                                }
                                                            });
                                                    }
                                                }
                                                else
                                                {
                                                    $('#offer_buy').html('').remove();
                                                    $('#btn_offer').on('click', function(e)
                                                    {
                                                        window.location = data['result1'];
                                                    }).removeClass('disabled');
                                                    $('#btn_reply').on('click', function(e)
                                                    {
                                                        window.location = data['result2'];
                                                    }).removeClass('disabled');
                                                }
                                            },
                                            error: function(data, textStatus)
                                            {
                                            }
                                        });
                                }
                            }
                        }
                        bootbox.dialog(
                            {
                                message: data['content'],
                                title: data['title'],
                                buttons: buttons
                            });
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        changeStatus: function(n, type, uid, lid, id, sh, cat)
        {
            if (type == 2)
            {
                $.ajax(
                    {
                        type: 'POST',
                        url: 'ajax_data.php',
                        data: 'act=100&u=' + uid + '&t=' + type + '&l=' + lid + '&e=' + n + '&id=' + id + '&cat=' + cat,
                        dataType: 'json',
                        async: true,
                        beforeSend: function()
                        {
                        },
                        success: function(data)
                        {
                            var buttons = {
                                cancel: {
                                    label: data['buttons']['cancel'],
                                    className: "btn-default col-xs-3 col-xs-offset-3",
                                    callback: function()
                                    {

                                        if (typeof cat === 'undefined') {
                                            if ($('#status_' + id).length > 0)
                                            {
                                                $('#status_' + id + '.selectpicker').selectpicker('val', '1');
                                            }
                                        } else {
                                            if ($('#status_category_' + cat).length > 0)
                                            {
                                                if ($('#status_category_' + cat + ' option[value=1]').length > 0) {
                                                    $('#status_category_' + cat + '.selectpicker').selectpicker('val', '1');
                                                } else {
                                                    $('#status_category_' + cat + '.selectpicker').selectpicker('val', '0');
                                                }

                                            }
                                        }
                                    }
                                },
                                ok: {
                                    label: data['buttons']['ok'],
                                    className: "btn-primary col-xs-3",
                                    callback: function()
                                    {
                                        $.ajax(
                                            {
                                                type: 'POST',
                                                url: 'ajax_data.php',
                                                data: 'act=64&u=' + uid + '&t=' + type + '&l=' + lid + '&id=' + id + '&sh=' + sh + '&cat=' + cat,
                                                async: true,
                                                beforeSend: function()
                                                {
                                                },
                                                success: function(data)
                                                {
                                                    if (cat == '') {
                                                        window.location = data;
                                                    } else {
                                                        // add this only when the category is changed
                                                        if ($('#status_category_' + cat).length > 0)
                                                        {
                                                            $('#status_category_' + cat).toggleClass('events_row_status_2');
                                                            $('#status_category_' + cat).closest('tr').toggleClass('events_row_status_2');
                                                            $('button[data-id="status_category_' + cat + '"]').toggleClass('events_row_status_2');
                                                            ;
                                                        }

                                                    }
                                                    window.location.reload();
                                                },
                                                error: function(data, textStatus)
                                                {
                                                }
                                            });
                                    }
                                }
                            }
                            bootbox.dialog(
                                {
                                    message: data['content'],
                                    title: data['title'],
                                    buttons: buttons
                                });
                        },
                        error: function(data, textStatus)
                        {
                        }
                    });
            } else if (type == 3) {
                $.ajax(
                    {
                        type: 'POST',
                        url: 'ajax_data.php',
                        data: 'act=100&u=' + uid + '&t=' + type + '&l=' + lid + '&e=' + n + '&id=' + id + '&cat=' + cat,
                        dataType: 'json',
                        async: true,
                        beforeSend: function()
                        {
                        },
                        success: function(data)
                        {
                            var buttons = {
                                cancel: {
                                    label: data['buttons']['cancel'],
                                    className: "btn-default col-xs-3 col-xs-offset-3",
                                    callback: function()
                                    {

                                        if (typeof cat === 'undefined') {
                                            if ($('#status_' + id).length > 0)
                                            {
                                                $('#status_' + id + '.selectpicker').selectpicker('val', '1');
                                            }
                                        } else {
                                            if ($('#status_category_' + cat).length > 0)
                                            {
                                                if ($('#status_category_' + cat + ' option[value=1]').length > 0) {
                                                    $('#status_category_' + cat + '.selectpicker').selectpicker('val', '1');
                                                } else {
                                                    $('#status_category_' + cat + '.selectpicker').selectpicker('val', '0');
                                                }

                                            }
                                        }
                                    }
                                },
                                ok: {
                                    label: data['buttons']['ok'],
                                    className: "btn-primary col-xs-3",
                                    callback: function()
                                    {
                                        $.ajax(
                                            {
                                                type: 'POST',
                                                url: 'ajax_data.php',
                                                data: 'act=64&u=' + uid + '&t=' + type + '&l=' + lid + '&id=' + id + '&sh=' + sh + '&cat=' + cat,
                                                async: true,
                                                beforeSend: function()
                                                {
                                                    console.log(uid, type, lid, id, sh, cat);
                                                },
                                                success: function(data)
                                                {
                                                    console.log(data);
                                                    if (cat == '') {
                                                        window.location = data;
                                                    } else {
                                                        // add this only when the category is changed
                                                        if ($('#status_category_' + cat).length > 0)
                                                        {
                                                            $('#status_category_' + cat).toggleClass('events_row_status_2');
                                                            $('#status_category_' + cat).closest('tr').toggleClass('events_row_status_2');
                                                            $('button[data-id="status_category_' + cat + '"]').toggleClass('events_row_status_2');
                                                            ;
                                                        }

                                                    }
                                                    window.location.reload();
                                                },
                                                error: function(data, textStatus)
                                                {
                                                }
                                            });
                                    }
                                }
                            }
                            bootbox.dialog(
                                {
                                    message: data['content'],
                                    title: data['title'],
                                    buttons: buttons
                                });
                        },
                        error: function(data, textStatus)
                        {
                        }
                    });
            }
        },
        resetFilters: function()
        {
            if ($('#id').length > 0)
            {
                $('#id').off('change');
                $('#id.selectpicker').selectpicker('val', '');
                console.log('picker event!');
            }
            if ($('#category').length > 0)
            {
                $('#category').off('change');
                $('#category.selectpicker').selectpicker('val', '');
                console.log('picker category!');
            }
            if ($('#fitler_search').length > 0)
            {
                $('#fitler_search').val('');
                console.log('search!');
            }
            $('#form_filter').submit();
        },
        removeContact: function(n, uid, type, lid, id, sh)
        {
            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=100&t=' + type + '&l=' + lid + '&e=' + n + '&id=' + sh,
                    dataType: 'json',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        var buttons = {
                            cancel: {
                                label: data['buttons']['cancel'],
                                className: "btn-default col-xs-3 col-xs-offset-3",
                                callback: function()
                                {
                                }
                            },
                            ok: {
                                label: data['buttons']['ok'],
                                className: "btn-primary col-xs-3",
                                callback: function()
                                {
                                    $.ajax(
                                        {
                                            type: 'POST',
                                            url: 'ajax_data.php',
                                            data: 'act=65&u=' + uid + '&t=' + n + '&l=' + lid + '&id=' + id + '&sh=' + sh,
                                            async: true,
                                            beforeSend: function()
                                            {
                                            },
                                            success: function(data)
                                            {
                                                window.location = data;
                                            },
                                            error: function(data, textStatus)
                                            {
                                            }
                                        });
                                }
                            }
                        }
                        bootbox.dialog(
                            {
                                message: data['content'],
                                title: data['title'],
                                buttons: buttons
                            });
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        toggleBlock: function(selector)
        {
            $('#' + selector).slideToggle();
            if ($('#' + selector).is(':visible'))
            {
                App.scrollDown(selector);
            }
        },
        showVideo: function(n, type, uid, lid, id, sh)
        {
            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=100&u=' + uid + '&t=' + type + '&l=' + lid + '&e=' + n + '&id=' + id,
                    dataType: 'json',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        /*					var buttons = {
                         cancel: {
                         label: data['buttons']['cancel'],
                         className: "btn-default col-xs-3 col-xs-offset-3",
                         callback: function()
                         {
                         }
                         },
                         ok: {
                         label: data['buttons']['ok'],
                         className: "btn-primary col-xs-3",
                         callback: function()
                         {
                         }
                         }
                         }*/
                        bootbox.dialog(
                            {
                                message: data['content'],
                                title: data['title'],
                                /*						buttons: buttons*/
                            });
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        loadContent: function(type, selector)
        {
            var nop = 10;
            if ($('#nop').length > 0)
            {
                var chk = $('#nop').val();
                if (chk != '' && chk > 0)
                {
                    nop = parseInt(chk);
                }
            }
            var eid = 0;
            if ($('#eid').length > 0)
            {
                var chk = $('#eid').val();
                if (chk != '' && chk > 0)
                {
                    eid = parseInt(chk);
                }
            }
            var cid = 0;
            if ($('#cid').length > 0)
            {
                var chk = $('#cid').val();
                if (chk != '' && chk > 0)
                {
                    cid = parseInt(chk);
                }
            }
            var uid = $('#uid').val();
            var lid = $('#lid').val();
            var fid = $('#fid').val();

            $('#' + selector).scrollPagination(
                {
                    nop: nop,
                    offset: 0,
                    delay: 500,
                    scroll: false,
                    type: type,
                    user: uid,
                    lang: lid,
                    id: eid,
                    item: cid,
                    filter: fid,
                });
        },
        removeTimeout: function(selector)
        {
            setTimeout(function()
            {
                if ($(selector).html().length > 0)
                {
                    $(selector).html('').remove();
                }
            }, 5000);
        },
        toggleLanguages: function(action)
        {
            if (action == 1) // Open
            {
                $('#langs-bar').animate(
                    {
                        top: 0,
                        height: 42
                    }, 500);
            }
            else // Close
            {
                $('#langs-bar').animate(
                    {
                        top: -42,
                        height: 0
                    }, 500);
            }
        },
        switchStatus: function(act, selector, type, uid)
        {
            var e = 8;

            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=100&t=' + type + '&l=' + lid + '&e=' + e + '&id=' + uid,
                    dataType: 'json',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        var buttons = {
                            cancel: {
                                label: data['buttons']['cancel'],
                                className: "btn-default col-xs-3 col-xs-offset-3",
                                callback: function()
                                {
                                }
                            },
                            ok: {
                                label: data['buttons']['ok'],
                                className: "btn-primary col-xs-3",
                                callback: function()
                                {
                                    App.load(act, selector, uid, type, lid, 0, 0, 0, 0, 0, 0);
                                }
                            }
                        }
                        bootbox.dialog(
                            {
                                message: data['content'],
                                title: data['title'],
                                buttons: buttons
                            });
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        calculateCost: function(selector, pack, type)
        {
            var uid = $('#uid').val();
            var lid = $('#lid').val();
            App.load(80, selector, uid, type, lid, type, pack, 0, 0, 0, 0);
        },
        checkSum: function(evt)
        {
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            var char = String.fromCharCode(charCode).toString();
            evt = (evt) ? evt : window.event;
            //console.log(char);alert(charCode);
            if( charCode == 188  || charCode == 190 || charCode == 110){
                //     $('.only_decimal_label').remove();
                //    $('.only_decimal').after('<label style="color: #B3B1B1; font-size: 12px;padding: 0px 0px;font-style: italic;line-height: 41px;" class="only_decimal_label">Betrag ohne Komastellen (Cent) eingeben</label>');
                return true;
            } else if (charCode > 31 && (charCode < 48 || charCode > 57 ) && !(charCode > 95 && charCode < 105 || charCode == 110)) {
                return false;
            }

            $('.only_decimal_label').remove();
            return true;

        },
        checkNumber: function()
        {
            var check = $('#payment_packs input[name="pmnt_a"]').val();
            if( check.indexOf('.') != -1 || check.indexOf(',') != -1){
                //     $('.only_decimal_label').remove();
                //     $('.only_decimal').after('<label style="color: #B3B1B1; font-size: 12px;padding: 0px 0px;font-style: italic;line-height: 41px;" class="only_decimal_label">Betrag ohne Komastellen (Cent) eingeben</label>');
                //      return false;
            } else if (Number.isInteger(check)) {
                $('.only_decimal_label').remove();
                $('.only_decimal').after('<label style="color: #B3B1B1; font-size: 12px;padding: 0px 0px;font-style: italic;line-height: 41px;" class="only_decimal_label">Betrag ohne Komastellen (Cent) eingeben</label>');
                return false;
            }

            $('.only_decimal_label').remove();
            return true;

        },
        selectPack: function(element, type, id)
        {
            var ppack = 0;
            var ptype = 0;

            if (type == 1) // Radio
            {
                $('#payment_packs button.btn-lg').each(function () {
                    $(this).removeClass('btn-info').addClass('btn-primary');
                });
                if ($(element).is(':checked')) {
                    $(element).next('button').removeClass('btn-primary').addClass('btn-info');
                }
            }
            else // Button
            {
                $('#payment_packs button.btn-lg').each(function()
                {
                    $(this).removeClass('btn-info').addClass('btn-primary');
                });
                $(element).removeClass('btn-primary').addClass('btn-info');
                $(element).prev('input[type="radio"]').prop('checked', true);
            }
            if (App.checkNumber() && parseInt($('#payment_packs input[name="pmnt_a"]').val()) > 0 )
            {
                ppack = parseFloat($('#payment_packs input[name="pmnt_a"]').val());
            }
            if ($('#payment_types input[type="radio"]').is(':checked'))
            {
                ptype = $('#payment_types input[type="radio"]:checked').val();
            }

            if (ppack > 0 && ptype > 0)
            {
                $('#payment button.for_disable').removeClass('disabled');
            }else{
                $('#payment button.for_disable').addClass('disabled');
            }
            // console.log(ppack+', '+ptype)
            App.calculateCost('payment_cost', ppack, ptype);
        },
        selectPayment: function(element, type, id)
        {
            var ppack = 0;
            var ptype = 0;

            if (type == 1) // Radio
            {
                $('#payment_types button.btn-lg').each(function()
                {
                    $(this).removeClass('btn-info').addClass('btn-primary');
                });
                if ($(element).is(':checked'))
                {
                    $(element).next('button').removeClass('btn-primary').addClass('btn-info');
                }
            }
            else // Button
            {
                $('#payment_types button.btn-lg').each(function()
                {
                    $(this).removeClass('btn-info').addClass('btn-primary');
                });
                $(element).removeClass('btn-primary').addClass('btn-info');
                $(element).prev('input[type="radio"]').prop('checked', true);
            }
            if (App.checkNumber()  && parseFloat($('#payment_packs input[name="pmnt_a"]').val()) > 0 )
            {
                ppack = parseFloat($('#payment_packs input[name="pmnt_a"]').val());
            }
            if ($('#payment_types input[type="radio"]').is(':checked'))
            {
                ptype = $('#payment_types input[type="radio"]:checked').val();
            }
            //alert(ppack);
            if (ppack > 0 && ptype > 0)
            {
                $('#payment button.for_disable').removeClass('disabled');
            }else{
                $('#payment button.for_disable').addClass('disabled');
            }

            App.calculateCost('payment_cost', ppack, ptype);
        },
        switchRowStyle: function(element, type)
        {
            if (type == 1)
            {
                if (!element.parents('div.message_block').hasClass('active'))
                {
                    element.parents('div.message_block').addClass('active')
                }
            }
            else
            {
                if (element.parents('div.message_block').hasClass('active'))
                {
                    element.parents('div.message_block').removeClass('active')
                }
            }
        },
        filterRemove: function(selector, selected)
        {
            if ($('#' + selector).length > 0)
            {
                var $div = $('#' + selector).parent('div').find("div[class^='col-xs-']:first-child");

                if (selected > 0)
                {
                    if ($('#' + selector).hasClass('hide'))
                    {
                        var uid = $('#uid').val();
                        var lid = $('#lid').val();
                        var tid = $('#tid').val();

                        $.ajax(
                            {
                                type: 'POST',
                                url: 'ajax_data.php',
                                data: 'act=68&u=' + uid + '&t=' + tid + '&l=' + lid,
                                async: true,
                                beforeSend: function()
                                {
                                },
                                success: function(data)
                                {
                                    if ($div.hasClass('col-xs-8'))
                                    {
                                        $div.addClass('col-xs-7').removeClass('col-xs-8');
                                    }
                                    if ($('#filter input[type=checkbox]').length > 0)
                                    {
                                        $('#filter input[type=checkbox]').prop('checked', true);
                                    }

                                    $('#' + selector).html(data).removeClass('hide');
                                },
                                error: function(data, textStatus)
                                {
                                }
                            });
                    }
                }
                else
                {
                    if (!$('#' + selector).hasClass('hide'))
                    {
                        $('#' + selector).addClass('hide').html('');

                        if ($div.hasClass('col-xs-7'))
                        {
                            $div.addClass('col-xs-8').removeClass('col-xs-7');
                        }
                        if ($('#filter input[type=checkbox]').length > 0)
                        {
                            $('#filter input[type=checkbox]').prop('checked', false);
                        }
                    }
                }
            }
        },
        filterAction: function(type)
        {
            if ($("div.message_check > input[type='checkbox']").length > 0)
            {
                var selected = 0;

                $("div.message_check > input[type='checkbox']").each(function()
                {
                    switch (parseInt(type))
                    {
                        case 1: // All
                            $(this).prop('checked', true);
                            App.switchRowStyle($(this), 1);
                            selected++;
                            break;
                        case 2: // New
                        case 3: // Read
                        case 4: // Replyed
                            var value = $(this).val();
                            if (parseInt(value) == parseInt(type) || (parseInt(type) == 3 && parseInt(value) == 4))
                            {
                                $(this).prop('checked', true);
                                App.switchRowStyle($(this), 1);
                                selected++;
                            }
                            else
                            {
                                $(this).prop('checked', false);
                                App.switchRowStyle($(this), 0);
                            }
                            break;
                        default:
                            $(this).prop('checked', false);
                            App.switchRowStyle($(this), 0);
                    }
                });

                App.filterRemove('rsm', selected);
            }
        },
        showMap: function(n, type, uid, lid, id, sh)
        {
            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=100&u=' + uid + '&t=' + type + '&l=' + lid + '&e=' + n + '&id=' + id,
                    dataType: 'json',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        if (data['content'] != '')
                        {
                            bootbox.dialog(
                                {
                                    message: data['content'],
                                    title: data['title']
                                });
                        }
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        toggleSection: function(id, type)
        {
            var table = '';
            var selector = '#section-' + id + ' > div.group > span:last-child';
            console.log('The selector: ' + selector);

            if ($(selector).hasClass('fa-caret-up'))
            {
                $("tr[data-section='section-" + id + "']").each(function(index, element)
                {
                    if (table == '')
                    {
                        table = $(this).closest('table');
                    }
                    $(this).hide('slow');
                });
                table.next('div.row').hide('slow');
                if ($('.details_message_d').is(":visible")) {
                    $('.details_message_d').hide('slow');
                    var tr_parent = $('.details_message_d').closest('tr');
                    tr_parent.hide('slow');
                }
                if (!$('#check-all-' + id).hasClass('hide'))
                {
                    $('#check-all-' + id).addClass('hide')
                }

                $(selector).addClass('fa-caret-down').removeClass('fa-caret-up');
                $(selector).prop('title', $(selector).data('down-text')).tooltip('fixTitle');
                if (type == 1)
                {
                    $(selector).tooltip('show');
                }
            }
            else
            {
                $("tr[data-section='section-" + id + "']").each(function(index, element)
                {
                    if (table == '')
                    {
                        table = $(this).closest('table');
                    }
                    $(this).show('slow');
                });
                table.next('div.row').show('slow');
                if ($('.details_message_d').length) {
                    if ($('.details_message_d').is(":hidden")) {
                        $('.details_message_d').show('slow');
                        var tr_parent = $('.details_message_d').closest('tr');
                        tr_parent.show('slow');
                    }
                }
                if ($('#check-all-' + id).hasClass('hide'))
                {
                    $('#check-all-' + id).removeClass('hide')
                }

                $(selector).addClass('fa-caret-up').removeClass('fa-caret-down');
                $(selector).prop('title', $(selector).data('up-text')).tooltip('fixTitle');
                if (type == 1)
                {
                    $(selector).tooltip('show');
                }
            }
        },
        changeNotes: function(id, uid, lid, type)
        {
            if (type == 1)
            {
                $.ajax(
                    {
                        type: 'POST',
                        url: 'ajax_data.php',
                        data: 'act=72&u=' + uid + '&l=' + lid + '&id=' + id + '&sh=' + type,
                        dataType: 'json',
                        async: true,
                        beforeSend: function()
                        {
                        },
                        success: function(data)
                        {
                            $('#notes_' + id).html(data['content']);

                            if ($('#notes_' + id + ' textarea[maxlength].counter').length > 0)
                            {
                                App.controlMaxlength('#notes_' + id + ' textarea[maxlength].counter');
                            }
                            if ($('#note_' + id + '.action_icon').length > 0)
                            {
                                if (data['state'] == 0)
                                {
                                    if (!$('#note_' + id + '.action_icon').hasClass('action_icon_3'))
                                    {
                                        $('#note_' + id + '.action_icon').addClass('action_icon_3').removeClass('action_icon_6');
                                    }
                                }
                                else
                                {
                                    if (!$('#note_' + id + '.action_icon').hasClass('action_icon_6'))
                                    {
                                        $('#note_' + id + '.action_icon').addClass('action_icon_6').removeClass('action_icon_3');
                                    }
                                }
                            }
                        },
                        error: function(data, textStatus)
                        {
                        }
                    });
            }
            else
            {
                $.ajax(
                    {
                        type: 'POST',
                        url: 'ajax_data.php',
                        data: $('#form_' + id).serialize(),
                        dataType: 'json',
                        async: true,
                        beforeSend: function()
                        {
                        },
                        success: function(data)
                        {
                            $('#notes_' + id).html(data['content']);

                            if ($('#notes_' + id + ' textarea[maxlength].counter').length > 0)
                            {
                                App.controlMaxlength('#notes_' + id + ' textarea[maxlength].counter');
                            }
                            if ($('#note_' + id + '.action_icon').length > 0)
                            {
                                if (data['state'] == 0)
                                {
                                    if (!$('#note_' + id + '.action_icon').hasClass('action_icon_3'))
                                    {
                                        $('#note_' + id + '.action_icon').addClass('action_icon_3').removeClass('action_icon_6');
                                    }
                                }
                                else
                                {
                                    if (!$('#note_' + id + '.action_icon').hasClass('action_icon_6'))
                                    {
                                        $('#note_' + id + '.action_icon').addClass('action_icon_6').removeClass('action_icon_3');
                                    }
                                }
                            }
                        },
                        error: function(data, textStatus)
                        {
                        }
                    });
            }
        },
        switchArchive: function(n, id, type, uid, lid, sh, sec)
        {
            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=100&t=' + type + '&l=' + lid + '&e=' + n + '&id=' + id,
                    dataType: 'json',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        var buttons = {
                            cancel: {
                                label: data['buttons']['cancel'],
                                className: "btn-default col-xs-3 col-xs-offset-3",
                                callback: function()
                                {
                                }
                            },
                            ok: {
                                label: data['buttons']['ok'],
                                className: "btn-primary col-xs-3",
                                callback: function()
                                {
                                    if (parseInt(sec) > 0)
                                    {
                                        var sid = [];
                                        var table = $('#section-' + sec).closest('div.wrapper').find('table');
                                        var table_id = table.prop('id');

                                        if ($("#" + table_id + " > tbody > tr > td span.event_archive > input[type=checkbox]:checked").length > 0)
                                        {
                                            $("#" + table_id + " > tbody > tr > td span.event_archive > input[type=checkbox]:checked").each(function(index, element)
                                            {
                                                sid.push($(this).prop('id').replace('check_', ''));
                                            });
                                        }

                                        $.ajax(
                                            {
                                                type: 'POST',
                                                url: 'ajax_data.php',
                                                data: 'act=73&u=' + uid + '&t=' + type + '&l=' + lid + '&id=' + sid + '&sh=' + sh,
                                                async: true,
                                                beforeSend: function()
                                                {
                                                },
                                                success: function(data)
                                                {
                                                    if (data != '')
                                                    {
//												console.log(data);
                                                        var the_table = table.DataTable();
                                                        var the_page = the_table.page();
                                                        for (var i = 0; i < sid.length; i++)
                                                        {
                                                            var tr = $("tr[data-id='" + sid[i] + "']");
//													var table = tr.closest('table').DataTable();
                                                            the_table.row(tr).remove();
                                                        }

//												table.row(tr).remove().draw(false);
                                                        the_table.draw();
                                                        the_table.page(the_page).draw(false);

                                                        App.toggleArchive(sec);
                                                    }
                                                },
                                                error: function(data, textStatus)
                                                {
                                                }
                                            });
                                    }
                                    else
                                    {
                                        $.ajax(
                                            {
                                                type: 'POST',
                                                url: 'ajax_data.php',
                                                data: 'act=73&u=' + uid + '&t=' + type + '&l=' + lid + '&id=' + id + '&sh=' + sh,
                                                async: true,
                                                beforeSend: function()
                                                {
                                                },
                                                success: function(data)
                                                {
                                                    if (data == '1')
                                                    {
                                                        var tr = $("tr[data-id='" + id + "']");
                                                        var table = tr.closest('table').DataTable();

                                                        table.row(tr).remove().draw(false);
                                                    }
                                                },
                                                error: function(data, textStatus)
                                                {
                                                }
                                            });
                                    }
                                }
                            }
                        }
                        bootbox.dialog(
                            {
                                message: data['content'],
                                title: data['title'],
                                buttons: buttons
                            });
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        toggleArchive: function(section)
        {
            var selected = $("tr[data-section='section-" + section + "'] > td span.event_archive > input[type='checkbox']:checked").length;

            if (selected > 0)
            {
                if ($('#check-all-' + section + ' > span.event_check_all').hasClass('hide'))
                {
                    $('#check-all-' + section + ' > span.event_check_all').removeClass('hide');
                }
            }
            else
            {
                if (!$('#check-all-' + section + ' > span.event_check_all').hasClass('hide'))
                {
                    $('#check-all-' + section + ' > span.event_check_all').addClass('hide');
                }
            }
        },
        showPreview: function(n, id, type, uid, lid, sh)
        {
            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=100&u=' + uid + '&t=' + sh + '&l=' + lid + '&e=' + n + '&id=' + id + '&sh=' + type,
                    dataType: 'json',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        bootbox.dialog(
                            {
                                message: data['content'],
                                title: data['title'],
                                className: 'modal-preview'
                            });
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        showDetails: function(type, n, id, uid, lid, sh)
        {
            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=100&u=' + uid + '&t=' + type + '&l=' + lid + '&e=' + n + '&id=' + id + '&sh=' + sh,
                    dataType: 'json',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        dlg = bootbox.dialog(
                            {
                                message: data['content'],
                                title: data['title'],
                                className: 'modal-preview'
                            });
                        if ($('.editor').length > 0) {
                            $('.editor').wysihtml5(
                                {
                                    locale: arr_messages[1],
                                    "html": false,
                                    "link": false,
                                    "lists": false,
                                    "image": false
                                });
                        }
                    },
                    error: function(data, textStatus)
                    {
                    }
                });
        },
        showCropDialog: function(uid)
        {
            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    // data: 'act=105&u='+uid+'&t='+type+'&l='+lid+'&e='+n+'&id='+id+'&sh='+sh,
                    data: 'act=105&u=' + uid,
                    dataType: 'json',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        dlg = bootbox.dialog(
                            {
                                message: data['content'],
                                title: data['title'],
                                buttons: {
                                    ok: {
                                        label: data['buttons']['ok'],
                                        className: "btn btn-primary",
                                        callback: function() {
                                            App.cropImage();
                                        }
                                    },
                                    cancel: {
                                        className: "btn btn-default",
                                        label: data['buttons']['cancel']
                                    }
                                },
                                className: 'modal-preview'
                            });

                        App.cropprofilePicture();
                    },
                    error: function(data, textStatus)
                    {
                        /* debud */
                        data = {"title":"Crop Image","content":"\t\t\t\t<div class=\"form-group crop_image\">\n\t\t\t\t\t<label for=\"usr_photo\" class=\"col-sm-12 control-label\">Profile picture<\/label>\n\t\t\t\t\t<div id=\"profile_photo\" class=\"col-sm-6\">\n\t\t\t\t\t\t<img id=\"target\" src=\"uploads\/36\/user\/orig_avatar.jpg?rid=2671886a1f42f8d18040fede98f00b45\" alt=\"\" \/>\n\t\t\t\t\t<\/div>\n                        \t<div id=\"preview-pane\">\n                         \t<div class=\"preview-container\">\n\t\t\t\t\t\t\t\t<img class=\"jcrop-preview\" src=\"uploads\/36\/user\/orig_avatar.jpg?rid=a822113d919ba11ef6739b725e1a4f54\" alt=\"\" \/>\n                         \t<\/div>\n                        \t<\/div>\n                              \t<input type=\"hidden\" id=\"croped_image_x\" name=\"croped_image_x\" \/>\n                              \t<input type=\"hidden\" id=\"croped_image_y\" name=\"croped_image_y\" \/>\n                              \t<input type=\"hidden\" id=\"croped_image_w\" name=\"croped_image_w\" \/>\n                              \t<input type=\"hidden\" id=\"croped_image_h\" name=\"croped_image_h\" \/>\n\t\t\t\t<\/div>\n","buttons":{"ok":"Confirm","cancel":"Cancel"}};
                        dlg = bootbox.dialog(
                            {
                                message: data['content'],
                                title: data['title'],
                                buttons: {
                                    ok: {
                                        label: data['buttons']['ok'],
                                        className: "btn btn-primary",
                                        callback: function() {
                                            App.cropImage();
                                        }
                                    },
                                    cancel: {
                                        className: "btn btn-default",
                                        label: data['buttons']['cancel']
                                    }
                                },
                                className: 'modal-preview'
                            });

                        App.cropprofilePicture();

                        /* end debug */
                    }
                });
        },
        toggleReply: function(selector, type, uid, lid, id, sh)
        {
            console.log(selector);
            if (!$('#' + selector).is(':visible'))
            {
                $.ajax(
                    {
                        type: 'POST',
                        url: 'ajax_data.php',
                        data: 'act=74&u=' + uid + '&t=' + type + '&l=' + lid + '&id=' + id + '&sh=' + sh,
                        async: true,
                        beforeSend: function()
                        {
                        },
                        success: function(data)
                        {
                            console.log(data);
                            $('#' + selector).html(data);
                            App.toggleBlock(selector);
                        },
                        error: function(data, textStatus)
                        {
                        },
                        complete: function(data)
                        {
                            if ($('.editor').length > 0)
                            {
                                $('.editor').wysihtml5(
                                    {
                                        locale: arr_messages[1],
                                        "html": false,
                                        "link": false,
                                        "lists": false,
                                        "image": false
                                    });
                            }
                            if ($('#form_msg').length > 0)
                            {
                                App.validateCommonForm(5, 'form_msg');

                                $('#form_msg button').on('click', function(e)
                                {
                                    if ($("#form_msg").valid())
                                    {
                                        console.log($('#form_msg').serialize());
                                        $.ajax(
                                            {
                                                type: 'POST',
                                                url: 'ajax_data.php',
                                                data: $('#form_msg').serialize(),
                                                async: true,
                                                beforeSend: function()
                                                {
                                                },
                                                success: function(result)
                                                {
                                                    $('#' + selector).html(result);
                                                    $('#message_buttons').hide('slow');
//											App.removeTimeout(selector);
                                                    setTimeout(function()
                                                    {
                                                        if ($('#' + selector).html().length > 0)
                                                        {
                                                            $('#' + selector).html('').remove();
                                                            dlg.modal('hide');
                                                            setTimeout(function() {
                                                                window.location.reload();
                                                            }, 1000);
                                                        }
                                                    }, 3000);
                                                },
                                                error: function(data, textStatus)
                                                {
                                                }
                                            });
                                    }
                                });
                            }
                        }
                    });
            }
            else
            {
                App.toggleBlock(selector);
                $('#' + selector).html('');
            }
        },
        flashExpandById: function()
        {
            var id = $('.flash_expand_by_id').val();
            var table = $('*[data-id="' + id + '"]').closest('table').DataTable();
            var tr = $('*[data-id="' + id + '"]').closest('tr');
            var row = table.row(tr);

            var uid = $('#uid').val();
            $.ajax(
                {
                    type: 'POST',
                    url: 'ajax_data.php',
                    data: 'act=69&u=' + uid + '&id=' + id + '&sh=1',
                    async: true,
                    beforeSend: function()
                    {
                    },
                    success: function(data)
                    {
                        // Open this row
                        row.child(data).show();
                        tr.addClass('shown');
                    },
                    error: function(data, textStatus)
                    {
                        // Open this row
                        row.child(data).show();
                        tr.addClass('shown');
                    },
                    complete: function(data)
                    {
                        if ($('#notes_' + id + ' textarea[maxlength].counter').length > 0)
                        {
                            App.controlMaxlength('#notes_' + id + ' textarea[maxlength].counter');
                        }

                        if ($('#messages-history-' + id).length > 0)
                        {
                            $('#messages-history-' + id).DataTable(
                                {
                                    "autoWidth": true,
                                    searching: false,
                                    ordering: false,
                                    "pageLength": 10,
                                    "lengthChange": false,
                                    "info": false,
                                    "orderCellsTop": true,
                                    paging: true,
                                    language: dt_language,
                                    stateSave: false,
                                    responsive: true,
                                    "columns":
                                        [
                                            {"width": "1%", "class": "details2"}, /* Status */
                                            {"width": "10%", "class": "details2"}, /* Date */
                                            {"width": "30%", "class": "details2"}, /* Subject */
                                            {"width": "58%", "class": "details2"}, /* Content */
                                            {"width": "1%"} /* Actions */
                                        ],
                                    "drawCallback": function(settings)
                                    {
                                        var api = this.api();
                                        var info = api.page.info();
                                        var id = this.prop('id');
                                        var parent = this.parent('#' + id + '_wrapper');

                                        if (parent.find('#' + id + '_paginate').length > 0)
                                        {
                                            var pages = parent.find('#' + id + '_paginate').closest('div.row');

                                            if (info.pages == 1)
                                            {
                                                if (!pages.hasClass('hide'))
                                                {
                                                    pages.addClass('hide');
                                                }
                                            }
                                            else
                                            {
                                                if (pages.hasClass('hide'))
                                                {
                                                    pages.removeClass('hide');
                                                }
                                            }
                                        }
                                    }
                                });

                            $('#messages-history-' + id + ' tbody').on('click', 'td.details2', function()
                            {
                                var tr = $(this).closest('tr');

                                if (parseInt(tr.data('type')) == 1)
                                {
                                    App.showDetails(tr.data('type'), 15, tr.data('id'), uid, lid, tr.data('kind'));
                                }
                                else
                                {
                                    window.location = tr.data('message') + '_' + tr.data('id') + '.html';
                                }
                            });
                        }
                    }
                });
        },


    }
}();


function cropprofilePicture() {
    window.jcrop_api;
    window.boundx;
    window.boundy;

    // Grab some information about the preview pane
    window.$preview = $('#preview-pane');
    window.$pcnt = $('#preview-pane .preview-container');
    window.$pimg = $('#preview-pane .preview-container img');

    window.xsize = $pcnt.width();
    window.ysize = $pcnt.height();
    console.log(xsize, ysize);
    $('#target').Jcrop({
        onChange: updatePreview,
        onSelect: updatePreview,
        aspectRatio: 1,
        minSize: [150, 150]
    }, function() {
        // Use the API to get the real image size
        window.bounds = this.getBounds();
        boundx = bounds[0];
        boundy = bounds[1];
        // Store the API in the jcrop_api variable
        jcrop_api = this;

        jcrop_api.setSelect([100, 100, 150, 150]);
        // Move the preview into the jcrop container for css positioning
        $preview.appendTo(jcrop_api.ui.holder);
    });

}

function updatePreview(c) {
    if (parseInt(c.w) > 0)
    {
        var rx = xsize / c.w;
        var ry = ysize / c.h;

        $pimg.css({
            width: Math.round(rx * boundx) + 'px',
            height: Math.round(ry * boundy) + 'px',
            marginLeft: '-' + Math.round(rx * c.x) + 'px',
            marginTop: '-' + Math.round(ry * c.y) + 'px'
        });
    }
    $('#croped_image_x').val(c.x);
    $('#croped_image_y').val(c.y);
    $('#croped_image_w').val(c.w);
    $('#croped_image_h').val(c.h);
}