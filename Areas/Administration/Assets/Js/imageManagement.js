$(document).ready(function () {
    $(".browser-image").live('click', function (e) {
        e.preventDefault();
        var w = 940;
        var h = 500;
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        var url = $(this).attr("href");
        window.open(url, $(this).attr("id"), "scrollbars=yes,menubar=0,resizable=1,width=" + w + ",height=" + h + ",top=" + top + ",left=" + left);
    });
});