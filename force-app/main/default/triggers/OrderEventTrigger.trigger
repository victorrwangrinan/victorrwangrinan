trigger OrderEventTrigger on Order_Event__e (after insert) {
    List<Task> taskList = new List<Task>();
    for(Order_Event__e orderEvt : Trigger.new){
        if(orderEvt.Has_Shipped__c  == true){
            Task ta = new Task();
            ta.Priority = 'Medium';
            ta.Subject = 'Follow up on shipped order ' + orderEvt.Order_Number__c;
            ta.OwnerId = orderEvt.CreatedById;
            taskList.add(ta);
        }
    }
    insert taskList;
}