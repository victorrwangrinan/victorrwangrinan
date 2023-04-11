({
    pageCountChange : function(component, event, helper) {
        var myEvent = component.getEvent("pageCountChange");
        myEvent.setParams({
            "pageCount": component.find("selectItem").get("v.value")
        });
        myEvent.fire();
    }
})