public class MyHelloWorld{

    public List<SelectOption> groupOptions {get;set;}
    public String GroupName{get;set;}
    public List<GroupMember__c> groupMembers{get;set;}
    public List<String> values { get; set; }
    public List<SelectOption> options{get{

        return new List<SelectOption> {
            new SelectOption('test1', 'test1'),
            new SelectOption('test2', 'test2'),
            new SelectOption('test3', 'test3'),
            new SelectOption('test4', 'test4')
        };
    }set;}

    public MyHelloWorld(){
        groupOptions=new List<SelectOption>();
        groupMembers=new List<GroupMember__c>();
        values = new String[] { 'test1', 'test2' };
        Integer index=1;
        for(Group__c gr : [Select id,Name From Group__c Order by CreatedDate desc]){

            SelectOption item=new SelectOption(gr.Id,gr.Name);
            groupOptions.add(item);
            if(index==1){
                GroupName=gr.Id;
            }
            index++;
        }

        getGroupMemberByGroup();
    }

    public void getGroupMemberByGroup(){
        groupMembers=[Select id,Name,memberType__c,memberRole__c From GroupMember__c where Group__c=:GroupName];
    }

 }