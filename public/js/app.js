(function ($) {
    var app = {
        onAddLinkButtonClick: function (event) {
            event.preventDefault();

            var $template = $('#linkTemplate'),
                $clone = $template
                    .clone()
                    .removeClass('hide')
                    .removeAttr('id')
                    .insertBefore($template);
        },
        onRemoveButtonClick: function (event) {
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
    $('#add-links-button').click(app.onAddLinkButtonClick);
    $(document).on('click', '.btn-remove', app.onRemoveButtonClick);
    $('form').on('submit', app.onFormSubmit);
} (jQuery));