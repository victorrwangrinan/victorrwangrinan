trigger AttachmentTrigger on Attachment (before insert) {
    if(Trigger.isInsert){
        String accountPrefix  = Schema.getGlobalDescribe().get('Account').getDescribe().getKeyPrefix();
        List<Attachment> attachList = Trigger.new;
        Attachment att = attachList[0];
        String parentId = att.ParentId;
        String parentIdPrefix = parentId.substring(0, 3);
        if(parentIdPrefix == accountPrefix){
            System.debug('===>'+att.Name);
            // String attachmentContent = att.Body.toString();
            // String regx = '\r\n|[\r\n]';
            // List<String> contentLines = attachmentContent.split(regx);
            // for(String lineCon: contentLines){
            //     System.debug('===>'+lineCon);
            // }

        }
    }
}