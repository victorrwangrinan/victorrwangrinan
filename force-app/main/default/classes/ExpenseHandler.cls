public with sharing class ExpenseHandler {
    public static Boolean isSkip = false;
    public static void updateAmount(List<Expense__c> newList){
        System.debug('----------'+newList.size());
        if(isSkip){
            return;
        }
        isSkip = true;
        for(Expense__c exp : newList){
            exp.Amount__c = 333;
        }
        
    }
}