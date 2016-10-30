define("log", [ "jquery", "text!template/error.html", "config", "mustache" ], function($, error, config, m) {
    var log = function() {
        window.console.log.apply(window.console, arguments);
    };
    
    log.error = function (err) {
        window.console.log.apply(window.console, arguments);
        $("#content").html(m.render(error, { error: err }));
        config.apply("#content");
    }
    return log;
});