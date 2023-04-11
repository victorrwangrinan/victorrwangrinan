({
	doInit : function(component, event, helper) {
        var name=component.find("accName").get("v.value");
        console.log("----"+name);
        helper.getAllAccounts(component,name);
    },
    sentOnChangeEvt: function(component,event,helper){
    	//var evt=$A.get("e.c:MyAccountEvt");
    	var evt=component.getEvent("acountChangeEvt");
    	var accId=component.find("selectAccount").get("v.value");
    	console.log("选择的客户Id"+accId);
    	evt.setParams({
    		"accId":accId
    	});
    	evt.fire();
    }
})