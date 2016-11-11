define([ "jquery", "vue", "config", "routing" ], function ($, Vue, config, routing) {
    var o = {};
    o.init = function () {
        var app4 = new Vue({
            el: '#newApplication',
            data: {
                fullName: "dasdsadas",
                address: "dasdasdasdsa",
                yearlyTurnover: 19219191,
                activity: "other",
                phone: ""
            },
            methods: {
                startProcess: function () {
                    $.ajax({
                        url: config.bpmUrl + "/process-definition/key/newaccount/submit-form",
                        method: "POST",
                        data: JSON.stringify({
                            variables: {
                                fullName: { value: this.fullName },
                                address: { value: this.address },
                                yearlyTurnover: { value: this.yearlyTurnover },
                                activity: { value: this.activity },
                                phone: { value: this.phone }
                            }
                        }),
                        headers: {
                            "Authorization": config.auth(),
                            "Content-Type": "application/json"
                        },
                        success: function () {
                            routing.navigate("/");
                        }   
                    })
                }
            }
        });
    }
    return o;
});