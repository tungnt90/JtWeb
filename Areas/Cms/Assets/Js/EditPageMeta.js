var currPopupwindow;
function editPageMeta_success() {
    if ($("#edit-page-meta-form").length > 0) {
        currPopupwindow.close();
        $.ajax({
            url: "/Cms/Pages/SavePageMeta",
            data: "pageId=" + $("#pageId").val(),
            success: function (data) {
                $("#page-meta-main").html(data);
            }
        });
    }
}
function selectImgComplete(targetId, src) {
    var lstImg = $("#" + targetId);
    lstImg.append("<div class=\"image\"><img class=\"image-item\" src=\"" + src + "\" alt=\"\" /><div class=\"remove-listimg button\">Remove</div></div>");
    updateValueListImage(targetId);
}
function updateValueListImage(targetId) {
    var lstImg = $("#" + targetId);
    var input = lstImg.find("input[type=hidden]");
    var value = "";
    lstImg.find(".image-item").each(function () {
        value += $(this).attr("src") + "|";
    });
    input.val(value);
}
$(function () {
    $("#DataTypeId").live('change', function () {
        if ($(this).val() == 2) {
            $("#browser-img-pmeta").show();
        }
        else {
            $("#browser-img-pmeta").hide();
        }
    });
    $("#DataTypeId").change();

    //remove an image in image list data type
    $('.page-meta-list .remove-listimg').live('click', function () {
        var obj = $(this);
        var targetId = obj.parents(".list-image").attr("id");
        obj.parent().animate({
            opacity: 0
        }, function () {
            obj.parent().remove();
            updateValueListImage(targetId);
        });
    });

    //$(".page-meta-list .meta-datetime").datepicker();

    $('#remove-pageMeta').live('click', function (e) {
        e.preventDefault();
        var Id = $(this).attr('href');

        if (confirm("Bạn muốn xóa " + $(this).prevAll('.meta-label').html() + "?")) {
            $(this).parent().remove();
            $.ajax({
                url: '/Cms/Pages/DeletePageMeta/' + Id,
                type: 'POST',
                complete: function () {

                }
            });
        }

    });

    //add listpage
    $('.page-meta-list #add-listpage').live('click', function () {
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
        var listPage = $('.page-meta-list #list-page').html();
        var textPage = $('.page-meta-list  #text-page').val();
        $('#treeview-parent-page .t-item .t-in').click(function (e) {
            e.preventDefault();
            var pageId = $(this).attr("href");
            if (pageId > 0 && currPage.attr("href") != pageId) {
                var html = listPage + "<div class='item-page'><input class='meta-check'  type='checkbox' name='" + pageId + "'/>" +
                "<label>" + $(this).text() + "</label></div>";
                $('.page-meta-list  #text-page').val(textPage + "|" + pageId);
                $('.page-meta-list #list-page').html(html);
                ppWindow.close();
            }
        });
    });

    //delete list-page
    $('.page-meta-list #remove-listpage').live('click', function () {
        var text = "";
        if (confirm("Are you sure ?")) {
            $('.page-meta-list #list-page .item-page').each(function () {
                if ($(this).find('.meta-check').is(':checked')) {
                    $(this).remove();
                };

            });
        }
        $('.page-meta-list #list-page .item-page').each(function () {
            text += "|" + $(this).find(".meta-check").attr('name');
        });
        $('.page-meta-list  #text-page').val(text);


    });


    CheckListItems('.new-page-meta-default #DataTypeId');
    $('.new-page-meta-default #DataTypeId').change(function () {
        CheckListItems(this);

    });


});

function CheckListItems(id) {
    var text = $(id).find('option:selected').text();
  
    if (text.toLowerCase() == "dropdown" || text.toLowerCase() == "listcheckbox") {
        $(".new-page-meta-default .list-items").css('display', 'block');
    } else {
        $('.new-page-meta-default .list-items').css('display', 'none');
        $('.new-page-meta-default .list-items #ListItems').val("");

    }
}
