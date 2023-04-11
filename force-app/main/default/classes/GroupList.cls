public with sharing class GroupList {
	public class InitInfo {
        public Integer allGroupSize {get; set;}
        public List<Group__c> groupList {get; set;}

        public initInfo() {
            this.allGroupSize = 0;
            this.groupList = new List<Group__c>();
        }
    }

    @AuraEnabled
    public static String getInitInfo(Decimal pageNumber, Integer pageSize, String nameFilter) {
        System.debug(LoggingLevel.DEBUG, '*** pageNumber: ' + pageNumber);
        System.debug(LoggingLevel.DEBUG, '*** pageSize: ' + pageSize);
    	InitInfo info = new InitInfo();


        String queryString = 'SELECT Id'
                    + '        , CreatedBy.Name'
                    + '        , Name'
                    + ' FROM Group__c';
        if (String.isNotEmpty(nameFilter)) {
            queryString += ' AND Name LIKE \'%' + nameFilter + '%\'';
        }
        queryString += ' ORDER BY CreatedDate DESC';

    	List<Group__c> allGroupList = new List<Group__c>();
    	allGroupList = Database.query(queryString);
    	info.allGroupSize = allGroupList.size();

    	Integer min = ((Integer)pageNumber - 1) * pageSize;
        Integer max = (Integer)pageNumber * pageSize -1;
        for (Integer i = min ; i <= max; i++ ) {
            if (i < info.allGroupSize) {
                info.groupList.add(allGroupList.get(i));
            }
        }

        return JSON.serialize(info);
    }

    /*@AuraEnabled
    public static String getMemberList(String groupId) {
        System.debug(LoggingLevel.DEBUG, '*** groupId: ' + groupId);
        List<Group_Member__c> memberList = CPRI_Program_Util.getGroupMembers(groupId);
        System.debug(LoggingLevel.DEBUG, '*** memberList: ' + memberList);
        return JSON.serialize(memberList);
    }*/

    @AuraEnabled
    public static String createNewGroup(String groupName) {
        Group__c newGroup = new Group__c(
            Name = groupName
        );
        Database.SaveResult rslt = Database.insert(newGroup);
        if (rslt.isSuccess()) {
            return 'Success';
        } else {
            return JSON.serialize(rslt.getErrors());
        }
    }

    @AuraEnabled
    public static String deleteGroup(String groupId) {
        Database.DeleteResult rslt = Database.delete(groupId);
        if (rslt.isSuccess()) {
            return 'Success';
        } else {
            return JSON.serialize(rslt.getErrors());
        }
    }
}