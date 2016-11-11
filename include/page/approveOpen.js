define([ "jquery", "config", "vue", "routing", "bpm" ], function ($, config, Vue, routing, bpm) {
    var o = {};
    o.init = function (selectedId) {
        bpm.readTasks("approveOpen", function (tasks) {
            var selected = -1;
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].id == selectedId) {
                    selected = i;
                    break;
                }
            }
            if (selected == -1 && tasks.length > 0) {
                selected = 0;
            }

            console.log("selected: " + selected + ", selectedId: " + selectedId);
            console.log("Rendering view");
            var vm = new Vue({
                el: "#approveOpen",
                data: {
                    tasks: tasks,
                    currentTask: selected >= 0 ? tasks[selected] : null,
                    approve: {
                        approved: true,
                        approvedFalseReason: ""
                    }  
                },
                methods: {
                    clickTask: function (id, index, event) {
                        console.log(id, index);
                        routing.navigate("!/approveOpen/" + id, true);
                        this.currentTask = tasks[index];
                        event.preventDefault();
                    },
                    completeTask: function () {
                        var index = this.tasks.indexOf(this.currentTask);
                        var wait = [];
                        wait[wait.length] = $.ajax({
                            url: config.bpmUrl + "/task/" + this.currentTask.id + "/claim",
                            method: "POST",
                            data: "{}",
                            headers: {
                                "Authorization": config.auth(),
                                "Content-Type": "application/json"
                            },
                            success: function () {

                            }
                        });
                        wait[wait.length] = $.ajax({
                            url: config.bpmUrl + "/task/" + this.currentTask.id + "/submit-form",
                            method: "POST",
                            data: JSON.stringify({
                                variables: {
                                    approved: { value: this.approve.approved },
                                    approvedFalseReason: { value: this.approve.approvedFalseReason }
                                }
                            }),
                            headers: {
                                "Authorization": config.auth(),
                                "Content-Type": "application/json"
                            },
                            success: function () {
                            }   
                        });

                        var vm = this;
                        $.when.apply($, wait).then(function () {
                            console.log("removing " + index);
                            vm.tasks.splice(index, 1);
                            if (vm.tasks.length > 0) {
                                vm.currentTask = vm.tasks[0];
                                routing.navigate("!/approveOpen/" + vm.currentTask.id, true);
                            } else {
                                vm.currentTask = null;
                                routing.navigate("!/approveOpen");
                            }
                        });
                    }
                }
            })
        });
    }
    return o;
});