define("config", [ "jquery", "js-storage" ], function($, storage) {
    /**
     * Defines configuration and storage for application.
     * 
     * @exports config
     */
    var config = {
        version: "0.1",
        years: "2016",
        copyright: "All rights reserved.",
        title: "Новый счет",
        titleHtml: "<b>Новый</b> счет",
        company: "Huksley",
        companyUrl: "https://github.com/huksley",
        bpmUrl: "http://" + window.location.hostname + ":" + window.location.port + "/bpm",
        anonymous: "Not logged in",

        /**
         * Checks whether user is logged in.
         * @see config.login(username, password) to store state.
         * @return {boolean} - <code>true</code> if logged in, <code>false</code> otherwise.
         */
        loggedIn: function () {
            return !!storage.localStorage.get("loggedIn");
        },

        /**
         * Saves login information.
         * @param {string} username User`s name
         * @param {string} password User`s password
         * @return {void}
         */
        login: function (username, password) {
            storage.localStorage.set("loggedIn", true);
            storage.localStorage.set("username", username);
            storage.localStorage.set("password", password);
        },

        /**
         * Removes login information.
         * @return {void}
         */
        logout: function () {
            storage.localStorage.remove("loggedIn");
            storage.localStorage.remove("username");
            storage.localStorage.remove("password");
        },

        /**
         * Produce authorization header for XHR requests
         * @return {string} <code>Authorization</code> header value.
         */
        auth: function () {
            return "Basic " + btoa(storage.localStorage.get("username") + ":" + storage.localStorage.get("password"));
        },

        /** 
         * Current username
         * @return {string} Current username 
         */
        username: function () {
            return storage.localStorage.get("username");
        },

        /**
         * Given element (or jQuery expression) applies all config keys to elements with data-config="key" defined. 
         * Only first defined value will be replaced if multiple keys specified.
         * 
         * @example
         * // Will replace innerHTML with content:
         *  <element data-config="key,key2,...">Initial value</element>
         * @example  
         * // Will replace attribute attr with content:
         *  <element data-config="attr:key,..." attr="Initial value"/>
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
                            if (config.applyKey(key, e, attr)) {
                                break;
                            }
                        } else {
                            if (config.applyKey(key, e)) {
                                break;
                            }
                        }
                    }
                } else {
                    config.applyKey(key, e);
                }
            }
        },

        /**
         * Apply single key, either from configuration or from localStorage.
         * @private
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
            if (config[key] != undefined && typeof config[key] != "function" ) {
                var val = config[key];
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

    return config;
});