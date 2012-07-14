var ppWindow = null;
$(function () {
    
    $(".editor-label #txtParentPage").click(function () {
        if (ppWindow) ppWindow.close();
        var popupParentPage = $.telerik.window.create({
            title: 'Parent name',
            modal: true,
            onClose: function (e) {
                e.preventDefault();
                popupParentPage.data('tWindow').destroy();
            }
        });
        var tree = "<div id='treeview-parent-page'>" + $('#TreeViedw').html() + "</div>";
        popupParentPage.find('.t-window-content').html(tree);
        ppWindow = popupParentPage.data('tWindow');
        var parentId = $("#ParentId").val();
        if (parentId != "" && parentId > 0) {
            $("#treeview-parent-page .t-item .t-in").removeClass("t-state-selected");
            $("#treeview-parent-page .t-item .t-in[href=" + parentId + "]").addClass("t-state-selected");
        }
        ppWindow.center();
        var currPage = $('.category-tree a.t-state-selected');
        $('#treeview-parent-page .t-item .t-in').click(function (e) {
            e.preventDefault();
            var pageId = $(this).attr("href");
            if (pageId > 0 && currPage.attr("href") != pageId) {
                $(".editor-label #txtParentPage").val($(this).text());
                $(".editor-label #Page_ParentId").val(pageId);
                ppWindow.close();
            }
        });
    });
});
