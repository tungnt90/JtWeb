$(function () {
    $('#TreeViedw .t-item .t-in').mousedown(function (e) {
        if (e.which === 3) {
            $('#TreeViedw .t-item').find('.t-in').removeClass('t-state-selected selected t-state-hover');
            $(this).addClass('t-state-selected selected');
        };
    });

    $('#TreeViedw .t-item').contextMenu('myMenu1', {
        bindings: {
            'new': function (t) {
                newPage($(t).attr('pagetype'), $(t).find('.t-in').attr('href'));
            },

            'delete': function (t) {

                deletePage($(t).find('.t-in').attr('href'), $(t).find('.t-in').text());
            }
        }
    });

    function newPage(pageTypeId, catId) {
        $.ajax({
            url: (pageTypeId ? '/Cms/Pages/NewPageForm?pageTypeId=' + pageTypeId : '/Cms/Pages/NewPageForm/'),
            type: 'post',
            cache: false,
            success: function (data) {
                var popup = $.telerik.window.create({
                    title: 'New Page',
                    modal: true,
                    onClose: function (e) {
                        e.preventDefault();
                        popup.data('tWindow').destroy();
                    }
                });
                popup.find('.t-window-content').html(data);
                var window = popup.data('tWindow');
                ppWindow = window;
                ppWindow.center();
                $("#create-page").click(function (e) {
                    e.preventDefault();
                    var itemTreeViedw = $('#TreeViedw');
                    var boolInsert = true;
                    if (loadTreeAjax != null) {
                        loadTreeAjax.abort();
                    }
                    var pageTypeId = $("#pageType").val();
                    var pageName = $("#txtPageName").val();
                    if (pageName == "") {
                        alert("You should write Page Name");
                        return;
                    }
                    if (pageTypeId == undefined || pageTypeId == 0) {
                        alert("You shold chose Page Type");
                        ret;
                    }
                    ppWindow.close();
                    loadTreeAjax = $.ajax({
                        url: '/Cms/Pages/New?pageName=' + pageName + (catId ? ('&parentId=' + catId) : '') + "&pageTypeId=" + pageTypeId,
                        type: 'POST',
                        success: function (data) {
                            itemTreeViedw.html(data);
                        }
                    });
                });
            }
        });
    };

    function deletePage(catId, catname) {
        if (catId > 0) {
            if (confirm("Bạn muốn xóa " + catname + "?")) {
                var selected = $('#TreeViedw').find('.selected').parent('.t-top');
                var nodeDelete = $('#TreeViedw').find('.t-state-selected');
                nodeDelete.parent('.t-mid').parent('.t-item').remove();
                nodeDelete.parent('.t-bot').parent('.t-item').remove();
                nodeDelete.parent('.t-top').parent('.t-item').remove();
                selected.remove();
                $('#item-editor').html("");
                $.ajax({
                    url: '/Cms/Pages/Delete/' + catId,
                    type: 'POST',
                    success: function () {
                    }
                });
            }
        } else {
            alert("Chọn mục xóa!");
        }
    };
});