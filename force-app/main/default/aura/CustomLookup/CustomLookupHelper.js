({
    searchHelper : function(component,event,searchValue) {
    	var action = component.get('c.fetchAccount');
    	action.setParams({
    		"name" : searchValue
    	});
    	action.setCallback(this, function(response){
    		var state = response.getState();
    		console.log('========'+state);
    		if(state == 'SUCCESS'){
    			var returnValue = response.getReturnValue();
    			component.set("v.listOfSearchRecords",JSON.parse(returnValue));
    			console.log('--->'+component.get("v.listOfSearchRecords"));
    		}
    	});
    	$A.enqueueAction(action);
    }
})