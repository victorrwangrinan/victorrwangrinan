public class summerupdatecontroller
{
    public Set<String> attset{get;set;}  //附件id
    public Id          objId {get;set;}  //记录id
    public Attachment attachment{get;set;} //附件
    public List<Attachment> attachedFiles{get;set;}
    public summerupdatecontroller()      //构造方法
    {
        objId = '0017F00000N2GQm';
        attachment = new Attachment();
        attset = new Set<String>();
        attachedFiles = [select Id,Name from Attachment 
        					where parentId =:objId order By LastModifiedDate DESC ];
        
    } 
    public PageReference upload() {

   		attachment.OwnerId = UserInfo.getUserId();
	    attachment.ParentId = objId; // the record the file is attached to
	    attachment.IsPrivate = true;

	    try {
	      insert attachment;
	    } catch (DMLException e) {
	      ApexPages.addMessage(new ApexPages.message(ApexPages.severity.ERROR,'Error uploading attachment'));
	      return null;
	    }

	    ApexPages.addMessage(new ApexPages.message(ApexPages.severity.INFO,'Attachment uploaded successfully'));
	    return null;
  }
}