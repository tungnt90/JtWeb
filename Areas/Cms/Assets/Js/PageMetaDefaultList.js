var currPopupwindow;
$(function () {
    $('#edit-pagemetadefault').live("click", function (e) {
        e.preventDefault();
        var id = $(this).attr('rel');
        $.ajax({
            url: '/Cms/PageMetaDefault/EditPageMetaDefault/',
            data: "id=" + id,
            type: "Get",
            cache: false,
            success: function (data) {
                var popup = $.telerik.window.create({
                    title: 'Edit Page Meta Default',
                    modal: true,
                    onClose: function (e) {
                        e.preventDefault();
                        popup.data('tWindow').destroy();
                    }
                });
                popup.find('.t-window-content').html(data);
                var window = popup.data('tWindow');
                currPopupwindow = window;
                window.center();
                var TabId = $(".list-page-type-tabs li a.selected").attr("href");
                $("#TabId").val(TabId);
            }
        });

    });
    $('#delete-pagemetadefault').live('click', function (e) {
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
                url: '/Cms/PageMetaDefault/DeletePageMetaDefault/',
                data: "id=" + id,
                type: "Post",
                cache: false,
                success: function (data) {
                }
            });
        }
    });
    $('#new-pagemetadefault').live('click', function (e) {
        e.preventDefault();
        var TabId = $(".list-page-type-tabs li a.selected").attr("href");
        var pageTypeId = GetSelectedPageTypeId();
        $.ajax({
            url: '/Cms/PageMetaDefault/NewPageMetaDefault',
            data: { pageTypeId: pageTypeId, pageTabId: TabId },
            type: "Get",
            cache: false,
            success: function (data) {
                var popup = $.telerik.window.create({
                    title: 'Insert Page Meta Default',
                    modal: true,
                    onClose: function (e) {
                        e.preventDefault();
                        popup.data('tWindow').destroy();
                    }
                });
                popup.find('.t-window-content').html(data);
                var window = popup.data('tWindow');
                window.center();
                $("#TabId").val(TabId);
            }
        });
    });
}); 