({
	clickCreateItem  : function(component, event, helper) {
		var evt=component.getEvent("addItemEvent");
        
        var validCamp = component.find('itemform').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        if(validCamp){
            var camp = component.get("v.newItem");
            helper.createItem (component);
            evt.setParams({
                "camp":camp
            });
			evt.fire();
            component.set("v.newItem",{'sobjectType':'Camping_Item__c',
                'Name': '',
                'Quantity__c': 0,
                'Price__c': 0,
                'Packed__c': false});
        }
	}
})