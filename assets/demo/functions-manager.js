$(document).ready(function () {
    var urlAjax = "/api/request";

    $.ajax({
        type: "GET",
        url: urlAjax,
        contentType: "application/json",
        success: function (data) { 
            console.log(data); 
        },
        error: function (data) { alert("ajax error"); },
        dataType: 'json'
    });
});