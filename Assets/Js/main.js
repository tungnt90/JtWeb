$.ajaxSetup({
    error: function (x, e) {
        if (x.status == 403) {
            alert("Sorry, your session has expired. Please login again to continue");
            window.location = "/Administration/Users/Login";
        }
    }
});
