var loadPageTypeAjax = null;
$(function () {
    $("#zone-page-type .list-page-type a").live('click', function (e) {
        e.preventDefault();
        var selectedPageType = $("#zone-page-type .list-page-type a.selected");
        if ($(this).attr("href") == selectedPageType.attr("href")) return;
        selectedPageType.removeClass("selected");
        $(this).addClass("selected");
        var id = $(this).attr("href");
        $.ajax({
            url: '/Cms/PageTypes/LoadPageTypeEditor/' + id,
            type: 'GET',
            success: function (data) {
                $("#page-type-contents #page-type-editor").html(data);
            }
        });
    });
    $("#page-type-controls #new-page-type").live('click', function (e) {
        e.preventDefault();
        if (loadPageTypeAjax) loadPageTypeAjax.abort();
        $.ajax({
            url: '/Cms/PageTypes/NewPageType/',
            type: 'POST',
            success: function (data) {
                $("#page-type-contents #tree-page-type").html(data);
            }
        });
    });
    $("#pagetype-control #delete-page-type").live('click', function () {
        var selectedPageType = $("#zone-page-type .list-page-type a.selected");
        if (selectedPageType.length > 0) {
            if (selectedPageType.attr("href") == 0) {
                alert("Canot delete default item");
            }
            else if (confirm("Are you sure delete selected item?")) {
                $.ajax({
                    url: "/Cms/PageTypes/DeletePageType?id=" + selectedPageType.attr("href"),
                    type: "POST",
                    success: function (data) {
                        $("#page-type-contents #page-type-editor").html("");
                        $("#page-type-contents #tree-page-type").html(data);
                    }
                });
            }
        }
        else {
            alert("You must select an item!");
        }
    });
});

function GetSelectedPageTypeId() {
    var selectedPageType = $("#zone-page-type .list-page-type a.selected");
    if (selectedPageType.length > 0) {
        return selectedPageType.attr("href");
    } else {
        return 0;
    }
}