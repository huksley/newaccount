define([ "jquery", "config" ], function ($, config) {
    console.log("BPM initialization");
    var counterHandler = function () {
        require([ "bpm" ], function (bpm) {
            if (config.loggedIn()) {
                bpm.updateTaskCount("openAccount", "#openAccountCount");
                bpm.updateTaskCount("approveOpen", "#approveOpenCount");
                bpm.updateTaskCount("correctApplication", "#correctApplicationCount");
            }
        });
        window.setTimeout(arguments.callee, 1000);
    };
    counterHandler();

    /**
     * BPM library
     * @module bpm
     */
    var o = {
        updateTaskCount: function (key, selector) {
            $.ajax({
                url: config.bpmUrl + "/task?processDefinitionKey=newaccount&taskDefinitionKey=" + key, 
                headers: {
                    "Authorization": config.auth()
                },
                success: function (tasks) {
                    if (tasks.length > 0) {
                        $(selector).html(tasks.length);
                    } else {
                        $(selector).html("");
                    }
                }
            });
        },
        readTasks: function (key, handler) {
            $.ajax({
                url: config.bpmUrl + "/task?processDefinitionKey=newaccount&taskDefinitionKey=" + key, 
                headers: {
                    "Authorization": config.auth()
                },
                success: function (tasks) {
                    console.log(tasks);

                    var wait = [];
                    var n = [];
                    for (var i = 0; i < tasks.length; i++) {
                        wait[wait.length] = $.ajax({
                            task: tasks[i],
                            url: config.bpmUrl + "/execution/" + tasks[i].executionId + "/localVariables", 
                            headers: {
                                "Authorization": config.auth()
                            },
                            success: function (vars) {
                                this.task.variables = vars;
                                this.task.haveVariables = 1;
                                console.log("Got vars", vars, " for task", this.task);
                                this.task.index = n.length;
                                n[n.length] = this.task;
                            }
                        });
                    }

                    $.when.apply($, wait).then(function () {
                        if (handler) {
                            handler(n);
                        }
                    });
                }
            });
        }
    };
    return o;
});