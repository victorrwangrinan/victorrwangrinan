({
    doInit :function(component, event, helper){
        
        helper.getRecords(component);
    },
    
    
	handleAddItem  : function(component, event, helper) {
        var item=event.getParam("item");
        
        var action=component.get("c.saveItem");
        action.setParam("item",item);
        
        action.setCallback(this,function(response){
            var items=component.get("v.items");
        	items.push(response.getReturnValue());
        	component.set("v.items",items);
        });
        $A.enqueueAction(action);
	}
})