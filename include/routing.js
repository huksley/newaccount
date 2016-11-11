/**
 * Defines global routing in application
 * @module routing
 */
define("routing", [ "jquery", "kendo.core.min", "log", "kendo.router.min", "theme", "config" ], function ($, kendo, log, some, theme, config) {
    log("Got kendo: " + kendo.version);
    log("Got router: " + kendo.Router);
    var routing = new kendo.Router();

    routing.bind("init", function() {
        log("Init routing..");
    });

    routing.bind("change", function (e) {
        log("On route change: " + e.url + ", logged in: " + config.loggedIn());
        if (!config.loggedIn() && e.url != "!/login" && e.url != "/" && e.url != "!/logout") {
            e.preventDefault();
            log("Not logged in, denied");
            if ($('#desktopTest').is(':hidden')) {
                // Recollapse sidebar
                // HACK: http://stackoverflow.com/questions/14441456/how-to-detect-which-device-view-youre-on-using-twitter-bootstrap-api
                $(".sidebar-toggle").click();
            }
            window.setTimeout(function () {
                window.location = "#!/login";
            }, 100);
        }
    });
    
    /**
     * Main routing (main menu of application)
     * @var routes
     */
    routes = [
        "MAIN",
        [ "newApplication", "fa fa-user-plus", "Новая заявка" ],
        [ "correctApplication", "fa fa-pencil", "Заявки на доработку", " <span class=\"pull-right-container\"><span class=\"label label-danger pull-right\" id=\"correctApplicationCount\"></span></span>" ],
        [ "approveOpen", "fa fa-legal", "Подтвердить заявку", " <span class=\"pull-right-container\"><span class=\"label label-warning pull-right\" id=\"approveOpenCount\"></span></span>" ],
        [ "openAccount", "fa fa-money", "Открыть счет", " <span class=\"pull-right-container\"><span class=\"label label-primary pull-right\" id=\"openAccountCount\"></span></span>" ],
        "UTILS",
        /*
        [ "invoice", "fa fa-money", "BPM" ],
        */
        [ "upload", "fa fa-upload", "Загрузить процесс" ],
        /*
        [ "settings", "fa fa-cog", "Настройки" ],
        [ "help", "fa fa-question-circle", "Справка" ],
        [ "demo", "fa fa-question-circle", "Demo" ],
        */
        [ "exit", "fa fa-remove", "Выход" ]
    ];

    // FIXME: refactor html creation
    $("#routing-main").each(function (index, el) {
        var s = "";
        for (var i = 0; i < routes.length; i++) {
            if (typeof routes[i] == "string") {
                s += "<li class=\"header\">" + routes[i] + "</li><li class=\"header-collapsed\">...</li>";
            } else {
                var name = routes[i][0];
                var icon = routes[i][1];
                var title = routes[i][2];
                var badge = routes[i][3];
                badge = badge ? badge : "";
                s += "<li class=\"menu-item\"><a href=\"#!/" + name + "\" title=\"" + title + "\"><i class=\"" + icon + "\"></i> <span>" + title + badge + "</span></a></li>";
                    
                // Define route programatically
                var handler = function () {
                    var args = arguments;
                    var name = arguments.callee.route;
                    var icon = arguments.callee.icon;
                    var title = arguments.callee.title;
                    log("Routing to " + name);
                    if ($('#desktopTest').is(':hidden')) {
                        // Recollapse sidebar
                        // HACK: http://stackoverflow.com/questions/14441456/how-to-detect-which-device-view-youre-on-using-twitter-bootstrap-api
                        $(".sidebar-toggle").click();
                    }
                    require.undef("text!page/" + name + ".html");
                    require.undef("page/" + name);
                    require([ "text!page/" + name + ".html", "page/" + name ], function (content, page) {
                        theme.header(name, title, icon);
                        theme.body(name, function () {
                            if (page) {
                                page.init.apply(page, args);
                            }
                        }, content);
                    });
                };
                handler.route = name;
                handler.icon = icon;
                handler.title = title;
                routing.route("!/" + name, handler);
                routing.route("!/" + name + "/:id", handler);
            }
        }
        $(el).append(s);

        routing.route("/", function () {
            log("Root");
            require([ "text!page/root.html" ], function (content) {
                theme.header.off();
                theme.body("root", null, content);
            })
        });

        routing.route("!/login", function () {
            log("Login");
            require([ "text!template/login.html" ], function (content) {
                theme.header.off();
                theme.body("login", function () {
                    $(".login-button").click(function (event) {
                        event.preventDefault();
                        config.login($(".login-username").val(), $(".login-password").val());
                        config.apply(document);
                        window.setTimeout(function () {
                            window.location = "#/";
                        }, 100);
                    });
                }, content);
                config.apply(document);
            })
        });

        routing.route("!/logout", function () {
            log("Login");
            theme.header.off();
            theme.body("logout", "", "logged out");
            config.logout();
            config.apply(document);
        });

        routing.bind("routeMissing", function () {
            log("Route missing!");
        });

        routing.start();
    });

    return routing;
})