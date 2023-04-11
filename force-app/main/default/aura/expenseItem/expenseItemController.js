({
	doInit : function(component, event, helper) {
        var mydate = component.get("v.expense.Date__c");
        if(mydate){
            console.log("init----"+new Date(mydate));
            component.set("v.formatdate", new Date(mydate));
        }
    },
    clickReimbursed: function(component, event, helper) {
        var expense = component.get("v.expense");
        var updateEvent = component.getEvent("updateExpense");
        updateEvent.setParams({ "expense": expense });
        updateEvent.fire();
    },
    deleteExp:function(component, event, helper){
        var expense = component.get("v.expense");
        var deleteExpense = component.getEvent("deleteExpense");
        deleteExpense.setParams({ "expense": expense });
        deleteExpense.fire();
    }
})