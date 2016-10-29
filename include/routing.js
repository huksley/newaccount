define("routing", [ "jquery", "kendo.core.min", "log", "kendo.router.min", "theme" ], function ($, kendo, log, some, theme, calendar) {
    log("Got kendo: " + kendo.version);
    log("Got router: " + kendo.Router);
    var router = new kendo.Router();

    router.bind("init", function() {
        log("Init router..");
    });

    var main = [
        [ "calendar", "fa fa-calendar", "Платежный календарь" ],
        [ "invoice", "fa fa-money", "BPM" ],
        [ "upload", "fa fa-upload", "Загрузка файлов" ],
        [ "settings", "fa fa-cog", "Настройки" ],
        [ "help", "fa fa-question-circle", "Справка" ],
        [ "exit", "fa fa-remove", "Выход" ]
    ];

    // FIXME: refactor html creation
    $("#routing-main").each(function (index, el) {
        var s = "";
        for (var i = 0; i < main.length; i++) {
            var name = main[i][0];
            var icon = main[i][1];
            var title = main[i][2];
            s += "<li class=\"menu-item\"><a href=\"#!/" + name + "\" title=\"" + title + "\"><i class=\"" + icon + "\"></i> <span>" + title + "</span></a></li>";
                 
            // Define route programatically
            var handler = function () {
                var name = arguments.callee.route;
                var icon = arguments.callee.icon;
                var title = arguments.callee.title;
                log("Routing to " + name);
                require.undef("text!page/" + name + ".html");
                require.undef("page/" + name);
                require([ "text!page/" + name + ".html", "page/" + name ], function (content, page) {
                    theme.header(name, title, icon);
                    theme.body(name, function () {
                        if (page) {
                            page.init();
                        }
                    }, content);
                });
            };
            handler.route = name;
            handler.icon = icon;
            handler.title = title;
            router.route("!/" + name, handler);
        }
        $(el).append(s);

        router.route("/", function () {
            log("Root");
            require([ "text!page/root.html" ], function (content) {
                theme.header.off();
                theme.body("root", null, content);    
            })
        });

        router.bind("routeMissing", function () {
            log("Route missing!");
        });

        router.start();
    });
})