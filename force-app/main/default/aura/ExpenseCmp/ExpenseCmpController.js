({
        // Load expenses from Salesforce
    doInit: function(component, event, helper) {

        // Create the action
        var action = component.get("c.getExpenses");

        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.expenses", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });

        // Send action off to be executed
        $A.enqueueAction(action);
    },
    handleUpdateExpense: function(component, event, helper) {
        var updatedExp = event.getParam("expense");
        helper.updateExpense(component, updatedExp);
    },
    handleCreateExpense:function(component, event, helper){
        var newExp=event.getParam("expense");
        console.log('==='+JSON.stringify(newExp));
        helper.createExpense(component,newExp);
    },
    handleDeleteExpense:function(component, event, helper){
        var delExp=event.getParam("expense");
        helper.delExpense(component,delExp);
    },
})