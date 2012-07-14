$(function () {
    if ($("h2.title").length > 0 && $("h2.title").css("font-size").replace("px", "") > 0) {
        var fontSize = parseInt($("h2.title").css("font-size").replace("px", ""));
        var headerBox = $("h2.title");
        while (headerBox.height() > fontSize*1.5 + 5) {
            fontSize -= 2;
            headerBox.css("font-size", fontSize);
        }
    }
});