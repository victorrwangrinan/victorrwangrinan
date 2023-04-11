({
    getOptMembers : function(component,event){
        var action = component.get("c.getAvailableMembers");
        action.setParams({
            "groupId":component.get('v.groupId'),
            "filterNo":component.get('v.searchNo'),
            "filterName":component.get('v.searchName')
        });

        action.setCallback(this, function (response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var returnValue=response.getReturnValue();
                var result=JSON.parse(returnValue);
                component.set('v.optionMembers',result);
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
        });



        $A.enqueueAction(action);
    },
    getObjectRecords : function(component,event){
        var action = component.get("c.getInitInfo");
        action.setParams({
            "groupId":component.get('v.groupId'),
            "pageNumber":component.get('v.pageNumber'),
            "pageSize":component.get('v.pageSize'),
        });



        action.setCallback(this, function (response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var returnValue=response.getReturnValue();
                var result=JSON.parse(returnValue);
                component.set('v.memberList',result.allMemberList);
            	component.set('v.allMemberSize',result.allMemberSize);

                component.set('v.memberTypeOptions',result.memberTypeOptions);
                component.set('v.memberRoleOptions',result.memberRoleOptions);
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
        });

        $A.enqueueAction(action);
    },
    getPicklist:function(component,cretype){

    }

})