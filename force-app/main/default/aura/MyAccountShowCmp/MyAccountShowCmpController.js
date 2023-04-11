({
	doInit:function(){

	},
    handleOnChange : function(component, event, helper) {
    	console.log("接受到事件===");
    	var accId=event.getParam("accId");

    	helper.getAccount(component,accId);
    }
})