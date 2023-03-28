var AjaxCom = {
    initialize: function () {
        if (!$().ajaxForm) {
            console.error("Can`t find $ Form Plugin. Please add this library manually: https://$.malsup.com/form/")
        }
        AjaxCom.rating.initialize()
    },
    rating: {
        initialize: function () {
            var stars = $('.ac_form .rating').find('.rating_stars>span')
            stars.hover(
                // hover in
                function () {
                    $(this).addClass('hover').removeClass('unhover')
                    $(this).prevAll().addClass('hover').removeClass('unhover')
                    $(this).nextAll().removeClass('hover').addClass('unhover')
                },
                // hover out
                function () {
                    $(this).parent().children().removeClass('hover unhover')
                }
            )
            stars.on('touchend click', 
                // set rating
                function () {
                    $(this).parent().children().removeClass('active hover unhover')
                    $(this).prevAll().addClass('active')
                    $(this).addClass('active')
                    $(this).closest('form').find('input[name="rating"]').val($(this).data('rating'))
            })
        }
    }
}

$(document).ready(function () {
    AjaxCom.initialize()
});

(function () {

    const result = {

        init: function () {

            this.eventSubscription()

        },

        eventSubscription: function () {

            $(document).on('af_complete', $.proxy(this.eventAfComplete, this))
        },

        eventAfComplete: function (event, response) {
            if ('service' in response.data && response.data.service == 'ajaxcomments') {
                this.cleanDOM(response)
                this.offLibraries(response)
                this.getService(response)
            }
        },

        cleanDOM: function (response) {

            $('.is-invalid').removeClass('is-invalid')
            $('.invalid-feedback').remove()
            $('.alert').hide()

        },

        offLibraries: function (response) {

            response.message = '';

        },

        getService: function (response) {
            let modalID, imageBlocks, alertClass
            let alert = response.form.find('.alert')

            if ('modalID' in response.data) {
                modalID = response.data.modalID
            }

            if (response.data.result) {
                if ('location' in response.data) {
                    if (modalID) {
                        if (response.data.editButtonID && response.data.redirectEdit) {
                            $('#' + response.data.editButtonID).attr('href', response.data.redirectEdit)
                        }
                        $('#' + modalID).on('hidden.bs.modal', function (e) {
                            window.location.href = response.data.location;
                        })
                    } else {
                        window.location = response.data.location
                    }
                }
                alertClass = 'alert-success'
            } else {
                alertClass = 'alert-danger'
                $.each(response.data.errors, (i, msg) => {
                    response.form.find('[name="' + i + '"]')
                        .addClass('is-invalid').parent()
                        .append($('<span class="invalid-feedback">' + msg + '</span>'))
                    if (response.form.attr('id')) {
                        $('body').find('[form="' + response.form.attr('id') + '"][name="' + i + '"]')
                            .addClass('is-invalid').parent()
                            .append($('<span class="invalid-feedback">' + msg + '</span>'))
                    }
                })
            }
            if (modalID) {
                $('.modal').modal('hide')
                $('#' + modalID).modal('show')
            }
            if (alert.length > 0 && response.data.message) {
                alert.show().attr('class', alert.attr('class').replace(/\balert-\w*\b/g, '')).addClass(alertClass).text(response.data.message)
            }
        }
    }

    result.init()

})()