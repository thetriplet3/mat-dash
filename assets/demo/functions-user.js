$(document).ready(function () {
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
            success: function (data) { alert("ajax worked"); },
            error: function (data) { alert("ajax error"); },
            dataType: 'json'
        });
    });
});