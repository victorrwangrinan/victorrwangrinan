trigger BatchApexErrorTrigger on BatchApexErrorEvent (after insert) {
	List<BatchLeadConvertErrors__c> records = new List<BatchLeadConvertErrors__c>();
	for(BatchApexErrorEvent evt:Trigger.new){
	BatchLeadConvertErrors__c a = new BatchLeadConvertErrors__c(
	AsyncApexJobId__c = evt.AsyncApexJobId,
	Records__c = evt.JobScope,
	StackTrace__c = evt.StackTrace
	);
	records.add(a);
	}
	insert records;
}