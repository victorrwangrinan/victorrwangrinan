({
    getAccount : function(component,Id) {
    	var action=component.get('c.getAccount');
    	action.setParam("accId", Id)
    	action.setCallback(this, function(response){
    		component.set('v.account', response.getReturnValue());
    	});
    	$A.enqueueAction(action);
    }
})