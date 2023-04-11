({
    getObjectRecords : function(component,event){
        component.set("v.isBusy", true);
        var action = component.get("c.getInitInfo");
        action.setParams({
            "pageNumber":component.get('v.pageNumber'),
            "pageSize":component.get('v.pageSize'),
            "nameFilter":component.get('v.nameFilter')
        });

        action.setCallback(this, function (response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var returnValue=response.getReturnValue();
                var result=JSON.parse(returnValue);
                component.set('v.groupList',result.groupList);
            	component.set('v.allGroupSize',result.allGroupSize);
            } else {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("ERROR: " + errors[0].message);
                    }
                } else {
                    alert("ERROR: Unknown error");
                }
            }
            component.set("v.isBusy", false);
        });
        $A.enqueueAction(action);
    }
})