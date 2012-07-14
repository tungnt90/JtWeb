$(function () {
    $("#datepicker").datepicker();
    $("input#ConfirmPassword").change(function () {
        if ($("input#Password").val() === $("input#ConfirmPassword").val()) {
            $("input#submit").disabled = false;
            $(".confirm-password").empty();
        } else {
            $(".confirm-password").text("The passwords do not match");
            $(".box-input input#submit").disabled = true;
        }
    });
    $(".content input#Username").change(function () {
        var name = $(".content input#Username").val();
        $.ajax({
            url: '/Members/CheckUserExist/',
            data: "name=" + name,
            type: "post",
            cache: false,
            success: function (data) {
                var check = $(".content .confirm-userexist")
                check.text(data);
                if (check.text() == "False") {
                    check.text("Someone already has that username. Try another?");
                    $(".box-input #submit").attr("disabled", "disabled");
                    $(".content input#Username").focus();
                } else {
                    $(".box-input #submit").removeAttr("disabled");
                    check.text(name + " is validate!");
                }
            }
        });

    });
});