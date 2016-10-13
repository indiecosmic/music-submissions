(function ($) {
    var app = {
        onAddLinkButtonClick: function (event) {
            event.preventDefault();

            var controlForm = $('.links-container'),
                currentEntry = $(this).parents('.entry:first'),
                newEntry = $(currentEntry.clone());
            newEntry.find('input').val('');

            newEntry.appendTo(controlForm);
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
        onSubmitSuccess: function(data, status) {
            console.log(data, status);
        },
        onSubmitError: function( jqXHR, status, error) {
            console.error(status, error);
        }
    };

    $(document).on('click', '.btn-add', app.onAddLinkButtonClick);
    $('form').on('submit', app.onFormSubmit);
} (jQuery));