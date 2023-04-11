/*
@description       : ChatGPt hitting class which will search your query.
@author            : Nishchal Vashisht
*/

public with sharing class ChatGptHandler {
    private static String CHAT_GPT_KEY = OpenAiKey__c.getInstance().Key__c; //Custom Setting
    private static final String ENDPOINT ='https://api.openai.com/v1/chat/completions';
    
    //@method   : getQueryData
    //@param    : searchString
    //@description  : Below method is used in Salesforce+Chat GPT integration LWC as Controller to make callout
    //                to Chat GPT and return response/error from this method
    @AuraEnabled
    public static String getQueryData(String searchString){
        try{
            String seachQueryEscaped = (searchString).trim();
            Http http = new Http();
            String reqBody = '{"model": "gpt-3.5-turbo"'
                +',"max_tokens": 4000,"temperature": 0,'
                +'"stream": false,"top_p": 0.5'
                +',"messages":[{"role":"user","content":"'+seachQueryEscaped+'"}]}';
            System.debug('Query '+seachQueryEscaped+' '+reqBody);
            HttpRequest request = new HttpRequest();
            request.setEndpoint(ENDPOINT);
            request.setMethod('POST');
            request.setHeader('Authorization', 'Bearer '+String.escapeSingleQuotes(CHAT_GPT_KEY).trim());
            //Setting timeout to max 120 second to get whole response from Chat GPT Open API
            request.setTimeout(120000);
            request.setHeader('Content-Type', 'application/json;charset=UTF-8');
            // Set the body as a JSON object
            request.setBody(reqBody);
            HttpResponse response = http.send(request);
            // Parse the JSON response
            if(response.getStatusCode() != 200) {
                System.debug('The status code returned was not expected: ' + response.getStatusCode() + ' ' + response.getBody());
                return response.getBody();
            }
            return response.getBody();
        }catch(Exception ex){
            System.debug('Exception in Catch of Server-Side Controller '+ex);
            throw new AuraHandledException(ex.getMessage());
        }
    }
}