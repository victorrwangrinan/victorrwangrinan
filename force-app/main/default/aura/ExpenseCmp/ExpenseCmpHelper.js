({
	    createExpense: function(component, expense) {
        this.saveExpense(component, expense, function(response){
            var state = response.getState();
            console.log('+++++++++++'+JSON.stringify(expense));
            if (state === "SUCCESS") {
                var theExpenses = component.get("v.expenses");
        		console.log('===**********'+JSON.stringify(response.getReturnValue()));
                theExpenses.push(response.getReturnValue());
                console.log("Expenses before 'create': " + JSON.stringify(theExpenses));
                component.set("v.expenses", theExpenses);
                console.log("Expenses after 'create': " + JSON.stringify(theExpenses));
            }
        });
    },
    delExpense:function(component, expense){
        //this.deleteExp(component, expense);
    },

    updateExpense: function(component, expense) {
        this.saveExpense(component, expense);
    },
	saveExpense: function(component, expense, callback) {
        var action = component.get("c.saveExpense");
        action.setParams({
            "expense": expense
        });
        if (callback) {
            action.setCallback(this, callback);
        }
        $A.enqueueAction(action);
    },
    deleteExp:function(component, expense, callback){
        var action=component.get("c.deleteExp");
        action.setParams({
            "expense":expense
        });
        if(callback){
            action.setCallback(this, callback);
        }
        $A.enqueueAction(action);
    }

})