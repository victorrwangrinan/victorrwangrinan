({
	keyPressController: function(component, event, helper) {
		var searchValue = component.get("v.SearchKeyWord");
		var resultListDiv = component.find("searchRes");
		console.log('---'+resultListDiv);
		if (searchValue.length > 0) {
			$A.util.addClass(resultListDiv, 'slds-is-open');
			$A.util.removeClass(resultListDiv, 'slds-is-close');
			helper.searchHelper(component, event, searchValue);
		} else {
			component.set("v.searchObjList", null);
			$A.util.addClass(resultListDiv, 'slds-is-close');
			$A.util.removeClass(resultListDiv, 'slds-is-open');
		}
	}
})