$(function () {
    $('#edit-systemmenu').live('click', function (e) {
        e.preventDefault();
        var id = $(this).attr('rel');

        $.ajax({
            url: '/Administration/SystemMenu/EditSystemMenu/',
            data: "id=" + id,
            type: "Get",
            cache: false,
            success: function (data) {
                var popup = $.telerik.window.create({
                    title: 'Edit System Menu',
                    modal: true,
                    onClose: function (e) {
                        e.preventDefault();
                        popup.data('tWindow').destroy();
                    }
                });
                popup.find('.t-window-content').html(data);
                var window = popup.data('tWindow');
                window.center();
            }
        });
    });

    $('#delete-systemmenu').live('click', function (e) {
        e.preventDefault();
        var id = $(this).attr('rel');
        var deletedItem = $(this).parents("tr");
        if (confirm("Bạn có chắc chắn muốn xóa ?")) {
            deletedItem.animate({
                opacity: 0
            }, function () {
                deletedItem.remove();
            });

            $.ajax({
                url: '/Administration/SystemMenu/DeleteSystemMenu/',
                data: "id=" + id,
                type: "Post",
                cache: false,
                success: function (data) {
                }
            });
        }
    });

    $('#add-systemMenu').live('click', function (e) {
        e.preventDefault();

        $.ajax({
            url: '/Administration/SystemMenu/NewSystemMenu',
            type: "Get",
            cache: false,
            success: function (data) {
                var popup = $.telerik.window.create({
                    title: 'Insert System Menu',
                    modal: true,
                    onClose: function (e) {
                        e.preventDefault();
                        popup.data('tWindow').destroy();
                    }
                });
                popup.find('.t-window-content').html(data);
                var window = popup.data('tWindow');
                window.center();
            }
        });
    });
});