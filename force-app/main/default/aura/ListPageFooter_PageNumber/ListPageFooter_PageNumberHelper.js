({
    firePageChangeEvt : function (component, pageNumber) {
        var myEvent = component.getEvent("pageChange");
        myEvent.setParams({
            "pageNumber": pageNumber
        });
        myEvent.fire();
    }
})