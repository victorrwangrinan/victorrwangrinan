global class testController {
    public String index{get;set;}
    public String index2{get;set;}
    public String index3{get;set;}
    public String index4{get;set;}
    public Expense__c ex{get;set;}
    public static string test{get;set;}
    public testController(){}

    public void addmessage(){
    	System.debug('index:'+index);
    	System.debug('index2:'+index2);
    	System.debug('index3:'+index3);
    	System.debug('index4:'+index4);
    	/*if(index!=null){
    		ApexPages.addmessage(new ApexPages.message(ApexPages.severity.INFO,index));
    	}*/
        Account acc=[select id from Account where Name='wang'];
        Expense__c ex=[select id,Account__c,Date__c from Expense__c where Name='test'];
        ex.Account__c=acc.Id;
        update ex;

    }

    @RemoteAction
    public static String changeTest(){
        test = 'test changed';
        return test;
    }
    global class testinner{
        global string str;
    }
}