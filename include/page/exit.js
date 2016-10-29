define("page/exit", [ "jquery", "theme" ], function ($, theme) {
    var page = {};
    page.init = function () {
        theme.header.off();
    }
    return page;
});