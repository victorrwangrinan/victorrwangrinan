({
	clickCreate: function(component, event, helper) {
        var validExpense = component.find('expenseform').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validExpense){
            // Create the new expense
            var newExpense = component.get("v.newExpense");
            var createEvent = component.getEvent("createExpense");
            createEvent.setParams({ "expense": newExpense });
            createEvent.fire();
        }
    },
    handleUploadFinished: function (component, event,helper) {
        // Get the list of uploaded files
        //var uploadedFiles = event.getParam("files");
        alert("Files uploaded : ");
    }
})