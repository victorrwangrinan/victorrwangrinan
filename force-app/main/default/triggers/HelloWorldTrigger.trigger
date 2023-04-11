trigger HelloWorldTrigger on Book__c (after update) {
    List<Book__c > lstCon = [SELECT Id, Name FROM Book__c ];
    for(Book__c c : lstCon){
       c.name= 'ww';
    }
    update lstCon;
}