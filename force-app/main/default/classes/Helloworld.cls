public class Helloworld {

    @AuraEnabled
    public static string getContent(){
        return 'hello sdc';
    }

    @AuraEnabled
    public static List<Account> getAllAccounts(){
        return [Select Id,Name,CreatedBy.Name From Account];
    }

    @AuraEnabled
    public static Account getAccount(string accId){
        return [select Id,Name,(SELECT Id,Name FROM Contacts) from account where Id=:accId];
    }
}