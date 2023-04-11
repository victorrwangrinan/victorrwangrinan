public class ad {
    public string imgHeader1{get;set;}
    public string imgHeader2{get;set;}
    public string imgFirstPageHeader{get;set;}
    public ad(){
        
        imgHeader1 = 'data:image/png;base64,' + EncodingUtil.base64Encode( [SELECT Id,Body FROM Document WHERE Name = 'header1'].Body);
        imgHeader2 = 'data:image/png;base64,' + EncodingUtil.base64Encode( [SELECT Id,Body FROM Document WHERE Name = 'header2'].Body);
        imgFirstPageHeader = 'data:image/png;base64,' + EncodingUtil.base64Encode( [SELECT Id,Body FROM Document WHERE Name = 'firstpageHeader'].Body);
    }
}