/**********************************************************************
 * 
 *
 * @url: /services/apexrest/rest
 * @data:
 *  {
        
    }
*************************************************************************/
@RestResource(urlMapping='/rest')
global with sharing class TestVSTSApi {
    @HttpPost
    global static String doPost() {
        return null;
    }
}