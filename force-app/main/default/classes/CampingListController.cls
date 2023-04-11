public class CampingListController {

    @AuraEnabled
    public static List<Camping_Item__c> getItems(){
        return [select Id,name,price__c,quantity__c,Packed__c from Camping_Item__c];
    }

    @AuraEnabled
    public static void saveItem (Camping_Item__c camp){
        insert camp;
    }
}