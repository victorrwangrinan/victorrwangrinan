public with sharing class GroupMemberListCtl {

    public class InitInfo {
        public Integer allMemberSize {get; set;}
        public List<GroupMember__c> allMemberList {get; set;}

        public List<SelectItem> memberTypeOptions{get;set;}
        public List<SelectItem> memberRoleOptions{get;set;}

        public initInfo() {
            this.allMemberSize = 0;
            this.allMemberList = new List<GroupMember__c>();

            memberTypeOptions = new List<SelectItem>();

            for(Schema.PicklistEntry a: Util.getPicklistValues('GroupMember__c', 'memberType__c')){
                SelectItem item = new SelectItem();
                item.label = a.getLabel();
                item.value = a.getValue();
                memberTypeOptions.add(item);
            }

            memberRoleOptions = new List<SelectItem>();
            for(Schema.PicklistEntry a: Util.getPicklistValues('GroupMember__c', 'memberRole__c')){
                SelectItem item = new SelectItem();
                item.label = a.getLabel();
                item.value = a.getValue();
                memberRoleOptions.add(item);
            }

        }
    }

    public class SelectItem{
        public String label{get;set;}
        public String value{get;set;}
    }

    @AuraEnabled
    public static String getInitInfo(Decimal pageNumber, Integer pageSize, String groupId) {
        System.debug(LoggingLevel.DEBUG, '*** pageNumber: ' + pageNumber);
        System.debug(LoggingLevel.DEBUG, '*** pageSize: ' + pageSize);
        InitInfo info = new InitInfo();

        List<GroupMember__c> allMemberList = new List<GroupMember__c>();
        if (String.isNotBlank(groupId)) {
            allMemberList = [SELECT Id
					                , Group__c
					                , Member_Email__c
					                , Member_Number__c
                                    , memberType__c
                                    , memberRole__c
					                , Name
					            FROM GroupMember__c
					            WHERE Group__c = :groupId
					            ORDER BY CreatedDate DESC
					        ];
        }
        info.allMemberSize = allMemberList.size();
        Integer min = ((Integer)pageNumber - 1) * pageSize;
        Integer max = (Integer)pageNumber * pageSize -1;
        for (Integer i = min ; i <= max; i++ ) {
            if (i < info.allMemberSize) {
                info.allMemberList.add(allMemberList.get(i));
            }
        }
        return JSON.serialize(info);
    }

    public class ActionResult {
        public String msg;
        public List<GroupMember__c> memberList;


        actionResult() {
            memberList = new List<GroupMember__c>();
        }
    }

    @AuraEnabled
    public static String deleteMembers(String groupIds) {
        System.debug(LoggingLevel.DEBUG, '*** groupIds: ' + groupIds);
        List<String> groupIdList = (List<String>)JSON.deserialize(groupIds, List<String>.class);
        if (!groupIdList.isEmpty()) {
            Database.DeleteResult[] rslts = Database.delete(groupIdList);
            for (Database.DeleteResult rslt : rslts) {
                if (!rslt.isSuccess()) {
                    return JSON.serialize(rslt.getErrors());
                }
            }
        }
        return 'Success';
    }

    @AuraEnabled
    public static String getMembers(String groupId) {
        List<GroupMember__c> memberList = [SELECT Id
					                , Group__c
					                , Member_Email__c
					                , Member_Number__c
                                    , memberType__c
                                    , memberRole__c
					                , Name
					            FROM GroupMember__c
					            WHERE Group__c = :groupId
					            ORDER BY CreatedDate DESC
					        ];
        return JSON.serialize(memberList);
    }

    /*@AuraEnabled
    public static String getAvailableMembers(String groupId, String filterNo, String filterName) {
        try{
            Set<String> w3AccSet = new Set<String>();
            String queryString = 'SELECT Id'
                                + ', Member_Email__c'
                                + ', Name'
                                + ', Member_Number__c'
                                + ' FROM GroupMember__c'
                                + ' WHERE Group__c = null';

            if (String.isNotBlank(filterNo)) {
                queryString += ' AND Member_Number__c LIKE \'%' + filterNo + '%\'';
            }
            if (String.isNotBlank(filterName)) {
                queryString += ' AND Name LIKE \'%' + filterName + '%\'';
            }
            queryString += ' ORDER BY CreatedDate DESC Limit 100';

            System.debug(LoggingLevel.DEBUG, '*** queryString: ' + queryString);
            List<GroupMember__c> memberList = Database.query(queryString);

            return JSON.serialize(memberList);
        }catch(Exception exp){
            //
        }
        return JSON.serialize(new List<GroupMember__c>());
    }*/

    @AuraEnabled
    public static String addMemberToGroup(String groupId, List<String> memberIds, List<String> userIds) {
        ActionResult ar = new ActionResult();
        Set<Id> userId = new Set<Id>();

        if (String.isNotBlank(groupId) && !memberIds.isEmpty()) {
            List<GroupMember__c> gmList = new List<GroupMember__c>();
            for (String memberId : memberIds) {
                if(memberId <> '' && memberId <> null){
                    GroupMember__c gm = new GroupMember__c();
                    gm.Group__c = groupId;
                    gm.Id = memberId;
                    gmList.add(gm);
                }
            }

            try {
                update gmList;
            }
            catch (Exception e) {
                ar.msg = e.getMessage();
                System.debug(LoggingLevel.DEBUG, 'addMemberToGroup exp ----- ' + e.getMessage());
            }
        }

        ar.memberList = [SELECT Id
					                , Group__c
					                , Member_Email__c
					                , Member_Number__c
                                    , memberType__c
                                    , memberRole__c
					                , Name
					            FROM GroupMember__c
					            WHERE Group__c = :groupId
					            ORDER BY CreatedDate DESC
					        ];
        ar.msg = String.isBlank(ar.msg) ? 'SUCCESS' : ar.msg;
        System.debug(LoggingLevel.DEBUG, '*** ar: ' + ar);
        return JSON.serialize(ar);
    }

    @AuraEnabled
    public static String createMembers(String nameParam, String roleParam, String typeParam, String groupId) {
            GroupMember__c mem = new GroupMember__c(
                Name = nameParam
                , memberRole__c = roleParam
                , memberType__c = typeParam
                , Group__c = groupId
            );
            insert mem;

        return '';
    }

    @AuraEnabled
    public static String getPicklistByContrlField(String controlField){
        return '';
    }
}