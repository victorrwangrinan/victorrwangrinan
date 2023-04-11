({
    getAllAccounts : function(component,str) {
    	var action=component.get('c.getAllAccounts');
    	action.setParam("str", str)
    	action.setCallback(this, function(response){
    		component.set('v.accounts', response.getReturnValue());
    	});
    	$A.enqueueAction(action);
    }
})