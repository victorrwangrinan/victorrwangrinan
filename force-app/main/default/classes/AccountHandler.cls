public  class AccountHandler implements Triggers.Handler{
    public void handle(){
    	Map<Id,Account> targetMap= (Map<Id,Account>)trigger.newMap;
    	Set<Id> targetSet = targetMap.keySet();
    	//System.debug(ANY o)
    	List<AccountHistory> history= [SELECT AccountId, OldValue, NewValue, Field, CreatedById, CreatedDate FROM AccountHistory where AccountId in :targetSet];

    	System.debug('history----<'+history.size());
    }
}