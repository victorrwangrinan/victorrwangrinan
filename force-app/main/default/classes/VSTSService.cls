/**************************************************************************************************
 * Name:
 * Object: Story
 * Purpose:Fecth Story From VSTS,Update Story
 * Author:  (Victor Wwang)
 * Create Date: 2018-01-07
 * Modify History:
 * 2018-01-07        Create this class
 **************************************************************************************************/
public with sharing class VSTSService{
	public static String basictoken;
	public VSTSService(){
		//获取Token
		List<String> para = new List<String>();
		para.add('');
		para.add('kqar5czg4qmutpmnedfg2dlhis4dwcjkejvbxdrqox5ga33ja2ba');
		String result = String.Format('{0}:{1}', para);
		String base64String = System.EncodingUtil.base64Encode(Blob.valueOf(result));
		basictoken = 'Basic '+base64String;
	}
    public String doGet(){ return '';}


    /**
     * [doPost description]
     * @Creater Addam
     * @CreatTime
     * @Editor Addam
     * @EditTime
     * @Function_
     * @Page
     * @Test
     * @return [description]
     */
    public String doPost(){
    	String endpoint = 'https://dev.azure.com/wangrinan/TestProject2/_apis/wit/wiql?api-version=5.0';
    	String method = 'POST';
    	String contentType = 'application/json';
    	String body = '{"query": "Select [System.Id], [System.Title], [System.State] From WorkItems Where [System.WorkItemType]=\'Story\' AND [Custom.FetchFlag]=False Order By [System.Id] asc"}';
    	HttpResponse response = sendRequest(endpoint,method,contentType,body);

    	QueryResultObj queryResult =(QueryResultObj) JSON.deserialize(response.getBody(), QueryResultObj.Class);
		//System.debug('----'+JSON.serializePretty(queryResult));
		String Ids='';
		List<String> storyIdList = new List<String>();
		Integer n=0;
		for(WorkItemObj w: queryResult.workItems){
			Ids += w.id+',';
			storyIdList.add(w.id);
			n++;
			if(n>=10)break;
		}
		if(Ids.contains(',')){
			Ids.removeEnd(',');
		}
    	String endpoint2 = 'https://dev.azure.com/wangrinan/TestProject2/_apis/wit/workitemsbatch?api-version=5.0';
    	String method2 = 'POST';
    	String contentType2 = 'application/json';
    	String body2 = '{"ids" : ['+Ids+'],"fields": ["System.Id","System.Title","System.WorkItemType","System.CreatedBy","Microsoft.VSTS.Scheduling.RemainingWork"]}';
    	HttpResponse response2 = sendRequest(endpoint2,method2,contentType2,body2);
    	String bodyJson = response2.getBody();
    	String reBodyJson = bodyJson.replace('.', '');
    	System.debug('******>'+reBodyJson);
    	WorkItemBatchObj wb = (WorkItemBatchObj)JSON.deserialize(reBodyJson, WorkItemBatchObj.Class);
    	System.debug('----->'+JSON.serializePretty(wb));

    	String field = '/fields/Custom.FetchFlag';
    	String fieldValue = 'True';
    	return '';//doPatch(storyIdList,field,fieldValue);
    }
    /**
     * [doPatch description]
     * @Creater Addam
     * @CreatTime
     * @Editor Addam
     * @EditTime
     * @Function_
     * @Page
     * @Test
     * @param  ids   [description]
     * @param  field [description]
     * @param  value [description]
     * @return       [description]
     */
    public String doPatch(List<String> ids,String field,String value){
    	String method = 'PATCH';
    	String contentType = 'application/json';
    	String body = '[{"op": "add", "path": "'+field+'","value": "'+value+'"}]';
    	for(String storyId : ids){
    		String endpoint = 'https://dev.azure.com/wangrinan/TestProject2/_apis/wit/workitems/'+storyId+'?api-version=5.0';
    		HttpResponse response2 = sendRequest(endpoint,method,contentType,body);
    	}
    	return '';
    }

    /**
     * [sendRequest description]
     * @Creater Addam
     * @CreatTime
     * @Editor Addam
     * @EditTime
     * @Function_
     * @Page
     * @Test
     * @param  endpoint    [description]
     * @param  method      [description]
     * @param  contentType [description]
     * @param  body        [description]
     * @return             [description]
     */
    public HttpResponse sendRequest(String endpoint,String method,String contentType,String body){
    	Http h = new Http();
    	HttpResponse res = new HttpResponse();
		HttpRequest req = new HttpRequest();
    	req.setEndpoint(endpoint);
    	if(method == 'PATCH'){
    		req.setMethod('POST');
    		req.setHeader('X-HTTP-Method-Override','PATCH');
    		req.setHeader('Content-Type', 'application/json-patch+json');
    	}else{
    		req.setMethod(method);
			req.setHeader('Content-Type', contentType);
    	}
		req.setHeader('Authorization', basictoken);
		req.setBody(body);
		res = h.send(req);

		return res;
    }

    public Class QueryResultObj{
		String queryType;
		String queryResultType;
		String asOf;
		List<FieldObj> columns;
		List<WorkItemObj> workItems;
	}

	public Class FieldObj{
		String referenceName;
		String name;
		String url;
	}

	public Class WorkItemObj{
		String id;
		String url;
	}
	public Class WorkItemBatchObj{
		String count;
		List<StoryObj> value;
	}
	public Class StoryObj{
		String id;
		String rev;
		List<StoryFieldObj> fields;
		String url;
	}

	public Class StoryFieldObj{
		String SystemId;
		String SystemWorkItemType;
		String SystemTitle;
	}
}