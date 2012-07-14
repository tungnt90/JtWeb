$('.image-item img').live('click', function (e) {
    e.preventDefault();
    var text = $(this).attr('alt');
    $.colorbox({ href: text });
});

