(function ($) {
    var app = {
        onAddLinkButtonClick: function (event) {
            event.preventDefault();

            var controlForm = $('.links-container'),
                currentEntry = $(this).parents('.entry:first'),
                newEntry = $(currentEntry.clone());
            newEntry.find('input').val('');
            newEntry.appendTo(controlForm);
            controlForm.find('.entry:not(:last) .btn-add')
                .removeClass('btn-add').addClass('btn-remove')
                .removeClass('btn-success').addClass('btn-danger')
                .html('<span class="glyphicon glyphicon-minus"></span>');
        },
        onRemoveButtonClick: function(event) {
            event.preventDefault();

            $(this).parents('.entry:first').remove();
        },
        onFormSubmit: function (event) {
            event.preventDefault();

            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize(),
                dataType: 'json'
            })
                .done(app.onSubmitSuccess)
                .fail(app.onSubmitError);
        },
        onSubmitSuccess: function (data, status) {
            $(".form-group").removeClass('has-error');

            if (data.error) {
                data.error.forEach(function (error) {
                    $("input[name='" + error.param + "']").parents('.form-group').addClass('has-error');
                    $("textarea[name='" + error.param + "']").parents('.form-group').addClass('has-error');
                });
            }
        },
        onSubmitError: function (jqXHR, status, error) {
            console.error(status, error);
        }
    };

    $(document).on('click', '.btn-add', app.onAddLinkButtonClick);
    $(document).on('click', '.btn-remove', app.onRemoveButtonClick);
    $('form').on('submit', app.onFormSubmit);
} (jQuery));