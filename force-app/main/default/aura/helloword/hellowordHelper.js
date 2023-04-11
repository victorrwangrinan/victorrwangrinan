({
    setContent:function(component,str){
        var action=component.get("c.getContent");
        action.setCallback(this,function(response){
            component.set('v.content',response.getReturnValue());
        });
        $A.enqueueAction(action);
    }
})