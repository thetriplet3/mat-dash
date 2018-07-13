$(document).ready(function () {
    var requestId;
    var data = {
        state : "CREATED",
        managerId : "manager"
    }
    var dataObj = JSON.stringify(data);
    var urlAjax = "/api/request/all/"+dataObj;
    $.ajax({
        type: "GET",
        url: urlAjax,
        contentType: "application/json",
        success: function (response) {
            jQuery.each(response, function (i, data) {
                
                $("#tableBody").append("<tr>");
                $("#tableBody").append("<td>" + (i + 1) + "</td>");
                $("#tableBody").append("<td>" + data.user.name + "</td>");
                $("#tableBody").append("<td>" + data.department.name + "</td>");
                $("#tableBody").append("<td>" + data.application.name + "</td>");
                $("#tableBody").append("<td>" + data.applicationRole + "</td>");
                $("#tableBody").append("<td>" + data.accessType + "</td>");
                $("#tableBody").append("<td>" + data.reason + "</td>");
                $("#tableBody").append('<td class="td-actions text-right">' +
                    '<button type="button" rel="tooltip" title="View Timeline" id="btnView" class="btn btn-info" data-toggle="modal" data-target="#RequestTimeLine" data-obj='+ data.requestId + '>' +
                    ' <i class="material-icons">person</i>' +
                    '</button>' +
                    '<button type="button" rel="tooltip" title="Apporve Request" id="btnAppove" class="btn btn-success" data-toggle="modal" data-target="#RequestApprove" data-obj='+ data.requestId + '>' +
                    '<i class="material-icons">done</i>' +
                    '</button>' +
                    '<button type="button" rel="tooltip" title="Reject Request" id="btnReject" class="btn btn-danger" data-toggle="modal" data-target="#RequestReject" data-obj='+ data.requestId + '>' +
                    '<i class="material-icons">close</i>' +
                    '  </button>' +
                    '</td>');
                $("#tableBody").append("</tr>");
            })
        },
        error: function (data) { 
            //alert("ajax error"); 
        },
        dataType: 'json'
    });

    $('#RequestApprove').on('show.bs.modal', function(e) {
        requestId = $(e.relatedTarget).data('obj');
    });

    $('#RequestReject').on('show.bs.modal', function(e) {
        requestId = $(e.relatedTarget).data('obj');
    });

    $('#btnApproveRequest').on('click', function (e) {
        e.preventDefault();

        var data = {
            state : "APPROVED",
            requestId: requestId
        }

        var dataObj = JSON.stringify(data);
        var urlAjax = "/api/request/" + requestId;

        console.log(requestId);

        $.ajax({
            type: "PUT",
            url: urlAjax,
            contentType: "application/json",
            data: dataObj,
            success: function (data) {
                $('#RequestApprove').modal('toggle');
                $.notify({
                    title: '<strong>Success</strong>',
                    message: 'Request Approved'
                },{
                    type: 'success'
                });
             },
            error: function (data) { 
                console.log(data)
                $.notify({
                    title: '<strong>Error</strong>',
                    message: 'An error occured. Please try again later.'
                },{
                    type: 'danger'
                });
             },
            dataType: 'json'
        });
    });

    $('#btnRejectRequest').on('click', function (e) {
        e.preventDefault();

        var data = {
            state : "REJECTED",
            requestId: requestId
        }

        var dataObj = JSON.stringify(data);
        var urlAjax = "/api/request/" + requestId;

        console.log(requestId);

        $.ajax({
            type: "PUT",
            url: urlAjax,
            contentType: "application/json",
            data: dataObj,
            success: function (data) {
                $('#RequestReject').modal('toggle');
                $.notify({
                    title: '<strong>Success</strong>',
                    message: 'Request Rejected'
                },{
                    type: 'success'
                });
             },
            error: function (data) { 
                console.log(data)
                $.notify({
                    title: '<strong>Error</strong>',
                    message: 'An error occured. Please try again later.'
                },{
                    type: 'danger'
                });
             },
            dataType: 'json'
        });
    });
});