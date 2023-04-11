/**********************************************************************
 *
 *
 * @url: /services/apexrest/createAccount
 * @data:
 *  {

    }
*************************************************************************/
@RestResource(urlMapping='/createAccount/*')
global with sharing class TestRestService {
    @HttpGet
    global static String doGet() {
    	RestRequest req = RestContext.request;
        RestResponse rep = RestContext.response;
        String str = '1234';
    	try {
    	    //ResObj obj = (ResObj)JSON.deserialize(res.requestBody.toString(), ResObj.class);

    	    String accountId=req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
    	    Account acc = [SELECT Id FROM Account WHERE Id =:accountId];
            str = acc.Id;
    	    // Account acc = new Account();
    	    // acc.Name = accName;

    	    // insert acc;
            rep.statusCode = 200;
    	}
    	catch (Exception e) {
            rep.statusCode = 400;
            str = 'error';
    	}

        return str;
    }

    global class ResObj{
    	global String Name;
    }
}