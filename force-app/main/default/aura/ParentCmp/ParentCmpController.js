({
    doInit:function(component, event, helper){
    	compoment.set('v.content','hello,pwc');
	},
    handleOnChange : function(component, event, helper) {
    	console.log("接受到事件===");
    	var accId=event.getParam("accId");
		console.log("参数--"+accId);
        var childCmp=component.find("childCmp");
        childCmp.search(accId);
    	//helper.getAccount(component,accId);
    }
})