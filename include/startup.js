require.config({
    baseUrl: 'include',
    paths: {
        "jquery": '../lib/jquery/dist/jquery.min',
        "jquery.slimscroll": '../lib/jquery-slimscroll/jquery.slimscroll.min',
        "jquery.i18n": '../lib/jquery-i18n/src/jquery.i18n',
        "pace": '../lib/pace/pace.min',
        "bootstrap": '../lib/bootstrap/dist/js/bootstrap.min',
        "admin-lte": '../lib/admin-lte/dist/js/app',
        "text": "../lib/requirejs-text/text",
        "camunda-bpm-sdk": "../lib/camunda-bpm-sdk-js/camunda-bpm-sdk",
        
        // Kendo UI core
        "kendo.autocomplete.min": "../lib/kendo-ui/js/kendo.autocomplete.min",
        "kendo.binder.min": "../lib/kendo-ui/js/kendo.binder.min",
        "kendo.button.min": "../lib/kendo-ui/js/kendo.button.min",
        "kendo.calendar.min": "../lib/kendo-ui/js/kendo.calendar.min",
        "kendo.color.min": "../lib/kendo-ui/js/kendo.color.min",
        "kendo.colorpicker.min": "../lib/kendo-ui/js/kendo.colorpicker.min",
        "kendo.combobox.min": "../lib/kendo-ui/js/kendo.combobox.min",
        "kendo.core.min": "../lib/kendo-ui/js/kendo.core.min",
        "kendo.data.min": "../lib/kendo-ui/js/kendo.data.min",
        "kendo.data.odata.min": "../lib/kendo-ui/js/kendo.data.odata.min",
        "kendo.data.signalr.min": "../lib/kendo-ui/js/kendo.data.signalr.min",
        "kendo.data.xml.min": "../lib/kendo-ui/js/kendo.data.xml.min",
        "kendo.datepicker.min": "../lib/kendo-ui/js/kendo.datepicker.min",
        "kendo.datetimepicker.min": "../lib/kendo-ui/js/kendo.datetimepicker.min",
        "kendo.dialog.min": "../lib/kendo-ui/js/kendo.dialog.min",
        "kendo.draganddrop.min": "../lib/kendo-ui/js/kendo.draganddrop.min",
        "kendo.dropdownlist.min": "../lib/kendo-ui/js/kendo.dropdownlist.min",
        "kendo.editable.min": "../lib/kendo-ui/js/kendo.editable.min",
        "kendo.fx.min": "../lib/kendo-ui/js/kendo.fx.min",
        "kendo.list.min": "../lib/kendo-ui/js/kendo.list.min",
        "kendo.listview.min": "../lib/kendo-ui/js/kendo.listview.min",
        "kendo.maskedtextbox.min": "../lib/kendo-ui/js/kendo.maskedtextbox.min",
        "kendo.menu.min": "../lib/kendo-ui/js/kendo.menu.min",
        "kendo.mobile.actionsheet.min": "../lib/kendo-ui/js/kendo.mobile.actionsheet.min",
        "kendo.mobile.application.min": "../lib/kendo-ui/js/kendo.mobile.application.min",
        "kendo.mobile.button.min": "../lib/kendo-ui/js/kendo.mobile.button.min",
        "kendo.mobile.buttongroup.min": "../lib/kendo-ui/js/kendo.mobile.buttongroup.min",
        "kendo.mobile.collapsible.min": "../lib/kendo-ui/js/kendo.mobile.collapsible.min",
        "kendo.mobile.drawer.min": "../lib/kendo-ui/js/kendo.mobile.drawer.min",
        "kendo.mobile.listview.min": "../lib/kendo-ui/js/kendo.mobile.listview.min",
        "kendo.mobile.loader.min": "../lib/kendo-ui/js/kendo.mobile.loader.min",
        "kendo.mobile.modalview.min": "../lib/kendo-ui/js/kendo.mobile.modalview.min",
        "kendo.mobile.navbar.min": "../lib/kendo-ui/js/kendo.mobile.navbar.min",
        "kendo.mobile.pane.min": "../lib/kendo-ui/js/kendo.mobile.pane.min",
        "kendo.mobile.popover.min": "../lib/kendo-ui/js/kendo.mobile.popover.min",
        "kendo.mobile.scroller.min": "../lib/kendo-ui/js/kendo.mobile.scroller.min",
        "kendo.mobile.scrollview.min": "../lib/kendo-ui/js/kendo.mobile.scrollview.min",
        "kendo.mobile.shim.min": "../lib/kendo-ui/js/kendo.mobile.shim.min",
        "kendo.mobile.splitview.min": "../lib/kendo-ui/js/kendo.mobile.splitview.min",
        "kendo.mobile.switch.min": "../lib/kendo-ui/js/kendo.mobile.switch.min",
        "kendo.mobile.tabstrip.min": "../lib/kendo-ui/js/kendo.mobile.tabstrip.min",
        "kendo.mobile.view.min": "../lib/kendo-ui/js/kendo.mobile.view.min",
        "kendo.multiselect.min": "../lib/kendo-ui/js/kendo.multiselect.min",
        "kendo.notification.min": "../lib/kendo-ui/js/kendo.notification.min",
        "kendo.numerictextbox.min": "../lib/kendo-ui/js/kendo.numerictextbox.min",
        "kendo.pager.min": "../lib/kendo-ui/js/kendo.pager.min",
        "kendo.panelbar.min": "../lib/kendo-ui/js/kendo.panelbar.min",
        "kendo.popup.min": "../lib/kendo-ui/js/kendo.popup.min",
        "kendo.progressbar.min": "../lib/kendo-ui/js/kendo.progressbar.min",
        "kendo.resizable.min": "../lib/kendo-ui/js/kendo.resizable.min",
        "kendo.responsivepanel.min": "../lib/kendo-ui/js/kendo.responsivepanel.min",
        "kendo.router.min": "../lib/kendo-ui/js/kendo.router.min",
        "kendo.selectable.min": "../lib/kendo-ui/js/kendo.selectable.min",
        "kendo.slider.min": "../lib/kendo-ui/js/kendo.slider.min",
        "kendo.sortable.min": "../lib/kendo-ui/js/kendo.sortable.min",
        "kendo.splitter.min": "../lib/kendo-ui/js/kendo.splitter.min",
        "kendo.tabstrip.min": "../lib/kendo-ui/js/kendo.tabstrip.min",
        "kendo.timepicker.min": "../lib/kendo-ui/js/kendo.timepicker.min",
        "kendo.timezones.min": "../lib/kendo-ui/js/kendo.timezones.min",
        "kendo.toolbar.min": "../lib/kendo-ui/js/kendo.toolbar.min",
        "kendo.tooltip.min": "../lib/kendo-ui/js/kendo.tooltip.min",
        "kendo.touch.min": "../lib/kendo-ui/js/kendo.touch.min",
        "kendo.ui.core.min": "../lib/kendo-ui/js/kendo.ui.core.min",
        "kendo.userevents.min": "../lib/kendo-ui/js/kendo.userevents.min",
        "kendo.validator.min": "../lib/kendo-ui/js/kendo.validator.min",
        "kendo.view.min": "../lib/kendo-ui/js/kendo.view.min",
        "kendo.virtuallist.min": "../lib/kendo-ui/js/kendo.virtuallist.min",
        "kendo.webcomponents.min": "../lib/kendo-ui/js/kendo.webcomponents.min",
        "kendo.window.min": "../lib/kendo-ui/js/kendo.window.min"
    },
    urlArgs: "ts=" +  (new Date()).getTime(),
    enforceDefine: true,
    shim: {
        "jquery": {
        },
        "admin-lte": {
            deps: [ "jquery", "bootstrap", "jquery.slimscroll", "jquery.i18n" ],
            exports: "jQuery.AdminLTE"
        },
        "jquery.slimscroll": {
            deps: [ "jquery" ],
            exports: "jQuery.fn.slimScroll"
        },
        "jquery.i18n": {
            deps: [ "jquery" ],
            exports: "jQuery.fn.i18n"
        },
        "bootstrap": {
            deps: [ "jquery" ],
            exports: "jQuery.fn.tooltip"
        }
    },
    onNodeCreated: function (node, config, moduleName, url) {
        console.log("Loading " + moduleName);

        node.addEventListener('load', function() {
            console.log('module ' + moduleName + ' has been loaded');
        });

        node.addEventListener('error', function() {
            console.log('module ' + moduleName + ' could not be loaded');
        });
    }
});

define("startup", [ "jquery", "pace", "init", "bootstrap", "util" ], function ($) {
    /** Initialize application */
    window.AdminLTEOptions = {
        sidebarExpandOnHover: false,
        enableBoxWidget: false,
        enableControlSidebar: false    
    };
});

