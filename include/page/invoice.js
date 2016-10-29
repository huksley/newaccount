define("page/invoice", [ "jquery" ], function ($) {
    var page = {};
    page.init = function () {
        $.ajax("/bpm/process-definition").done(function (data) {
             $("#contentx").html("X" + data);
        });

        $("#invoiceStart").click(function (e) {
            e.preventDefault();
            var amount = $("#invoiceAmount").val();
            var cat = $("#invoiceCategory").val();
            var number = $("#invoiceNumber").val();
            $.ajax("/bpm/process-definition/key/invoice/submit-form", {
                method: "POST",
                data: JSON.stringify({
                    "variables": {
                        "amount": { "value": amount, "type": "string" },
                        "invoiceCategory": { "value": cat, "type": "string" }

                    }
                }),
                contentType: "application/json"
            }).done(function () {
                $("#contentx").html("Y" + data);
            });
        });
    }
    return page;
});