$(document).ready(function () {
    var urlAjax = "/api/request";

    $.ajax({
        type: "GET",
        url: urlAjax,
        contentType: "application/json",
        success: function (response) {
            console.log(response);
            jQuery.each(response, function (i, data) {
                console.log(data);
                $("#tableBody").append("<tr>");
                $("#tableBody").append("<td>" + (i + 1) + "</td>");
                $("#tableBody").append("<td>" + data.user.name + "</td>");
                $("#tableBody").append("<td>" + data.department.name + "</td>");
                $("#tableBody").append("<td>" + data.application.name + "</td>");
                $("#tableBody").append("<td>" + data.applicationRole + "</td>");
                $("#tableBody").append("<td>" + data.accessType + "</td>");
                $("#tableBody").append("<td>" + data.reason + "</td>");
                $("#tableBody").append('<td class="td-actions text-right">' +
                    '<button type="button" rel="tooltip" title="View Timeline" class="btn btn-info" data-toggle="modal" data-target="#RequestTimeLine">' +
                    ' <i class="material-icons">person</i>' +
                    '</button>' +
                    '<button type="button" rel="tooltip" title="Apporve Request" class="btn btn-success" data-toggle="modal" data-target="#RequestApprove" >' +
                    '<i class="material-icons">done</i>' +
                    '</button>' +
                    '<button type="button" rel="tooltip" title="Reject Request" class="btn btn-danger" data-toggle="modal" data-target="#RequestReject">' +
                    '<i class="material-icons">close</i>' +
                    '  </button>' +
                    '</td>');
                $("#tableBody").append("</tr>");
            })
        },
        error: function (data) { alert("ajax error"); },
        dataType: 'json'
    });
});