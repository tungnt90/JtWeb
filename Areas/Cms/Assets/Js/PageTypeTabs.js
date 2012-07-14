$(function () {
    $('#page-type-tabs .list-page-type-tabs a').live('click', function (e) {
        e.preventDefault();
        var selectedPageType = $("#page-type-tabs .list-page-type-tabs a.selected");
        if ($(this).attr("href") == selectedPageType.attr("href")) return;
        selectedPageType.removeClass("selected");
        $(this).addClass("selected");
        var id = $(this).attr("href");
        var pageTypeId = $("#pt-table #Id").val();
        var ptTabEditor = $("#editor-page-type-tabs");
        ptTabEditor.html("Loading...");
        $.ajax({
            url: '/Cms/PageTypeTabs/LoadPageTypeTabs/' + id,
            data: { pageTypeId: pageTypeId },
            type: 'GET',
            success: function (data) {
                $("#editor-page-type-tabs").html(data);
            }
        });
    });

    $(" #new-page-type-tabs").live('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/Cms/PageTypeTabs/InsertPageTypeTabs/',
            type: "Get",
            cache: false,
            success: function (data) {
                var popup = $.telerik.window.create({
                    title: 'Insert Page Type Tab',
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

    $("#delete-page-type-tabs").live('click', function (e) {
        e.preventDefault();
        var selectedPageType = $("#page-type-tabs .list-page-type-tabs a.selected");
        if (selectedPageType.length > 0) {
            if (selectedPageType.attr("href") == 0) {
                alert("Canot delete default item");
            }
            else if (confirm("Are you sure delete selected item?")) {
                $.ajax({
                    url: "/Cms/PageTypeTabs/DeletePageTypeTabs?id=" + selectedPageType.attr("href"),
                    type: "POST",
                    success: function (data) {
                        $("#editor-page-type-tabs").html("");
                        $("#page-type-tabs .list-page-type-tabs a.selected").parent('li').remove();
                    }
                });
            }
        }
        else {
            alert("You must select an item!");
        }
    });
});