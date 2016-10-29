define("init", [ "jquery", "admin-lte", "theme", "routing" ], function ($) {
    /** Boot theme */
    $(".initial-invisible").css("visibility", "visible");
    $(".initial-hidden").css("display", "block");

    $('.sidebar-menu > li.menu-item a').tooltip({
        container: 'body',
        placement: 'right',
        template: '<div class="tooltip sidebar-tooltip tooltip-sidebar-collapsed" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
});
