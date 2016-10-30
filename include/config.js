define("config", [ "jquery" ], function($) {
    var conf = {
        version: "0.1",
        years: "2016",
        copyright: "All rights reserved.",
        title: "Новый счет",
        titleHtml: "<b>Новый</b> счет",
        company: "Huksley",
        companyUrl: "https://github.com/huksley",
        bpmUrl: "http://localhost/bpm",
        bpmUsername: "demo",
        bpmPassword: "demo"
    };
    
    conf.apply = function (el) {
        var l = $(el).find("[data-config]");
        for (var i = 0; i < l.length; i++) {
            var e = l[i];
            var key = $(e).attr("data-config");
            if (key.indexOf(",") > 0 || key.indexOf(":") > 0) {
                var keys = key.split(",");
                for (var j = 0; j < keys.length; j++) {
                    var key = keys[j];
                    if (key.indexOf(":") > 0) {
                        // attr:name
                        var attr = key.substring(0, key.indexOf(":"));
                        key = key.substring(key.indexOf(":") + 1);
                        if (conf[key] != undefined) {
                            console.log("Replacing " + key + " [@" + attr + "] = " + conf[key]);
                            $(e).attr(attr, conf[key]);
                        }
                    } else {
                        if (conf[key] != undefined) {
                            console.log("Replacing " + key + " = " + conf[key]);
                            $(e).html(conf[key]);
                        }
                    }
                }
            } else {
                // Single item
                if (conf[key] != undefined) {
                    console.log("Replacing " + key + " = " + conf[key]);
                    $(e).html(conf[key]);
                }
            }
        }
    }
    return conf;
});