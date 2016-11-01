define("theme", [ "jquery", "log", "config", "text!template/login.html" ], function ($, log, config, login) {
    var theme = {};

    // Populate header
    theme.header = function (title, description, icon) {
        if (arguments.length == 0) {
            return;
        }

        $(".content-header").show();
        $(".theme-page-title").html(title);
        $(".theme-page-description").html(description);
        $(".theme-page-icon").html("<i class=\"" + icon + "\"></i>");
        window.setTimeout(function () {
            if ($('body').hasClass('sidebar-fixed-expanded')) {
                // Collapse fixed navbar
                $('body').removeClass('sidebar-fixed-expanded').addClass('sidebar-xs');
            }
        }, 10);
    }
    
    theme.header.off = function () {
        $(".content-header").hide();
    }

    // Switch body
    theme.body = function (id, handler, content) {
        $("#content").html("");
        if (content == null) {
            content = document.getElementById("content-template-" + id);
        } 
        if (content) {
            $("#content").html(content);
            config.apply($("#content"));
        }

        if (handler) {
            window.setTimeout(function () {
                try {
                    handler();
                } catch (e) {
                    log.error(e);
                }
            }, 10);
        }
    }

    return theme;
});