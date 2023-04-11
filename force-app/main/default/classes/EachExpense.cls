public with sharing class EachExpense {
	public List<Expense__c> duojiList{get;set;}
	public List<List<String>> exstrList{get;set;}
	public Integer index;
    public Expense__c ex{get;set;}
    public EachExpense(){


        exstrList=new List<List<String>>();
        List<Expense__c> exList=[select id,Name,parent__c from Expense__c Order by CreatedDate];

        System.debug('总列表：'+exList.size());
    	List<InnerEx> rootList=new List<InnerEx>();

        for(Integer i=0;i<exList.size();i++){
            Expense__c ex=exList[i];
            if(ex.parent__c==null){
                InnerEx inn=new InnerEx();
                inn.epen=ex;
                inn.childList=new List<InnerEx>();
                rootList.add(inn);
                exList.remove(i);
            }

        }

        System.debug('-*******'+rootList.size());

    		for(InnerEx root:rootList){
                getChildren(root,exList);
            }
    	System.debug('总数：'+JSON.serializePretty(rootList));
    }

    public void getChildren(InnerEx root,List<Expense__c> exList){
    	for(Integer i=0;i<exList.size();i++){
    		Expense__c exc=exList[i];
    		Expense__c rootex=root.epen;
            if(exc.parent__c!=null && exc.parent__c==rootex.id){
                InnerEx inn=new InnerEx();
                inn.epen=exc;
                inn.childList=new List<InnerEx>();
                root.childList.add(inn);
                exList.remove(i);
                i--;
                getChildren(inn,exList);
            }
    	}
    }

    public class InnerEx{
    	public Expense__c epen{get;set;}
    	public List<InnerEx> childList{get;set;}
    }
}