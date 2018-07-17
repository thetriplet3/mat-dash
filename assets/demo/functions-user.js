$(document).ready(function () {
    var requestId;
    var data = {
        userId: "dave"
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
                    '<button type="button" rel="tooltip" title="View Timeline" id="btnView" onclick="generateTimeline(event)" class="btn btn-info" data-obj=' + data.requestId + '>' +
                    //'<button type="button" rel="tooltip" title="View Timeline" id="btnView" class="btn btn-info" data-toggle="modal" data-target="#RequestTimeLine" data-obj=' + data.requestId + '>' +
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
                $('#RequestAccessHR').modal('toggle');
                $.notify({
                    title: '<strong>Success</strong>',
                    message: 'Request Created'
                }, {
                        type: 'success'
                    });
            },
            error: function (data) {
                console.log(data)
                $.notify({
                    title: '<strong>Error</strong>',
                    message: 'An error occured. Please try again later.'
                }, {
                        type: 'danger'
                    });
            },
            dataType: 'json'
        });
    });

    $('#btnRequestRISK').on('click', function (e) {
        e.preventDefault();

        var userId = $('#userIdRISK').val();
        var departmentId = $('#departmentIdRISK').data('db-value');
        var applicationId = $('#applicationIdRISK').data('db-value');
        var managerId = $('#managerIdRISK').data('db-value');
        var applicationRole = $('#applicationRoleRISK').val();
        var accessType = $('#accessTypeRISK').val();
        var requestDate = $('#requestDateRISK').val();
        var expireDate = $('#expireDateRISK').val();
        var reason = $('#reasonRISK').val();

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
                $('#RequestAccessRISK').modal('toggle');
                $.notify({
                    title: '<strong>Success</strong>',
                    message: 'Request Created'
                }, {
                        type: 'success'
                    });
            },
            error: function (data) {
                console.log(data)
                $.notify({
                    title: '<strong>Error</strong>',
                    message: 'An error occured. Please try again later.'
                }, {
                        type: 'danger'
                    });
            },
            dataType: 'json'
        });
    });
});

function generateTimeline(e) {
    var requestId = e.target.parentNode.dataset.obj == null ? e.target.dataset.obj : e.target.parentNode.dataset.obj;
    console.log(requestId);

    var urlAjax = "/api/request/" + requestId;
    $.ajax({
        type: "GET",
        url: urlAjax,
        contentType: "application/json",
        success: function (response) {
            console.log(response);
            var leftAlign = " left-aligned"

            $("#timelineStart").empty();
            $("#timelineStart").append(`
            <article class="timeline-entry begin" >

              <div class="timeline-entry-inner">

                <div class="timeline-icon" style="-webkit-transform: rotate(-90deg); -moz-transform: rotate(-90deg);">
                  <i class="entypo-flight"></i>
                </div>

              </div>

            </article>`);

            jQuery.each(response.actions, function (i, data) {
                if (i === 0 || i % 2 === 0) {
                    leftAlign = " left-aligned"
                }
                else {
                    leftAlign = "";
                }
                var comment = data.comment == null ? "No Addition comments" : data.comment;
                $("#timelineStart").prepend(`<article class="timeline-entry ${leftAlign}">
                        <div class="timeline-entry-inner">
                          <time class="timeline-time" datetime=${data.date}>
                            <span>${new Date(data.date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                            <span>${moment(new Date(data.date)).fromNow()}</span>
                          </time>
  
                          <div class="timeline-icon bg-primary">
                            <i class="entypo-camera"></i>
                          </div>
  
                          <div class="timeline-label">
                            <h2>
                              ${data.action}
                            </h2>
                            <p>
                                by
                                <a href="#">${data.userId}</a>
                            </p>
                            <p>
                                <span>${comment}</span>
                            </p>
                          </div>
                        </div>
  
                      </article>`);

                $('#DynamicTimeLine').modal('toggle');
            })
        },
        error: function (data) {
            //alert("ajax error"); 
        },
        dataType: 'json'
    });

}