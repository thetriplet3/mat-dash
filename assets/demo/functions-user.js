$(document).ready(function () {
    var requestId;
    var data = {
        userId: "tratlk"
    }
    var dataObj = JSON.stringify(data);
    var urlAjax = "/api/request/all/" + dataObj;
    $.ajax({
        type: "GET",
        url: urlAjax,
        contentType: "application/json",
        success: function (response) {
            jQuery.each(response, function (i, data) {
                $("#tableBody").append("<tr>");
                $("#tableBody").append("<td>" + (i + 1) + "</td>");
                $("#tableBody").append("<td>" + data.state + "</td>");
                $("#tableBody").append("<td>" + data.application.name + "</td>");
                $("#tableBody").append("<td>" + data.applicationRole + "</td>");
                $("#tableBody").append("<td>" + data.accessType + "</td>");
                $("#tableBody").append("<td>" + data.reason + "</td>");
                $("#tableBody").append('<td class="td-actions text-right">' +
                    '<button type="button" rel="tooltip" title="View Timeline" id="btnView" class="btn btn-info" data-toggle="modal" data-target="#RequestTimeLine" data-obj=' + data.requestId + '>' +
                    ' <i class="material-icons">person</i>' +
                    '</button>' +
                    '</td>');
                $("#tableBody").append("</tr>");
            })
        },
        error: function (data) {
            //alert("ajax error"); 
        },
        dataType: 'json'
    });

    $('#btnRequest').on('click', function (e) {
        e.preventDefault();

        var userId = $('#userId').val();
        var departmentId = $('#departmentId').data('db-value');
        var applicationId = $('#applicationId').data('db-value');
        var managerId = $('#managerId').data('db-value');
        var applicationRole = $('#applicationRole').val();
        var accessType = $('#accessType').val();
        var requestDate = $('#requestDate').val();
        var expireDate = $('#expireDate').val();
        var reason = $('#reason').val();

        var data = {
            userId: userId,
            departmentId: departmentId,
            applicationId: applicationId,
            managerId: managerId,
            applicationRole: applicationRole,
            accessType: accessType,
            requestDate: requestDate,
            expireDate: expireDate,
            reason: reason

        }

        var dataObj = JSON.stringify(data);
        var urlAjax = "/api/request";

        $.ajax({
            type: "POST",
            url: urlAjax,
            contentType: "application/json",
            data: dataObj,
            success: function (data) {
                //alert("ajax worked"); 
            },
            error: function (data) {
                //alert("ajax error"); 
            },
            dataType: 'json'
        });
    });
});