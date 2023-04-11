public class NewCaseListController {
    public List<Case> newCases{get;set;}
    public NewCaseListController(){
        newCases=getNewCases();
    }
    
    public List<Case> getNewCases(){
        List<Case> caList=[select Id,CaseNumber from case where status='new'];
        return caList;
    }
}