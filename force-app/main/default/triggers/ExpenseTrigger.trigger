trigger ExpenseTrigger on Expense__c (before update) {

    ExpenseHandler.updateAmount(Trigger.new);
}