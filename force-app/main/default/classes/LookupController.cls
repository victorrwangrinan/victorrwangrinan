public with sharing class LookupController {

    @AuraEnabled
    public static String fetchAccount(String name){

    	String searchKey = name+'%';
    	List<Account> resultList = new List<Account>();
    	for(Account acc : [SELECT Id,Name FROM Account WHERE Name Like: searchKey]){
    		resultList.add(acc);
    	}
    	return JSON.serialize(resultList);
    }
}