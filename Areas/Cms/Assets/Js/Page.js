var loadTreeAjax = null;
var loadEditorAjax = null;
function uploadImageCompleted() {
    $(".box-images img").attr("src", $("#txtFeatureImage").val());
}
function getRootId() {
    return $("#TreeViedw ul li#root-tree").attr("rootId");
}
$(function () {
    $('.box-folder .delete').live('click', function (e) {
        e.preventDefault();
        var test = { name: $(this).attr('id') };
        $.ajax({
            url: '/Cms/ImageManagement/JqueryRemove/',
            type: 'POST',
            data: JSON.stringify(test),
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            complete: function () {
                $.ajax({
                    url: '/Cms/ImageManagement/LoadImageList/',
                    type: 'POST',
                    success: function (data) {
                        $(".box-folder-image").empty();
                        $(".box-folder-image").append(data);
                    }
                });
            }
        });
    });

    $('.buttonUrl').live('click', function (e) {
        var url = $('input#UrlRewrite').val();
        $.ajax({
            url: '/Cms/Pages/CheckUrlRewrite/',
            data: "url=" + url,
            type: "post",
            cache: false,
            success: function (data) {
                var check = $(".classUrl");
                check.text(data);
                if (check.text() == "False") {
                    check.text("Url is Exist. Try another?");
                    $(".box-input #submit").attr("disabled", "disabled");
                    $('input#UrlRewrite').focus();
                } else {
                    check.text(url + " is validate!");
                }
            }
        });
    });
    $('input#UrlRewrite').live('change', function (e) {
        var url = $('input#UrlRewrite').val();
        $.ajax({
            url: '/Cms/Pages/CheckUrlRewrite/',
            data: "url=" + url,
            type: "post",
            cache: false,
            success: function (data) {
                var check = $(".classUrl")
                check.text(data);
                if (check.text() == "False") {
                    check.text("Url is Exist. Try another?");
                    $(".box-input #submit").attr("disabled", "disabled");
                    $('input#UrlRewrite').focus();
                } else {
                    check.text(url + " is validate!");
                }
            }
        });
    });
    $("input#Title").live('change', function (e) {
        e.preventDefault();

        var url = $('input#UrlRewrite').val();
        if (url == "-" || url.trim().length == 0) {
            $('input#UrlRewrite').val(" ");
            var temp = $('input#Title').val().replace(/\s+/g, '-');
            $('input#UrlRewrite').val(temp.toLowerCase());

            $.ajax({
                url: '/Cms/Pages/CheckUrlRewrite/',
                data: "url=" + temp,
                type: "post",
                cache: false,
                success: function (data) {
                    var check = $(".classUrl")
                    check.text(data);
                    if (check.text() == "False") {
                        check.text("Url is Exist. Try another?");
                        $(".box-input #submit").attr("disabled", "disabled");
                        $('input#UrlRewrite').focus();
                    } else {
                        check.text(temp + " is validate!");
                    }
                }
            });
        }
    });
    var ppWindow = null;
    $("#category-control-box #new-page").click(function (e) {
        e.preventDefault();
        if (ppWindow) ppWindow.close();
        var selectedNode = $(".t-item .selected");
        var pageTypeId = selectedNode.parents("li.t-item").attr("pagetype");
        if (!pageTypeId) {
            pageTypeId = $("#TreeViedw ul li#root-tree").attr("pagetype");
        }
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
                    var catId = selectedNode.attr('href');
                    var rootId = getRootId();
                    ppWindow.close();
                    var listExp = '';
                    $("#TreeViedw li > ul:not(:hidden)").each(function () {
                        listExp += $(this).prev().find(".t-in").attr("href") + "|";
                    });
                    loadTreeAjax = $.ajax({
                        url: '/Cms/Pages/New?pageName=' + pageName + (catId ? ('&parentId=' + catId) : '') + "&pageTypeId=" + pageTypeId + "&expl=" + listExp + (rootId ? ('&rootId=' + rootId) : ''),
                        type: 'POST',
                        success: function (data) {
                            itemTreeViedw.html(data);
                        }
                    });
                });
            }
        });
    });
    $('.control .delete').live('click', function (e) {
        e.preventDefault();
        var Id = $(this).attr('id');
        $.ajax({
            url: '/Cms/Pages/DeletePageImage/' + Id,
            type: 'POST',
            complete: function () {
                $(".border .box-images").empty();
                $(".control .delete").empty();
            }
        });
    });

    $('#category-control #delete-category').click(function () {
        var catId = $('#TreeViedw').find('.selected').attr('href');
        if (catId > 0) {
            if (confirm("Bạn muốn xóa " + $('#TreeViedw').find('.selected').text() + "?")) {
                var selected = $('#TreeViedw').find('.selected').parent('.t-top');
                var nodeDelete = $('#TreeViedw').find('.t-state-selected');
                nodeDelete.parent('.t-mid').parent('.t-item').remove();
                nodeDelete.parent('.t-bot').parent('.t-item').remove();
                nodeDelete.parent('.t-top').parent('.t-item').remove();
                selected.remove();

                loadTreeAjax = $.ajax({
                    url: '/Cms/Pages/Delete/' + catId,
                    type: 'POST',
                    success: function () {
                        $('#item-editor').html("");
                    }
                });
            }
        } else {
            alert("Chọn mục xóa!");
        }
    });

    ////children page tree
    $('#ChildrenPageTree .t-item .t-in').live('click', function (e) {
        e.preventDefault();
    });
    //Details
    $(".p-details").live("click", function (e) {
        e.preventDefault();
        LoadPageEditor($(this).attr("href"));
    });

    function LoadPageEditor(id, callBackFunc, callBackParams) {
        var itemEditor = $('#item-editor');
        //        var cid = itemEditor.attr('rel');
        itemEditor.html('Loading editor ...');
        if (loadEditorAjax != null) {
            loadEditorAjax.abort();
        }
        if (id == 0) {
            itemEditor.html('');
            itemEditor.attr('rel', 'cat-' + id);
            return;
        }
        loadEditorAjax = $.ajax({
            url: '/Cms/Pages/LoadPageEditor/' + id,
            success: function (data) {
                itemEditor.html(data);
                itemEditor.attr('rel', 'cat-' + id);
                submitAjaxForm();
                $(".ckeditorajax").each(function () {
                    CKEDITOR.replace($(this).attr('id'));
                });
                if (callBackFunc) {
                    callBackFunc(callBackParams);
                }
            }
        });
    }

    function expandedTree(obj) {
        obj.parents("ul").each(function () {
            var obj = $(this);
            if (obj.is(":hidden")) {
                obj.show();
            }
        });
    }
    ///// edit page
    $('#TreeViedw .t-item .t-in').live('click', function (e) {
        e.preventDefault();
        var thisA = $(this);
        var id = thisA.attr('href');
        var itemEditor = $('#item-editor');
        var cid = itemEditor.attr('rel');
        var catId = $(this).attr('href');

        if (cid != 'cat-' + id) {
            $('.category-tree a.selected').removeClass('selected');
            thisA.addClass('selected');
            LoadPageEditor(id, expandedTree, thisA);
        }
    });
    //load Fckeditor have Ajax
    function submitAjaxForm() {
        for (var oldName in CKEDITOR.instances) {
            var newName = "ajax" + oldName;
            CKEDITOR.instances[newName] = CKEDITOR.instances[oldName];
            CKEDITOR.instances[newName].name = newName;
            delete CKEDITOR.instances[oldName];
        }
    }
    $('.t-grid-Edit').live('click', function (e) {
        e.preventDefault();
        var myObj = $('#GridMeta').data('tGrid').dataItem($(e.target).closest('tr'));
        if (myObj.Id == 0) {
            $.ajax({
                url: '/Cms/Pages/NewPageMeta/',
                data: "name=" + myObj.Name + "&type=" + myObj.Type + "&description=" + myObj.Description + "&value=" + myObj.Value + "&pageid=" + myObj.PageId,
                type: "post",
                cache: false,
                success: function (data) {
                    var popup = $.telerik.window.create({
                        title: 'Edit PageMeta',
                        modal: true,
                        onClose: function (e) {
                            e.preventDefault();
                            popup.data('tWindow').destroy();
                        }
                    });
                    popup.find('.t-window-content').html(data);
                    var window = popup.data('tWindow');
                    window.center();
                    currPopupwindow = window;
                }
            });
        } else {
            $.ajax({
                url: '/Cms/Pages/LoadPageMetaPopup/' + myObj.Id,
                type: 'post',
                cache: false,
                success: function (data) {
                    var popup = $.telerik.window.create({
                        title: 'Edit PageMeta',
                        modal: true,
                        onClose: function (e) {
                            e.preventDefault();
                            popup.data('tWindow').destroy();
                        }
                    });
                    popup.find('.t-window-content').html(data);
                    var window = popup.data('tWindow');
                    window.center();
                    currPopupwindow = window;
                }
            });
        }
    });

    $(' #insert-pagemeta-button').live('click', function (e) {
        e.preventDefault();
        var myObj = $(this).attr('value');
        $.ajax({
            url: '/Cms/Pages/LoadPageMetaPopupInsert/' + myObj,
            type: 'post',
            cache: false,
            success: function (data) {
                var popup = $.telerik.window.create({
                    title: 'Insert PageMeta',
                    modal: true,
                    onClose: function (e) {
                        e.preventDefault();
                        popup.data('tWindow').destroy();
                    }
                });
                popup.find('.t-window-content').html(data);
                var window = popup.data('tWindow');
                window.center();
                currPopupwindow = window;
                popup.find('#Name').focus();
            }
        });
    });



    //search page

    var searchpage = "Input page...";
    $("#search-page").val(searchpage);
    $("#search-page").focus(function () {
        if ($(this).val() == searchpage) {
            $(this).val("");
        }
    });
    $("#search-page").blur(function () {
        if ($(this).val() == "") {
            $(this).val(searchpage);
        }
    });
    $("#search-page").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: '/Cms/Pages/GetPage', type: "POST", dataType: "json",
                data: { query: request.term },
                success: function (data) {
                    response($.map(data, function (item) {
                        return { label: item.Title, value: item.Title, Id: item.Id };
                    }));
                }
            });
        },
        select: function (event, ui) {
            $("#TreeViedw .t-item .t-in[href=" + ui.item.Id + "]").click();
        }

    });

});