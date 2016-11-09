define("log", [ "jquery", "text!template/error.html", "config", "mustache" ], function($, error, config, m) {
    /**
     * System-wide application logging
     * @exports module:log
     */
    var log = function() {
        window.console.log.apply(window.console, arguments);
    };
    
    /**
     * Log error, both to console and to application UI.
     * @function
     * @param {object} err - Error message or object
     * @return {void}
     */
    log.error = function (err) {
        window.console.log.apply(window.console, arguments);
        $("#content").html(m.render(error, { error: err }));
        config.apply("#content");
    }
    return log;
});