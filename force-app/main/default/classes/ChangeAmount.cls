global class ChangeAmount implements Database.Batchable<sObject>,Schedulable{
    public String query;

    global ChangeAmount() {
        this.query = query;
    }
    global void execute(SchedulableContext sc){
        Database.executeBatch(new ChangeAmount(), 200);
    }

    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator([select id,Amount__c from Expense__c]);
    }

    global void execute(Database.BatchableContext BC, list<Sobject> scope) {
        for(Expense__c ex:(List<Expense__c>)scope){
            ex.Amount__c=123;
        }
        Database.SaveResult[] result=Database.update(scope,false);
        for(Database.SaveResult re:result){
            if(!re.isSuccess()){
                System.debug(Json.serializePretty(re.errors));
            }
        }
    }

    global void finish(Database.BatchableContext BC) {

    }
}