global class TestBatchAccount implements Database.Batchable<sObject> {
    public String query;

    global TestBatchAccount() {
        this.query = 'SELECT Id,Name FROM Account LIMIT 100';
    }

    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator(query);
    }

    global void execute(Database.BatchableContext BC, list<Sobject> scope) {
        List<Account> accList = new List<Account>();
        for(Account acc : (List<Account>)scope){
            Account a  = new Account();
            a.Name = 'TTTT'+acc.Name;
            accList.add(a);
        }
        insert accList;
    }

    global void finish(Database.BatchableContext BC) {

    }
}