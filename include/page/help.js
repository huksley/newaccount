define("page/help", [ "jquery" ], function ($, kendo, log) {
    var help = {};
    help.init = function () {
       $("#helpme").html("Here2 " + new Date());
    }
    return help;
});