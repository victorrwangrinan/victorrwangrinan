({
	doInit:function(){

	},
    doSearch : function(component,event,helper) {
    	var arg=event.getParam("arguments");
        console.log("子组件接受到的id "+arg.boatTypeId);
        component.set('v.accountId',arg.boatTypeId);
        
        var service=component.find("recordEditor");
        service.reloadRecord();
        //helper.getAccount(component,arg.boatTypeId);
    },
    doSave:function(component,event,helper){
        var service=component.find("recordEditor");
        service.saveRecord($A.getCallback(function(saveResult){
            if(saveResult.state=="SUCCESS" || saveResult.state=="DRAFT"){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title":"saved",
                    "message":"The record was updated",
                    "duration":"3000",
                    "type":"success"
                });
                toastEvent.fire();
            }else if(saveResult.state=="INCOMPLETE"){
                
            }else if(saveResult.state=="ERROR"){
                
            }
        }))
    }
})