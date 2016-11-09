
define("theme", [ "jquery", "log", "config", "text!template/login.html" ], function ($, log, config, login) {
    /**
     * Provides theme specific methods
     * @exports module:theme
     * @requires jquery
     * @requires log
     * @requires config
     */
    var theme = {};
    theme.header = {};

    /**
     * Populate header
     * @function
     * @param {string} title
     * @param {string} description
     * @param {icon} icon
     **/
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
    
    /**
     * Turn off header
     * @alias module:theme.header.off
     **/
    theme.header.off = function () {
        $(".content-header").hide();
    }

    /**
     * Replace body content with specified content
     * @function
     * @param {string} id - New body id, if no content specified will load from html
     * @param {function} handler - Function to call after content populated
     * @param {string} content - HTML content to update
     **/
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