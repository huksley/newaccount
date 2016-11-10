define([ "jquery", "log", "config" ], function ($, log, config) {
    var o = {};
    o.init = function () {
        log("Uploading");

        var contents = [];
        var files = [];
        $.when(
            $.get("process/newaccount.bpmn", function (content, status, xhr) {
                contents[0] = content;
                files[0] = this.url;
            }),

            $.get("process/needApprove.dmn", function (content, status, xhr) {
                contents[1] = content;
                files[1] = this.url;
            })
        ).then(function(res) {
            log("Loaded process...");
            var boundary = "deadbeef" + (new Date().getTime());
            var data = "";
            data += "--" + boundary + "\n";
            data += "Content-Disposition: form-data; name=\"deployment-name\"\r\n";
            data += "\r\n";
            data += "newaccount\r\n";
            data += "--" + boundary + "\n";
            data += "Content-Disposition: form-data; name=\"enable-duplicate-filtering\"\r\n";
            data += "\r\n";
            data += "true\r\n";
            data += "--" + boundary + "\n";
            data += "Content-Disposition: form-data; name=\"deploy-changed-only\"\r\n";
            data += "\r\n";
            data += "true\r\n";
            for (var i = 0; i < files.length; i++) {
                data += "--" + boundary + "\n";
                var fname = files[i];
                if (fname.indexOf("/") >= 0) {
                    fname = fname.substring(fname.lastIndexOf("/") + 1);
                }
                data += "Content-Disposition: form-data; name=\"file" + (i + 1) + "\"; filename=\"" + fname + "\"\r\n";
                data += "Content-Type: text/xml\r\n";
                data += "\r\n";
                data += contents[i];
                data += "\r\n";
            }
            data += "--" + boundary + "--";
            $.ajax({
                url: config.bpmUrl + "/deployment/create",
                data: data,
                processData: false,
                contentType: false,
                type: "POST",
                headers: {
                    "Authorization": config.auth(),
                    "Content-Type": "multipart/form-data; boundary=" + boundary
                },
                success: function (data) {
                    console.log(data);
                }
            });
        });
    }
    return o;
});