/**
 * Defines runtime configuration module <b>config</b>
 * @module config
 */
define("config", [ "jquery", "js-storage" ], function($, storage) {
    /**
     * Default configuration
     * @exports config
     */
    var conf = {
        version: "0.1",
        years: "2016",
        copyright: "All rights reserved.",
        title: "Новый счет",
        titleHtml: "<b>Новый</b> счет",
        company: "Huksley",
        companyUrl: "https://github.com/huksley",
        bpmUrl: "http://localhost/bpm",
        anonymous: "Not logged in",

        /**
         * True if logged in, false not.
         * Call config.login(username, password) to store state.
         */
        loggedIn: function () {
            return !!storage.localStorage.get("loggedIn");
        },

        /**
         * Saves login information.
         */
        login: function (username, password) {
            storage.localStorage.set("loggedIn", true);
            storage.localStorage.set("username", username);
            storage.localStorage.set("password", password);
        },

        /**
         * Removes login information.
         */
        logout: function () {
            storage.localStorage.remove("loggedIn");
            storage.localStorage.remove("username");
            storage.localStorage.remove("password");
        },

        /**
         * Produce authorization header for XHR requests
         */
        auth: function () {
            return "Basic " + btoa(storage.localStorage.get("username") + ":" + storage.localStorage.get("password"));
        },

        /** 
         * Returns current username
         */
        username: function () {
            return storage.localStorage.get("username");
        },

        /**
         * Given element (or jQuery expression) applies all config keys to elements with data-config="key" defined.
         * Available syntax:
         * <ul>
         *  &lt;element data-config="key,key2,...">Initial value&lt;/element> - Will replace innerHTML with content.
         *  &lt;element data-config="attr:key,..." attr="Intiial value"/> - Will replace attribute attr with content.
         * </ul>
         * Only first defined value will be replaced if multiple keys specified.
         */
        apply: function (el) {
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
                            if (conf.applyKey(key, e, attr)) {
                                break;
                            }
                        } else {
                            if (conf.applyKey(key, e)) {
                                break;
                            }
                        }
                    }
                } else {
                    conf.applyKey(key, e);
                }
            }
        },

        /**
         * Apply single key, either from configuration or from localStorage.
         */
        applyKey: function (key, e, attr) {
            var success = false;
            if (storage.localStorage.get(key) != undefined) {
                var val = storage.localStorage.get(key);
                if (attr) {
                     console.log("Replacing " + key + " [@" + attr + "] = " + val);
                     $(e).attr(attr, val);
                     success = true;
                } else {
                     console.log("Replacing " + key + " = " + val);
                     $(e).html(val);
                     success = true;
                }
            } else
            if (conf[key] != undefined && typeof conf[key] != "function" ) {
                var val = conf[key];
                if (attr) {
                     console.log("Replacing " + key + " [@" + attr + "] = " + val);
                     $(e).attr(attr, val);
                     success = true;
                } else {
                     console.log("Replacing " + key + " = " + val);
                     $(e).html(val);
                     success = true;
                }
            }
            return success;
        }
    };

    return conf;
});