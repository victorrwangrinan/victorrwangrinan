({
	getRecords : function(component) {
		var action=component.get("c.getItems");
        action.setCallback(this,function(response){
            component.set('v.items',response.getReturnValue());
        });
        $A.enqueueAction(action);
	}
})