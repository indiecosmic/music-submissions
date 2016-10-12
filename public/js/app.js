(function ($) {
    $(document).on('click', '.btn-add', function(event) {
        event.preventDefault();

        var controlForm = $('.links-container'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone());
            newEntry.find('input').val('');
            
            newEntry.appendTo(controlForm);
    });
}(jQuery));