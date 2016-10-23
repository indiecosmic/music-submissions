(function ($) {
    var app = {
        onAddLinkButtonClick: function (event) {
            event.preventDefault();

            var $template = $('#linkTemplate'),
                $clone = $template
                    .clone()
                    .removeClass('hide')
                    .removeAttr('id');
            $clone.find('input')
                .attr('name', 'links[]')
                .prop('required', true);
            $clone.insertBefore($template);
        },
        onRemoveButtonClick: function (event) {
            event.preventDefault();

            $(this).parents('.entry:first').remove();
        },
        onFormSubmit: function (event) {
            event.preventDefault();
            var $submitButton = $('button[type="submit"]');
            $submitButton
                .addClass('disabled')
                .prop('disabled', true);

            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize(),
                dataType: 'json'
            })
                .done(app.onSubmitSuccess)
                .fail(app.onSubmitError)
                .always(app.onSubmitComplete);

        },
        onSubmitSuccess: function (data, status) {
            $(".form-group").removeClass('has-error');

            if (data.error) {
                data.error.forEach(function (error) {
                    $("input[name='" + error.param + "']").parents('.form-group').addClass('has-error');
                    $("textarea[name='" + error.param + "']").parents('.form-group').addClass('has-error');
                });
                return;
            }
            window.location = 'tack';
        },
        onSubmitError: function (jqXHR, status, error) {
            console.error(status, error);
        },
        onSubmitComplete: function () {
            var $submitButton = $('button[type="submit"]');
            $submitButton
                .removeClass('disabled')
                .prop('disabled', false);
        }
    };
    $('#add-links-button').click(app.onAddLinkButtonClick);
    $(document).on('click', '.btn-remove', app.onRemoveButtonClick);
    $('form').on('submit', app.onFormSubmit);
} (jQuery));