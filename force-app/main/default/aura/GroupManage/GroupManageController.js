({
    hideMembers : function(component, event, helper) {
    	component.set("v.isShowMembers",false);
    },

    handleValueChanged : function(component,event,helper){
    	var flag = component.get("v.isOpenAdd");
    	console.log('flag:'+flag);
    	if(flag == false){
    		var evt = $A.get("e.c:CommonEvent");
    		evt.setParams({"message":"closeModal"});
    		evt.fire();
    	}

    }
})