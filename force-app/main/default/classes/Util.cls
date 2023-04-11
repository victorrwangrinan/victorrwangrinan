public with sharing class Util {

    public static List<Schema.PicklistEntry> getPicklistValues(String ObjectApiName,String FieldName) {


        Schema.SObjectType targetType = Schema.getGlobalDescribe().get(ObjectApiName);  //From the Object Api name retrieving the SObject
        Sobject objectName = targetType.newSObject();
        Schema.sObjectType sobjectType = objectName.getSObjectType();   //grab the sobject that was passed
        Schema.DescribeSObjectResult sobjectDescribe = sobjectType.getDescribe();   //describe the sobject
        Map<String, Schema.SObjectField> fieldMap = sobjectDescribe.fields.getMap();    //get a map of fields for the passed sobject
        List<Schema.PicklistEntry> pickListValues = fieldMap.get(FieldName).getDescribe().getPickListValues();  //

        return pickListValues;
    }
}