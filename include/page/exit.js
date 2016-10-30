define("page/exit", [ "jquery", "theme", "log", "config", "mustache", "text!template/login.html" ], function ($, theme, log, config, m, login) {
    var page = {};
    page.init = function () {
        theme.header.off();
        //log.error("Failed to do something!");
        $("#content").html(m.render(login, {}));
        config.apply($("#content"));
    }
    return page;
});