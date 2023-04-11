trigger DuplicateReocrdItemTrigger on DuplicateRecordItem (before insert,after insert) {
    
    if(Trigger.isAfter){
        System.debug('------------------'+LeadTriggerHandler.leadIds);
        Set<Id> leadIds = new Set<Id>();
        for(DuplicateRecordItem item : Trigger.New){
            leadIds.add(item.recordId);
        }
        
        List<Lead> leads = [SELECT Id FROM Lead WHERE Id IN :LeadTriggerHandler.leadIds];
        System.debug('=======>ll'+leadIds);
    }
}