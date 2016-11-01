define("page/invoice", [ "jquery", "config" ], function ($, config) {
    var page = {};
    page.init = function () {
        $.ajax("/bpm/process-definition", {
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', config.auth());
            }
        }).done(function (data) {
             $("#contentx").html("X" + data);
        });

        $("#invoiceStart").click(function (e) {
            e.preventDefault();
            var amount = $("#invoiceAmount").val();
            var cat = $("#invoiceCategory").val();
            var number = $("#invoiceNumber").val();
            $.ajax("/bpm/process-definition/key/invoice/submit-form", {
                method: "POST",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', config.auth());
                },
                data: JSON.stringify({
                    "variables": {
                        "amount": { "value": amount, "type": "string" },
                        "invoiceCategory": { "value": cat, "type": "string" }

                    }
                }),
                contentType: "application/json"
            }).done(function (data) {
                $("#content").html("Y" + data);
            });
        });
    }
    return page;
});