global class TestBatch implements Database.Batchable<testController.testinner>,Database.Stateful{
    Integer queryCount = 0;

    String myEmailAddress = 'myAddress@xx.com';

    global List<testController.testinner> start(database.BatchableContext bc )
    {
        testController.testinner inn=new testController.testinner();
        inn.str='str';
        new List<testController.testinner>{inn};
        return new List<testController.testinner>{inn};
    }

    global void execute (Database.BatchableContext bc, List<testController.testinner> goodsList)
    {

            for(testController.testinner inn:goodsList){
                Contact con= new Contact();
                con.LastName=inn.str;
                insert con;
            }

            Contact co=[select name from Contact];
            System.debug('=====>'+co.Name);
	}
    global void finish(Database.BatchableContext bc)
    {
        /*--------execute finish----------*/
        /*注意：如果不实现Database.Stateful接口，则queryCount为0
              因为在execute执行完成便会回滚到初始状态*/
        System.debug('query count:' + queryCount);
        //send email
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setToAddresses(new String[]{myEmailAddress});//set mail getter
        email.setSubject('show count'); //set subject
        email.setHtmlBody('query Count' + queryCount);
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
    }
}