({
	createItem :function(component){
        var action=component.get("c.saveItem");
        action.setParam("camp",component.get('v.newItem'));
        $A.enqueueAction(action);
    }
})