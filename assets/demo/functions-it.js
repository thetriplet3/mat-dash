$(document).ready(function () {
    var requestId;
    var data = {
        state: "APPROVED"
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
                $("#tableBody").append("<td>" + data.user.name + "</td>");
                $("#tableBody").append("<td>" + data.department.name + "</td>");
                $("#tableBody").append("<td>" + data.application.name + "</td>");
                $("#tableBody").append("<td>" + data.applicationRole + "</td>");
                $("#tableBody").append("<td>" + data.accessType + "</td>");
                $("#tableBody").append("<td>" + data.reason + "</td>");
                $("#tableBody").append('<td class="td-actions text-right">' +
                   // '<button type="button" rel="tooltip" title="View Timeline" id="btnView" class="btn btn-info" data-toggle="modal" data-target="#RequestTimeLine" data-obj=' + data.requestId + '>' +
                   '<button type="button" rel="tooltip" title="View Timeline" id="btnView" onclick="generateTimeline(event)" class="btn btn-info" data-obj=' + data.requestId + '>' +
                   ' <i class="material-icons">person</i>' +
                    '</button>' +
                    '<button type="button" rel="tooltip" title="Apporve Request" id="btnAppove" class="btn btn-success" data-toggle="modal" data-target="#RequestComplete" data-obj=' + data.requestId + '>' +
                    '<i class="material-icons">done</i>' +
                    '</button>' +
                    '<button type="button" rel="tooltip" title="Reject Request" id="btnReject" class="btn btn-danger" data-toggle="modal" data-target="#RequestClose" data-obj=' + data.requestId + '>' +
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

    $('#RequestComplete').on('show.bs.modal', function (e) {
        requestId = $(e.relatedTarget).data('obj');
    });

    $('#RequestClose').on('show.bs.modal', function (e) {
        requestId = $(e.relatedTarget).data('obj');
    });

    $('#btnCompleteRequest').on('click', function (e) {
        e.preventDefault();

        var data = {
            state: "COMPLETED",
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
                $('#RequestComplete').modal('toggle');
                $.notify({
                    title: '<strong>Success</strong>',
                    message: 'Request Completed'
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

    $('#btnCloseRequest').on('click', function (e) {
        e.preventDefault();

        var data = {
            state: "CLOSED",
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
                $('#RequestClose').modal('toggle');
                $.notify({
                    title: '<strong>Success</strong>',
                    message: 'Request Closed'
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