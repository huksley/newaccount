define([ "jquery", "camunda-bpm-sdk-js", "config", "log" ], function ($, bpm, config, log) {
    bpm = new bpm.Client({
        mock: false,
        apiUri: config.bpmUrl,
        headers: {
            "Authorization": "Basic " + btoa(config.bpmUsername + ":" + config.bpmPassword)
        }
    });
    var pds = new bpm.resource("process-definition");
    console.log(bpm);
    console.log(pds);
    pds.list({}, function (err, l) {
        console.log(l);
        $("#content").append("<h3>Process definitions</h3>");
        for (var i = 0; i < l.items.length; i++) {
            $("#content").append("<li>" + JSON.stringify(l.items[i]));
        }
    });
});