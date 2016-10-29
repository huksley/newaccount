define("log", [], function() {
    var log = function() {
        window.console.log.apply(window.console, arguments);
    };
    return log;
});