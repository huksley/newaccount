define("page/calendar", [ "jquery", "kendo.core.min", "log", "kendo.data.min", "kendo.treelist.min" ], function ($, kendo, log) {
    var calendar = {};
    
    calendar.init = function () {
        var treeListDs = new kendo.data.TreeListDataSource({
            transport: {
                read: {
                    url: "calendar.php",
                    dataType: "jsonp"
                }
            },
            schema: {
                model: {
                    id: "RecordID",
                    parentId: "ParentID",
                    fields: {
                        ParentID: { field: "ParentID",  nullable: true },
                        RecordID: { field: "RecordID", type: "number" }
                    },
                    expanded: true
                }
            }
        });

        var tl = $("#treelist").kendoTreeList({
            dataSource: treeListDs,
            filterable: true,
            sortable: true,
            selectable: "cell",
            resizeable: true,
            columns: [
                { field: "Position", title: "Позиция" },
                { field: "Flow1", title: "19 сентября", width: 280 }
            ]
        }).data("kendoTreeList");
        tl.bind("change", function (e) {
            window.console.log("Change TreeLIst:", e);
        });

        treeListDs.read();
    }
    return calendar;
});